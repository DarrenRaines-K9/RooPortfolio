/**
 * SpaceBoiModel.jsx - Interactive 3D Character Model Component
 *
 * This React component displays a 3D character model with interactive controls,
 * sophisticated lighting, and smooth animations. Users can rotate, zoom, and
 * pan around the model using mouse/touch controls.
 *
 * Key Features:
 * - Interactive OrbitControls for user manipulation
 * - Professional lighting setup with multiple light sources
 * - Environment mapping for realistic reflections
 * - Subtle automatic rotation animation
 * - Loading state with styled fallback
 * - Performance optimization through model preloading
 */

// Import React hooks for component state and references
import React, { Suspense, useRef } from "react";
// Import React Three Fiber core components for 3D rendering
import { Canvas, useFrame } from "@react-three/fiber";
// Import additional Three.js helpers and utilities
import {
  OrbitControls, // Mouse/touch controls for 3D camera movement
  useGLTF, // Hook for loading GLTF/GLB 3D model files
  PerspectiveCamera, // 3D camera component with perspective projection
  Environment, // Environment lighting and reflections component
} from "@react-three/drei";

/**
 * SpaceBoi - Internal component that renders the 3D character model
 *
 * Handles the actual 3D model loading, positioning, and animation.
 * This component focuses solely on the 3D object itself.
 */
function SpaceBoi() {
  // Load the GLTF model file and extract the 3D scene
  // Only destructuring 'scene' since this model doesn't have animations
  const { scene } = useGLTF("/images/space_boi.glb");

  // Create a reference to the 3D mesh for direct manipulation
  const meshRef = useRef();

  /**
   * useFrame - Animation loop that runs every frame (~60fps)
   * Adds subtle automatic rotation to make the model more dynamic
   *
   * @param {Object} state - Frame state containing time, camera, etc.
   */
  useFrame((state) => {
    // Only animate if the model has loaded and ref exists
    if (meshRef.current) {
      // Create gentle swaying rotation using sine wave
      // elapsedTime * 0.5 = medium speed oscillation
      // * 0.1 = small rotation angle (about 5.7 degrees max)
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Render the 3D model using primitive component
  // primitive allows us to use raw Three.js objects in React Three Fiber
  return (
    <primitive
      ref={meshRef} // Attach reference for animation control
      object={scene} // The loaded 3D model scene
      scale={[1, 1, 1]} // Scale: uniform 1x size (no scaling)
      position={[0, -2, 0]} // Position: centered X, lowered Y, centered Z
    />
  );
}

/**
 * Loader - Loading fallback component
 *
 * Displays a styled loading message while the 3D model downloads.
 * This provides user feedback and prevents blank screens during loading.
 */
function Loader() {
  return (
    <div
      style={{
        display: "flex", // Flexbox for easy centering
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100%", // Fill container height
        color: "#white", // White text (note: should be "white")
        fontSize: "18px", // Readable text size
      }}
    >
      Loading Space Boi...
    </div>
  );
}

/**
 * SpaceBoiModel - Main export component
 *
 * Creates the complete 3D scene with camera, lighting, controls,
 * and the character model. This is the component imported by pages.
 */
export default function SpaceBoiModel() {
  return (
    // Outer container - ensures proper sizing and centering
    <div
      style={{
        width: "100%", // Fill parent width
        height: "100%", // Fill parent height
        display: "flex", // Flexbox layout
        justifyContent: "center", // Center canvas horizontally
        alignItems: "center", // Center canvas vertically
      }}
    >
      {/* Three.js Canvas - creates WebGL rendering context */}
      <Canvas
        style={{
          width: "100%", // Canvas fills container
          height: "100%", // Canvas fills container
        }}
      >
        {/* PerspectiveCamera - defines the 3D viewpoint */}
        {/* makeDefault: makes this the main camera */}
        {/* position: camera location in 3D space [X, Y, Z] */}
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        {/* === LIGHTING SETUP === */}
        {/* Multiple light sources create realistic, professional lighting */}

        {/* Ambient Light - provides base illumination from all directions */}
        {/* Low intensity (0.4) prevents harsh shadows */}
        <ambientLight intensity={0.4} />

        {/* Directional Light - simulates sunlight from a specific direction */}
        {/* High intensity (1.0) provides main illumination */}
        {/* Position [10, 10, 5] = upper right front lighting */}
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Point Light - adds accent lighting from behind */}
        {/* Lower intensity (0.5) for subtle back-lighting effect */}
        {/* Position [-10, -10, -5] = lower left back */}
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Environment - provides realistic reflections and ambient lighting */}
        {/* "studio" preset gives professional photography studio lighting */}
        <Environment preset="studio" />

        {/* === 3D MODEL RENDERING === */}
        {/* Suspense handles async loading of the 3D model */}
        {/* fallback={null} shows nothing while loading (Canvas context) */}
        <Suspense fallback={null}>
          <SpaceBoi />
        </Suspense>

        {/* === INTERACTIVE CONTROLS === */}
        {/* OrbitControls - enables mouse/touch interaction with the 3D scene */}
        <OrbitControls
          enablePan={true} // Allow dragging to pan camera
          enableZoom={true} // Allow scroll wheel to zoom in/out
          enableRotate={true} // Allow click-drag to rotate around model
          minDistance={2} // Closest zoom level (prevents clipping)
          maxDistance={10} // Farthest zoom level (keeps model visible)
          autoRotate={false} // Disable automatic camera rotation
        />
      </Canvas>
    </div>
  );
}

/**
 * Model Preloading
 *
 * Starts downloading the 3D model file as soon as this module loads,
 * rather than waiting for the component to render. This significantly
 * improves perceived performance and reduces loading times.
 */
useGLTF.preload("/images/space_boi.glb");
