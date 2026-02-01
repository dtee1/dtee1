<script setup>
import { ref, onMounted } from 'vue'
import { Github, Linkedin, Laptop, Mail, Menu, X } from 'lucide-vue-next'

const displayedText = ref('')
const fullText = ref('David Talson')
const typingSpeed = 80
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  let index = 0
  const typeText = () => {
    if (index < fullText.value.length) {
      displayedText.value += fullText.value.charAt(index)
      index++
      setTimeout(typeText, typingSpeed)
    }
  }
  typeText()

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  // Observe all sections and cards
  document.querySelectorAll('.section, .project-card, .about-content').forEach((el) => {
    el.classList.add('fade-in-scroll')
    observer.observe(el)
  })
})

const projects = ref([
  {
    title: 'AI/ML Systems',
    description: 'Building intelligent systems using machine learning and deep learning frameworks.',
    tags: ['PyTorch', 'TensorFlow', 'Python'],
    link: '#'
  },
  {
    title: 'Full Stack Applications',
    description: 'Creating scalable web applications with modern frameworks and best practices.',
    tags: ['Vue.js', 'Flask', 'REST APIs'],
    link: '#'
  },
  {
    title: 'Automation & DevOps',
    description: 'Implementing CI/CD pipelines and automation tools for efficient workflows.',
    tags: ['Docker', 'Jenkins', 'Linux'],
    link: '#'
  }
])
</script>

<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="container navbar-container">
        <a href="#home" class="navbar-brand">DavidTalson</a>
        
        <!-- Desktop Menu -->
        <ul class="navbar-menu navbar-menu-desktop">
          <li><a href="#about" class="navbar-link">About</a></li>
          <li><a href="#projects" class="navbar-link">Projects</a></li>
          <li><a href="#contact" class="navbar-link">Contact</a></li>
        </ul>
        
        <!-- Mobile Burger Button -->
        <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="Toggle menu">
          <Menu v-if="!mobileMenuOpen" :size="28" :stroke-width="2" />
          <X v-else :size="28" :stroke-width="2" />
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div class="navbar-menu-mobile" :class="{ 'navbar-menu-mobile-open': mobileMenuOpen }">
        <ul class="navbar-menu-mobile-list">
          <li><a href="#about" class="navbar-link" @click="closeMobileMenu">About</a></li>
          <li><a href="#projects" class="navbar-link" @click="closeMobileMenu">Projects</a></li>
          <li><a href="#contact" class="navbar-link" @click="closeMobileMenu">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="container">
        <h1 class="hero-title fade-in typing-animation">{{ displayedText }}<span class="typing-cursor">_</span></h1>
        <h4 class="hero-title fade-in">Software Engineer</h4>
        <p class="hero-subtitle fade-in">Building intelligent systems that bridge the gap between human intuition and machine precision</p>
        <div class="hero-cta fade-in">
          <a href="#projects" class="btn btn-outline"> View Projects</a>
          <a href="#contact" class="btn btn-outline">Get in Touch</a>
        </div>
        <div class="hero-social fade-in">
          <a href="https://github.com/dtee1" target="_blank" class="hero-social-icon" aria-label="GitHub">
            <Github :size="32" :stroke-width="1.5" />
          </a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" class="hero-social-icon" aria-label="LinkedIn">
            <Linkedin :size="32" :stroke-width="1.5" />
          </a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section">
      <div class="container">
        <div class="about-content">
          <h2 class="text-center">&gt; whoami</h2>
          <p>
            I'm a <strong>Software Engineer</strong> with a passion for building intelligent systems and solving complex problems through code and machine learning. My current focus? Creating <strong>AI-powered applications</strong> that leverage machine learning to deliver real-world solutions.
          </p>
          <p>
            When I'm not writing code or training models, you'll find me exploring new technologies, optimizing algorithms, or diving deep into the latest ML research.
          </p>
          <p class="text-accent">
            <strong>Current Quest:</strong> Building the future, one commit at a time.
          </p>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
      <div class="container">
        <h3 class="text-center">&gt; ls ./projects</h3>
        <div class="projects-grid">
          <div v-for="project in projects" :key="project.title" class="card project-card">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="project-tag">
                {{ tag }}
              </span>
            </div>
            <div class="project-links">
              <a :href="project.link" class="btn btn-outline">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
      <div class="container">
        <div class="contact-content">
          <h3>&gt; echo $COLLABORATION_STATUS</h3>
          <p>Let's build something intelligent together.</p>
          <div class="contact-links">
            <a href="https://github.com/dtee1" target="_blank" class="contact-link">
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-content">
        <p class="footer-text">
          "Any sufficiently advanced technology is indistinguishable from magic." - Arthur C. Clarke
        </p>
        <p class="footer-text mt-sm">
          © {{ new Date().getFullYear() }} David Talson. Building the future, one commit at a time.
        </p>
      </div>
    </footer>
  </div>
</template>

