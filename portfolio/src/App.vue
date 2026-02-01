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

// AI Influencers - Top researchers, contributors, and companies to follow
const aiInfluencers = ref({
  researchers: [
    {
      name: 'Andrej Karpathy',
      title: 'AI Researcher, Former Tesla AI Director',
      expertise: ['Deep Learning', 'Computer Vision', 'LLMs'],
      links: {
        github: 'https://github.com/karpathy',
        twitter: 'https://twitter.com/karpathy'
      }
    },
    {
      name: 'Andrew Ng',
      title: 'Co-founder of Coursera, Stanford Professor',
      expertise: ['Machine Learning', 'AI Education', 'Deep Learning'],
      links: {
        twitter: 'https://twitter.com/AndrewYNg',
        website: 'https://www.andrewng.org/'
      }
    },
    {
      name: 'Yann LeCun',
      title: 'Chief AI Scientist at Meta, Turing Award Winner',
      expertise: ['Deep Learning', 'Computer Vision', 'Neural Networks'],
      links: {
        twitter: 'https://twitter.com/ylecun',
        website: 'http://yann.lecun.com/'
      }
    },
    {
      name: 'Fei-Fei Li',
      title: 'Stanford Professor, AI4ALL Co-founder',
      expertise: ['Computer Vision', 'AI Ethics', 'Human-Centered AI'],
      links: {
        twitter: 'https://twitter.com/drfeifei',
        website: 'https://profiles.stanford.edu/fei-fei-li'
      }
    }
  ],
  contributors: [
    {
      name: 'François Chollet',
      title: 'Creator of Keras',
      expertise: ['Deep Learning Frameworks', 'AI Research'],
      links: {
        github: 'https://github.com/fchollet',
        twitter: 'https://twitter.com/fchollet'
      }
    },
    {
      name: 'Jeremy Howard',
      title: 'Co-founder of fast.ai',
      expertise: ['Deep Learning', 'AI Education', 'Practical ML'],
      links: {
        github: 'https://github.com/jph00',
        twitter: 'https://twitter.com/jeremyphoward'
      }
    },
    {
      name: 'Sebastian Raschka',
      title: 'Author & ML Researcher',
      expertise: ['Machine Learning', 'LLMs', 'Python'],
      links: {
        github: 'https://github.com/rasbt',
        twitter: 'https://twitter.com/rasbt'
      }
    }
  ],
  companies: [
    {
      name: 'OpenAI',
      description: 'Leading AI research and deployment company behind GPT models',
      focus: ['LLMs', 'AGI Research', 'AI Safety'],
      links: {
        website: 'https://openai.com/',
        github: 'https://github.com/openai',
        twitter: 'https://twitter.com/OpenAI'
      }
    },
    {
      name: 'Hugging Face',
      description: 'AI community and platform for ML models',
      focus: ['Transformers', 'Open Source ML', 'Model Hub'],
      links: {
        website: 'https://huggingface.co/',
        github: 'https://github.com/huggingface',
        twitter: 'https://twitter.com/huggingface'
      }
    },
    {
      name: 'Anthropic',
      description: 'AI safety and research company behind Claude',
      focus: ['AI Safety', 'Constitutional AI', 'LLMs'],
      links: {
        website: 'https://www.anthropic.com/',
        twitter: 'https://twitter.com/AnthropicAI'
      }
    },
    {
      name: 'DeepMind',
      description: 'Google\'s AI research lab advancing AGI',
      focus: ['Reinforcement Learning', 'AGI', 'Scientific Discovery'],
      links: {
        website: 'https://www.deepmind.com/',
        github: 'https://github.com/deepmind',
        twitter: 'https://twitter.com/DeepMind'
      }
    }
  ]
})
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
          <li><a href="#influencers" class="navbar-link">AI Leaders</a></li>
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

    <!-- AI Influencers Section -->
    <section id="influencers" class="section">
      <div class="container">
        <h2 class="text-center">&gt; cat ./ai_leaders.md</h2>
        <p class="text-center section-intro">Following and learning from the pioneers shaping the future of AI</p>
        
        <!-- Researchers -->
        <div class="influencer-category">
          <h3 class="category-title">🎓 Top Researchers</h3>
          <div class="influencer-grid">
            <div v-for="researcher in aiInfluencers.researchers" :key="researcher.name" class="card influencer-card">
              <h4 class="influencer-name">{{ researcher.name }}</h4>
              <p class="influencer-title">{{ researcher.title }}</p>
              <div class="expertise-tags">
                <span v-for="expertise in researcher.expertise" :key="expertise" class="expertise-tag">
                  {{ expertise }}
                </span>
              </div>
              <div class="influencer-links">
                <a v-if="researcher.links.github" :href="researcher.links.github" target="_blank" class="social-link">GitHub</a>
                <a v-if="researcher.links.twitter" :href="researcher.links.twitter" target="_blank" class="social-link">Twitter</a>
                <a v-if="researcher.links.website" :href="researcher.links.website" target="_blank" class="social-link">Website</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contributors -->
        <div class="influencer-category">
          <h3 class="category-title">💻 Key Contributors</h3>
          <div class="influencer-grid">
            <div v-for="contributor in aiInfluencers.contributors" :key="contributor.name" class="card influencer-card">
              <h4 class="influencer-name">{{ contributor.name }}</h4>
              <p class="influencer-title">{{ contributor.title }}</p>
              <div class="expertise-tags">
                <span v-for="expertise in contributor.expertise" :key="expertise" class="expertise-tag">
                  {{ expertise }}
                </span>
              </div>
              <div class="influencer-links">
                <a v-if="contributor.links.github" :href="contributor.links.github" target="_blank" class="social-link">GitHub</a>
                <a v-if="contributor.links.twitter" :href="contributor.links.twitter" target="_blank" class="social-link">Twitter</a>
                <a v-if="contributor.links.website" :href="contributor.links.website" target="_blank" class="social-link">Website</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Companies -->
        <div class="influencer-category">
          <h3 class="category-title">🏢 Leading Companies</h3>
          <div class="company-grid">
            <div v-for="company in aiInfluencers.companies" :key="company.name" class="card company-card">
              <h4 class="company-name">{{ company.name }}</h4>
              <p class="company-description">{{ company.description }}</p>
              <div class="focus-tags">
                <span v-for="focus in company.focus" :key="focus" class="focus-tag">
                  {{ focus }}
                </span>
              </div>
              <div class="company-links">
                <a v-if="company.links.website" :href="company.links.website" target="_blank" class="social-link">Website</a>
                <a v-if="company.links.github" :href="company.links.github" target="_blank" class="social-link">GitHub</a>
                <a v-if="company.links.twitter" :href="company.links.twitter" target="_blank" class="social-link">Twitter</a>
              </div>
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

