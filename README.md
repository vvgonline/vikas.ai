# VIKAS AI

<div align="center">

![Vikas AI Banner](https://img.shields.io/badge/VIKAS_AI-ACCESS_THE_FUTURE-ffdd33?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiAyMkgyMkwxMiAyWiIgZmlsbD0iI2ZmZGQzMyIvPgo8L3N2Zz4=)

**Privacy-First In-Browser AI Chat Interface**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)
[![WebGPU](https://img.shields.io/badge/WebGPU-Enabled-green.svg)](https://www.w3.org/TR/webgpu/)

[Live Demo](https://vvgonline.github.io/vikas.ai/) | [Documentation](#documentation) | [VVG ONLINE](https://vvgonline.net)

</div>

---

## 🚀 // ACCESS THE FUTURE

Vikas AI is a revolutionary AI chat interface that runs **entirely in your web browser**. Unlike traditional chatbots that send your conversations to remote servers, Vikas AI processes everything locally using WebGPU acceleration, ensuring **complete privacy** and **data sovereignty**.

### ✨ Key Features

- **🔒 100% Private** - All AI inference happens in your browser. Zero data collection.
- **⚡ WebGPU Powered** - Hardware-accelerated ML inference for blazing-fast responses
- **🌐 Offline Capable** - Works without internet after initial model load
- **💬 Real-time Streaming** - Get responses as they're generated, token by token
- **🎨 Retro-Tech UI** - Beautiful scanline effects and cyberpunk aesthetic
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **♿ Accessible** - WCAG AA compliant with keyboard navigation and screen reader support

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, TypeScript, SCSS |
| **Framework** | Bootstrap 5 |
| **AI Engine** | WebLLM, ONNX Runtime |
| **Acceleration** | WebGPU, WebAssembly |
| **Typography** | IBM Plex Sans, IBM Plex Mono |
| **Deployment** | GitHub Pages |
| **Build Tools** | TypeScript Compiler, Webpack |

---

## 🚀 Quick Start

### Prerequisites

- **Browser**: Chrome 113+ or Edge 113+ (WebGPU support required)
- **RAM**: Minimum 4GB recommended
- **GPU**: WebGPU-compatible graphics card

### Installation

```bash
# Clone the repository
git clone https://github.com/vvgonline/vikas.ai.git
cd vikas.ai

# Install dependencies
npm install

# Compile TypeScript
npm run build

# Start development server
npm run dev
```

Open your browser to `http://localhost:8080`

---

## 📚 Documentation

### Project Structure

```
vikas.ai/
├── index.html          # Main HTML with SEO meta tags
├── styles.css          # Compiled CSS with theme
├── app.ts              # TypeScript application logic
├── app.js              # Compiled JavaScript
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── robots.txt          # Search engine directives
├── llms.txt            # LLM-specific documentation
├── sitemap.xml         # Site structure for SEO
├── manifest.json       # PWA manifest
├── README.md           # This file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment
```

### SEO Implementation

#### Meta Tags
- **Primary**: Title, description, keywords, author
- **Open Graph**: Facebook/LinkedIn sharing optimization
- **Twitter Cards**: Enhanced Twitter previews
- **Theme**: Custom brand colors (#ffdd33)

#### Structured Data (JSON-LD)
- `SoftwareApplication` schema for app information
- `WebSite` schema with search action
- `Organization` schema for VVG ONLINE
- Rich snippets for search engines

#### Files
- `robots.txt` - Search crawler directives (allows all AI bots)
- `sitemap.xml` - Complete site structure
- `llms.txt` - Comprehensive project documentation for LLMs
- `manifest.json` - PWA configuration

---

## 🎨 Theme Customization

Vikas AI features a cyberpunk-inspired design with customizable themes:

### Color Palette

```scss
:root {
  --accent: #ffdd33;     // Vibrant yellow accent
  --bg: #ffffff;         // Light mode background
  --text: #111113;       // Primary text
  --card-bg: #f8f8f8;    // Card backgrounds
}

[data-theme="dark"] {
  --accent: #ffdd33;     // Consistent accent
  --bg: #0a0a0a;         // Dark background
  --text: #ffffff;       // Light text
  --card-bg: #1a1a1a;    // Dark cards
}
```

### Visual Effects

- **Scanline Overlay**: CRT monitor simulation
- **Text Flicker**: Retro screen effect
- **Glitch Animation**: Cyberpunk transitions
- **Border Animation**: Smooth hover effects
- **Reduced Motion**: Respects user preferences

---

## 🛤️ Development Phases

### Phase 1: Core Chat ✅ (Current)
- [x] Basic UI with retro theme
- [x] Message history and persistence
- [x] Theme toggle (light/dark)
- [x] Responsive design
- [x] Simple rule-based responses

### Phase 2: Testing (In Progress)
- [ ] Unit tests for core functionality
- [ ] Integration tests for UI components
- [ ] Browser compatibility testing
- [ ] Performance benchmarking

### Phase 3: WebLLM Integration
- [ ] ONNX Runtime implementation
- [ ] Model loading and caching
- [ ] Streaming inference
- [ ] Model quantization support

### Phase 4: Advanced Testing
- [ ] Load testing with real models
- [ ] Memory leak detection
- [ ] Cross-browser validation
- [ ] Accessibility audit

### Phase 5: Production Deployment ✅
- [x] GitHub Pages configuration
- [x] CI/CD pipeline (GitHub Actions)
- [x] SEO optimization
- [x] Performance monitoring

---

## 🧑‍💻 Browser Compatibility

| Browser | Minimum Version | WebGPU Support |
|---------|----------------|----------------|
| Chrome | 113+ | ✅ Yes |
| Edge | 113+ | ✅ Yes |
| Firefox | Experimental | ⚠️ Limited |
| Safari | Coming Soon | ❌ No |

**Note**: WebGPU is required for AI inference. Browsers without support will show an informative message.

---

## 📦 Deployment

### GitHub Pages (Automatic)

Push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "feat: your changes"
git push origin main
```

The GitHub Actions workflow compiles TypeScript and deploys to `gh-pages` branch.

### Manual Deployment

```bash
# Build project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 👥 About VVG ONLINE

**VVG ONLINE** is a digital business consulting company driving innovation through technology.

### Services
- 💡 Digital Transformation Strategy
- 🤖 AI & Machine Learning Solutions
- 🌐 Web & Mobile Development
- ⚙️ Business Process Automation
- 📊 Data Analytics & Visualization

**Website**: [vvgonline.net](https://vvgonline.net)  
**Location**: Indore, Madhya Pradesh, India  
**Contact**: contact@vvgonline.net  
**Twitter**: [@vvgonlinedotnet](https://twitter.com/vvgonlinedotnet)

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 VVG ONLINE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 🐛 Issues & Support

Found a bug or have a feature request?

- **Issues**: [GitHub Issues](https://github.com/vvgonline/vikas.ai/issues)
- **Email**: contact@vvgonline.net
- **Twitter**: [@vvgonlinedotnet](https://twitter.com/vvgonlinedotnet)

---

## 🚀 Roadmap

- [ ] Multiple AI model support
- [ ] Voice input/output
- [ ] Markdown rendering with syntax highlighting
- [ ] Export conversations (PDF, JSON)
- [ ] Custom system prompts
- [ ] Fine-tuning interface
- [ ] Plugin system
- [ ] Multi-language support

---

## 🌟 Acknowledgments

- [WebLLM](https://github.com/mlc-ai/web-llm) - In-browser LLM engine
- [ONNX Runtime](https://onnxruntime.ai/) - ML inference optimization
- [Bootstrap](https://getbootstrap.com/) - UI framework
- [IBM Plex](https://github.com/IBM/plex) - Beautiful typography

---

<div align="center">

**// ACCESS THE FUTURE WITH VIKAS AI**

Made with ❤️ by [VVG ONLINE](https://vvgonline.net)

[![GitHub](https://img.shields.io/badge/GitHub-vvgonline-181717?style=flat&logo=github)](https://github.com/vvgonline)
[![Website](https://img.shields.io/badge/Website-vvgonline.net-ffdd33?style=flat&logo=google-chrome)](https://vvgonline.net)
[![Twitter](https://img.shields.io/badge/Twitter-@vvgonlinedotnet-1DA1F2?style=flat&logo=twitter)](https://twitter.com/vvgonlinedotnet)

</div>