# Homepage Visual Wireframe Guide

## 📋 **Complete Visual Layout**

```
PAGE STRUCTURE FROM TOP TO BOTTOM:

┌────────────────────────────────────────────────────────┐
│ NAVIGATION (Fixed, z-50)                              │
│ [Logo]    [Nav Links]              [Get Quote Button] │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ HERO SECTION (60% text / 40% image)                  │
│ • Badge: "Professional Security & Energy Solutions"   │
│ • Headline: "Integrated Solutions for SECURITY..."   │
│ • Description: Long paragraph about services         │
│ • 2 Buttons: Primary + Secondary                     │
│ • Stats Grid: 3 columns (500+, 10+, 24/7)           │
│ • Right: Solar image, 500×400px, with overlay       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ SERVICES SECTION (6 cards in 3×2 or responsive)     │
│ • Grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
│ • Each Card:                                         │
│   ├── Image (240px height) or Icon                 │
│   ├── Title (20px bold)                            │
│   ├── Description (base text)                       │
│   └── "Learn More" link                            │
│ • Discount badge overlay (top-right)               │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ STATS SECTION (4 stat cards)                         │
│ • Grid: 1→2→4 columns responsive                    │
│ • Each Card:                                         │
│   ├── Number (animated CountUp on scroll)          │
│   ├── Label (20px bold)                            │
│   └── Description (small text)                     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ ABOUT SECTION (2-column: Image + Content)            │
│ • Left: Team photo, 400×400px, rounded               │
│ • Right:                                             │
│   ├── "Why Choose Us?" section title               │
│   ├── Description paragraph                         │
│   ├── 4-item highlight list (✓ checkmarks)         │
│   └── 2 CTA buttons                                │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ TEAMS SECTION (4 team member cards)                  │
│ • Grid: 1→2→4 columns responsive                    │
│ • Each Card:                                         │
│   ├── Avatar circle (128-160px)                    │
│   ├── Name (bold)                                  │
│   ├── Role (cyan, smaller)                         │
│   └── Bio (small text)                             │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ BRANDS CAROUSEL (Infinite horizontal scroll)          │
│ • Background: Premium gradient                        │
│ • Items: 6 brands with emojis (🚀 💼 ☁️ ⚡ 📊 🔒)
│ • Auto-scrolling: 40s linear loop                   │
│ • On hover: Emoji scales up, smooth 200ms           │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ TESTIMONIALS SECTION (3 review cards)                │
│ • Grid: 1→2→3 columns responsive                    │
│ • Each Card:                                         │
│   ├── 5-star rating (static, yellow)               │
│   ├── Quote (italic, blue-100)                     │
│   ├── Author name (bold)                           │
│   └── Role/Company (small, muted)                  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ CTA SECTION (Center, full-width call-to-action)      │
│ • Background: Blue-800→Blue-700 gradient            │
│ • Headline: "Ready to Transform Your ENTERPRISE?"   │
│ • Description: Paragraph about value proposition     │
│ • 2 Buttons: Primary + Secondary (bordered)         │
│ • Trust Badges: 3 items (98% Uptime, etc.)         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ FOOTER (4-5 columns)                                 │
│ • Col 1: Logo, company description, social links     │
│ • Col 2: Services links (4 items)                   │
│ • Col 3: Company links (3 items)                    │
│ • Col 4: Support links (4 items)                    │
│ • Col 5: Legal links (2 items)                      │
│ • Contact section (3 cards): Email, WhatsApp, Location
│ • Bottom: Copyright + Tagline                       │
└────────────────────────────────────────────────────────┘

[FIXED] WhatsApp Button - Bottom right corner, 64px circle
        Green-blue-cyan gradient, hover shadow effect
        [💬] Opens modal with preset message
```

---

## 🎨 **Color Palette Visual Reference**

```
PRIMARY COLORS:
  Navy (#0f172a)      ███████  ← Main background
  Deep Blue (#1e3a8a) ███████  ← Section background
  Strong Blue (#1e40af) ███████ ← Primary button
  Medium Blue (#3b82f6) ███████ ← Accents, hover
  Light Blue (#60a5fa) ███████  ← Highlights

ACCENT COLORS:
  Cyan (#06b6d4)      ███████  ← Highlights
  White (#ffffff)     ███████  ← Text, contrast
  Green (#22c55e)     ███████  ← Success, savings
  Red (#ef4444)       ███████  ← Discount badges
  Amber (#fbbf24)     ███████  ← Warning indicators

TRANSPARENCY EXAMPLES:
  bg-blue-800/40  = 40% opacity (semi-transparent)
  text-blue-100   = 100% opacity (fully opaque)
  border-blue-600/50 = 50% opacity (semi-transparent)
```

