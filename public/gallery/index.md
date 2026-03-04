---
layout: default
title: Gallery
subtitle: Blender 3D Artwork
---

<div class="gallery-intro">
  <div class="intro-card">
    <div class="card-icon">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>
        <path d="M7 3h3l5.86 5.86a2 2 0 0 0 1.42.58H21a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4.5"/>
        <path d="M15 15a2 2 0 0 0-2 2v4.54"/>
        <circle cx="10.88" cy="10.88" r="3.88"/>
      </svg>
    </div>
    <h2>Blender 3D Gallery</h2>
    <p>A collection of my Blender 3D renders covering the entire 3D pipeline. High resolution versions available on <a href="https://www.flickr.com/photos/robvlees" target="_blank" rel="noopener noreferrer">Flickr</a> under Creative Commons License.</p>
  </div>
</div>

<div class="gallery-grid">
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/ant_mountain_1.jpg' | relative_url }}" alt="Ant Mountain final render">
    </div>
    <h3>Ant Mountain</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/ruin.jpg' | relative_url }}" alt="Ancient ruin final render">
    </div>
    <h3>Ancient Ruin</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/sunset.jpg' | relative_url }}" alt="Dawn final render">
    </div>
    <h3>Dawn</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/ruine_crop_4K.jpg' | relative_url }}" alt="Landscape final render">
    </div>
    <h3>Landscape</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/forest_house.jpg' | relative_url }}" alt="Forest House final render">
    </div>
    <h3>Forest House</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/forest.jpg' | relative_url }}" alt="Forest final render">
    </div>
    <h3>Forest</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/donut.jpg' | relative_url }}" alt="Donut final render">
    </div>
    <h3>Donut</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/sword.jpg' | relative_url }}" alt="Sword final render">
    </div>
    <h3>Sword</h3>
  </div>
  
  <div class="gallery-item">
    <div class="gallery-image-wrapper">
      <img src="{{ '/images/blender/apple_blossom.jpg' | relative_url }}" alt="Apple Blossom final render">
    </div>
    <h3>Apple Blossom</h3>
  </div>
</div>

<div class="gallery-info">
  <div class="info-card">
    <h3>Creation Process</h3>
    <p>All images were created using <a href="https://blender.org" target="_blank" rel="noopener noreferrer">Blender 3D</a> software, covering the entire 3D pipeline including modeling, sculpting, animation, simulation, rendering, compositing, motion tracking, and video editing.</p>
  </div>
  
  <div class="info-card">
    <h3>High Resolution</h3>
    <p>High resolution 4K versions are available on my <a href="https://www.flickr.com/photos/robvlees" target="_blank" rel="noopener noreferrer">Flickr</a> account under Creative Commons License.</p>
    <a href="https://www.flickr.com/photos/robvlees" target="_blank" rel="noopener noreferrer" class="btn">View on Flickr</a>
  </div>
</div>

<style>
.gallery-intro {
  margin: 2.5rem 0;
}

.intro-card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all var(--transition-normal);
}

.intro-card:hover {
  box-shadow: var(--shadow-xl);
  border-color: var(--card-hover-border);
}

.card-icon {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.intro-card h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.intro-card p {
  margin-bottom: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.intro-card a {
  color: var(--accent-primary);
  font-weight: 600;
}

.intro-card a:hover {
  color: var(--accent-secondary);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  animation: fadeIn 0.6s ease-out;
}

.gallery-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--card-hover-border);
}

.gallery-item h3 {
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 1rem;
  color: var(--text-primary);
  text-align: center;
  font-weight: 500;
}

.gallery-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.gallery-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease;
}

.gallery-item:hover .gallery-image-wrapper img {
  transform: scale(1.1);
}

.gallery-item:hover h3 {
  color: var(--accent-primary);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gallery-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2.5rem;
}

.info-card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all var(--transition-normal);
}

.info-card:hover {
  box-shadow: var(--shadow-xl);
  border-color: var(--card-hover-border);
}

.info-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--accent-primary);
  font-size: 1.25rem;
  border-bottom: 2px solid var(--card-border);
  padding-bottom: 0.5rem;
}

.info-card p {
  margin-bottom: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.info-card a {
  color: var(--accent-primary);
  font-weight: 600;
}

.info-card a:hover {
  color: var(--accent-secondary);
}

@media (max-width: 768px) {
  .gallery-info {
    grid-template-columns: 1fr;
  }
}

[data-theme="light"] .intro-card,
[data-theme="light"] .info-card {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.1);
}
</style>
