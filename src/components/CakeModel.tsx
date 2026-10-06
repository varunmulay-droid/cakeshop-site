import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

interface CakeModelProps {
  url: string;
  /** target height in world units; model is auto-scaled to fit */
  height?: number;
  rotating?: boolean;
  float?: boolean;
  rotationSpeed?: number;
}

/** Loads a GLB cake, normalizes its scale/position, gently rotates. */
export function CakeModel({
  url,
  height = 2.2,
  rotating = true,
  float = true,
  rotationSpeed = 0.35,
}: CakeModelProps) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);

  const { normalized, offset, scale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = height / (size.y || 1);
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && 'roughness' in mat) {
          mat.roughness = Math.min(mat.roughness ?? 0.8, 0.75);
          mat.envMapIntensity = 0.6;
        }
      }
    });
    return {
      normalized: clone,
      offset: [-center.x * s, -box.min.y * s, -center.z * s] as [number, number, number],
      scale: s,
    };
  }, [scene, height]);

  useFrame((_, delta) => {
    if (group.current && rotating) {
      group.current.rotation.y += delta * rotationSpeed;
    }
  });

  const inner = (
    <group ref={group} position={offset} scale={scale}>
      <primitive object={normalized} />
    </group>
  );

  return float ? (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.55}>
      {inner}
    </Float>
  ) : (
    inner
  );
}
