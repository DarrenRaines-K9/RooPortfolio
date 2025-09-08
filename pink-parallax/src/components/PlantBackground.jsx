import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";

function PlantModel() {
  const { scene, animations } = useGLTF(
    "/images/cartoon_flesh-eating_plant_with_animations.glb"
  );
  const meshRef = useRef();
  const { actions } = useAnimations(animations, meshRef);

  // Start animations if they exist
  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play all animations
      Object.values(actions).forEach((action) => {
        if (action) {
          action.play();
        }
      });
    }
  }, [actions]);

  // Optional subtle movement animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1 - 1;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[2, 2, 2]}
      position={[0, -1, 0]}
    />
  );
}

function Loader() {
  return null; // Simple fallback - no HTML elements inside Canvas
}

export default function PlantBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <Canvas>
        {/* Simple lighting like the working test */}
        <ambientLight intensity={1} />

        {/* Test: Bright green cube should be visible */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>

        {/* 3D Plant Model */}
        <Suspense fallback={<Loader />}>
          <PlantModel />
        </Suspense>

        {/* Subtle fog for atmosphere */}
        <fog attach="fog" args={["#000000", 8, 20]} />
      </Canvas>
    </div>
  );
}

// Preload the model for better performance
useGLTF.preload("/images/cartoon_flesh-eating_plant_with_animations.glb");
