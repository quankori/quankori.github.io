<template>
  <div ref="container" class="three-background"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLDivElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let animationId: number

const init = () => {
  if (!container.value) return

  // Scene setup
  scene = new THREE.Scene()
  
  // Camera setup
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  // Create particles
  const geometry = new THREE.BufferGeometry()
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 20

    colors[i] = Math.random() * 0.5 + 0.5
    colors[i + 1] = Math.random() * 0.5 + 0.5
    colors[i + 2] = Math.random() * 0.8 + 0.2
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (particles) {
    particles.rotation.x += 0.001
    particles.rotation.y += 0.002
  }

  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!container.value || !camera || !renderer) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  if (container.value && renderer) {
    container.value.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
.three-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style> 