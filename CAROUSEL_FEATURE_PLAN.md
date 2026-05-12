# Discount Carousel Feature Implementation Plan

## Overview
Transform the discounts page into a creative, auto-sliding carousel showing 4 discounts at a time, with each discount having its own uploaded banner image (like Jumia's promotional banners).

## Feature Requirements
- ✅ Image upload for each discount (via Django admin)
- ✅ Carousel displays exactly 4 discounts simultaneously
- ✅ Auto-advance every 4 seconds
- ✅ Manual navigation (arrows + dots)
- ✅ Creative, engaging design with smooth animations
- ✅ Mobile responsive (fewer cards on smaller screens)

## Technical Changes Required

### Backend Changes (Django)

#### 1. Add Image Field to Discount Model
**File**: `backend/discounts/models.py`

Add `Pillow` to requirements and add an `ImageField` to store discount banner images:
```python
from django.db import models

class Discount(models.Model):
    # ... existing fields ...
    
    # New field for discount banner image
    banner_image = models.ImageField(
        upload_to='discount_banners/',
        blank=True,
        null=True,
        help_text='Promotional banner image for this discount'
    )
```

#### 2. Update Django Admin
**File**: `backend/discounts/admin.py`

Add image upload widget and display thumbnail in admin list:
```python
from django.contrib import admin
from .models import Discount

@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'service_type',
        'original_price',
        'discount_price',
        'discount_percentage',
        'is_active',
        'start_date',
        'end_date',
        'usage_count',
        'banner_thumbnail',  # NEW
    ]
    # ... existing config ...
    
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'description', 'service_type', 'banner_image')  # ADD banner_image
        }),
        # ... other fieldsets ...
    )
    
    def banner_thumbnail(self, obj):
        if obj.banner_image:
            return format_html('<img src="{}" width="100" height="60" style="object-fit: cover; border-radius: 4px;" />', obj.banner_image.url)
        return "No image"
    banner_thumbnail.short_description = 'Banner'
```

#### 3. Update Serializer
**File**: `backend/discounts/serializers.py`

Add image URL field to DiscountSerializer:
```python
class DiscountSerializer(serializers.ModelSerializer):
    banner_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Discount
        fields = [
            'id',
            'name',
            'description',
            'service_type',
            'original_price',
            'discount_price',
            'discount_percentage',
            'start_date',
            'end_date',
            'is_active',
            'code',
            'usage_limit',
            'usage_count',
            'created_at',
            'updated_at',
            'banner_image_url',  # NEW
        ]
    
    def get_banner_image_url(self, obj):
        if obj.banner_image:
            return obj.banner_image.url
        return None
```

#### 4. Configure Media Files in Django Settings
**File**: `backend/skeam/settings.py`

Add media configuration:
```python
# Media files (user uploaded files)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# At the end, add:
if DEBUG:
    from django.conf.urls.static import static
    urlpatterns = [
        # ... existing urls ...
    ] + static(MEDIA_URL, document_root=MEDIA_ROOT)
```

#### 5. Update Requirements
**File**: `backend/requirements.txt`

Add Pillow for image handling:
```
Pillow==10.0.0
```

### Frontend Changes (Next.js/React)

#### 1. Update Discount Interface
**File**: `app/discounts/page.tsx`

Update the Discount TypeScript interface:
```typescript
interface Discount {
  id: number;
  name: string;
  description: string | null;
  service_type: string;
  original_price: number;
  discount_price: number;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  code: string | null;
  usage_limit: number | null;
  usage_count: number;
  created_at: string;
  banner_image_url: string | null;  // NEW
}
```

#### 2. Remove Hardcoded serviceImages Mapping
Replace the static `serviceImages` mapping with dynamic images from backend.

#### 3. Implement Carousel Component
Create a new carousel component or update the existing page with:
- State for current slide index
- `useEffect` for auto-advance (4 seconds)
- Navigation arrows (prev/next)
- Pagination dots
- Responsive grid showing 4 items

#### 4. Carousel Design Features
- Smooth slide transitions using Framer Motion
- Cards with banner images as backgrounds
- Overlay gradient for text readability
- Hover effects with scale/transform
- Mobile: 1 card, Tablet: 2 cards, Desktop: 4 cards

## Implementation Steps

### Phase 1: Backend (Django)
1. ✅ Add `Pillow` to `requirements.txt`
2. ✅ Add `banner_image` field to `Discount` model
3. ✅ Create and run migration: `python manage.py makemigrations` then `python manage.py migrate`
4. ✅ Update `DiscountAdmin` to show image upload and thumbnail
5. ✅ Update `DiscountSerializer` to include `banner_image_url`
6. ✅ Configure media settings in `settings.py`
7. ✅ Update `urls.py` to serve media in development

### Phase 2: Frontend (Next.js)
1. ✅ Update `Discount` interface with `banner_image_url`
2. ✅ Remove hardcoded `serviceImages` mapping
3. ✅ Implement carousel state management
4. ✅ Add auto-slide useEffect with 4-second interval
5. ✅ Create carousel navigation (arrows + dots)
6. ✅ Style cards with banner images as backgrounds
7. ✅ Add responsive breakpoints (1/2/4 cards)
8. ✅ Add smooth animations with Framer Motion

### Phase 3: Testing
1. ✅ Start Django backend and create superuser
2. ✅ Upload banner images for discounts in admin
3. ✅ Verify API returns image URLs
4. ✅ Test frontend carousel displays images correctly
5. ✅ Test auto-sliding every 4 seconds
6. ✅ Test manual navigation
7. ✅ Test on different screen sizes

## Design Concept (Jumia-Inspired)

### Carousel Container
- Full-width banner carousel at top of discounts page
- Each slide shows 4 discount cards side-by-side
- Cards have rounded corners, subtle shadows, hover lift effect
- Background image covers entire card with dark gradient overlay
- Text (title, price, CTA) overlays on image
- "4 seconds" timer indicator (optional progress bar)

### Navigation
- **Arrows**: Left/right chevron buttons on sides (appear on hover)
- **Dots**: Bottom pagination showing current slide out of total
- **Swipe**: Touch-friendly for mobile

### Animation
- Smooth horizontal slide transition (0.5s ease)
- Cards stagger-fade in when slide changes
- Hover: card scales up 1.02x, shadow increases
- Auto-slide pauses on user interaction (hover/focus)

## File Changes Summary

### Backend Files to Modify
- `backend/requirements.txt` - Add Pillow
- `backend/discounts/models.py` - Add ImageField
- `backend/discounts/admin.py` - Add image upload widget
- `backend/discounts/serializers.py` - Add image URL field
- `backend/skeam/settings.py` - Add media configuration
- `backend/skeam/urls.py` - Add media serving (dev only)

### Frontend Files to Modify
- `app/discounts/page.tsx` - Complete carousel rewrite

### New Files to Create
- None (all modifications to existing files)

## Migration Commands
```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations discounts
python manage.py migrate
python manage.py collectstatic  # Optional for production
```

## Expected API Response (After Changes)
```json
[
  {
    "id": 1,
    "name": "Summer Gate Automation Sale",
    "description": "Special discount on gate automation systems",
    "service_type": "Gate Automation Systems",
    "original_price": 150000,
    "discount_price": 120000,
    "discount_percentage": 20.0,
    "start_date": "2025-06-01T00:00:00Z",
    "end_date": "2025-08-31T23:59:59Z",
    "is_active": true,
    "code": "GATE20",
    "usage_limit": 50,
    "usage_count": 0,
    "created_at": "2025-05-15T10:30:00Z",
    "updated_at": "2025-05-15T10:30:00Z",
    "banner_image_url": "http://localhost:8000/media/discount_banners/gate_sale.jpg"
  }
]
```

## Notes
- Images stored in `backend/media/discount_banners/`
- Admin uploads images when creating/editing discounts
- Frontend displays banner as card background with gradient overlay
- If no image uploaded, fallback to colored gradient background
- Carousel loops infinitely (back to start after last slide)

---

**Ready to implement?** Switch to Code mode to begin building this feature.