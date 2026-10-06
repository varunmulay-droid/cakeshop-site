import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MENU, waLink } from '@/data';

export function Menu() {
  return (
    <section id="menu" className="bg-[#fdf9f2] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#a4744a]">This Season's Menu</p>
            <h2 className="font-display mt-4 text-4xl font-medium text-[#2c1c10] md:text-6xl">
              Baked at dawn,<br /><em className="text-[#a4744a]">gone by dusk</em>
            </h2>
          </div>
          <p className="max-w-sm text-[#7a6450]">
            The menu changes with the seasons and the mood of our head pâtissier.
            Reserve ahead — the good ones never last the afternoon.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item, i) => (
            <motion.a
              key={item.name}
              href={waLink(`Hello Maison Éclair! I'd like to order: ${item.name} (${item.price}).`)}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
              className="group relative overflow-hidden rounded-[1.6rem] bg-white shadow-sm ring-1 ring-[#ecdfcc] transition hover:shadow-2xl hover:shadow-[#a4744a]/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {item.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#2c1c10]/85 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-amber-200 backdrop-blur">
                    {item.tag}
                  </span>
                )}
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#2c1c10] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={17} />
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-[#2c1c10]">{item.name}</h3>
                  <p className="whitespace-nowrap font-display text-lg font-medium text-[#a4744a]">{item.price}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#8a7260]">{item.description}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#a4744a] opacity-0 transition group-hover:opacity-100">
                  Order via WhatsApp →
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
