import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { CakeModel } from '@/components/CakeModel';
import { GALLERY } from '@/data';

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-[#17100a] py-24 text-amber-50 md:py-32">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300/80">The Atelier</p>
            <h2 className="font-display mt-4 text-4xl font-medium leading-tight md:text-6xl">
              Twelve years of<br /><em className="text-amber-300">quiet obsession</em>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-amber-100/65">
              Maison Éclair began as a two-person kitchen with one oven and a stubborn belief:
              a cake should taste as extraordinary as it looks. Today our atelier still bakes in
              small batches — single-origin couverture, cultured butter, vanilla we source ourselves.
              Nothing premixed. Nothing rushed.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                ['72%', 'Single-origin dark chocolate'],
                ['05:30', 'When the first oven lights'],
                ['0', 'Shortcuts, ever'],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-semibold text-amber-300">{n}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] leading-relaxed text-amber-100/50">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* cupcake 3D vignette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative h-[52vh] overflow-hidden rounded-[2rem] border border-amber-100/10 bg-gradient-to-b from-[#241709] to-[#17100a]"
          >
            <div className="hero-glow absolute inset-0" />
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.5, 3.6], fov: 36 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.5} color="#ffe8cf" />
              <spotLight position={[3, 5, 3]} angle={0.5} penumbra={1} intensity={120} color="#ffd9a8" castShadow />
              <directionalLight position={[-4, 3, -2]} intensity={0.8} color="#cfe4ff" />
              <Suspense fallback={null}>
                <CakeModel url="/models/chocolate-cupcake.glb" height={1.8} rotationSpeed={0.5} />
              </Suspense>
              <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={7} blur={2.6} far={4} color="#000" />
            </Canvas>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-200/15 bg-[#17100a]/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-amber-200/70 backdrop-blur">
              Petit Noir — live render
            </p>
          </motion.div>
        </div>

        {/* gallery strip */}
        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${i % 2 ? 'md:mt-10' : ''}`}
            >
              <img
                src={g.image}
                alt={g.caption}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-72"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs tracking-wide text-amber-100/90 opacity-0 transition group-hover:opacity-100">
                {g.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
