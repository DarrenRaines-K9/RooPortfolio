# Decision Log

This file records architectural and implementation decisions using a list format.
2025-09-06 02:49:36 - Log of updates made.

## Decision: Astro.js as Primary Framework

**Rationale:**

- Optimal performance through static site generation with selective hydration
- Built-in support for multiple component frameworks (React, Vue, etc.)
- Excellent SEO capabilities for portfolio visibility
- Island architecture allows mixing static and dynamic content efficiently

**Implementation Details:**

- BaseLayout.astro provides consistent page structure
- React/JSX components used only for interactive Three.js elements
- Static pages generated for optimal loading speed

---

## Decision: Three.js for 3D Background Effects

**Rationale:**

- Industry-standard 3D graphics library with extensive ecosystem
- Excellent performance for web-based 3D rendering
- Rich post-processing effects pipeline available
- Strong community support and documentation

**Implementation Details:**

- React wrapper components for Astro compatibility
- GLTF model format (.glb) for optimized 3D assets
- Post-processing effects: Bloom, HueSaturation, BrightnessContrast, ToneMapping
- Client-side hydration with `client:load` directive

---

## Decision: CSS Custom Properties for Theming

**Rationale:**

- Consistent design system across all components
- Easy maintenance and updates of design tokens
- Native browser support without build tools
- Efficient theme switching implementation

**Implementation Details:**

- Variables defined in global.css for spacing, colors, typography
- Component-scoped styles using Astro's built-in CSS scoping
- Dark/light theme toggle through data attributes

---

## Decision: Modular Component Architecture

**Rationale:**

- Improved maintainability and code reusability
- Clear separation of concerns between different functionalities
- Easier testing and debugging of individual components
- Scalable structure for future feature additions

**Implementation Details:**

- Separate components for each 3D effect (SpaceBoiModel, PlantBackground)
- Shared layout components (BaseLayout, ThemeToggle)
- Component-specific styling co-located with components

---

## Decision: Lightbox Photo Gallery Implementation

**Rationale:**

- Enhanced user experience for viewing portfolio images
- No external dependencies required
- Responsive design with mobile optimization
- Accessible keyboard navigation support

**Implementation Details:**

- Pure JavaScript implementation using event delegation
- CSS Grid for responsive gallery layout
- Backdrop blur and overlay for focus enhancement
- Click-outside and escape key functionality

---

## Decision: Remove ProjectsBackground Component

**Rationale:**

- User requested cleanup of unused 3D background on projects page
- Simplified page performance and reduced bundle size
- Focused content presentation without visual distractions
- Maintained other 3D effects where appropriate

**Implementation Details:**

- Component completely removed from projects.astro
- Associated CSS styling cleaned up
- File deleted to maintain clean codebase

[2025-09-08 18:29:00] - Documented major architectural and implementation decisions made throughout project development
