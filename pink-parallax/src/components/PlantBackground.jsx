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
      scale={[1, 2, 2]}
      position={[0, -2, 3]}
    />
  );
}

function Loader() {
  return null; // Simple fallback - no HTML elements inside Canvas
}

export default function PlantBackground() {
  const containerRef = useRef(null);

  React.useEffect(() => {
    const updatePosition = () => {
      const mainContainer = document.querySelector("main");

      if (mainContainer && containerRef.current) {
        const rect = mainContainer.getBoundingClientRect();
        const containerElement = containerRef.current;

        // Position the plant background to match the main container
        containerElement.style.position = "absolute";
        containerElement.style.top = `${rect.top + window.scrollY}px`;
        containerElement.style.left = `${rect.left + window.scrollX}px`;
        containerElement.style.width = `${rect.width}px`;
        containerElement.style.height = `${rect.height}px`;
      }
    };

    // Initial positioning
    updatePosition();

    // Update position on scroll and resize
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    // Cleanup listeners
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none", // Allow clicks to pass through
        borderRadius: "8px", // Match the main container's border radius
      }}
    >
      <Canvas>
        {/* Simple lighting */}
        <ambientLight intensity={1} />

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
