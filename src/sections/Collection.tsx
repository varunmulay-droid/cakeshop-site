import { Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls } from '@react-three/drei';
import { MessageCircle, RotateCw } from 'lucide-react';
import { CakeModel } from '@/components/CakeModel';
import { SIGNATURE_CAKES, waLink } from '@/data';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-2 border-[#a4744a]/30 border-t-[#a4744a] animate-spin" />
        <p className="text-xs tracking-[0.3em] uppercase text-[#8a6a4d]">Baking…</p>
      </div>
    </Html>
  );
}

/** Interactive 3D collection — switch between the real GLB cakes, orbit freely. */
export function Collection() {
  const [active, setActive] = useState(0);
  const cake = SIGNATURE_CAKES[active];

  return (
    <section id="collection" className="relative overflow-hidden bg-[#f7f0e6] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#a4744a]">The Signature Collection</p>
          <h2 className="font-display mt-4 text-4xl font-medium text-[#2c1c10] md:text-6xl">
            Meet the cakes, <em className="text-[#a4744a]">in 3D</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#7a6450]">
            Every cake below is a live 3D render of our actual designs. Drag to orbit,
            and imagine it at the center of your table.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
          {/* Selector + details */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div className="flex gap-2 lg:flex-col">
              {SIGNATURE_CAKES.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`flex-1 rounded-2xl border px-4 py-4 text-left transition-all duration-300 lg:flex-none ${
                    i === active
                      ? 'border-[#a4744a] bg-[#2c1c10] text-amber-50 shadow-xl shadow-[#2c1c10]/20'
                      : 'border-[#d8c9b4] bg-white/60 text-[#5c4836] hover:border-[#a4744a]/60 hover:bg-white'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] opacity-60">{c.subtitle}</p>
                  <p className="font-display mt-1 text-lg font-semibold">{c.name}</p>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                <p className="leading-relaxed text-[#6b5540]">{cake.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cake.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#d8c9b4] bg-white/70 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] text-[#8a6a4d]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex items-end justify-between border-t border-[#d8c9b4] pt-6">
                  <div>
                    <p className="font-display text-3xl font-semibold text-[#2c1c10]">{cake.price}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8a6a4d]">{cake.serves}</p>
                  </div>
                  <a
                    href={waLink(`Hello Maison Éclair! I'm interested in the ${cake.name} (${cake.subtitle}). Could you share availability?`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#2c1c10] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-[#a4744a]"
                  >
                    <MessageCircle size={15} /> Enquire
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3D viewport */}
          <div className="relative order-1 h-[50vh] overflow-hidden rounded-[2rem] border border-[#e3d6c2] bg-gradient-to-b from-[#fdf8f0] to-[#f0e4d0] shadow-2xl shadow-[#a4744a]/15 lg:order-2 lg:col-span-3 lg:h-[70vh]">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.5, 4.4], fov: 36 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.7} color="#fff3e0" />
              <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={150} color="#ffdcb0" castShadow />
              <directionalLight position={[-5, 4, -3]} intensity={1} color="#dce9ff" />
              <pointLight position={[0, 2.2, -4]} intensity={14} color="#ffc98a" />
              <Suspense fallback={<Loader />}>
                <group key={cake.id}>
                  <CakeModel url={cake.model} height={cake.height} rotating={false} float={false} />
                </group>
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 1.9} autoRotate autoRotateSpeed={1.2} />
              <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={8} blur={2.4} far={4} color="#5a3a1a" />
            </Canvas>
            <div className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-[#d8c9b4] bg-white/80 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[#8a6a4d] backdrop-blur">
              <span className="inline-flex items-center gap-2"><RotateCw size={11} /> Drag to rotate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
