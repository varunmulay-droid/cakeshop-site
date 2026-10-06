import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X, Cake } from 'lucide-react';
import { SHOP, SIGNATURE_CAKES, MENU, waLink } from '@/data';

/* ---------- Rule-based intent engine (no LLM, runs fully in-browser) ---------- */

interface Intent {
  name: string;
  keywords: string[];
  weight?: number;
  reply: () => string;
  chips?: string[];
}

const PRICE_HINT =
  'Slices run $9–11, celebration cakes start at $58, and bespoke wedding commissions from $380. Want a specific quote?';

const INTENTS: Intent[] = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste'],
    reply: () => `Hello! Welcome to ${SHOP.name}. What are we celebrating today — a birthday, a wedding, or just a Tuesday?`,
    chips: ['Birthday cake', 'Wedding cake', 'Just browsing'],
  },
  {
    name: 'birthday',
    keywords: ['birthday', 'bday', 'turning', 'candles', 'party'],
    reply: () =>
      `Wonderful! For birthdays, "The Celebration" is our signature — vanilla chiffon, mascarpone, berries, from $68. Chocolate lover? The Noir Intense (from $74) is unforgettable. Both can be personalised with a name and message.`,
    chips: ['Order The Celebration', 'Order Noir Intense', 'Eggless?'],
  },
  {
    name: 'wedding',
    keywords: ['wedding', 'bride', 'groom', 'engagement', 'tier', 'tiered', 'anniversary'],
    reply: () =>
      'Congratulations! Wedding commissions start at $380 and include a private tasting session and a design sketch. We recommend enquiring 3–4 weeks ahead. Shall I connect you with our atelier on WhatsApp?',
    chips: ['Wedding enquiry', 'See the collection'],
  },
  {
    name: 'price',
    keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'rate', 'charge', 'fee', 'budget'],
    reply: () => PRICE_HINT,
    chips: ['Custom cake quote', 'See menu', 'Talk on WhatsApp'],
  },
  {
    name: 'flavour',
    keywords: ['flavour', 'flavor', 'chocolate', 'vanilla', 'pistachio', 'caramel', 'lemon', 'red velvet', 'taste'],
    reply: () =>
      'This season: Noir Intense (72% dark chocolate), Vanilla Chiffon, Pistachio Rose, Salted Caramel, Lemon Elderflower, and Red Velvet. Tastings are complimentary for custom orders!',
    chips: ['Chocolate please', 'Something fruity', 'Custom cake quote'],
  },
  {
    name: 'eggless',
    keywords: ['eggless', 'egg free', 'egg-free', 'vegan', 'vegetarian', 'no egg', 'without egg'],
    reply: () =>
      'Yes — nearly our whole menu can be made eggless, with zero compromise on texture (we use a cultured-buttermilk crumb). Just mention "eggless" when you order.',
    chips: ['Order eggless cake', 'See the collection'],
  },
  {
    name: 'size',
    keywords: ['size', 'kg', 'pound', 'serving', 'serves', 'guests', 'people', 'how big'],
    reply: () =>
      'As a guide: 0.5 kg serves 4–6, 1 kg serves 8–10, 1.5 kg serves 12–16, 2 kg serves 18–22. Beyond that we go tiered — up to 200 guests.',
    chips: ['Custom cake quote', 'Talk on WhatsApp'],
  },
  {
    name: 'delivery',
    keywords: ['deliver', 'delivery', 'shipping', 'pickup', 'pick up', 'same day', 'same-day', 'how long', 'notice'],
    reply: () =>
      'We offer climate-controlled delivery across the city, and same-day pickup if you order before 14:00. Custom cakes need 5–7 days notice. Where is your celebration?',
    chips: ['Same-day pickup', 'Talk on WhatsApp'],
  },
  {
    name: 'hours',
    keywords: ['open', 'close', 'hours', 'timing', 'when', 'monday', 'sunday'],
    reply: () =>
      `We're open Tue–Fri 9:00–19:00 and Sat–Sun 8:00–20:00. Mondays we rest the ovens. ${SHOP.address}.`,
    chips: ['Directions', 'Talk on WhatsApp'],
  },
  {
    name: 'location',
    keywords: ['where', 'location', 'address', 'directions', 'find you', 'map', 'near'],
    reply: () =>
      `You'll find us at ${SHOP.address} — two minutes from the old clock tower. Come by for a slice; the espresso is on us if you mention Éclair (that's me).`,
    chips: ['Opening hours', 'Talk on WhatsApp'],
  },
  {
    name: 'order',
    keywords: ['order', 'buy', 'book', 'reserve', 'whatsapp', 'enquire', 'enquiry', 'quote', 'custom'],
    reply: () =>
      'Lovely — I can open a WhatsApp chat with your enquiry pre-filled. For bespoke designs, our cake-brief builder in the Custom Cakes section is the fastest route.',
    chips: ['Talk on WhatsApp', 'Custom cake quote', 'See menu'],
  },
  {
    name: 'menu',
    keywords: ['menu', 'what do you have', 'options', 'variety', 'cupcake', 'slice', 'pastry', 'dessert'],
    reply: () =>
      `Today's board includes ${MENU.slice(0, 3).map((m) => m.name).join(', ')} and more. Our signature cakes: ${SIGNATURE_CAKES.map((c) => c.name).join(', ')}. Anything catch your eye?`,
    chips: ['See menu', 'Cupcakes', 'Birthday cake'],
  },
  {
    name: 'thanks',
    keywords: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'amazing'],
    reply: () => 'You\'re so welcome. Save my number — I never say no to cake talk.',
    chips: ['Talk on WhatsApp'],
  },
];

