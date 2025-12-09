/**
 * Application constants - Personalized for Om Shripad Kapale
 */

// Personal Information
export const PERSONAL_INFO = {
  name: 'Om Shripad Kapale',
  title: 'Computer Science Student & Backend Developer',
  subtitle: 'AI/ML Enthusiast | Open Source Contributor',
  email: 'omshripadkapale@gmail.com',
  phone: '+91-XXXXXXXXXX',
  location: 'Mumbai, Maharashtra, India',
  bio: 'Passionate Computer Science student ranked in the top 5% of my college with 8.11 CGPA. Focused on backend development, AI/ML, and building scalable solutions with clean code.',
  tagline: 'Problem Solving | Clean Code | Scalable Solutions',
  rank: 'Top 5% of College',
  cgpa: '8.11',
}

// Social Media Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/omkarrr2533',
  linkedin: 'https://www.linkedin.com/in/om-kapale-b861a228a',
  leetcode: 'https://leetcode.com/u/omi_/',
  instagram: 'https://www.instagram.com/its_omkarrrrrr/?hl=en',
  email: 'mailto:omshripadkapale@gmail.com',
}

// GitHub Configuration
export const GITHUB_CONFIG = {
  username: 'omkarrr2533',
  showProfile: true,
  showRepos: true,
  showStats: true,
  showContributions: true,
}

// Navigation Items
export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'GitHub', path: '/github-activities' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Stuff', path: '/stuff' },
  { name: 'Resume', path: '/resume' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

// Tech Stack
export const TECH_STACK = {
  languages: ['Java', 'Python', 'C', 'JavaScript', 'Ruby', 'SQL'],
  frontend: ['HTML5', 'CSS3', 'JavaScript'],
  backend: ['Spring Boot', 'Node.js', 'Express'],
  databases: ['MySQL', 'PostgreSQL', 'Oracle'],
  aiml: ['PyTorch', 'Pandas', 'NumPy', 'Matplotlib', 'NLP'],
  tools: ['Git', 'Socket.io', 'REST API', 'WebSocket'],
}

// Featured Skills
export const SKILLS = [
  'Java',
  'Spring Boot',
  'Python',
  'AI/ML',
  'PyTorch',
  'Data Science',
  'MySQL',
  'PostgreSQL',
  'REST API',
  'DSA',
]

// Certifications Summary
export const CERTIFICATIONS_SUMMARY = {
  total: 10,
  online: 4,
  offline: 6,
  recent: 2024,
  featured: [
    'Nvidia - Application Development using LLMs',
    'IBM - AI Fundamentals',
    'Data Science Certification',
    'AI/ML and Data Science'
  ]
}

// Education
export const EDUCATION = {
  degree: 'Bachelor of Science in Computer Science',
  school: 'Your College Name',
  location: 'Mumbai, Maharashtra',
  period: '2023 - Present',
  cgpa: '8.11',
  rank: 'Top 5% of College',
  year: 'First Year',
}

// Achievements
export const ACHIEVEMENTS = [
  {
    title: 'Top 5% Academic Rank',
    description: 'Outstanding academic performance with 8.11 CGPA',
    year: '2024'
  },
  {
    title: 'Nvidia LLM Certification',
    description: 'Application Development using Large Language Models',
    year: '2024'
  },
  {
    title: 'IBM AI Certified',
    description: 'AI Fundamentals including Diffusion Models and NLP',
    year: '2024'
  },
  {
    title: 'Multiple Certifications',
    description: '10+ certifications in programming and AI/ML',
    year: '2023-2024'
  }
]

// Project Categories
export const PROJECT_CATEGORIES = [
  'All',
  'Web Development',
  'Backend',
  'AI/ML',
  'Data Science',
  'Full Stack',
]

// Gallery Categories
export const GALLERY_CATEGORIES = [
  'All',
  'Projects',
  'Achievements',
  'Certifications',
  'Events',
]

// Current Focus Areas
export const CURRENT_FOCUS = [
  'Data Science',
  'AI/ML',
  'Backend Development',
  'Large Language Models',
  'Advanced Java',
  'Problem Solving'
]

// Open To
export const OPEN_TO = [
  'Collaboration',
  'Open Source Contributions',
  'Innovative Projects',
  'Internship Opportunities',
  'Freelance Work'
]

// Language Colors (for GitHub)
export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  CSS: '#563d7c',
  HTML: '#e34c26',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
}

// SEO Meta
export const SEO = {
  title: 'Om Shripad Kapale | Computer Science Student & Backend Developer',
  description: 'Top 5% Computer Science student specializing in Backend Development, AI/ML, and Data Science. Passionate about building scalable solutions with clean code.',
  keywords: [
    'Om Kapale',
    'Computer Science Student',
    'Backend Developer',
    'AI/ML Enthusiast',
    'Spring Boot',
    'Java Developer',
    'Data Science',
    'Mumbai',
    'LeetCode',
    'Open Source'
  ],
  ogImage: '/og-image.jpg',
  twitterHandle: '@omkapale',
}

// Contact Info
export const CONTACT_INFO = {
  email: 'omshripadkapale@gmail.com',
  phone: '+91-XXXXXXXXXX',
  location: 'Mumbai, Maharashtra, India',
  availability: 'Open to opportunities',
  responseTime: '24-48 hours',
}

// Cache Durations (in seconds)
export const CACHE_DURATION = {
  github_profile: 3600, // 1 hour
  github_repos: 1800, // 30 minutes
  github_stats: 3600, // 1 hour
  contributions: 86400, // 24 hours
}

// Feature Flags
export const FEATURES = {
  dark_mode: true,
  github_integration: true,
  contact_form: true,
  blog: true,
  analytics: false,
}

export default {
  PERSONAL_INFO,
  SOCIAL_LINKS,
  GITHUB_CONFIG,
  NAV_ITEMS,
  TECH_STACK,
  SKILLS,
  CERTIFICATIONS_SUMMARY,
  EDUCATION,
  ACHIEVEMENTS,
  PROJECT_CATEGORIES,
  GALLERY_CATEGORIES,
  CURRENT_FOCUS,
  OPEN_TO,
  LANGUAGE_COLORS,
  SEO,
  CONTACT_INFO,
  CACHE_DURATION,
  FEATURES,
}