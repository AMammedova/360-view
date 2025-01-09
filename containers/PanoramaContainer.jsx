"use client";
import React, { useState } from "react";

import View from "@/components";
import { scenes } from "@/sceneData";


export default function PanoramaContainer() {
  const [currentSceneId, setCurrentSceneId] = useState(0);

  const handleChangeScene = (targetSceneId) => {
    console.log("Changing scene to:", targetSceneId);
    setCurrentSceneId(targetSceneId);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <View
        sceneData={scenes[currentSceneId]} 
        onChangeScene={handleChangeScene} 
      />
    </div>
  );
}
