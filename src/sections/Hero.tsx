import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';
import { CakeStage } from '@/components/CakeStage';
import { CakeModel } from '@/components/CakeModel';
import { waLink } from '@/data';

const MARQUEE = [
  'Handcrafted Daily',
  'Single-Origin Chocolate',
  'Eggless Options',
  'Custom Wedding Cakes',
  'Same-Day Pickup',
  'Baked at Dawn',
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#17100a] text-amber-50">
      <div className="hero-glow absolute inset-0" />
      <div className="bg-grain absolute inset-0" />

      {/* oversized watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-24 select-none overflow-hidden">
        <p className="font-display whitespace-nowrap text-center text-[18vw] font-bold leading-none text-amber-100/[0.04]">
          Maison Éclair
        </p>
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-6 px-5 pb-24 pt-28 md:grid-cols-2 md:px-8">
        {/* Copy */}
        <div className="relative z-10 order-2 text-center md:order-1 md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-400/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-amber-200"
          >
            <Sparkles size={13} /> Pâtisserie & Cake Atelier
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-display text-5xl font-medium leading-[1.05] md:text-7xl"
          >
            Cakes worth
            <br />
            <em className="text-amber-300">celebrating</em>
            <br />
            slowly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-amber-100/65 md:mx-0 md:text-lg"
          >
            Small-batch cakes and pâtisserie, baked at dawn and finished by hand.
            Drag the cake — it's real. So is the one waiting for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row md:justify-start sm:justify-center"
          >
            <a
              href={waLink('Hello Maison Éclair! I would like to order a cake for an upcoming celebration.')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-full bg-amber-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#241408] transition hover:bg-amber-300 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.6)]"
            >
              <MessageCircle size={17} /> Order on WhatsApp
            </a>
            <a
              href="#collection"
              className="rounded-full border border-amber-200/30 px-8 py-4 text-sm uppercase tracking-[0.14em] text-amber-100/85 transition hover:border-amber-300 hover:text-amber-300"
            >
              Explore the Collection
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center justify-center gap-8 text-amber-100/50 md:justify-start"
          >
            {[
              ['12+', 'Years of craft'],
              ['40k', 'Cakes delivered'],
              ['4.9★', 'Customer rating'],
            ].map(([n, l]) => (
              <div key={l} className="text-center md:text-left">
                <p className="font-display text-2xl font-semibold text-amber-200">{n}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em]">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative order-1 h-[46vh] md:order-2 md:h-[75vh]"
        >
          <CakeStage className="h-full w-full" cameraPosition={[0, 1.3, 4.4]}>
            <CakeModel url="/models/birthday-cake.glb" height={2.5} rotationSpeed={0.4} />
          </CakeStage>
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-amber-200/20 bg-[#17100a]/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-amber-200/70 backdrop-blur">
            360° · Real-time render
          </div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="absolute bottom-0 inset-x-0 border-t border-amber-100/10 bg-[#120c07]/80 py-3.5 backdrop-blur overflow-hidden">
        <div className="marquee-track flex w-max gap-10">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap text-[11px] uppercase tracking-[0.3em] text-amber-100/50">
              {t} <span className="text-amber-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      <a
        href="#collection"
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 text-amber-200/50 transition hover:text-amber-300 md:block"
        aria-label="Scroll down"
      >
        <ArrowDown className="animate-bounce" size={20} />
      </a>
    </section>
  );
}
