# Ben Merlotti Portfolio Website

A clean, minimal portfolio website showcasing Ben Merlotti's work in VFX, 3D, video editing, shooting, and development.

## 🎯 Features

### **Clean, Minimal Design**
- Retro minimal aesthetic with clean typography
- Responsive design that works on all devices
- Smooth animations and hover effects
- Flexbox-based layout for optimal responsiveness

### **Portfolio Sections**
- **Home**: Clean landing page with name display
- **About**: Personal information and background
- **VFX & 3D**: Video grid showcasing visual effects and 3D work
- **Edit & Shoot**: Video editing and cinematography projects
- **Dev**: Development projects and technical work

### **Video Integration**
- YouTube video embedding with smart URL processing
- Responsive video grid layout
- Automatic handling of different YouTube URL formats
- Project credits and descriptions

### **Navigation**
- Fixed header with clickable brand name
- Smooth scrolling between sections
- Active page highlighting
- Mobile-responsive navigation

## 🚀 Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS3** - Custom styling with flexbox and grid
- **GitHub** - Version control and hosting

## 📁 Project Structure

```
benMerlottiWebsite/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation component
│   │   ├── Header.css          # Header styling
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   └── Layout.css          # Layout styling
│   ├── pages/
│   │   ├── Home.jsx            # Homepage component
│   │   ├── About.jsx           # About page
│   │   ├── Vfx3D.jsx          # VFX & 3D projects
│   │   ├── Video.jsx           # Edit & Shoot projects
│   │   ├── Dev.jsx             # Development projects
│   │   └── PageStyles.css      # Shared page styling
│   ├── data/
│   │   └── projects.js         # Project data and video URLs
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styling
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone git@github.com:benMerlotti/benMerlottiWebsite.git

# Navigate to project directory
cd benMerlottiWebsite

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Customization

### Adding Projects
Edit `src/data/projects.js` to add new projects:

```javascript
{
  id: 'unique-id',
  title: 'Project Title',
  category: 'vfx', // 'vfx', '3d', 'shoot', 'edit', 'dev'
  credits: ['Role 1', 'Role 2'],
  youtubeUrl: 'https://youtu.be/VIDEO_ID',
  thumbnailUrl: 'path/to/thumbnail.jpg'
}
```

### Styling
- Global styles: `src/index.css`
- Component styles: Individual `.css` files
- Page styles: `src/pages/PageStyles.css`

### YouTube URL Support
The site automatically handles these YouTube URL formats:
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## 🌐 Deployment

### GitHub Pages
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
# (Configure in repository settings)
```

### Vercel/Netlify
- Connect your GitHub repository
- Build command: `npm run build`
- Output directory: `dist`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px-1200px
- **Mobile**: 480px-768px
- **Small Mobile**: <480px

## 🎯 Features in Detail

### Video Grid
- CSS Grid layout with auto-fit columns
- 16:9 aspect ratio for videos
- Hover effects and smooth transitions
- Mobile-responsive single column layout

### Navigation
- Fixed header with backdrop blur
- Clickable brand name returns to home
- Active page highlighting
- Mobile-friendly navigation menu

### Homepage
- Minimal design with centered name
- Clean typography with proper spacing
- Responsive font sizing

## 🤝 Contributing

This is a personal portfolio website. For suggestions or improvements, please open an issue on GitHub.

## 📄 License

This project is for personal use. All rights reserved.

---

**Built with ❤️ by Ben Merlotti**
