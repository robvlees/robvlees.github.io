---
layout: default
title: Home
---

<div class="hero">
  <h1>Rob Vleeshouwers</h1>
  <p>Linux DevOps Engineer & Blender 3D Artist</p>
  <a href="/about/" class="btn">Learn More About Me</a>
</div>

<div class="content-wrapper">
  <div class="main-column">
    <section class="about-section">
      <h2>Welcome to My Portfolio</h2>
      
      <p>Hello, I'm a Linux DevOPS Engineer with a wide knowledge of IT infrastructures, security, application services and how to integrate different computing platforms with each other. Has overall responsibility for the "blueprint" or technology architecture that drives the other services. Good communication skills preferable in the language the customer demands is necessary to understand the customer needs and implement their requirements in a practical way rather than theoretical.</p>
      
      <p>I'm a strong supporter of the Open Source Community and was or still am active in several Blender communities. In my blog, I mainly write articles that are technical and open source oriented.</p>
      
      <h3>Open Source Should Be:</h3>
      
      <p><strong>Accessible Source Code:</strong> The core defining feature is the public availability of the software's source code, unlike proprietary or "closed-source" software where the code is kept secret.</p>
      
      <p><strong>Freedom to Use and Modify:</strong> Users have the right to run the software for any purpose and to change and adapt it to their requirements.</p>
      
      <p><strong>Community-Driven Development:</strong> Open source projects often thrive on a global community of developers and users who collaborate to improve, fix bugs, and add new features to the software.</p>
      
      <p><strong>Redistribution:</strong> The modified or unmodified software can be freely shared with others, often without cost.</p>
      
      <h3>My Creative Work</h3>
      
      <p>In my free time I like to be more creative and use <a href="https://blender.org" target="_blank" rel="noopener noreferrer">Blender 3D</a> software. It covers the entire 3D pipeline, including modeling, sculpting, animation, simulation, rendering, compositing, motion tracking, and video editing. Blender is a powerful, versatile tool used by both professional artists and enthusiasts due to its wide range of features and active development community.</p>
    </section>

    <section class="home-sections">
      <div class="card-grid">
        <div class="card">
          <h3>About</h3>
          <p>Learn more about my background in Linux DevOps and my creative work with Blender 3D.</p>
          <a href="/about/">Read More →</a>
        </div>
        
        <div class="card">
          <h3>Tutorials</h3>
          <p>Technical guides on Linux, DevOps, Blender, and more.</p>
          <a href="/tutorials/">View Tutorials →</a>
        </div>
        
        <div class="card">
          <h3>Portfolio</h3>
          <p>Check out my projects and work samples.</p>
          <a href="/portfolio/">View Portfolio →</a>
        </div>
        
        <div class="card">
          <h3>Gallery</h3>
          <p>My Blender 3D artwork collection.</p>
          <a href="/gallery/">View Gallery →</a>
        </div>
      </div>
    </section>
  </div>
  
  <aside class="sidebar">
    <div class="sidebar-section">
      <h3>Latest Posts</h3>
      {% for post in site.posts limit:3 %}
      <div class="sidebar-post">
        <h4><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h4>
        <p class="date">
          <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%B %-d, %Y" }}</time>
        </p>
      </div>
      {% endfor %}
      <p><a href="/blog/">View All Posts →</a></p>
    </div>
    
    <div class="sidebar-section">
      <h3>Categories</h3>
      <ul>
        <li><a href="/blog/">All Posts</a></li>
        <li><a href="/tutorials/">Tutorials</a></li>
      </ul>
    </div>
  </aside>
</div>