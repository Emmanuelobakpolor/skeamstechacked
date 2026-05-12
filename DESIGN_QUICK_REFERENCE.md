# SKEAM Technologies - Quick Design Reference

## 🎨 **Color System Quick Lookup**

```
BLUES (Primary):
  Dark Navy:        #0f172a ← Body background
  Deep Blue:        #1e3a8a ← Base blue
  Strong Blue:      #1e40af ← Primary button
  Medium Blue:      #3b82f6 ← Accents
  Light Blue:       #60a5fa ← Hover states
  Sky Blue:         #bfdbfe ← Text (secondary)

CYANS (Accents):
  Cyan:             #06b6d4 ← Highlights
  Light Cyan:       #22d3ee ← Borders

UTILITIES:
  White:            #ffffff ← Text (primary)
  Green:            #22c55e ← Success/savings
  Red:              #ef4444 ← Urgent/discount
  Pink:             #ec4899 ← Accent
  Amber:            #fbbf24 ← Warning
```

---

## 📐 **Layout Grid System**

```
Max Width:  1280px (max-w-7xl)
Padding:    24px mobile (px-6), 32px desktop (px-8)
Container:  section-inner class (auto margin, max-width)

Section Heights:
  Hero:      600-800px
  Normal:    400-600px
  Card:      420px+ (flexbox, min-h)

Spacing:
  Section Y: py-20 (mobile), md:py-32 (desktop)
  Card Gap:  gap-8 (mobile), md:gap-10 (desktop)
```

---

## 🔤 **Typography System**

```
Headlines:
  H1:  48px → 60px bold  (hero main)
  H2:  36px bold         (section titles)
  H3:  24px bold         (card titles)
  H4:  20px semibold     (subtitles)

Body Text:
  Large:     18px leading-relaxed (xl)
  Regular:   16px leading-relaxed (base)
  Small:     14px leading-relaxed (sm)
  Tiny:      12px leading-relaxed (xs)

Font Weight:
  Regular:   400
  Medium:    500
  Semibold:  600
  Bold:      700
  Extrabold: 800

Font Family: Inter (system-ui fallback)
```

---

## 🎨 **Component Color Combinations**

```
BUTTONS:
  Primary:
    bg-white text-blue-900
    hover:bg-blue-50
    
  Secondary:
    bg-blue-800/50 text-white border-2 border-blue-400
    hover:bg-blue-700/50 hover:border-blue-300

CARDS:
  Base:       bg-blue-800/40 border-blue-600/50
  Hover:      border-blue-400 bg-blue-800/70
  Gradient:   from-blue-800/40 to-cyan-800/20

BADGES:
  Discount:   from-red-500 to-pink-500
  Warning:    bg-amber-500/90
  Success:    bg-green-500/20

TEXT:
  Heading:    text-white (100%)
  Primary:    text-blue-200 (90%)
  Secondary:  text-blue-300 (80%)
  Muted:      text-blue-400 (60%)
```

---

## ⏱️ **Animation Quick Guide**

```
ENTRANCE ANIMATIONS (on scroll):
  Duration:    0.35-0.4s
  Easing:      ease-out
  Delay:       0.06-0.1s staggerChildren
  Trigger:     whileInView={{ opacity: 1, y: 0 }}
  Initial:     {{ opacity: 0, y: 20 }}

HOVER EFFECTS:
  Duration:    150-200ms (fast)
  Easing:      ease-out
  Effects:     color, shadow, border
  NOT: scale/rotate (performance)

TRANSITIONS:
  Colors:      transition-colors duration-150
  Borders:     transition-colors duration-200
  Shadows:     transition-shadow duration-200
  Transforms:  transition-transform duration-500

CARD HOVER ANIMATION:
  border-color:  blue-600/50 → blue-400 (200ms)
  background:    no change OR bg-800/70 (200ms)
  shadow:        sm → md (200ms)
```

---

## 📱 **Responsive Breakpoints**

```
Mobile First Approach:

Mobile (<768px):
  Text:      24-36px headlines
  Padding:   px-6 (24px)
  Grid:      1 column
  Height:    Hero 600px, Cards auto

Tablet (768px - 1024px):
  Text:      36-42px headlines
  Padding:   px-6 (24px)
  Grid:      2 columns
  Height:    Same as mobile

Desktop (>1024px):
  Text:      48-60px headlines
  Padding:   px-8 (32px)
  Grid:      3-4 columns
  Height:    Cards min-h-[420px]

Key Classes:
  md:text-5xl     = tablet+
  md:grid-cols-2  = tablet+
  lg:grid-cols-3  = desktop+
```

---

## 🏗️ **Component Structure**

```
PAGE LAYOUT:
├── GlobalBackground (z-0, fixed)
├── Navigation (z-50, fixed top)
└── main (z-10)
    ├── Hero
    ├── Services
    ├── Stats
    ├── About
    ├── Teams
    ├── Brands
    ├── Testimonials
    ├── CTA
    └── Footer

CARD STRUCTURE:
├── Container (bg gradient, border, rounded)
│   ├── Image (if present)
│   │   └── Overlay gradient
│   ├── Content
│   │   ├── Icon (optional)
│   │   ├── Title
│   │   ├── Description
│   │   └── Link/CTA
│   └── Hover effects (border, background, shadow)

SECTION STRUCTURE:
├── section.section-container
│   └── .section-inner
│       ├── Header (title + description)
│       └── Grid
│           └── Cards
```

