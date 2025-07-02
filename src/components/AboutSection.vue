<template>
  <section id="about" class="about" data-aos="fade-up">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2 class="section-title">About Me</h2>
          <p class="about-description">
            I'm a passionate Full Stack Developer with over 5 years of experience specializing in 
            modern web technologies, blockchain development, and scalable microservices architecture. 
            My journey in software development has been driven by a deep curiosity for emerging 
            technologies and a commitment to building robust, user-centric applications.
          </p>
          
          <p class="about-description">
            As an AWS Solutions Architect Associate, I bring cloud-native expertise to every project, 
            ensuring scalable and secure solutions. My experience spans from traditional web applications 
            to cutting-edge blockchain platforms, with a particular focus on DeFi protocols and 
            smart contract development.
          </p>
          
          <div class="experience-highlights">
            <div class="highlight">
              <span class="highlight-number">5+</span>
              <span class="highlight-text">Years of Experience</span>
            </div>
            <div class="highlight">
              <span class="highlight-number">3</span>
              <span class="highlight-text">Production Applications</span>
            </div>
            <div class="highlight">
              <span class="highlight-number">50+</span>
              <span class="highlight-text">Projects Completed</span>
            </div>
          </div>
          
          <div class="about-actions">
            <button class="btn btn-primary" @click="scrollToSection('projects')">
              View My Work
            </button>
            <button class="btn btn-secondary" @click="downloadResume">
              Download Resume
            </button>
          </div>
        </div>
        
        <div class="about-visual">
          <div class="profile-card">
            <div class="profile-image">
              <div class="image-placeholder">
                <span>👨‍💻</span>
              </div>
            </div>
            <div class="profile-info">
              <h3>Full Stack Developer</h3>
              <p>Node.js • Golang • Rust • Blockchain</p>
              <div class="profile-badges">
                <span class="badge">AWS SSA</span>
                <span class="badge">DeFi Expert</span>
                <span class="badge">Microservices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const downloadResume = () => {
  // Placeholder for resume download functionality
  alert('Resume download functionality would be implemented here')
}
</script>

<style scoped>
.about {
  padding: 100px 0;
  background: rgba(0, 0, 0, 0.4);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  z-index: 2;
}

.section-title {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 2rem;
  font-weight: 700;
}

.about-description {
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.experience-highlights {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
}

.highlight {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.highlight-number {
  font-size: 2rem;
  font-weight: 800;
  color: #646cff;
  margin-bottom: 0.5rem;
}

.highlight-text {
  font-size: 0.9rem;
  color: #888;
  text-align: center;
}

.about-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #646cff, #535bf2);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(100, 108, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #646cff;
}

.btn-secondary:hover {
  background: #646cff;
  transform: translateY(-2px);
}

.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  max-width: 300px;
  transition: all 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: #646cff;
}

.profile-image {
  margin-bottom: 1.5rem;
}

.image-placeholder {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #646cff, #535bf2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 3rem;
}

.profile-info h3 {
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.profile-info p {
  color: #ccc;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.profile-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.badge {
  background: rgba(100, 108, 255, 0.2);
  color: #646cff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(100, 108, 255, 0.3);
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .experience-highlights {
    justify-content: center;
  }
  
  .about-actions {
    justify-content: center;
  }
}
</style> 