---

## 📐 **Spacing & Layout Reference**

```
CONTAINER STRUCTURE:
  Max Width:      1280px (max-w-7xl)
  
  ┌─ 24-32px padding ─┐
  │ ┌─ content ─────┐ │
  │ │               │ │
  │ │  max 1280px   │ │
  │ │               │ │
  │ └───────────────┘ │
  └───────────────────┘

SPACING VALUES:
  Section padding:     80px (py-20) → 128px (py-32) vertical
  Card gap:            32px (gap-8) → 40px (gap-10)
  Element padding:     24-40px internal
  Border radius:       8px (rounded-lg) → 24px (rounded-3xl)

RESPONSIVE SIZES:
  Mobile text:         24-36px
  Tablet text:         36-42px
  Desktop text:        48-60px
```

---

## 🎬 **Animation Specifications**

```
ENTRANCE ANIMATIONS (when scrolling into view):
  Duration:        0.35-0.4 seconds
  Easing:          ease-out (natural deceleration)
  Initial state:   opacity: 0, translateY: 20px
  Final state:     opacity: 1, translateY: 0
  Stagger delay:   0.06-0.1s between children

HOVER ANIMATIONS:
  Duration:        150-200ms (fast, snappy)
  Easing:          ease-out
  Effects:         Border color, background, shadow
  Scale:           NOT used (performance optimization)

IMAGE ZOOM:
  Duration:        500ms (smooth)
  Scale factor:    1.03 or 1.05 (subtle zoom)
  Easing:          ease-out
  Trigger:         On card hover
```

---

## 📱 **Responsive Behavior**

```
MOBILE LAYOUT (<768px):
  Hero:           Single column, image below text
  Services:       1 column, full-width cards
  Stats:          1 column, stacked vertically
  About:          Image above, text below (stacked)
  Teams:          1 column, centered cards
  Testimonials:   1 column, full-width
  Footer:         Single column, stacked sections

TABLET LAYOUT (768px - 1024px):
  Hero:           Still 1-2 columns depending on width
  Services:       2 columns
  Stats:          2 columns
  About:          2 columns
  Teams:          2 columns
  Testimonials:   2 columns
  Footer:         2-3 columns

DESKTOP LAYOUT (>1024px):
  Hero:           2 columns (60/40 split)
  Services:       3 columns
  Stats:          4 columns
  About:          2 columns (40/60 split)
  Teams:          4 columns
  Testimonials:   3 columns
  Footer:         4-5 columns
```

---

## 🎯 **Visual Hierarchy**

```
MOST IMPORTANT:
  1. Hero headline + CTA buttons
  2. Section titles
  3. Card titles + images

IMPORTANT:
  4. Body text descriptions
  5. Secondary buttons
  6. Form inputs

LESS IMPORTANT:
  7. Footer links
  8. Metadata (dates, names)
  9. Decorative elements

EMPHASIS TECHNIQUES:
  • Size:      Larger = more important
  • Weight:    Bold = more important
  • Color:     Bright/contrasting = important
  • Position:  Top/left = important
  • Spacing:   More whitespace = important
```

---

## 📊 **Component Dimensions Quick Reference**

```
BUTTONS:
  Height:     48px (py-3 = 12px top+bottom)
  Min Width:  96px (px-6 = 24px left+right)
  Radius:     8px (rounded-lg)

ICONS:
  Small:      16×16px (w-4 h-4)
  Medium:     24×24px (w-6 h-6)
  Large:      32×32px (w-8 h-8)
  Huge:       64×64px (w-16 h-16)

IMAGES:
  Hero image:    responsive height, 500px on desktop
  Card image:    192px height (h-48) or 240px (h-60)
  Avatar:        128×128px (w-32 h-32) circle

CARDS:
  Min height:    420px (h-full flex)
  Padding:       40px (p-10) internal
  Border width:  2px
  Radius:        16px (rounded-2xl)
```

---

## 🌈 **Gradient Reference**

```
PRIMARY GRADIENT (buttons, CTA):
  from-blue-600 to-cyan-600
  Direction: 135deg (diagonal)

CARD GRADIENT:
  from-blue-800/40 to-cyan-800/20
  Direction: to-br (to bottom-right)

SECTION GRADIENT:
  from-blue-900 via-blue-800 to-blue-700
  Direction: 180deg (vertical)

TEXT GRADIENT:
  from-blue-300 via-cyan-300 to-blue-400
  With: bg-clip-text text-transparent
```

---

**Visual Guide Created**: May 3, 2026  
**For**: SKEAM Technologies Homepage Redesign  
**Status**: Current Production Design Reference
