
import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function PlaneHotspot({
  position,
  onClick,
  iconUrl = "/hotstop.png",
  rotation = [0, 0, 0],
}) {
  const planeRef = useRef();

  const texture = useLoader(THREE.TextureLoader, iconUrl);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true, 
      }),
    [texture]
  );

  useFrame(({ camera }) => {
    if (planeRef.current) {
      planeRef.current.lookAt(camera.position);
    }
  });
  
  
console.log("PlaneHotspot rendered",position);
  return (
    <mesh
      ref={planeRef}
      position={position}
      onClick={onClick}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color="#ff0000" />  
      <meshBasicMaterial attach="material" map={texture} transparent={true} /> 
    </mesh>
  );
}


// import React, { useRef, useEffect, useMemo } from "react";
// import { useLoader } from "@react-three/fiber";
// import * as THREE from "three";

// export function PlaneHotspot({
//   position,
//   onClick,
//   iconUrl = "/arrow.png", // Use an arrow texture for the hotspot
//   rotation = [-Math.PI / 2, 0, 0], // Flat on the ground
// }) {
//   const planeRef = useRef();

//   // Load the arrow texture
//   const texture = useLoader(THREE.TextureLoader, iconUrl);

//   // Create a material with transparency
//   const material = useMemo(
//     () =>
//       new THREE.MeshBasicMaterial({
//         map: texture,
//         transparent: true, // Supports textures with alpha channels
//       }),
//     [texture]
//   );

//   useEffect(() => {
//     // Set rotation to lie flat on the ground
//     if (planeRef.current) {
//       planeRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
//     }
//   }, [rotation]);

//   return (
//     <mesh
//       ref={planeRef}
//       position={[position[0], position[1] + 0.01, position[2]]} // Slight offset above ground
//       onClick={onClick}
//     >
//       {/* Circle geometry for better ground alignment */}
//       <circleGeometry args={[0.5, 32]} /> {/* Radius 0.5, 32 segments */}
//       <meshBasicMaterial attach="material" map={texture} transparent={true} />
//     </mesh>
//   );
// }
