import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Add Google Fonts
const interLink = document.createElement('link')
interLink.rel = 'stylesheet'
interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
document.head.appendChild(interLink)

// Add Fira Code font for code sections
const firaCodeLink = document.createElement('link')
firaCodeLink.rel = 'stylesheet'
firaCodeLink.href = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap'
document.head.appendChild(firaCodeLink)

createApp(App).mount('#app')
