import React from "react";
import { Canvas } from "@react-three/fiber";

export default function SimpleThreeTest() {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        width: "200px",
        height: "200px",
        border: "2px solid red",
        zIndex: 1000,
      }}
    >
      <Canvas>
        <ambientLight intensity={1} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  );
}
