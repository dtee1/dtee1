<script setup>
import { ref } from 'vue'

// Portfolio data
const skills = ref([
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'C++', 'Shell']
  },
  {
    category: 'AI/ML',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'NLP', 'Computer Vision']
  },
  {
    category: 'Web Development',
    items: ['Vue.js', 'Flask', 'REST APIs']
  },
  {
    category: 'Tools',
    items: ['Docker', 'Git', 'Linux', 'Jenkins', 'Jira', 'MATLAB', 'Simulink']
  }
])

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
        <div class="navbar-brand">David Talson</div>
        <ul class="navbar-menu">
          <li><a href="#home" class="navbar-link">Home</a></li>
          <li><a href="#about" class="navbar-link">About</a></li>
          <li><a href="#skills" class="navbar-link">Skills</a></li>
          <li><a href="#projects" class="navbar-link">Projects</a></li>
          <li><a href="#contact" class="navbar-link">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="container">
        <h1 class="hero-title fade-in">Software Engineer | ML Engineer</h1>
        <p class="hero-subtitle fade-in">Building intelligent systems that bridge the gap between human intuition and machine precision</p>
        <div class="hero-cta fade-in">
          <a href="#projects" class="btn btn-primary">View Projects</a>
          <a href="#contact" class="btn btn-outline">Get in Touch</a>
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

    <!-- Skills Section -->
    <section id="skills" class="section">
      <div class="container">
        <h2 class="text-center">&gt; cat ./tech_stack.json</h2>
        <div class="skills-grid">
          <div v-for="skillSet in skills" :key="skillSet.category" class="card skill-category">
            <h4>{{ skillSet.category }}</h4>
            <div class="skill-tags">
              <span v-for="skill in skillSet.items" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
      <div class="container">
        <h2 class="text-center">&gt; ls ./projects</h2>
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
              <a :href="project.link" class="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
      <div class="container">
        <div class="contact-content">
          <h2>&gt; echo $COLLABORATION_STATUS</h2>
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

