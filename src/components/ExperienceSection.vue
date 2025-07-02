<template>
  <section id="experience" class="experience-section">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <h2>Professional Journey</h2>
        <p>My path through innovative companies and impactful projects</p>
      </div>

      <div class="experience-timeline">
        <div 
          v-for="(experience, index) in experiences" 
          :key="index"
          class="experience-item"
          :class="{ 'experience-right': index % 2 === 1 }"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <div class="experience-content">
            <div class="company-logo">
              <img :src="experience.logo" :alt="experience.company" />
            </div>
            <div class="experience-details">
              <h3 class="company-name">{{ experience.company }}</h3>
              <h4 class="position">{{ experience.position }}</h4>
              <p class="duration">{{ experience.duration }}</p>
              <p class="description">{{ experience.description }}</p>
              <div class="achievements">
                <h5>Key Achievements:</h5>
                <ul>
                  <li v-for="achievement in experience.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
              <div class="tech-stack">
                <span 
                  v-for="tech in experience.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
          <div class="timeline-marker">
            <div class="marker-dot"></div>
            <div class="marker-line"></div>
          </div>
        </div>
      </div>

      <div class="experience-stats" data-aos="fade-up" data-aos-delay="800">
        <div class="stat-card">
          <div class="stat-icon">🏢</div>
          <h3>3</h3>
          <p>Companies</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <h3>5+</h3>
          <p>Years Experience</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💼</div>
          <h3>3</h3>
          <p>Production Apps</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <h3>AWS</h3>
          <p>Certified</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Experience {
  company: string
  position: string
  duration: string
  description: string
  logo: string
  achievements: string[]
  technologies: string[]
}

const experiences = ref<Experience[]>([
  {
    company: "HiYield",
    position: "Senior Software Engineer",
    duration: "2023 - Present",
    description: "Leading development of high-performance financial applications and blockchain solutions.",
    logo: "/images/hiyield-logo.png", // You'll need to add this image
    achievements: [
      "Architected and deployed production-ready microservices",
      "Implemented blockchain integration for financial products",
      "Led team of 5 developers across multiple projects"
    ],
    technologies: ["Node.js", "Golang", "AWS", "Blockchain", "Microservices"]
  },
  {
    company: "Rakkar Digital",
    position: "Software Engineer",
    duration: "2021 - 2023",
    description: "Developed scalable web applications and API services for fintech solutions.",
    logo: "/images/rakkar-logo.png", // You'll need to add this image
    achievements: [
      "Built RESTful APIs serving 100K+ daily requests",
      "Optimized database performance by 40%",
      "Implemented CI/CD pipelines reducing deployment time by 60%"
    ],
    technologies: ["Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"]
  },
  {
    company: "KardiaChain",
    position: "Blockchain Developer",
    duration: "2020 - 2021",
    description: "Developed blockchain applications and smart contracts for membership systems.",
    logo: "/images/kardiachain-logo.png", // You'll need to add this image
    achievements: [
      "Developed smart contracts for membership management",
      "Integrated blockchain with traditional web applications",
      "Reduced transaction costs by 30% through optimization"
    ],
    technologies: ["Solidity", "Ethereum", "Web3.js", "Node.js", "React"]
  }
])
</script>

<style scoped>
.experience-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  position: relative;
  overflow: hidden;
}

.experience-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(255, 119, 198, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.section-header p {
  font-size: 1.2rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

.experience-timeline {
  position: relative;
  margin-bottom: 80px;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #60a5fa, #a78bfa);
  transform: translateX(-50%);
}

.experience-item {
  position: relative;
  margin-bottom: 60px;
  width: 100%;
}

.experience-content {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  width: calc(50% - 30px);
}

.experience-item.experience-right .experience-content {
  margin-left: auto;
}

.experience-content:hover {
  transform: translateY(-5px);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.company-logo {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-logo::before {
  content: '🏢';
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.experience-details {
  flex: 1;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 8px 0;
}

.position {
  font-size: 1.1rem;
  font-weight: 600;
  color: #60a5fa;
  margin: 0 0 8px 0;
}

.duration {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 16px 0;
  font-weight: 500;
}

.description {
  font-size: 1rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.achievements {
  margin-bottom: 20px;
}

.achievements h5 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.achievements ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.achievements li {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

.achievements li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #60a5fa;
  font-weight: bold;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(96, 165, 250, 0.2);
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: #60a5fa;
  border-radius: 50%;
  border: 3px solid #1e293b;
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.2);
}

.marker-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 40px;
  background: linear-gradient(180deg, #60a5fa, transparent);
}

.experience-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.stat-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.stat-card h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #60a5fa;
  margin: 0 0 8px 0;
}

.stat-card p {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .experience-section {
    padding: 60px 0;
  }

  .section-header h2 {
    font-size: 2.5rem;
  }

  .experience-timeline::before {
    left: 20px;
  }

  .experience-content {
    width: calc(100% - 40px);
    margin-left: 40px;
  }

  .experience-item.experience-right .experience-content {
    margin-left: 40px;
  }

  .timeline-marker {
    left: 20px;
  }

  .experience-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style> 