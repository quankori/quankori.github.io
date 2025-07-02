<template>
  <section class="hero" data-aos="fade-up">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <div class="terminal-header">
            <div class="terminal-buttons">
              <span class="terminal-btn close"></span>
              <span class="terminal-btn minimize"></span>
              <span class="terminal-btn maximize"></span>
            </div>
            <span class="terminal-title">developer@portfolio:~$</span>
          </div>
          
          <div class="terminal-content">
            <div class="command-line">
              <span class="prompt">$</span>
              <span class="command">whoami</span>
            </div>
            <div class="output">
              <h1 class="name">Your Name</h1>
              <p class="title">Senior Full Stack Engineer</p>
            </div>
            
            <div class="command-line">
              <span class="prompt">$</span>
              <span class="command">cat experience.txt</span>
            </div>
            <div class="output">
              <p class="experience">5+ years building production systems</p>
              <p class="experience">Node.js • Golang • Rust • Blockchain</p>
              <p class="experience">AWS Solutions Architect Associate</p>
            </div>
            
            <div class="command-line">
              <span class="prompt">$</span>
              <span class="command">ls production/</span>
            </div>
            <div class="output">
              <div class="project-list">
                <span class="project-item">HiYield/</span>
                <span class="project-item">RakkarDigital/</span>
                <span class="project-item">KardiaChain/</span>
              </div>
            </div>
            
            <div class="command-line typing">
              <span class="prompt">$</span>
              <span class="command" ref="typingCommand"></span>
              <span class="cursor">|</span>
            </div>
          </div>
        </div>
        
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <div class="stat-number">5+</div>
              <div class="stat-label">Years Experience</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🚀</div>
            <div class="stat-content">
              <div class="stat-number">3</div>
              <div class="stat-label">Production Apps</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔧</div>
            <div class="stat-content">
              <div class="stat-number">50+</div>
              <div class="stat-label">Projects Deployed</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="avatar-container">
          <div class="developer-avatar">
            <div class="avatar-circle">
              <div class="avatar-icon">👨‍💻</div>
            </div>
            <div class="avatar-glow"></div>
          </div>
          <div class="avatar-speech">
            <span>Hi! 👋</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const typingCommand = ref<HTMLElement>()

const commands = [
  'git status',
  'npm run build',
  'docker-compose up',
  'kubectl get pods',
  'terraform apply'
]

let currentCommand = 0
let currentChar = 0
let isDeleting = false

const typeText = () => {
  if (!typingCommand.value) return
  
  const command = commands[currentCommand]
  
  if (isDeleting) {
    typingCommand.value.textContent = command.substring(0, currentChar - 1)
    currentChar--
  } else {
    typingCommand.value.textContent = command.substring(0, currentChar + 1)
    currentChar++
  }
  
  let typeSpeed = isDeleting ? 50 : 100
  
  if (!isDeleting && currentChar === command.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false
    currentCommand = (currentCommand + 1) % commands.length
    typeSpeed = 500
  }
  
  setTimeout(typeText, typeSpeed)
}

onMounted(() => {
  setTimeout(typeText, 1000)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  z-index: 2;
}

.hero-text {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  margin-bottom: 2rem;
}

.terminal-header {
  background: #2d2d2d;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #444;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-btn.close { background: #ff5f56; }
.terminal-btn.minimize { background: #ffbd2e; }
.terminal-btn.maximize { background: #27ca3f; }

.terminal-title {
  color: #ccc;
  font-size: 0.9rem;
}

.terminal-content {
  padding: 1.5rem;
  background: #1e1e1e;
}

.command-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
}

.prompt {
  color: #27ca3f;
  font-weight: bold;
}

.command {
  color: #fff;
  font-weight: 500;
}

.cursor {
  color: #fff;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.output {
  margin-bottom: 1.5rem;
  padding-left: 1rem;
}

.name {
  font-size: 2.5rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.title {
  color: #646cff;
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.experience {
  color: #ccc;
  margin: 0.25rem 0;
  font-size: 0.95rem;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.project-item {
  color: #27ca3f;
  font-weight: 500;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(100, 108, 255, 0.1);
  border-color: #646cff;
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #646cff;
}

.stat-label {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatar-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.developer-avatar {
  position: relative;
}

.avatar-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-icon {
  font-size: 100px;
  color: #fff;
}

.avatar-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.avatar-speech {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: float 3s ease-in-out infinite;
}

.avatar-speech::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgba(255, 255, 255, 0.9);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-visual {
    order: -1;
  }
  
  .developer-avatar {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 768px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
  
  .name {
    font-size: 2rem;
  }
  
  .project-list {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 