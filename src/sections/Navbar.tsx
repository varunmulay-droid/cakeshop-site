import { useEffect, useState } from 'react';
import { Cake, Menu as MenuIcon, X, MessageCircle } from 'lucide-react';
import { SHOP, waLink } from '@/data';

const LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'Menu', href: '#menu' },
  { label: 'Atelier', href: '#story' },
  { label: 'Custom Cakes', href: '#custom' },
  { label: 'Visit', href: '#visit' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#17100a]/85 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-amber-50">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-400/15 ring-1 ring-amber-300/30">
            <Cake className="h-4.5 w-4.5 text-amber-300" size={18} />
          </span>
          <span className="font-display text-lg font-semibold tracking-wide">{SHOP.name}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-[0.18em] text-amber-100/70 transition hover:text-amber-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink('Hello Maison Éclair! I would like to order a cake.')}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#241408] transition hover:bg-amber-300"
          >
            <MessageCircle size={15} />
            Order on WhatsApp
          </a>
        </div>

        <button
          className="text-amber-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-amber-100/10 bg-[#17100a]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm uppercase tracking-[0.18em] text-amber-100/80 hover:bg-amber-400/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink('Hello Maison Éclair! I would like to order a cake.')}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#241408]"
            >
              <MessageCircle size={16} /> Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
