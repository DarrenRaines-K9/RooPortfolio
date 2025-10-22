# TODO List: Astro Portfolio Implementation

**Project Location:** `/pink-parallax/` subdirectory
**Status:** Most core features implemented ✓

## Phase 1: Project Setup ✓ COMPLETE
- [x] Verify Node.js and npm/yarn are installed (Node v22.11.0, npm 11.5.1)
- [x] Run `npm create astro@latest` if starting fresh (or skip if project exists)
- [x] Navigate to project directory (pink-parallax/)
- [ ] Run `npm run dev` to verify development server works
- [ ] Confirm site loads at `http://localhost:4321/`

## Phase 2: Core Page Creation ✓ COMPLETE
- [x] Create `src/pages/` directory if it doesn't exist
- [x] Create `src/pages/index.astro` (home page)
- [x] Add basic HTML structure and content to home page
- [x] Create `src/pages/about.astro` (about me page)
- [x] Add "About Me" content and information
- [x] Create `src/pages/projects.astro` (projects showcase page)
- [x] Add projects content with placeholder project listings

## Phase 3: Layout Component Setup ✓ COMPLETE
- [x] Create `src/layouts/` directory
- [x] Create `src/layouts/BaseLayout.astro`
- [x] Add reusable HTML structure (html, head, body tags)
- [x] Add navigation links between pages in layout
- [x] Update `src/pages/index.astro` to use BaseLayout
- [x] Update `src/pages/about.astro` to use BaseLayout
- [x] Update `src/pages/projects.astro` to use BaseLayout
- [ ] Test navigation between all pages

## Phase 4: Dark Mode Implementation ✓ COMPLETE
- [x] Create `src/styles/` directory
- [x] Create `src/styles/global.css`
- [x] Define CSS variables for light theme colors
- [x] Define CSS variables for dark theme colors
- [x] Set up `data-theme` attribute styling logic
- [x] Create `src/components/` directory
- [x] Create `src/components/ThemeToggle.astro`
- [x] Add theme toggle button HTML
- [x] Add inline JavaScript for theme switching
- [x] Implement localStorage persistence for theme preference
- [x] Add system color scheme detection fallback
- [x] Import ThemeToggle component in `src/layouts/BaseLayout.astro`
- [x] Import global.css in BaseLayout

## Phase 5: Testing & Verification
- [ ] Run `npm run dev` and verify all pages load
- [ ] Test home page (`/`) displays correctly
- [ ] Test about page (`/about`) displays correctly
- [ ] Test projects page (`/projects`) displays correctly
- [ ] Test navigation links work between all pages
- [ ] Test dark mode toggle switches themes
- [ ] Test theme preference persists on page refresh
- [ ] Test theme preference persists across different pages

## Phase 6: Content Customization
- [ ] Replace `[Your Name]` placeholder with actual name
- [ ] Add detailed personal information to About page
- [ ] Add real project descriptions and details
- [ ] Add project links or demos if applicable
- [ ] Customize colors in `src/styles/global.css`
- [ ] Adjust fonts and typography to preference
- [ ] Add any additional styling or visual polish

## Phase 7: Build & Deployment (Optional)
- [ ] Run `npm run build` to create production build
- [ ] Verify `dist/` directory is created
- [ ] Test production build locally if needed
- [ ] Choose hosting service (Netlify, Vercel, GitHub Pages, etc.)
- [ ] Deploy site to chosen hosting platform
- [ ] Verify deployed site works correctly
- [ ] Test all functionality on live site

## Notes
- Each phase builds on the previous one
- Don't skip phases unless you're sure the step is already complete
- Test frequently during development
- Commit to git after completing each phase (if using version control)
