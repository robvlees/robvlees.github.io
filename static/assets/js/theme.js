/**
 * Theme Switcher
 * Handles light and dark theme switching with localStorage persistence
 */

(function() {
  'use strict';

  // Theme class names
  var THEME_LIGHT = '';
  var THEME_DARK = 'theme-dark';
  
  // Theme storage key
  var STORAGE_KEY = 'preferredTheme';
  
  // Default theme (dark)
  var DEFAULT_THEME = 'dark';
  
  // Theme toggle button
  var themeToggle = document.getElementById('themeToggle');
  
  // Icons
  var sunIcon = document.querySelector('.sun-icon');
  var moonIcon = document.querySelector('.moon-icon');

  /**
   * Get saved theme from localStorage or use default
   */
  function getSavedTheme() {
    var savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference as fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return DEFAULT_THEME;
  }

  /**
   * Apply theme to document
   */
  function applyTheme(theme) {
    var body = document.body;
    
    if (theme === 'dark') {
      body.classList.add(THEME_DARK);
      // Show sun when in dark mode (to indicate light mode is available)
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    } else {
      body.classList.remove(THEME_DARK);
      // Show moon when in light mode (to indicate dark mode is available)
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    var currentTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    // Initialize from localStorage or default
    var theme = localStorage.getItem(STORAGE_KEY);
    
    // If no saved theme, check system preference, then default
    if (theme === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
      } else {
        theme = 'dark'; // Default to dark
      }
    }
    
    applyTheme(theme);
    
    // Add event listener to toggle button
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();