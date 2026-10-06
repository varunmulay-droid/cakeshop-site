import { Clock, MapPin, MessageCircle, Phone, Cake } from 'lucide-react';
import { SHOP, waLink } from '@/data';

export function Visit() {
  return (
    <section id="visit" className="bg-[#fdf9f2] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#a4744a]">Visit the Atelier</p>
            <h2 className="font-display mt-4 text-4xl font-medium text-[#2c1c10] md:text-5xl">
              Come for the smell,<br /><em className="text-[#a4744a]">stay for a slice</em>
            </h2>
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f0e4d0] text-[#a4744a]"><MapPin size={19} /></span>
                <div>
                  <p className="font-medium text-[#2c1c10]">{SHOP.address}</p>
                  <p className="mt-1 text-sm text-[#8a7260]">Two minutes from the old clock tower. Street parking available.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f0e4d0] text-[#a4744a]"><Clock size={19} /></span>
                <div className="space-y-1.5">
                  {SHOP.hours.map((h) => (
                    <p key={h.days} className="text-sm text-[#6b5540]">
                      <span className="mr-3 inline-block w-24 font-medium text-[#2c1c10]">{h.days}</span>{h.time}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f0e4d0] text-[#a4744a]"><Phone size={19} /></span>
                <div>
                  <p className="font-medium text-[#2c1c10]">{SHOP.displayPhone}</p>
                  <p className="mt-1 text-sm text-[#8a7260]">WhatsApp is fastest — we reply within the hour during opening times.</p>
                </div>
              </div>
            </div>
            <a
              href={waLink('Hello Maison Éclair! I have a question.')}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#241408] transition hover:bg-amber-300"
            >
              <MessageCircle size={17} /> Chat with us
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-[#a4744a]/15">
            <img src="/images/img7.jpg" alt="Inside the Maison Éclair atelier" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#17100a]/80 p-5 text-amber-50 backdrop-blur">
              <p className="font-display text-lg font-semibold">Same-day pickup</p>
              <p className="mt-1 text-sm text-amber-100/70">Order before 14:00 and most menu cakes are ready by 18:00.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-amber-100/10 bg-[#17100a] py-14 text-amber-100/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2.5 text-amber-50">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-400/15 ring-1 ring-amber-300/30">
            <Cake size={18} className="text-amber-300" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold">{SHOP.name}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/50">{SHOP.tagline}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-[0.2em]">
          <a href="#collection" className="hover:text-amber-300">Collection</a>
          <a href="#menu" className="hover:text-amber-300">Menu</a>
          <a href="#custom" className="hover:text-amber-300">Custom Cakes</a>
          <a href="#visit" className="hover:text-amber-300">Visit</a>
        </div>
        <p className="text-xs">© 2026 {SHOP.name}. Photography via Pexels. 3D renders baked in-house.</p>
      </div>
    </footer>
  );
}
