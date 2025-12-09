/**
 * Application constants
 */

// Personal Information
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, Country',
  bio: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications.',
}

// Social Media Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'mailto:your.email@example.com',
}

// Navigation Items
export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Stuff', path: '/stuff' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Resume', path: '/resume' },
  { name: 'About', path: '/about' },
  { name: 'GitHub', path: '/github-activities' },
  { name: 'Contact', path: '/contact' },
]

// Tech Stack
export const TECH_STACK = {
  frontend: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
  backend: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Jenkins', 'Git'],
  tools: ['VS Code', 'Postman', 'Figma', 'Jira', 'Slack'],
}

// Featured Skills
export const SKILLS = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Docker',
  'GraphQL',
  'Tailwind CSS',
]

// Project Categories
export const PROJECT_CATEGORIES = [
  'All',
  'Web Development',
  'Mobile App',
  'API Development',
  'DevOps',
  'Open Source',
]

// Gallery Categories
export const GALLERY_CATEGORIES = [
  'All',
  'Projects',
  'Events',
  'Achievements',
  'Travel',
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
  Vue: '#41b883',
  React: '#61dafb',
  Shell: '#89e051',
}

// Experience Data
export const EXPERIENCE = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Company Inc.',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    responsibilities: [
      'Lead development of enterprise web applications serving 100K+ users',
      'Architected microservices infrastructure reducing system latency by 40%',
      'Mentored team of 5 junior developers',
      'Implemented CI/CD pipelines improving deployment frequency by 300%',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Startup XYZ',
    location: 'New York, NY',
    period: '2020 - 2022',
    responsibilities: [
      'Built and maintained 15+ client projects using React and Node.js',
      'Developed RESTful APIs serving 50K+ daily requests',
      'Integrated payment gateways (Stripe, PayPal) for e-commerce platforms',
      'Optimized database queries reducing response time by 60%',
    ],
  },
]

// Education Data
export const EDUCATION = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of Technology',
    location: 'Boston, MA',
    period: '2015 - 2019',
    details: "GPA: 3.8/4.0, Dean's List, Computer Science Society President",
  },
]

// API Rate Limits
export const RATE_LIMITS = {
  github: 5000, // requests per hour with token
  contact_form: 10, // submissions per hour per IP
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
  blog: true,
  github_integration: true,
  contact_form: true,
  analytics: false,
}

// SEO Meta
export const SEO = {
  title: 'Portfolio | Your Name',
  description: 'Full Stack Developer specializing in React, Node.js, and cloud technologies',
  keywords: ['portfolio', 'web developer', 'full stack', 'react', 'nodejs'],
  ogImage: '/og-image.jpg',
  twitterHandle: '@yourusername',
}

// Contact Form Config
export const CONTACT_CONFIG = {
  emailService: 'emailjs',
  serviceId: process.env.EMAIL_SERVICE_ID,
  templateId: process.env.EMAIL_TEMPLATE_ID,
  publicKey: process.env.EMAIL_PUBLIC_KEY,
}

// Animation Delays
export const ANIMATION_DELAYS = {
  stagger: 0.1,
  fast: 0.2,
  medium: 0.4,
  slow: 0.6,
}

export default {
  PERSONAL_INFO,
  SOCIAL_LINKS,
  NAV_ITEMS,
  TECH_STACK,
  SKILLS,
  PROJECT_CATEGORIES,
  GALLERY_CATEGORIES,
  LANGUAGE_COLORS,
  EXPERIENCE,
  EDUCATION,
  RATE_LIMITS,
  CACHE_DURATION,
  FEATURES,
  SEO,
  CONTACT_CONFIG,
  ANIMATION_DELAYS,
}