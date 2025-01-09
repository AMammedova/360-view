"use client";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { PlaneHotspot } from "./PlaneHotspot";

const View = ({ sceneData, onChangeScene }) => {
  const orbitRef = useRef();

  const { texture, hotspots } = sceneData;


  const handlePointerDown = (e) => {
    e.stopPropagation();

    const { point } = e; 
    console.log("Clicked point:", point);

    const newHotspot = {
      position: [point.x, point.y, point.z], 
      iconUrl: "/arrow.png", 
      targetSceneId: null,
    };

    // console.log("New hotspots:", [...hotspots, newHotspot]);

    // setHotspots([...hotspots, newHotspot]);
  };


  const handleHotspotClick = (targetSceneId) => {
    onChangeScene(targetSceneId);
  };
  console.log("Hotspots:", hotspots);
  return (
    <div style={{ width: "80%", height: "600px" }}>
      <Canvas>
        <OrbitControls
          ref={orbitRef}
          enableZoom
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />

        <ambientLight intensity={1} />

        {/* Panoramic sphere */}
        <mesh onPointerDown={handlePointerDown}>
          <sphereGeometry args={[10, 64, 64]} />
          <meshBasicMaterial
            map={new THREE.TextureLoader().load(texture)}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Render hotspots from data */}
        {hotspots?.map((hotspot, idx) => (
          <PlaneHotspot
            key={idx}
            position={hotspot.position.map((coord, i) =>
              i === 1 ? coord + 0.01 : coord
            )} // Offset Y position slightly
            iconUrl={hotspot.iconUrl}
            onClick={() => handleHotspotClick(hotspot.targetSceneId)}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default View;

// "use client";
// import React, { useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { FadePanorama } from "./FadePanorama"; 
// // import the cross-fade component
// import { PlaneHotspot } from "./PlaneHotspot";
// import * as THREE from 'three';


// const View = ({ sceneData, onChangeScene }) => {
//   const orbitRef = useRef();

//   // we get the texture (URL) & hotspots from sceneData
//   const { texture, hotspots } = sceneData;

//   const handlePointerDown = (e) => {
//     e.stopPropagation();
//     const { point } = e; 
//     console.log("Clicked point:", point);
//     // create a new hotspot or whatever your logic is...
//   };

//   const handleHotspotClick = (targetSceneId) => {
//     onChangeScene(targetSceneId);
//   };

//   return (
//     <div style={{ width: "80%", height: "600px" }}>
//       <Canvas>
//         <OrbitControls
//           ref={orbitRef}
//           enableZoom
//           enablePan={false}
//           minPolarAngle={0}
//           maxPolarAngle={Math.PI}
//         />
//         <ambientLight intensity={1} />

//         {/* 
//           Instead of a single mesh with a single texture,
//           we use our FadePanorama. Pass the texture URL from sceneData.
//         */}
//         <FadePanorama textureUrl={texture} transitionDuration={1} />

//         {/* If you still want to raycast for new hotspots: */}
//         <mesh onPointerDown={handlePointerDown} visible={false}>
//           {/* invisible sphere just to catch clicks */}
//           <sphereGeometry args={[10, 64, 64]} />
//           <meshBasicMaterial side={THREE.BackSide} transparent opacity={0} />
//         </mesh>

//         {/* Render hotspots from data */}
//         {hotspots?.map((hotspot, idx) => (
//           <PlaneHotspot
//             key={idx}
//             position={hotspot.position.map((coord, i) =>
//               i === 1 ? coord + 0.01 : coord
//             )}
//             iconUrl={hotspot.iconUrl}
//             onClick={() => handleHotspotClick(hotspot.targetSceneId)}
//           />
//         ))}
//       </Canvas>
//     </div>
//   );
// };

// export default View;