---

## 🎯 **Key Design Decisions**

```
DARK THEME:
  Why: Premium look, modern, less eye strain, 
       aligns with tech/energy industry

GRADIENT ACCENTS:
  Why: Visual interest without motion, 
       guides eye to important elements

MINIMAL ANIMATIONS:
  Why: Performance, accessibility (reduced motion),
       fast page load, modern minimalist trend

CARD-BASED LAYOUTS:
  Why: Scannable, organized, responsive,
       easy to add/remove content

BLUE FOCUS:
  Why: Trustworthy, professional, 
       associated with tech/security
```

---

## 🔗 **Important CSS Classes**

```
UTILITIES:
  .section-container     py-20 md:py-32 relative z-10
  .section-inner         max-w-7xl mx-auto px-6 md:px-8
  .gradient-text         bg-gradient-to-r ... bg-clip-text
  .glass-effect          backdrop-blur-md bg-white/10 border
  .card-base             bg-white rounded-xl border shadow-sm
  
ANIMATIONS:
  .animate-in            fadeInUp 0.35s ease-out
  .animate-slide-left    slideInLeft 0.4s ease-out
  .animate-scale-in      scaleIn 0.3s ease-out
  
HOVER STATES:
  group-hover:text-*     Changes text color on card hover
  group-hover:scale-105  Image zoom on card hover
  hover:shadow-lg        Shadow on hover
  hover:border-*         Border color change on hover
```

---

## 📊 **Component Sizes Reference**

```
BUTTONS:
  Height:     py-3 (12px vertical) = ~48px total
  Width:      px-6 (24px horizontal) = ~96px min
  Rounded:    rounded-lg (8px)
  Font:       font-semibold (600)

ICONS:
  Small:      w-4 h-4 (16px)
  Medium:     w-6 h-6 (24px)
  Large:      w-8 h-8 (32px)
  Huge:       w-16 h-16 (64px)

IMAGES:
  Hero:       fill (responsive) with 500px height
  Card:       h-48 (192px) or h-60 (240px)
  Avatar:     w-32 h-32 (128px) circle
  Logo:       h-10 w-auto (40px height)

BADGES:
  Height:     py-1 py-1.5 (4-6px vertical)
  Width:      px-2 px-3 (8-12px horizontal)
  Rounded:    rounded-full (circle)
```

---

## 🎬 **Animation Timing**

```
STAGGER DELAYS:
  Children:        0.08-0.1s apart
  Paragraph items: 0.04-0.05s apart
  
DURATIONS:
  Entrance:        0.35-0.4s
  Hover:           0.15-0.2s (150-200ms)
  Image zoom:      0.5s (500ms, smooth)
  Color change:    0.15-0.2s

EASING FUNCTIONS:
  Entrance:        ease-out (natural deceleration)
  Hover:           ease-out or default (linear)
  Spring:          NOT USED (performance)
```

---

## 🚀 **Quick Redesign Checklist**

### **If Changing Colors:**
- [ ] Update bg colors (cards, sections)
- [ ] Update border colors (cards, buttons)
- [ ] Update text colors (headings, body, muted)
- [ ] Update button states (hover, active)
- [ ] Update gradient accents
- [ ] Test contrast ratios (4.5:1 minimum)

### **If Changing Fonts:**
- [ ] Update font-family in tailwind.config
- [ ] Adjust all font sizes (may need new scale)
- [ ] Update line-heights for readability
- [ ] Test on mobile (16px minimum)
- [ ] Update heading hierarchy

### **If Changing Layout:**
- [ ] Update max-width (currently 1280px)
- [ ] Update spacing values
- [ ] Update grid column count
- [ ] Test responsive breakpoints
- [ ] Update card heights
- [ ] Test mobile layout

### **If Adding Animations:**
- [ ] Keep durations ≤ 500ms
- [ ] Use ease-out easing
- [ ] Test on slow devices
- [ ] Respect prefers-reduced-motion
- [ ] Don't animate on scroll past initial load

---

## 📝 **Design File Locations**

```
Frontend:
  app/globals.css           ← All CSS custom classes
  tailwind.config.ts        ← Theme colors, spacing
  components/              ← Section components
  app/page.tsx             ← Homepage structure

Backend:
  backend/requirements.txt  ← Python dependencies
  backend/skeam/settings.py ← Django config
  backend/discounts/       ← API models

Documentation:
  HOMEPAGE_DESIGN_OVERVIEW.md  ← This file (detailed)
  DESIGN_QUICK_REFERENCE.md    ← You are here (quick)
```

---

**Created**: May 3, 2026  
**Last Updated**: During UI/UX optimization  
**Status**: Current production design  
