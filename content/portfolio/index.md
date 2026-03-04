---
layout: page
title: Portfolio
subtitle: Selected projects and work samples
---

<div class="portfolio-intro">
  <div class="intro-card">
    <div class="card-icon">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    </div>
    <h2>Technical Expertise</h2>
    <p>As a Linux DevOPS Engineer, I specialize in designing and implementing robust IT infrastructures with a focus on security and integration.</p>
  </div>
  
  <div class="intro-card">
    <div class="card-icon">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>
        <path d="M7 3h3l5.86 5.86a2 2 0 0 0 1.42.58H21a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4.5"/>
        <path d="M15 15a2 2 0 0 0-2 2v4.54"/>
        <circle cx="10.88" cy="10.88" r="3.88"/>
      </svg>
    </div>
    <h2>Blender 3D Artistry</h2>
    <p>In my creative time, I explore the full 3D pipeline using Blender - a powerful tool for artistic expression and technical visualization.</p>
  </div>
</div>

## Core Competencies

<div class="skills-grid">
  <div class="skill-category">
    <h3>Linux & DevOps</h3>
    <ul>
      <li>RHEL, SUSE, Ubuntu, AIX</li>
      <li>Ansible, Puppet, Chef</li>
      <li>Git, Jenkins, CI/CD</li>
      <li>Docker, Kubernetes</li>
      <li>Grafana, Prometheus</li>
    </ul>
  </div>
  <div class="skill-category">
    <h3>Cloud & Infrastructure</h3>
    <ul>
      <li>Multi-cloud Architecture</li>
      <li>Container Orchestration</li>
      <li>Infrastructure as Code</li>
      <li>High Availability</li>
      <li>Security Implementation</li>
    </ul>
  </div>
  <div class="skill-category">
    <h3>3D Artistry</h3>
    <ul>
      <li>Modeling & Sculpting</li>
      <li>Animation & Simulation</li>
      <li>Rendering & Compositing</li>
      <li>Motion Tracking</li>
      <li>Video Editing</li>
    </ul>
  </div>
</div>

## Featured Projects

<div class="portfolio-grid">
  <div class="portfolio-item-card">
    <div class="item-icon">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    </div>
    <h3>Technical Projects</h3>
    <ul>
      <li>Infrastructure automation scripts</li>
      <li>Security configuration frameworks</li>
      <li>Cross-platform integration solutions</li>
    </ul>
  </div>
  
  <div class="portfolio-item-card">
    <div class="item-icon">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>
        <path d="M7 3h3l5.86 5.86a2 2 0 0 0 1.42.58H21a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4.5"/>
        <path d="M15 15a2 2 0 0 0-2 2v4.54"/>
        <circle cx="10.88" cy="10.88" r="3.88"/>
      </svg>
    </div>
    <h3>Artistic Creations</h3>
    <ul>
      <li>Landscape and environment renders</li>
      <li>Character and object modeling</li>
      <li>Complex animation sequences</li>
    </ul>
  </div>
</div>

<div class="portfolio-cta">
  <a href="/gallery/" class="btn">View Gallery</a>
  <span class="cta-text">to see more of my Blender work</span>
</div>

<style>
.portfolio-intro {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2.5rem 0;
}

.intro-card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.intro-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--card-hover-border);
}

.intro-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent-gradient);
  transition: all var(--transition-fast);
}

.intro-card:hover::before {
  width: 6px;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.skill-category {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all var(--transition-normal);
}

.skill-category:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--card-hover-border);
  transform: translateY(-2px);
}

.skill-category h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-gradient);
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-category li {
  padding: 0.375rem 0;
  padding-left: 1rem;
  position: relative;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.skill-category li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.625rem;
  width: 6px;
  height: 6px;
  background: var(--accent-primary);
  border-radius: 50%;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2.5rem 0;
}

.portfolio-item-card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.portfolio-item-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--card-hover-border);
}

.item-icon {
  color: var(--accent-primary);
  margin-bottom: 1rem;
  transition: transform var(--transition-normal);
}

.portfolio-item-card:hover .item-icon {
  transform: scale(1.1);
}

.portfolio-item-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-size: 1.25rem;
}

.portfolio-item-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.portfolio-item-card li {
  padding: 0.375rem 0;
  padding-left: 1rem;
  position: relative;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.portfolio-item-card li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.625rem;
  width: 6px;
  height: 6px;
  background: var(--accent-primary);
  border-radius: 50%;
}

.portfolio-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 140, 0, 0.05);
  border-radius: var(--radius-lg);
  border: 1px solid var(--card-border);
}

.cta-text {
  color: var(--text-secondary);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .portfolio-intro {
    grid-template-columns: 1fr;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-cta {
    flex-direction: column;
  }
}

[data-theme="light"] .intro-card,
[data-theme="light"] .skill-category,
[data-theme="light"] .portfolio-item-card,
[data-theme="light"] .portfolio-cta {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.1);
}
</style>
