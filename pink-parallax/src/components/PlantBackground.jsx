/**
 * PlantBackground.jsx - 3D Animated Plant Background Component
 *
 * This React component creates an interactive 3D background featuring an animated
 * carnivorous plant model. It uses Three.js (via React Three Fiber) to render
 * the 3D scene and positions itself dynamically behind the main content.
 *
 * Key Features:
 * - Loads and displays a GLTF 3D model with animations
 * - Automatically plays all available animations from the model
 * - Adds subtle floating/swaying motion via useFrame hook
 * - Positions itself to match the main content container
 * - Responsive to window scroll and resize events
 * - Non-interactive (pointer-events: none) to allow clicks through to content
 */

// Import React hooks for component lifecycle and refs
import React, { Suspense, useRef } from "react";
// Import React Three Fiber for Three.js integration with React
import { Canvas, useFrame } from "@react-three/fiber";
// Import Three.js utilities from Drei (helper library for R3F)
import {
  useGLTF, // Hook for loading GLTF/GLB 3D models
  useAnimations, // Hook for managing 3D model animations
  PerspectiveCamera, // Camera component for 3D scene
  Environment, // Environment lighting component
} from "@react-three/drei";

/**
 * PlantModel - Internal component that handles the 3D plant model
 *
 * This component is responsible for:
 * - Loading the 3D model file
 * - Setting up and playing animations
 * - Adding custom floating animation via useFrame
 */
function PlantModel() {
  // Load the GLTF model and extract scene geometry and animations
  // The model file is stored in the public/images directory
  const { scene, animations } = useGLTF(
    "/images/cartoon_flesh-eating_plant_with_animations.glb"
  );

  // Create a ref to access the 3D mesh for animations and transformations
  const meshRef = useRef();

  // Extract animation actions from the loaded animations
  // Actions are Three.js AnimationAction objects that control playback
  const { actions } = useAnimations(animations, meshRef);

  // useEffect hook runs after component mounts and when dependencies change
  // Here it starts all animations found in the GLTF file
  React.useEffect(() => {
    // Check if we have any animations to play
    if (actions && Object.keys(actions).length > 0) {
      // Loop through all available animations and start them
      // This automatically plays any embedded animations from the 3D model
      Object.values(actions).forEach((action) => {
        // Safety check - ensure the action exists before playing
        if (action) {
          action.play(); // Start the animation loop
        }
      });
    }
  }, [actions]); // Re-run when actions change (model loads)

  /**
   * useFrame hook - runs on every frame (60fps typically)
   * Adds custom procedural animation on top of the model's built-in animations
   *
   * @param {Object} state - Contains elapsed time, clock, camera, etc.
   */
  useFrame((state) => {
    // Only animate if the mesh reference exists (model is loaded)
    if (meshRef.current) {
      // Add subtle left-right swaying motion using sine wave
      // elapsedTime * 0.2 = slow oscillation, * 0.05 = small amplitude
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;

      // Add vertical floating motion with different frequency
      // elapsedTime * 0.3 = slightly faster than rotation, * 0.1 = small movement
      // - 1 offsets the position downward by 1 unit
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1 - 1;
    }
  });

  // Return the 3D object to be rendered
  // primitive component renders raw Three.js objects in React Three Fiber
  return (
    <primitive
      ref={meshRef} // Attach our ref for animation control
      object={scene} // The loaded 3D scene/model
      scale={[1, 2, 2]} // Scale: normal width, 2x height and depth
      position={[0, -2, 3]} // Position: centered X, down 2 units Y, back 3 units Z
    />
  );
}

/**
 * Loader - Fallback component shown while the 3D model loads
 * Returns null to avoid HTML elements inside Canvas (Three.js context)
 */
function Loader() {
  return null; // Canvas context can't render HTML, so we return nothing
}

/**
 * PlantBackground - Main export component
 *
 * This component creates the full 3D background with proper positioning
 * and responsive behavior. It dynamically positions itself to match the
 * main content area and updates on scroll/resize events.
 */
export default function PlantBackground() {
  // Ref to the container div for dynamic positioning
  const containerRef = useRef(null);

  // Effect hook to set up dynamic positioning and event listeners
  React.useEffect(() => {
    /**
     * updatePosition - Function to position the background container
     * This ensures the 3D background always matches the main content area
     */
    const updatePosition = () => {
      // Find the main content container in the DOM
      const mainContainer = document.querySelector("main");

      // Proceed only if both containers exist
      if (mainContainer && containerRef.current) {
        // Get the position and dimensions of the main container
        const rect = mainContainer.getBoundingClientRect();
        // Get reference to our background container
        const containerElement = containerRef.current;

        // Position the background to perfectly overlay the main container
        containerElement.style.position = "absolute"; // Position absolutely
        containerElement.style.top = `${rect.top + window.scrollY}px`; // Match top + scroll offset
        containerElement.style.left = `${rect.left + window.scrollX}px`; // Match left + scroll offset
        containerElement.style.width = `${rect.width}px`; // Match width exactly
        containerElement.style.height = `${rect.height}px`; // Match height exactly
      }
    };

    // Set initial position when component mounts
    updatePosition();

    // Add event listeners to update position when user scrolls or resizes window
    // This ensures the background stays aligned with the main content
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    // Cleanup function: remove event listeners when component unmounts
    // This prevents memory leaks and unnecessary event handler calls
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []); // Empty dependency array = run once on mount, cleanup on unmount

  // Render the background container with 3D Canvas
  return (
    <div
      ref={containerRef} // Attach ref for positioning control
      style={{
        position: "absolute", // Positioned absolutely for overlay
        top: 0, // Default position (overridden by updatePosition)
        left: 0, // Default position (overridden by updatePosition)
        width: "100%", // Default size (overridden by updatePosition)
        height: "100%", // Default size (overridden by updatePosition)
        zIndex: 0, // Behind other content (main content has higher z-index)
        overflow: "hidden", // Prevent 3D content from spilling outside bounds
        pointerEvents: "none", // Critical: allows mouse clicks to pass through to main content
        borderRadius: "8px", // Match the rounded corners of main container
      }}
    >
      {/* Three.js Canvas - creates WebGL context for 3D rendering */}
      <Canvas>
        {/* Ambient light - provides base illumination for all objects */}
        <ambientLight intensity={1} />

        {/* Suspense wrapper handles loading states for async 3D model */}
        {/* Shows Loader component while PlantModel is loading */}
        <Suspense fallback={<Loader />}>
          <PlantModel />
        </Suspense>

        {/* Fog effect adds atmospheric depth to the 3D scene */}
        {/* attach="fog" connects this to the Three.js scene's fog property */}
        {/* args: [color, near distance, far distance] */}
        <fog attach="fog" args={["#000000", 8, 20]} />
      </Canvas>
    </div>
  );
}

/**
 * Preload the GLTF model for better performance
 * This starts downloading the 3D model file immediately when this module loads,
 * rather than waiting for the component to render. This reduces loading time
 * and creates a smoother user experience.
 */
useGLTF.preload("/images/cartoon_flesh-eating_plant_with_animations.glb");
