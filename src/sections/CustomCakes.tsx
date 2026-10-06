import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Cake as CakeIcon, CalendarDays, Palette, Users } from 'lucide-react';
import { waLink } from '@/data';

const OCCASIONS = ['Birthday', 'Wedding', 'Anniversary', 'Baby Shower', 'Corporate', 'Just because'];
const SIZES = ['0.5 kg — serves 4–6', '1 kg — serves 8–10', '1.5 kg — serves 12–16', '2 kg — serves 18–22', 'Tiered — 30+ guests'];
const FLAVOURS = ['Noir Intense (72% dark)', 'Vanilla Chiffon', 'Pistachio Rose', 'Salted Caramel', 'Lemon Elderflower', 'Red Velvet'];

const STEPS = [
  { icon: CalendarDays, title: 'Tell us the date', text: 'Share your occasion and date — we recommend 5–7 days notice for bespoke designs.' },
  { icon: Palette, title: 'Design together', text: 'Send references or a mood. Our pâtissiers sketch options and a tasting box follows.' },
  { icon: CakeIcon, title: 'We bake & finish', text: 'Baked the morning of your event, finished by hand, photographed before it leaves.' },
  { icon: Users, title: 'Delivered with care', text: 'Climate-controlled delivery, set up on-site, candles lit if you wish.' },
];

export function CustomCakes() {
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [flavour, setFlavour] = useState(FLAVOURS[0]);
  const [eggless, setEggless] = useState(false);

  const message = `Hello Maison Éclair! I'd like a custom cake quote:\n• Occasion: ${occasion}\n• Size: ${size}\n• Flavour: ${flavour}\n• ${eggless ? 'Eggless' : 'Classic (with egg)'}\nCould you share a design and price?`;

  return (
    <section id="custom" className="bg-[#f7f0e6] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Process */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#a4744a]">Custom Commissions</p>
            <h2 className="font-display mt-4 text-4xl font-medium leading-tight text-[#2c1c10] md:text-5xl">
              Your story,<br /><em className="text-[#a4744a]">in buttercream</em>
            </h2>
            <p className="mt-5 max-w-md text-[#7a6450]">
              Wedding tiers, sculpted birthday centrepieces, logos rendered in chocolate —
              if you can describe it, we can bake it.
            </p>
            <div className="mt-10 space-y-6">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2c1c10] text-amber-300">
                    <s.icon size={20} />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-[#2c1c10]">
                      <span className="mr-2 text-sm text-[#a4744a]">0{i + 1}</span>{s.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#8a7260]">{s.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote builder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-fit rounded-[2rem] border border-[#e3d6c2] bg-white/80 p-7 shadow-xl shadow-[#a4744a]/10 backdrop-blur md:p-9"
          >
            <h3 className="font-display text-2xl font-semibold text-[#2c1c10]">Build your cake brief</h3>
            <p className="mt-1 text-sm text-[#8a7260]">Pick a few options — we'll send it straight to WhatsApp.</p>

            <div className="mt-6 space-y-6">
              <div>
                <p className="mb-2.5 text-[11px] uppercase tracking-[0.22em] text-[#a4744a]">Occasion</p>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((o) => (
                    <button key={o} onClick={() => setOccasion(o)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${occasion === o ? 'border-[#2c1c10] bg-[#2c1c10] text-amber-100' : 'border-[#d8c9b4] text-[#6b5540] hover:border-[#a4744a]'}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-[11px] uppercase tracking-[0.22em] text-[#a4744a]">Size</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${size === s ? 'border-[#2c1c10] bg-[#2c1c10] text-amber-100' : 'border-[#d8c9b4] text-[#6b5540] hover:border-[#a4744a]'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-[11px] uppercase tracking-[0.22em] text-[#a4744a]">Flavour</p>
                <div className="flex flex-wrap gap-2">
                  {FLAVOURS.map((f) => (
                    <button key={f} onClick={() => setFlavour(f)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${flavour === f ? 'border-[#2c1c10] bg-[#2c1c10] text-amber-100' : 'border-[#d8c9b4] text-[#6b5540] hover:border-[#a4744a]'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#6b5540]">
                <button
                  onClick={() => setEggless(!eggless)}
                  className={`relative h-6 w-11 rounded-full transition ${eggless ? 'bg-[#a4744a]' : 'bg-[#d8c9b4]'}`}
                  aria-label="Toggle eggless"
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${eggless ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
                Eggless (no compromise on texture, we promise)
              </label>

              <a
                href={waLink(message)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#2c1c10] py-4 text-sm font-semibold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-[#a4744a]"
              >
                <MessageCircle size={17} /> Get my quote on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
