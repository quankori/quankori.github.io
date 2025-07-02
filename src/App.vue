<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import ThreeBackground from './components/ThreeBackground.vue'
import Header from './components/Header.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import Footer from './components/Footer.vue'

onMounted(() => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  })
})
</script>

<template>
  <div id="app">
    <ThreeBackground />
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
    </main>
    <Footer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  line-height: 1.6;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
}

main {
  position: relative;
  z-index: 1;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: #646cff;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #535bf2;
}

/* Global animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Utility classes */
.text-gradient {
  background: linear-gradient(135deg, #646cff, #535bf2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive utilities */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>
