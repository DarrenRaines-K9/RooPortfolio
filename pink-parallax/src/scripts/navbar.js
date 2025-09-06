document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.getElementById('main-navigation');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      // Optional: Add animation for hamburger icon
      hamburger.classList.toggle('active');
    });
  }
});
