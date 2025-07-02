<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <div class="logo">
        <h2>Portfolio</h2>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="#about" @click="scrollToSection('about')">About Me</a></li>
          <li><a href="#experience" @click="scrollToSection('experience')">Experience</a></li>
          <li><a href="#projects" @click="scrollToSection('projects')">Projects</a></li>
        </ul>
      </nav>
      <div class="mobile-menu-toggle" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 1rem 0;
}

.header-scrolled {
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  color: #fff;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-list a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-list a:hover {
  color: #646cff;
}

.nav-list a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #646cff;
  transition: width 0.3s ease;
}

.nav-list a:hover::after {
  width: 100%;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}
</style> 