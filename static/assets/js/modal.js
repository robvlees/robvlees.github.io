/**
 * Gallery Modal / Lightbox Script
 * Enhanced with category filtering, zoom, and download features
 */

(function() {
  'use strict';

  // Gallery state
  let galleryImages = [];
  let currentIndex = 0;
  let currentFilter = 'all';
  let filteredImages = [];

  // DOM Elements
  let modal, modalImg, modalCaption, modalClose, modalPrev, modalNext, modalDownload;

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    initGallery();
  });

  function initGallery() {
    // Build gallery images array
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryImages = Array.from(galleryItems).map(function(item) {
      return {
        src: item.getAttribute('data-src'),
        caption: item.getAttribute('data-caption'),
        description: item.getAttribute('data-description'),
        category: item.getAttribute('data-category'),
        alt: item.querySelector('img') ? item.querySelector('img').getAttribute('alt') : '',
        element: item
      };
    });

    filteredImages = [...galleryImages];

    // Initialize filter buttons
    initFilters();

    // Initialize modal
    initModal();

    // Add click handlers to gallery items
    galleryItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const galleryIndex = galleryImages.indexOf(item);
        // Find the index in filtered images
        const filteredIndex = filteredImages.findIndex(img => img.element === item);
        openModal(filteredIndex);
      });
    });
  }

  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active state
        filterBtns.forEach(function(b) {
          b.classList.remove('active');
        });
        this.classList.add('active');
        
        // Apply filter
        applyFilter(filter);
      });
    });
  }

  function applyFilter(filter) {
    currentFilter = filter;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filter === 'all') {
      filteredImages = [...galleryImages];
      galleryItems.forEach(function(item) {
        item.classList.remove('hidden');
      });
    } else {
      filteredImages = galleryImages.filter(function(img) {
        return img.category === filter;
      });
      
      galleryItems.forEach(function(item) {
        const category = item.getAttribute('data-category');
        if (category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    }
    
    // Reset to first filtered image if current index is out of range
    if (currentIndex >= filteredImages.length) {
      currentIndex = Math.max(0, filteredImages.length - 1);
    }
    
    // Update modal content if modal is open
    if (modal && modal.classList.contains('show')) {
      updateModalContent();
    }
  }

  function initModal() {
    // Create modal elements
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'gallery-modal';
    
    modal.innerHTML = `
      <button class="modal-nav modal-prev" id="modal-prev" title="Previous image">
        <svg viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="modal-nav modal-next" id="modal-next" title="Next image">
        <svg viewBox="0 0 24 24">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <button class="modal-download" id="modal-download" title="Download image">
        <svg viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </button>
      <button class="modal-close" id="modal-close" title="Close">&times;</button>
      <img class="modal-content" id="modal-img" src="" alt="">
      <div class="modal-caption" id="modal-caption"></div>
    `;
    
    document.body.appendChild(modal);
    
    // Get modal elements
    modalImg = document.getElementById('modal-img');
    modalCaption = document.getElementById('modal-caption');
    modalClose = document.getElementById('modal-close');
    modalPrev = document.getElementById('modal-prev');
    modalNext = document.getElementById('modal-next');
    modalDownload = document.getElementById('modal-download');
    
    // Add event listeners
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrevImage);
    modalNext.addEventListener('click', showNextImage);
    modalDownload.addEventListener('click', downloadImage);
    
    // Close on background click (but not on buttons or image)
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.classList.contains('modal-content')) {
        closeModal();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!modal.classList.contains('show')) return;
      
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    });
  }

  function openModal(index) {
    currentIndex = index;
    updateModalContent();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(function() {
      modalImg.classList.remove('zoomed');
      modalImg.style.transform = '';
    }, 300);
  }

  function updateModalContent() {
    const image = filteredImages[currentIndex];
    if (!image) return;
    
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    
    // Reset zoom state when changing images
    modalImg.classList.remove('zoomed');
    modalImg.style.transform = '';
    
    // Update caption
    modalCaption.innerHTML = `
      <div class="title">${image.caption}</div>
      ${image.description ? `<div class="description">${image.description}</div>` : ''}
      <div class="meta">Image ${currentIndex + 1} of ${filteredImages.length}</div>
    `;
  }

  function showPrevImage() {
    if (filteredImages.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateModalContent();
  }

  function showNextImage() {
    if (filteredImages.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateModalContent();
  }

  function downloadImage() {
    const image = filteredImages[currentIndex];
    if (!image) return;
    
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Image zoom functionality
  modalImg.addEventListener('click', function() {
    if (modalImg.classList.contains('zoomed')) {
      modalImg.classList.remove('zoomed');
      modalImg.style.transform = '';
    } else {
      modalImg.classList.add('zoomed');
      // Center the image initially
      modalImg.style.transform = 'scale(1)';
    }
  });

  // Pan functionality when zoomed
  let isPanning = false;
  let startX, startY;
  let translateX = 0, translateY = 0;

  modalImg.addEventListener('mousedown', function(e) {
    if (!modalImg.classList.contains('zoomed')) return;
    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isPanning || !modalImg.classList.contains('zoomed')) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    modalImg.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
  });

  document.addEventListener('mouseup', function() {
    isPanning = false;
  });

  // Touch support for mobile
  modalImg.addEventListener('touchstart', function(e) {
    if (!modalImg.classList.contains('zoomed')) return;
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
  });

  modalImg.addEventListener('touchmove', function(e) {
    if (!modalImg.classList.contains('zoomed')) return;
    e.preventDefault();
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;
    modalImg.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
  });

})();