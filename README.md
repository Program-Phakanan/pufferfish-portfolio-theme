# Pufferfish Portfolio Theme 🐡

A modern, animated Jekyll portfolio theme with a unique pufferfish cursor effect and smooth animations. Perfect for developers who want to showcase their work with style!

## ✨ Features

- 🐡 **Unique Pufferfish Cursor**: Custom animated cursor with bubble trail effect
- 🎨 **Modern Design**: Clean, professional layout with smooth animations
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🚀 **Easy to Use**: Just configure `_config.yml` and deploy
- 🎯 **Sections Included**: Hero, About, Projects, Certificates, Contact
- 🌊 **Smooth Animations**: Scroll-based reveal animations
- 💼 **Project Showcase**: Beautiful project slider with detailed information
- 📜 **Certificates Display**: Showcase your achievements
- 📧 **Contact Section**: Multiple contact options

## 🚀 Quick Start

### Using as a Remote Theme (Recommended)

1. **Create a new repository** for your portfolio

2. **Create `_config.yml`** in your repository root:

```yaml
# Enable remote theme
remote_theme: yourusername/pufferfish-portfolio-theme

# Your Information
title: "Your Name"
author:
  name: "Your Name"
  role: "Your Role"

# Add your content...
```

3. **Create `index.md`** in your repository root:

```markdown
---
layout: default
---
```

4. **Enable GitHub Pages** in your repository settings

5. **That's it!** Your portfolio is live! 🎉

## ⚙️ Configuration

All configuration is done through `_config.yml`. Here's a complete example:

```yaml
# Site Settings
title: "John Doe"
tagline: "Developer Portfolio"
description: "My awesome portfolio"
lang: "en"  # or "th" for Thai
logo_text: "JD"  # 2-3 characters for logo

# Author Information
author:
  name: "John Doe"
  role: "Full Stack Developer"
  passion: "building great products"
  skills:
    - "React"
    - "Node.js"
    - "Python"
    - "Docker"

# Hero Section
hero:
  greeting: "Hi, my name is"
  description: "I'm a software developer specializing in building exceptional digital experiences."
  cta_primary: "View My Work"
  cta_secondary: "Get In Touch"

# About Section
about:
  intro: "Hello! I'm a passionate developer..."
  paragraphs:
    - "First paragraph about you"
    - "Second paragraph about your journey"
  tech_intro: "Technologies I work with:"
  technologies:
    - "React"
    - "TypeScript"
    - "Node.js"
    - "PostgreSQL"
    - "Docker"
    - "AWS"
  image: "https://your-image-url.com/photo.jpg"

# Projects
projects:
  title: "Things I've Built"
  items:
    - name: "Project Name"
      category: "Full Stack"
      description: "Project description here..."
      image: "https://project-image-url.com"
      technologies:
        - "React"
        - "Node.js"
      github: "https://github.com/user/repo"
      demo: "https://demo-url.com"

# Certificates
certificates:
  title: "Certificates & Achievements"
  show_placeholder: true
  items:
    - title: "Certificate Name"
      issuer: "Issuing Organization"
      description: "What you learned..."
      link: "./certificates/cert.pdf"
      link_text: "View Certificate"

# Contact
contact:
  title: "Get In Touch"
  description: "I'm open to new opportunities..."
  email: "your.email@example.com"
  phone: "123-456-7890"
  location: "Your City, Country"
  cta: "Say Hello"

# Social Links
social:
  github: "https://github.com/yourusername"
  linkedin: "https://linkedin.com/in/yourusername"
  twitter: "https://twitter.com/yourusername"
```

## 📁 File Structure

```
your-portfolio/
├── _config.yml          # Your configuration
├── index.md             # Homepage (just needs frontmatter)
├── certificates/        # Optional: Your certificate PDFs
│   └── cert.pdf
└── README.md            # Optional: About your portfolio
```

## 🎨 Customization

### Colors

The theme uses CSS variables. You can override them by creating `assets/css/custom.css`:

```css
:root {
  --navy: #your-color;
  --green: #your-accent-color;
  /* ... other variables */
}
```

### Fonts

The theme uses IBM Plex Sans Thai and IBM Plex Mono. You can change fonts in your custom CSS.

## 📱 Responsive Design

The theme is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Content Guidelines

### Project Images
- Recommended size: 1200x700px
- Format: JPG or PNG
- Use high-quality images

### About Image
- Recommended size: 350x350px
- Square format works best

### Certificates
- PDF format recommended
- Place in `certificates/` folder

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This theme is available as open source under the terms of the MIT License.

## 🙏 Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts - IBM Plex](https://fonts.google.com/specimen/IBM+Plex+Sans+Thai)

## 💬 Support

If you have any questions or run into issues, please open an issue on GitHub.

## 🌟 Showcase

Using this theme? Let me know! I'd love to see what you build with it.

---

Made with ❤️ and 🐡 by [Your Name]
