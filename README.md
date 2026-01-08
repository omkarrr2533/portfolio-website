# 🚀 Dynamic Portfolio Website

A modern, fully-featured portfolio website built with Next.js 14, featuring dynamic GitHub integration, dark mode, and beautiful animations.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 🌓 **Dark Mode** - Seamless theme switching with system preference detection
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔄 **GitHub Integration** - Automatically syncs projects from GitHub
- 📊 **GitHub Activity** - Live contribution graph and repository stats
- 📧 **Contact Form** - Working contact form with validation
- 🎯 **SEO Optimized** - Meta tags, sitemap, and schema markup
- ⚡ **Fast Performance** - Built with Next.js App Router and optimized images
- 🎭 **Multiple Pages** - Home, Projects, Gallery, Certifications, Resume, About, Contact, Stuff
- 🔒 **Type Safe** - JavaScript with JSDoc for better DX

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended)
- **APIs:** GitHub REST API

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- GitHub account
- GitHub Personal Access Token

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Add your environment variables**
   ```env
   GITHUB_TOKEN=your_github_token_here
   GITHUB_USERNAME=your_github_username
   NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to `http://localhost:3000`

## 🔑 Getting GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Website")
4. Select scopes: `repo`, `user`, `read:org`
5. Click "Generate token"
6. Copy the token and add it to `.env.local`

## 📝 Customization

### Personal Information

Edit `src/lib/constants.js` to update:
- Name, title, bio
- Social media links
- Contact information
- Skills and tech stack

### Projects

Add your projects to `src/data/projects.json`:
```json
{
  "id": 1,
  "name": "Your Project",
  "description": "Project description",
  "techStack": ["React", "Node.js"],
  "liveLink": "https://project.com",
  "githubLink": "https://github.com/you/project"
}
```

### Skills

Update `src/data/skills.json` with your skills:
```json
{
  "name": "React",
  "level": 95,
  "yearsOfExperience": 4
}
```

### Colors & Theme

Customize colors in `tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#0ea5e9', // Your primary color
  }
}
```

## 📄 Pages

- **/** - Home page with hero, featured projects, and skills
- **/projects** - Full project gallery with search and filter
- **/github-activities** - GitHub stats and contribution graph
- **/gallery** - Image gallery with categories
- **/certifications** - Professional certifications
- **/resume** - Downloadable resume
- **/about** - About me page with experience timeline
- **/contact** - Contact form
- **/stuff** - Blog posts, hobbies, favorites

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Deploy!

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📊 GitHub API Rate Limits

- **Without token:** 60 requests/hour
- **With token:** 5000 requests/hour

Always use a GitHub token for better rate limits!

## 🐛 Troubleshooting

### GitHub API not working
- Check if `GITHUB_TOKEN` is set correctly
- Verify token has correct scopes
- Check API rate limits

### Dark mode not persisting
- Clear browser cache
- Check localStorage is enabled

### Build errors
- Delete `.next` folder: `rm -rf .next`
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.

## 📧 Contact

- Email: omshripadkapale@gmail.com
- GitHub: [@omkarrr2533]
- LinkedIn: [Om Kapale](in/om-kapale-b861a228a)

---

Made with ❤️ by [Om Kapale](https://yourportfolio.com.


