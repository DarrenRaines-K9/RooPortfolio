/**
 * navbar.js - Mobile Navigation Menu Controller
 *
 * This JavaScript module handles the responsive navigation functionality,
 * specifically managing the mobile hamburger menu behavior. It provides
 * smooth transitions between desktop and mobile navigation states while
 * maintaining accessibility standards.
 *
 * Key Features:
 * - Hamburger menu toggle for mobile devices
 * - ARIA attributes for screen reader accessibility
 * - Smooth animations coordinated with CSS transitions
 * - Defensive programming with null checks
 * - Event-driven architecture for responsive behavior
 *
 * Technical Implementation:
 * - Uses modern DOM APIs (querySelector, classList)
 * - Follows progressive enhancement principles
 * - Coordinates with CSS media queries for responsive design
 * - Maintains semantic HTML structure
 */

/**
 * Initialize navigation functionality when DOM is ready
 *
 * DOMContentLoaded event ensures all HTML elements are parsed and
 * available before we try to access them. This prevents errors from
 * trying to manipulate elements that don't exist yet.
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Mobile Navigation Setup
   *
   * Gets references to the key elements needed for mobile menu functionality:
   * - hamburger: The button that toggles the mobile menu
   * - navMenu: The navigation menu that gets shown/hidden
   */
  
  // Get reference to hamburger menu button
  // Uses querySelector to find element with 'hamburger-menu' class
  const hamburger = document.querySelector('.hamburger-menu');
  
  // Get reference to main navigation menu
  // Uses getElementById for optimal performance (ID lookups are fastest)
  const navMenu = document.getElementById('main-navigation');

  /**
   * Defensive Programming Check
   *
   * Verify both elements exist before setting up event listeners.
   * This prevents JavaScript errors if the HTML structure changes
   * or if this script runs on a page without these elements.
   */
  if (hamburger && navMenu) {
    /**
     * Hamburger Menu Click Handler
     *
     * Sets up click event listener on the hamburger button.
     * When clicked, this toggles the mobile menu visibility
     * and updates accessibility attributes.
     */
    hamburger.addEventListener('click', () => {
      /**
       * Toggle Mobile Menu State
       *
       * classList.toggle() adds the class if it's not present,
       * removes it if it is present. Returns true if class was added,
       * false if it was removed. This creates a clean toggle behavior.
       */
      const isOpen = navMenu.classList.toggle('is-open');
      
      /**
       * Update Hamburger Button Visual State
       *
       * The 'active' class triggers CSS animations that transform
       * the hamburger icon (three lines) into an X shape when open.
       * The second parameter ensures the class is added/removed
       * based on the menu's open state.
       */
      hamburger.classList.toggle('active', isOpen);
      
      /**
       * Update Accessibility Attributes
       *
       * aria-expanded tells screen readers whether the menu is
       * currently expanded (visible) or collapsed (hidden).
       * This is crucial for users with disabilities who rely
       * on assistive technology.
       *
       * Values:
       * - "true": Menu is open and visible
       * - "false": Menu is closed and hidden
       */
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }
});

/**
 * How This Works With CSS
 *
 * This JavaScript coordinates with CSS rules in global.css:
 *
 * 1. By default, .main-nav is hidden on mobile (display: none)
 * 2. When 'is-open' class is added, CSS shows the menu (display: flex)
 * 3. The 'active' class on hamburger triggers icon animation
 * 4. CSS transitions provide smooth show/hide animations
 * 5. Media queries ensure this only affects mobile screens
 *
 * This separation of concerns keeps styling in CSS and behavior in JS.
 */

/**
 * Browser Compatibility
 *
 * This code uses modern JavaScript features that work in all current browsers:
 * - DOMContentLoaded: Supported since IE9+
 * - querySelector: Supported since IE8+
 * - classList.toggle: Supported since IE10+
 * - addEventListener: Supported since IE9+
 *
 * For older browsers, polyfills would be needed, but modern portfolios
 * typically target current browser versions.
 */