const FALLBACKS = [
  "Mmm, that one's beyond my recipe book — but our pâtissiers on WhatsApp will know exactly.",
  'I may be made of rules, not butter, but I want to get this right — try asking about flavours, prices, sizes, delivery, or hours.',
  "Let's talk cake: I can help with flavours, pricing, eggless options, custom designs or opening hours.",
];

function scoreIntent(input: string): Intent | null {
  const text = input.toLowerCase();
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (text.includes(kw)) score += kw.length > 4 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best;
}

function chipAction(chip: string): { type: 'send' | 'link' | 'scroll'; payload: string } {
  if (chip === 'Talk on WhatsApp' || chip === 'Wedding enquiry')
    return { type: 'link', payload: waLink('Hello Maison Éclair! I have an enquiry.') };
  if (chip === 'Order The Celebration')
    return { type: 'link', payload: waLink('Hello! I\'d like to order The Celebration birthday cake.') };
  if (chip === 'Order Noir Intense')
    return { type: 'link', payload: waLink('Hello! I\'d like to order the Noir Intense chocolate cake.') };
  if (chip === 'Order eggless cake')
    return { type: 'link', payload: waLink('Hello! I\'d like to order an eggless cake.') };
  if (chip === 'Custom cake quote') return { type: 'scroll', payload: '#custom' };
  if (chip === 'See menu') return { type: 'scroll', payload: '#menu' };
  if (chip === 'See the collection') return { type: 'scroll', payload: '#collection' };
  if (chip === 'Directions') return { type: 'scroll', payload: '#visit' };
  if (chip === 'Opening hours') return { type: 'scroll', payload: '#visit' };
  if (chip === 'Same-day pickup')
    return { type: 'link', payload: waLink('Hello! Do you have cakes available for same-day pickup today?') };
  return { type: 'send', payload: chip };
}

/* ---------- Chat UI ---------- */

interface Msg {
  from: 'bot' | 'user';
  text: string;
  chips?: string[];
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fallbackIdx = useRef(0);

  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            from: 'bot',
            text: `Hi there 👋 I'm Éclair, the ${SHOP.name} assistant. What are you celebrating today?`,
            chips: ['Birthday cake', 'Wedding cake', 'See menu', 'Opening hours'],
          },
        ]);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const respond = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      const intent = scoreIntent(text);
      const reply: Msg = intent
        ? { from: 'bot', text: intent.reply(), chips: intent.chips }
        : { from: 'bot', text: FALLBACKS[fallbackIdx.current++ % FALLBACKS.length], chips: ['See menu', 'Talk on WhatsApp'] };
      setTyping(false);
      setMessages((m) => [...m, reply]);
    }, 650 + Math.random() * 450);
  };

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [...m, { from: 'user', text }]);
    respond(text);
  };

  const onChip = (chip: string) => {
    const action = chipAction(chip);
    if (action.type === 'link') {
      window.open(action.payload, '_blank');
      setMessages((m) => [...m, { from: 'user', text: chip }]);
      respond('whatsapp');
    } else if (action.type === 'scroll') {
      setOpen(false);
      document.querySelector(action.payload)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      send(action.payload);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#2c1c10] text-amber-300 shadow-2xl shadow-black/30 ring-1 ring-amber-300/30"
        aria-label="Open cake assistant"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-[10px] font-bold text-[#241408]">1</span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-50 flex h-[540px] w-[min(92vw,400px)] flex-col overflow-hidden rounded-3xl border border-[#e3d6c2] bg-[#fdf9f2] shadow-2xl shadow-black/25 md:right-6"
          >
            {/* header */}
            <div className="flex items-center gap-3 bg-[#2c1c10] px-5 py-4 text-amber-50">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-400/15 ring-1 ring-amber-300/30">
                <Cake size={18} className="text-amber-300" />
              </span>
              <div>
                <p className="font-display font-semibold">Éclair</p>
                <p className="flex items-center gap-1.5 text-[11px] text-amber-100/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online — replies instantly
                </p>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble-in flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-md bg-[#2c1c10] text-amber-50'
                        : 'rounded-bl-md bg-white text-[#4a3a2a] shadow-sm ring-1 ring-[#ecdfcc]'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.chips && i === messages.length - 1 && (
                    <div className="mt-2 flex max-w-[90%] flex-wrap gap-1.5">
                      {m.chips.map((c) => (
                        <button
                          key={c}
                          onClick={() => onChip(c)}
                          className="rounded-full border border-[#a4744a]/40 bg-white px-3 py-1.5 text-xs text-[#a4744a] transition hover:bg-[#a4744a] hover:text-white"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-[#ecdfcc] w-fit">
                  <span className="typing-dot h-2 w-2 rounded-full bg-[#a4744a]" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-[#a4744a]" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-[#a4744a]" />
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-center gap-2 border-t border-[#ecdfcc] bg-white p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cakes, prices, delivery…"
                className="flex-1 rounded-full bg-[#f5ecdf] px-4 py-2.5 text-sm text-[#4a3a2a] outline-none placeholder:text-[#b09a80] focus:ring-2 focus:ring-[#a4744a]/40"
              />
              <button
                type="submit"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2c1c10] text-amber-300 transition hover:bg-[#a4744a]"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
