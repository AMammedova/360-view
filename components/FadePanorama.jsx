import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";

/**
 * FadePanorama
 * 
 * Props:
 * - textureUrl: URL of the texture you want to show
 * - transitionDuration: how many seconds to cross-fade
 */
export function FadePanorama({ textureUrl, transitionDuration = 1 }) {
  // We keep a record of the "previous" texture so we can fade it out.
  const [oldTexture, setOldTexture] = useState(null);
  const [newTexture, setNewTexture] = useState(null);

  const [blend, setBlend] = useState(1); 
  // blend=1 => fully showing the new texture
  // blend=0 => fully showing the old texture

  const oldMaterialRef = useRef(null);
  const newMaterialRef = useRef(null);

  useEffect(() => {
    // When 'textureUrl' changes, we want to start a transition:
    // 1) oldTexture <- current newTexture
    // 2) newTexture <- load fresh from textureUrl
    // 3) set blend=0 and animate to 1

    // Move the last newTexture to oldTexture
    setOldTexture(newTexture);

    // Load the actual new texture
    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, (loaded) => {
      setNewTexture(loaded);
      // Start cross-fade
      setBlend(0);
    });
  }, [textureUrl]);

  useFrame((state, delta) => {
    // If we’re in the middle of a transition, increment blend
    if (blend < 1) {
      const speed = 1 / transitionDuration; 
      const newBlend = Math.min(blend + speed * delta, 1);
      setBlend(newBlend);
    }

    // Update material opacities
    if (oldMaterialRef.current) {
      oldMaterialRef.current.opacity = 1 - blend; 
    }
    if (newMaterialRef.current) {
      newMaterialRef.current.opacity = blend; 
    }
  });

  return (
    <>
      {/* Old sphere (only if oldTexture exists) */}
      {oldTexture && (
        <mesh>
          <sphereGeometry args={[10, 64, 64]} />
          <meshBasicMaterial
            ref={oldMaterialRef}
            map={oldTexture}
            side={THREE.BackSide}
            transparent={true}
            opacity={1}
          />
        </mesh>
      )}

      {/* New sphere (only if newTexture exists) */}
      {newTexture && (
        <mesh>
          <sphereGeometry args={[10, 64, 64]} />
          <meshBasicMaterial
            ref={newMaterialRef}
            map={newTexture}
            side={THREE.BackSide}
            transparent={true}
            opacity={blend}
          />
        </mesh>
      )}
    </>
  );
}
