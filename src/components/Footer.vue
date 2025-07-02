<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <h3>Quan Kori</h3>
            <p class="footer-tagline">Senior Software Engineer & AWS Solutions Architect</p>
          </div>
          <div class="footer-stats">
            <div class="stat">
              <span class="stat-number">5+</span>
              <span class="stat-label">Years</span>
            </div>
            <div class="stat">
              <span class="stat-number">3</span>
              <span class="stat-label">Production Apps</span>
            </div>
            <div class="stat">
              <span class="stat-number">AWS</span>
              <span class="stat-label">Certified</span>
            </div>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Expertise</h4>
          <div class="tech-grid">
            <span class="tech-item">Node.js</span>
            <span class="tech-item">Golang</span>
            <span class="tech-item">Rust</span>
            <span class="tech-item">AWS</span>
            <span class="tech-item">Blockchain</span>
            <span class="tech-item">Microservices</span>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a href="#about" @click="scrollToSection('about')">About</a></li>
            <li><a href="#projects" @click="scrollToSection('projects')">Projects</a></li>
            <li><a href="https://github.com/quankori" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="mailto:contact@quankori.dev">Email</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Connect</h4>
          <div class="social-links">
            <a href="https://linkedin.com/in/quankori" target="_blank" rel="noopener noreferrer" class="social-link">
              <span class="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/quankori" target="_blank" rel="noopener noreferrer" class="social-link">
              <span class="social-icon">🐙</span>
              <span>GitHub</span>
            </a>
            <a href="https://twitter.com/quankori" target="_blank" rel="noopener noreferrer" class="social-link">
              <span class="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-info">
          <p>&copy; 2024 Quan Kori. All rights reserved.</p>
          <p>Built with Vue 3, TypeScript & Three.js</p>
        </div>
        <div class="footer-badges">
          <span class="badge">AWS SSA Certified</span>
          <span class="badge">Production Ready</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h4 {
  color: #f1f5f9;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.footer-logo h3 {
  color: #f1f5f9;
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-tagline {
  color: #94a3b8;
  font-size: 1rem;
  margin: 0 0 2rem 0;
  font-style: italic;
}

.footer-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  color: #60a5fa;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #64748b;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.tech-item {
  color: #cbd5e1;
  font-size: 0.9rem;
  padding: 0.5rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(15, 23, 42, 0.8);
  color: #60a5fa;
  border-color: rgba(96, 165, 250, 0.3);
  transform: translateY(-2px);
}

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #60a5fa;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 6px;
}

.social-link:hover {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
  transform: translateX(5px);
}

.social-icon {
  font-size: 1.2rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

.footer-info {
  display: flex;
  gap: 2rem;
}

.footer-info p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.footer-badges {
  display: flex;
  gap: 1rem;
}

.badge {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(96, 165, 250, 0.2);
  transition: all 0.3s ease;
}

.badge:hover {
  background: rgba(96, 165, 250, 0.2);
  border-color: rgba(96, 165, 250, 0.4);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-stats {
    justify-content: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .footer-badges {
    justify-content: center;
  }
}
</style> 