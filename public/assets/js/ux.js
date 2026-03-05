/**
 * UX Improvements
 * Back to top button, page transitions, and portfolio filtering
 */

(function() {
  'use strict';

  // ============================================
  // Portfolio Filtering System
  // ============================================
  
  function initPortfolioFiltering() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterBtns.length || !portfolioItems.length) return;
    
    // Handle filter button clicks
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filterValue = this.getAttribute('data-filter');
        
        // Update active button state
        filterBtns.forEach(function(b) {
          b.classList.remove('active');
        });
        this.classList.add('active');
        
        // Filter portfolio items
        portfolioItems.forEach(function(item) {
          var categories = item.getAttribute('data-categories');
          
          if (filterValue === 'all') {
            item.style.display = '';
            // Trigger animation for all items
            item.style.animation = 'none';
            item.offsetHeight; /* trigger reflow */
            item.style.animation = null;
          } else {
            if (categories && categories.includes(filterValue)) {
              item.style.display = '';
              // Trigger animation for filtered items
              item.style.animation = 'none';
              item.offsetHeight; /* trigger reflow */
              item.style.animation = null;
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // ============================================
  // Back to top button
  // ============================================
  
  var backToTopBtn = null;
  var scrollThreshold = 300; // px to show button

  /**
   * Create back to top button
   */
  function createBackToTopButton() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('title', 'Back to top');
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 4v10m6-6l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(btn);
    backToTopBtn = btn;
  }

  /**
   * Toggle back to top button visibility
   */
  function toggleBackToTopButton() {
    if (!backToTopBtn) return;
    
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  /**
   * Smooth scroll to top
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Initialize back to top functionality
   */
  function initBackToTop() {
    createBackToTopButton();
    
    // Show/hide on scroll
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Click to scroll to top
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Initial check
    toggleBackToTopButton();
  }

  /**
   * Initialize all UX improvements
   */
  function initUX() {
    // Portfolio filtering
    initPortfolioFiltering();
    
    // Back to top button
    initBackToTop();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUX);
  } else {
    initUX();
  }
})();