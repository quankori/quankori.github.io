# Developer Portfolio

A modern, technical portfolio built with Vue 3, TypeScript, and Three.js showcasing production experience in full-stack development, blockchain, and microservices.

## Features

- **Terminal-style Hero Section** - Interactive terminal with typing animations
- **3D Animated Background** - Particle system using Three.js
- **Dynamic Content Loading** - Skills, projects, and habits loaded from JSON
- **Technical Skill Showcase** - Code examples for each technology
- **Production Project Display** - Architecture diagrams and metrics
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - AOS (Animate On Scroll) integration

## Tech Stack

- **Frontend**: Vue 3 + TypeScript
- **Styling**: CSS3 with modern features (Grid, Flexbox, Backdrop-filter)
- **3D Graphics**: Three.js for animated background
- **Animations**: AOS library for scroll animations
- **Fonts**: Inter (UI) + Fira Code (Terminal/Code)
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── ThreeBackground.vue    # 3D animated background
│   ├── Header.vue             # Navigation header
│   ├── HeroSection.vue        # Terminal-style hero
│   ├── AboutSection.vue       # About me section
│   ├── SkillsSection.vue      # Technical skills with code examples
│   ├── ProjectsSection.vue    # Production projects with architecture
│   ├── HabitsSection.vue      # Interests and habits
│   └── ContactSection.vue     # Contact form and info
├── data/
│   ├── skills.json           # Skills data (dynamic)
│   ├── projects.json         # Projects data (dynamic)
│   └── habits.json           # Habits data (dynamic)
├── App.vue                   # Main app component
├── main.ts                   # App entry point
└── style.css                 # Global styles
```

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Build for production**:
   ```bash
   pnpm build
   ```

## Customization

### Personal Information
Update the following files with your information:

- `src/data/skills.json` - Your technical skills
- `src/data/projects.json` - Your production projects
- `src/data/habits.json` - Your interests and habits
- `src/components/HeroSection.vue` - Your name and title
- `src/components/AboutSection.vue` - Your about text
- `src/components/ContactSection.vue` - Your contact information

### Styling
The portfolio uses a dark theme with purple accents. Main colors:
- Primary: `#646cff`
- Secondary: `#535bf2`
- Background: Dark gradient
- Text: White and gray shades

### Adding New Sections
1. Create a new component in `src/components/`
2. Add it to `src/App.vue`
3. Update navigation in `src/components/Header.vue`

## Features in Detail

### Terminal Hero Section
- Interactive terminal with realistic styling
- Typing animation for commands
- Code window with syntax highlighting
- Floating statistics cards

### Skills Section
- Code examples for each technology
- Experience levels and years
- Certification display
- Technical proficiency indicators

### Projects Section
- Architecture diagrams
- Production metrics (uptime, users, scale)
- Technology stack breakdown
- Live project links

### 3D Background
- Particle system with Three.js
- Smooth animations
- Performance optimized
- Responsive to window resize

## Performance Optimizations

- Lazy loading of components
- Optimized Three.js rendering
- Efficient CSS animations
- Minimal bundle size with Vite
- Responsive images and assets

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this portfolio template for your own projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Vue 3 and modern web technologies.
