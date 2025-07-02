<template>
  <section id="projects" class="projects" data-aos="fade-up">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Production Systems</h2>
        <p class="section-subtitle">Real-world applications I've architected and deployed</p>
      </div>
      
      <div class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.name"
          class="project-card"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div class="project-header">
            <div class="project-info">
              <h3 class="project-name">{{ project.name }}</h3>
              <div class="project-meta">
                <span class="company">{{ project.company }}</span>
                <span class="year">{{ project.year }}</span>
              </div>
            </div>
            <div class="project-status">
              <span class="status-badge">Production</span>
            </div>
          </div>
          
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-tech">
            <h4>Tech Stack</h4>
            <div class="tech-tags">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div class="project-metrics">
            <div class="metric">
              <span class="metric-label">Uptime</span>
              <span class="metric-value">99.9%</span>
            </div>
            <div class="metric">
              <span class="metric-label">Users</span>
              <span class="metric-value">10K+</span>
            </div>
            <div class="metric">
              <span class="metric-label">Scale</span>
              <span class="metric-value">High</span>
            </div>
          </div>
          
          <div class="project-actions">
            <a 
              :href="project.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              View Live
            </a>
            <button class="btn btn-secondary" @click="showDetails(project)">
              Project Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import projectsData from '../data/projects.json'

interface Project {
  name: string
  company: string
  description: string
  technologies: string[]
  year: string
  url: string
}

const projects = ref<Project[]>([])

const showDetails = (project: Project) => {
  // Placeholder for showing detailed project information
  alert(`Project details for ${project.name} would be shown here`)
}

onMounted(() => {
  projects.value = projectsData.projects
})
</script>

<style scoped>
.projects {
  padding: 100px 0;
  background: rgba(0, 0, 0, 0.5);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #646cff, #535bf2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.project-card:hover {
  border-color: #646cff;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(100, 108, 255, 0.2);
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-name {
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.project-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.company {
  color: #646cff;
  font-weight: 500;
  font-size: 0.9rem;
}

.year {
  color: #888;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.status-badge {
  background: #27ca3f;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-description {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.project-tech {
  margin-bottom: 2rem;
}

.project-tech h4 {
  color: #fff;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #ccc;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-label {
  color: #888;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.metric-value {
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  flex: 1;
  text-align: center;
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

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .project-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .project-metrics {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .project-actions {
    flex-direction: column;
  }
}
</style> 