# How to Add Your Banner & Discount Images

## Folder Structure

```
public/
├── banners/          (Add your banner images here)
│   ├── banner-1.jpg
│   ├── banner-2.jpg
│   └── banner-3.jpg
│
└── discounts/        (Add your discount ad images here)
    ├── discount-1.jpg
    └── discount-2.jpg
```

## Steps to Add Images:

### 1. **Add Banner Images**
   - Place your banner images in the `public/banners/` folder
   - Recommended size: **1200px × 400px** or wider aspect ratio
   - Supported formats: JPG, PNG, WebP

### 2. **Add Discount Ad Images**
   - Place your discount ad images in the `public/discounts/` folder
   - Recommended size: **600px × 400px** or similar
   - Supported formats: JPG, PNG, WebP

### 3. **Update the Image Paths in Code**

Open `components/ContentDisplay.tsx` and update the hardcoded paths:

```typescript
// HARDCODED BANNERS
const HARDCODED_BANNERS: Content[] = [
  {
    id: 'banner-1',
    name: 'Banner 1',
    type: 'banner',
    url: '/banners/banner-1.jpg', // ← Change filename here
  },
  // Add more banners...
];

// HARDCODED DISCOUNTS
const HARDCODED_DISCOUNTS: Content[] = [
  {
    id: 'discount-1',
    name: 'Discount Ad 1',
    type: 'discount-ad',
    url: '/discounts/discount-1.jpg', // ← Change filename here
  },
  // Add more discounts...
];
```

## Example:

If you add these files:
- `public/banners/gate-automation.jpg`
- `public/banners/cctv-promo.jpg`
- `public/discounts/solar-sale.jpg`

Update your code to:

```typescript
const HARDCODED_BANNERS: Content[] = [
  {
    id: 'banner-1',
    name: 'Gate Automation',
    type: 'banner',
    url: '/banners/gate-automation.jpg',
  },
  {
    id: 'banner-2',
    name: 'CCTV Promo',
    type: 'banner',
    url: '/banners/cctv-promo.jpg',
  },
];

const HARDCODED_DISCOUNTS: Content[] = [
  {
    id: 'discount-1',
    name: 'Solar Sale',
    type: 'discount-ad',
    url: '/discounts/solar-sale.jpg',
  },
];
```

## Auto-Slide Settings:

- **Banners** auto-slide every **4 seconds**
- **Discount Ads** auto-slide every **5 seconds**

You can change these by editing the `interval` prop in `components/ContentDisplay.tsx`

## Notes:

- Images will automatically display on your homepage
- The carousel will auto-slide if you have multiple images
- Users can manually navigate with arrow buttons and dots
- Images are optimized with Next.js Image component
