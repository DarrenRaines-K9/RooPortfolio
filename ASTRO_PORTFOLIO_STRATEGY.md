# Astro Project Strategy Guide: About Me & Projects with Dark Mode

## 1. Project Initialization

The first step is to set up your Astro project. Astro provides a great CLI tool for this.

### 1.1 Install Node.js and npm/yarn

Ensure you have Node.js (LTS version recommended) and a package manager (npm or yarn) installed on your system.

### 1.2 Create a New Astro Project

Open your terminal and navigate to the directory where you want to create your project. Then run the following command:

```bash
npm create astro@latest
```

The CLI will prompt you with several questions:

- **Where should we create your new project?**
  - current directory
- **How would you like to start your new project?**
  - Choose `Empty` for a clean start.
- **Install dependencies?**
  - Type `y` for yes.
- **Do you plan to write TypeScript?**
  - Choose `No` for simplicity, or `Yes` if you want to learn TypeScript.
- **Initialize a new git repository?**
  - Type `n` for no.

After the installation, navigate into project directory if not already there:

```bash
cd PortfolioRoo
```

### 1.3 Run the Development Server

To ensure everything is set up correctly, run the development server:

```bash
npm run dev
```

You should see a message indicating that your server is running, usually at `http://localhost:4321/`. Open this URL in your browser. You'll see a blank page, which is expected for an empty project.

## 2. Core Page Creation

Now, let's create the essential pages for your portfolio. Astro uses `.astro` files for pages, which live in the [`src/pages/`](src/pages/) directory.

### 2.1 Create the Home Page (`index.astro`)

Every Astro project needs an `index.astro` file to serve as the root of your website.

1.  Create a new file: [`src/pages/index.astro`](src/pages/index.astro)
2.  Add basic content:

### 2.2 Create the About Me Page (`about.astro`)

1.  Create a new file: [`src/pages/about.astro`](src/pages/about.astro)
2.  Add content for your "About Me" page:

### 2.3 Create the Projects Page (`projects.astro`)

1.  Create a new file: [`src/pages/projects.astro`](src/pages/projects.astro)
2.  Add content for your "Projects" page:

## 3. Layout Component for Reusability

To avoid repeating `<html>`, `<head>`, and `<body>` tags on every page, create a layout component.

### 3.1 Create a Layout Component

1.  Create a new directory: [`src/layouts/`](src/layouts/)
2.  Create a new file: [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro)
3.  Add the following content:

### 3.2 Update Pages to Use the Layout

Now, modify your `index.astro`, `about.astro`, and `projects.astro` files to use this layout.

**[`src/pages/index.astro`](src/pages/index.astro)**

**[`src/pages/about.astro`](src/pages/about.astro)**

**[`src/pages/projects.astro`](src/pages/projects.astro)**

## 4. Dark Mode Implementation

Implementing dark mode typically involves using CSS variables and a JavaScript toggle.

### 4.1 Global Styles with CSS Variables

1.  Create a new directory: [`src/styles/`](src/styles/)
2.  Create a new file: [`src/styles/global.css`](src/styles/global.css)
3.  Add the following CSS. This sets up CSS variables for colors and applies them based on a `data-theme` attribute on the `html` tag.

### 4.2 Theme Toggle Component

You'll need a small JavaScript file to handle the theme switching. Astro can include client-side JavaScript.

1.  Create a new directory: [`src/components/`](src/components/)
2.  Create a new file: [`src/components/ThemeToggle.astro`](src/components/ThemeToggle.astro)
3.  Add the following content:

    - `is:inline` tells Astro to include the script directly in the HTML, which is good for small, critical scripts like theme toggles.
    - The script checks `localStorage` for a saved theme preference and falls back to the system's preferred color scheme.

### 4.3 Integrate the Theme Toggle

Now, add the `ThemeToggle` component to your `BaseLayout.astro` so it appears on all pages.

**[`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro)**

## 5. Final Review and Next Steps

### 5.1 Verify Functionality

- Run `npm run dev` again.
- Check all pages (`/`, `/about`, `/projects`) to ensure navigation works.
- Test the "Toggle Dark Mode" button. It should switch between light and dark themes, and the preference should persist if you refresh the page.

### 5.2 Customization and Content

- Replace `[Your Name]` and project placeholders with your actual information.
- Add more detailed content to your "About Me" and "Projects" pages.
- Experiment with the CSS in [`src/styles/global.css`](src/styles/global.css) to customize the look and feel.

### 5.3 Deployment (Optional)

Once you're happy with your site, you can build it for deployment:

```bash
npm run build
```

This will create a `dist/` directory with all the static files ready to be hosted on any static site hosting service (e.g., Netlify, Vercel, GitHub Pages).
