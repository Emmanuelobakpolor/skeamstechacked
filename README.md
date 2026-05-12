# Skream Technologies - Modern Corporate Website

A premium, modern corporate website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✨ **Modern Design System** - Clean, professional SaaS-style UI with consistent spacing and typography
- 🎨 **Beautiful Animations** - Smooth micro-interactions powered by Framer Motion
- 📱 **Fully Responsive** - Mobile-first design that works seamlessly on all devices
- ⚡ **Performance Optimized** - Built with Next.js 15 for optimal performance
- 🔒 **Type Safe** - Full TypeScript support throughout the project
- 🎯 **SEO Ready** - Optimized metadata and semantic HTML
- 🧩 **Reusable Components** - Well-structured, maintainable component architecture

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── Navigation.tsx       # Header navigation
│   ├── Hero.tsx            # Hero section with CTA
│   ├── Services.tsx        # Services grid
│   ├── Stats.tsx           # Statistics cards
│   ├── About.tsx           # About company section
│   ├── Testimonials.tsx    # Client testimonials
│   ├── CTA.tsx             # Call to action section
│   └── Footer.tsx          # Footer with links
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Design System

### Colors
- **Primary**: Blue gradient (#2563eb to #1e40af)
- **Dark**: Neutral grays (#111827 to #f9fafb)
- **Accents**: Subtle backgrounds and borders

### Typography
- **Font Family**: Inter
- **Heading Hierarchy**: H1 (48px) → H4 (20px)
- **Line Heights**: Optimized for readability with 1.5-1.6 ratio

### Spacing
- **Base Unit**: 8px
- **Section Spacing**: 20px (mobile) / 32px (desktop)
- **Component Gaps**: 8px, 16px, 24px, 32px

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Create environment variables file
cp .env.example .env.local
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Component Documentation

### Navigation
- Responsive header with mobile menu
- Sticky positioning with glassmorphism effect
- CTA button integration

### Hero Section
- Split layout (text left, visual right)
- Animated background elements
- Stats showcase
- Dual CTA buttons

### Services
- 6-service card grid (3 columns on desktop)
- Consistent card heights and spacing
- Icon integration with Lucide React
- Hover animations

### Stats
- 4-column responsive grid
- Gradient text effect
- Intersection observer for animations

### About
- Two-column layout with imagery
- Key highlights with checkmarks
- Smooth scroll animations

### Testimonials
- 3-column card grid
- Star ratings
- Client information cards

### CTA Section
- Full-gradient background
- Dual button options
- Trust badges

### Footer
- Multi-column link structure
- Contact information
- Social media links
- Dark theme

## Customization

### Colors
Edit `tailwind.config.ts` to modify the color palette:

```typescript
colors: {
  primary: {
    600: '#your-color',
    // ...
  }
}
```

### Typography
Adjust font sizes and weights in `tailwind.config.ts`:

```typescript
fontSize: {
  base: ['16px', { lineHeight: '24px' }],
  // ...
}
```

### Animations
Modify Framer Motion settings in individual components or update global animations in `app/globals.css`.

## Performance Tips

- Use Next.js Image component for images
- Lazy load components using React.lazy() if needed
- Implement code splitting for large components
- Monitor Core Web Vitals using Next.js Analytics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## SEO Optimization

The site includes:
- Semantic HTML structure
- Meta tags and OpenGraph support
- Mobile responsiveness
- Fast page load times
- Structured data ready

## License

© 2024 Skream Technologies. All rights reserved.

## Support

For questions or issues, please contact the development team.
