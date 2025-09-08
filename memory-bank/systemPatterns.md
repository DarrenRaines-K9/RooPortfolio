# System Patterns

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2025-09-06 02:49:41 - Log of updates made.

## Coding Patterns

**Component Structure**

- React/JSX components for interactive elements with Three.js integration
- Astro components for static content and layouts
- Client-side hydration using `client:load` directive for interactive components
- Modular component design (SpaceBoiModel, PlantBackground, etc.)

**CSS Architecture**

- CSS custom properties for consistent theming and spacing
- Component-scoped styles with Astro's built-in scoping
- Global styles for shared utilities and theme variables
- Responsive design using CSS Grid and Flexbox
- Dark/light theme support through data attributes

**Asset Management**

- Static assets in public/ directory for direct access
- Lazy loading for images using `loading="lazy"` attribute
- GLTF models (.glb format) for 3D assets
- Optimized image formats and sizes

## Architectural Patterns

**Page Structure Pattern**

- BaseLayout wrapper for consistent page structure and navigation
- Individual page files (index.astro, about.astro, projects.astro)
- Shared components directory for reusable elements

**3D Graphics Integration**

- Three.js components wrapped in React for Astro compatibility
- Post-processing effects pipeline (Bloom, HueSaturation, ToneMapping)
- Model loading with error handling and loading states
- Lighting setup with ambient and directional lights

**State Management**

- Client-side JavaScript for interactive features (lightbox, theme toggle)
- Event delegation patterns for gallery interactions
- Local storage for theme preference persistence

**Performance Patterns**

- Code splitting through Astro's island architecture
- Selective hydration of interactive components only
- Efficient Three.js scene setup with optimized rendering loops
- Asset preloading for critical 3D models

## Testing Patterns

**Development Testing**

- Visual testing through development server
- Browser developer tools for Three.js performance monitoring
- Responsive design testing across breakpoints
- Cross-browser compatibility verification

**Code Quality**

- TypeScript integration for type safety
- Consistent file naming conventions
- Modular component architecture for maintainability

[2025-09-08 18:28:00] - Documented current technical patterns and architectural decisions based on codebase analysis
