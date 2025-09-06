# Decision Log

This file records architectural and implementation decisions using a list format.
2025-09-06 15:45:11 - Log of updates made.

-

## Decision

-

## Rationale

-

## Implementation Details

-

[2025-09-06 15:47:42] - Decision to remove the "northernlights" concept and all associated files (src/scripts/northernLights.js, src/components/NorthernLightsThreeJS.astro, src/aurora-borealis-northern-lights-over-mountain-with-one-person-photo.jpg) from the project. Rationale: User preference to eliminate the concept entirely.

[2025-09-06 16:07:51] - Decision: Implement 3D 'Space Boi' model on homepage using Three.js and OrbitControls. Rationale: Three.js is a robust and widely adopted library for 3D rendering in the browser, providing necessary functionalities like GLB loading, scene management, and camera controls. OrbitControls specifically allows for zoom and rotation, and its `enablePan = false` setting ensures the model remains fixed as per user requirements. Implementation Details: A dedicated Astro component will host the canvas, and a separate JavaScript module will handle the Three.js scene setup, model loading, lighting, and control configuration.

[2025-09-06 16:18:34] - Decision: Reverted Three.js SpaceBoi3D implementation. Rationale: User requested complete removal of the 3D model implementation. Implementation Details: Removed SpaceBoi3D component, deleted script files, uninstalled Three.js dependency, and reverted all related changes.
