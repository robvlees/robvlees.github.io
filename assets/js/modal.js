/**
 * Image Modal / Lightbox
 * Click on gallery images to open in a larger modal view
 */

(function() {
  'use strict';

  // Create modal HTML structure
  function createModal() {
    // Check if modal already exists
    if (document.getElementById('imageModal')) {
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Image gallery modal');
    modal.setAttribute('tabindex', '-1');

    modal.innerHTML = `
      <span class="modal-close" aria-label="Close modal">&times;</span>
      <span class="modal-nav modal-prev" aria-label="Previous image">&#10094;</span>
      <span class="modal-nav modal-next" aria-label="Next image">&#10095;</span>
      <img class="modal-content" id="modalImage" alt="">
      <div class="modal-caption" id="modalCaption"></div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close on background click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
      if (modal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
          showPrevImage();
        } else if (e.key === 'ArrowRight') {
          showNextImage();
        }
      }
    });
  }

  // Gallery images array
  let galleryImages = [];
  let currentImageIndex = 0;

  // Open modal with image
  function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    if (!modal) {
      createModal();
    }

    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalEl = document.getElementById('imageModal');

    modalImg.src = imageSrc;
    modalCaption.textContent = caption || '';
    modalEl.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.remove('show');
      // Re-enable body scroll
      document.body.style.overflow = '';
    }
  }

  // Show previous image
  function showPrevImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentImageIndex];
    openModal(img.src, img.caption);
  }

  // Show next image
  function showNextImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const img = galleryImages[currentImageIndex];
    openModal(img.src, img.caption);
  }

  // Initialize gallery click handlers
  function initGallery() {
    createModal();

    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryImages = [];
    
    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        // Store image info
        galleryImages.push({
          src: img.src,
          caption: img.alt || '',
          index: index
        });

        // Add click handler
        item.addEventListener('click', function() {
          currentImageIndex = index;
          openModal(img.src, img.alt);
        });
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

  // Also re-initialize on page navigation (for Jekyll)
  document.addEventListener('page:load', initGallery);
  document.addEventListener('turbolinks:load', initGallery);

})();