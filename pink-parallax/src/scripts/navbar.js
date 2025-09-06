// navbar.js: This script handles the functionality for the mobile navigation menu (hamburger icon).
// It toggles the visibility of the navigation menu and updates ARIA attributes for accessibility.
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.getElementById('main-navigation');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('active', isOpen); // Toggle 'active' class based on 'is-open'
      hamburger.setAttribute('aria-expanded', isOpen); // Update aria-expanded attribute
    });
  }
});
