/**
 * Cookie Consent Banner
 * Handles cookie consent with localStorage persistence
 */

(function() {
  'use strict';

  // Storage key for cookie consent
  var COOKIE_CONSENT_KEY = 'cookieConsent';
  
  // Consent levels
  var CONSENT_NONE = 'none';
  var CONSENT_ESSENTIAL = 'essential';
  var CONSENT_ALL = 'all';

  /**
   * Check if user has already given consent
   */
  function hasConsent() {
    return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
  }

  /**
   * Get current consent level
   */
  function getConsentLevel() {
    return localStorage.getItem(COOKIE_CONSENT_KEY) || CONSENT_NONE;
  }

  /**
   * Set consent level
   */
  function setConsent(level) {
    localStorage.setItem(COOKIE_CONSENT_KEY, level);
  }

  /**
   * Show the cookie consent banner
   */
  function showBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.add('active');
    }
  }

  /**
   * Hide the cookie consent banner
   */
  function hideBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.remove('active');
    }
  }

  /**
   * Handle accept all cookies
   */
  function acceptAll() {
    setConsent(CONSENT_ALL);
    hideBanner();
  }

  /**
   * Handle essential cookies only
   */
  function acceptEssential() {
    setConsent(CONSENT_ESSENTIAL);
    hideBanner();
  }

  /**
   * Handle customize preferences
   */
  function customize() {
    // For now, just accept essential and close
    acceptEssential();
    // In a more advanced version, this could open a modal with options
  }

  /**
   * Initialize cookie consent
   */
  function init() {
    // Don't show banner if consent already given
    if (hasConsent()) {
      return;
    }

    // Create banner element
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');

    banner.innerHTML = `
      <div class="cookie-consent-content">
        <h3 id="cookie-consent-title">We use cookies</h3>
        <p>This website uses cookies to enhance your browsing experience. We use essential cookies for site functionality and theme preferences. By using our site, you consent to our use of cookies.</p>
        <div class="cookie-consent-buttons">
          <button type="button" class="cookie-btn cookie-btn-essential" id="cookieEssential">Essential only</button>
          <button type="button" class="cookie-btn cookie-btn-customize" id="cookieCustomize">Customize</button>
          <button type="button" class="cookie-btn cookie-btn-accept" id="cookieAccept">Accept all</button>
        </div>
      </div>
      <button type="button" class="cookie-consent-close" id="cookieClose" aria-label="Close cookie banner">&times;</button>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    var acceptBtn = document.getElementById('cookieAccept');
    var essentialBtn = document.getElementById('cookieEssential');
    var customizeBtn = document.getElementById('cookieCustomize');
    var closeBtn = document.getElementById('cookieClose');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptAll);
    }
    if (essentialBtn) {
      essentialBtn.addEventListener('click', acceptEssential);
    }
    if (customizeBtn) {
      customizeBtn.addEventListener('click', customize);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        // Close without accepting - just hide for now
        hideBanner();
      });
    }

    // Show banner after a short delay for better UX
    setTimeout(showBanner, 500);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();