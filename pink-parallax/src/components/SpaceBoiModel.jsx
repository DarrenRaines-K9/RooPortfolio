import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";

function SpaceBoi() {
  const { scene } = useGLTF("/images/space_boi.glb");
  const meshRef = useRef();

  // Optional: Add a subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[1, 1, 1]}
      position={[0, -2, 0]}
    />
  );
}

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "#white",
        fontSize: "18px",
      }}
    >
      Loading Space Boi...
    </div>
  );
}

export default function SpaceBoiModel() {
  return (
    <div
      style={{
        padding: "2rem",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Canvas
        style={{
          width: "600px",
          height: "800px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* 3D Model with Suspense for loading */}
        <Suspense fallback={null}>
          <SpaceBoi />
        </Suspense>

        {/* Orbit Controls for interaction */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/images/space_boi.glb");
