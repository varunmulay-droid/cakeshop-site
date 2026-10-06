import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Html } from '@react-three/drei';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-2 border-amber-300/30 border-t-amber-300 animate-spin" />
        <p className="text-xs tracking-[0.3em] uppercase text-amber-200/70">Baking…</p>
      </div>
    </Html>
  );
}

interface CakeStageProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  className?: string;
  /** warm ambient intensity */
  warmth?: number;
}

/** Shared R3F canvas: warm studio lighting rig, soft shadows, no external HDR dependency. */
export function CakeStage({
  children,
  cameraPosition = [0, 1.4, 4.2],
  className = '',
  warmth = 0.55,
}: CakeStageProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={warmth} color="#ffe8cf" />
        <spotLight
          position={[4, 6, 4]}
          angle={0.5}
          penumbra={1}
          intensity={140}
          color="#ffd9a8"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 4, -3]} intensity={1.1} color="#cfe4ff" />
        <pointLight position={[0, 2.2, -4]} intensity={18} color="#ffb26b" />
        <Suspense fallback={<Loader />}>{children}</Suspense>
        <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={9} blur={2.6} far={4} color="#2a1608" />
      </Canvas>
    </div>
  );
}
