'use client'

import { Download, Briefcase, GraduationCap, Award, Code } from 'lucide-react'

export default function ResumePage() {
  const experience = [
    {
    title: 'Google Summer of Code 2026 — Contributor',
    company: 'PEcAn Project (Open Source) · Google',
    location: 'Remote',
    period: 'May 2026 – Sep 2026',
    responsibilities: [
      'Selected for GSoC 2026 from a record-breaking global applicant pool — Ranking #1 proposal at PEcAn',
      'Refactoring the Trait-Meta-analysis-Configuration Pipeline to increase PEcAn modularity',
      'Designing plugin interfaces and decoupling core modules to improve maintainability and extensibility',
      'Improving test coverage for climate/ecosystem modeling software used by researchers worldwide',
      'Earning $3,000 USD stipend: $1,350 after midterm (Jul 10) and $1,650 after final evaluation',
    ],
  },
    {
      title: 'Backend Developer (Self-Directed)',
      company: 'Personal Projects & Open Source',
      location: 'Chh. Sambhajinagar, India',
      period: '2023 – Present',
      responsibilities: [
        'Building production-grade REST APIs with Java and Spring Boot, applying clean architecture patterns',
        'Implemented real-time city bus tracking system using WebSocket and Leaflet.js with live location updates',
        'Developed hand-sign detection model using PyTorch and MediaPipe achieving high accuracy on ASL alphabet',
        'Contributing merged PRs to open source organisations across 5+ organisations on GitHub',
      ],
    },
    {
      title: 'AI/ML Project Developer',
      company: 'Academic & Personal Research',
      location: 'Chh. Sambhajinagar, India',
      period: '2024 – Present',
      responsibilities: [
        'Trained custom CNNs with PyTorch for computer vision tasks including gesture recognition',
        'Completed NVIDIA certification in Rapid Application Development with LLMs, building production-ready LLM pipelines',
        'Applied Pandas, NumPy, and Matplotlib for end-to-end data analysis and visualisation projects',
        'Explored NLP, Diffusion Models, and fine-tuning techniques as part of IBM AI Fundamentals certification',
      ],
    },
  ]

  const education = [
    {
      degree: 'Bachelor of Technology — Computer Science & Engineering',
      school: 'CSMSS Chh. Shahu College of Engineering',
      location: 'Chh. Sambhajinagar, Maharashtra',
      period: '2023 – Present',
      details: 'CGPA: 7.67 / 10  ·  Top 5% of College  ·  Final Year',
    },
  ]

  const skills = {
    'Backend & APIs': ['Java', 'Spring Boot', 'Node.js', 'REST API', 'WebSocket', 'Socket.io', 'Maven'],
    'AI / ML & Data Science': ['Python', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib', 'NLP', 'LLMs', 'MediaPipe'],
    'Databases': ['PostgreSQL', 'MySQL', 'Oracle', 'Redis'],
    'Languages': ['Java', 'Python', 'C', 'JavaScript', 'Ruby', 'SQL'],
    'Tools & DevOps': ['Git', 'GitHub', 'Linux', 'VS Code', 'Postman'],
    'Concepts': ['DSA', 'OOP', 'System Design Basics', 'Agile', 'Clean Code'],
  }

  const certifications = [
  { name: 'Google Summer of Code 2026 Contributor', issuer: 'Google · PEcAn Project', year: '2026' },
  { name: 'Rapid Application Development with LLMs', issuer: 'NVIDIA', year: '2025' },
    { name: 'Artificial Intelligence Fundamentals', issuer: 'IBM', year: '2025' },
    { name: 'Ultimate Job Ready Data Science Course', issuer: 'Code with Harry', year: '2025' },
    { name: 'AI/ML and Data Science', issuer: 'Apna College', year: '2024' },
    { name: 'Advanced Java', issuer: 'Offline', year: '2023' },
    { name: 'Data Structures & Algorithms', issuer: 'Offline', year: '2023' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16"
      style={{ background: 'transparent' }}>
      <div className="container mx-auto px-4 max-w-5xl">

        {/* ── Header ── */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="section-badge mb-4 block w-fit mx-auto">// resume</span>
          <h1 className="section-heading mb-3" style={{ fontSize: 'clamp(36px,5vw,56px)' }}>
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-[#9CAFA7] text-base mb-8 max-w-xl mx-auto">
            Backend Developer · AI/ML Enthusiast · Open Source Contributor
          </p>
          <a
            href="/resume.pdf"
            download
            className="btn btn-primary btn-lg inline-flex"
          >
            <Download size={18} />
            Download PDF
          </a>
        </div>

        {/* ── Professional Summary ── */}
        <div className="glass-card p-8 mb-8 animate-slide-up">
          <h2 className="text-xl font-bold text-[#ECF2EF] mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Professional Summary
          </h2>
          <p className="text-[#9CAFA7] leading-relaxed text-sm">
            Passionate Computer Science & Engineering student ranked in the{' '}
            <span className="text-[#34D399] font-semibold">top 5% of college with 7.67 CGPA</span>, focused on
            building scalable backend systems and applying AI/ML to solve real-world problems. Experienced with
            Java/Spring Boot for production-grade REST APIs, PyTorch for deep learning, and active open source
            contributions across 5+ organisations. Holds certifications from NVIDIA and IBM. Seeking an
            internship or collaborative project where I can contribute clean, maintainable code and grow alongside
            experienced engineers.
          </p>
        </div>

        {/* ── Work Experience ── */}
        <div className="glass-card p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <h2 className="text-xl font-bold text-[#ECF2EF] mb-6 flex items-center gap-2"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            <Briefcase size={20} className="text-[#34D399]" />
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-6">
                <h3 className="text-base font-bold text-[#ECF2EF] mb-1">{job.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <p className="text-[#34D399] text-sm font-semibold">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-[#5F7169] text-xs font-mono">{job.period}</p>
                </div>
                <ul className="space-y-1.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#9CAFA7] text-sm">
                      <span className="text-[#3B82F6] mt-1 text-xs shrink-0">▸</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div className="glass-card p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h2 className="text-xl font-bold text-[#ECF2EF] mb-6 flex items-center gap-2"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            <GraduationCap size={20} className="text-[#34D399]" />
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="border-l-2 border-blue-600 pl-6">
              <h3 className="text-base font-bold text-[#ECF2EF] mb-1">{edu.degree}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <p className="text-[#34D399] text-sm font-semibold">
                  {edu.school} · {edu.location}
                </p>
                <p className="text-[#5F7169] text-xs font-mono">{edu.period}</p>
              </div>
              <p className="text-[#9CAFA7] text-sm">{edu.details}</p>
            </div>
          ))}
        </div>

        {/* ── Skills ── */}
        <div className="glass-card p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <h2 className="text-xl font-bold text-[#ECF2EF] mb-6 flex items-center gap-2"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            <Code size={20} className="text-[#34D399]" />
            Technical Skills
          </h2>
          <div className="space-y-5">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-[#ECF2EF] mb-2 font-mono">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map(skill => (
                    <span key={skill} className="tech-badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Certifications ── */}
        <div className="glass-card p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <h2 className="text-xl font-bold text-[#ECF2EF] mb-6 flex items-center gap-2"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            <Award size={20} className="text-[#F59E0B]" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <Award size={15} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#ECF2EF] leading-snug">{cert.name}</p>
                  <p className="text-xs text-[#5F7169] font-mono mt-0.5">{cert.issuer} · {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="glass-card p-8 text-center animate-fade-in"
          style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.1),rgba(13,148,136,0.08))', borderColor: 'rgba(16,185,129,0.25)', animationDelay: '0.5s', animationFillMode: 'both' }}>
          <Award size={32} className="text-[#F59E0B] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#ECF2EF] mb-2">Want to know more?</h3>
          <p className="text-[#9CAFA7] text-sm mb-5">
            View all my certifications or get in touch directly.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/certifications" className="btn btn-primary btn-sm">
              View Certifications
            </a>
            <a href="/contact" className="btn btn-secondary btn-sm">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}