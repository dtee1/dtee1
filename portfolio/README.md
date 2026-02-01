# David Talson - Portfolio Website

A modern, responsive portfolio website built with Vue 3, Vite, and Composition API.

## 🚀 Features

- **Vue 3 with Composition API** - Modern Vue development
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Theme-based Styling** - All styles managed through `themes.css` with CSS variables
- **Fast Performance** - Powered by Vite for lightning-fast development and builds
- **Production Ready** - Optimized build configuration included

## 📦 Tech Stack

- Vue 3
- Vite
- CSS3 (with CSS Variables)

## 🛠️ Setup & Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the portfolio in development mode.

### Production Build

```bash
# Build for production
npm run build
```

The optimized production files will be generated in the `dist/` directory.

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/
│   │   └── themes.css      # All styling and CSS variables
│   ├── App.vue             # Main application component
│   └── main.js             # Application entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

## 🎨 Customization

### Updating Content

Edit `src/App.vue` to update:
- Personal information
- Skills and technologies
- Project showcases
- Contact information

### Styling

All styles are centralized in `src/assets/themes.css`. Modify CSS variables in the `:root` selector to change:
- Colors
- Spacing
- Typography
- Breakpoints

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contact

- GitHub: [@dtee1](https://github.com/dtee1)

---

Built with ❤️ using Vue 3 + Vite
