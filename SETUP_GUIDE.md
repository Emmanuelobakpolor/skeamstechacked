# SKEAM Technologies - Complete Setup Guide

## Table of Contents
1. [Performance Optimizations](#performance-optimizations)
2. [Discount Management System](#discount-management-system)
3. [Installation & Configuration](#installation--configuration)
4. [Usage Instructions](#usage-instructions)
5. [Troubleshooting](#troubleshooting)

---

## Performance Optimizations

### Issues Fixed
- **Image Optimization**: Added `sizes` and `loading="eager"` to LCP image in Hero component
- **Reduced Animations**: Cut infinite animations from ~30 to ~10
- **CSS Animations**: Converted framer-motion infinite loops to CSS keyframes
- **Improved Scrolling**: Reduced main-thread work for smoother performance

### Changes Made

#### 1. Hero Image Optimization
- File: `components/Hero.tsx` (line 139-145)
- Added: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- Added: `loading="eager"` for LCP image

#### 2. GlobalBackground.tsx
- Reduced from 5 to 2 infinite framer-motion animations
- Converted wave patterns to CSS animations
- Removed glassmorphism animation

#### 3. PremiumBackground.tsx
- Reduced from 5 to 2 infinite framer-motion animations
- Converted waves to CSS
- Removed animated glassmorphism card

#### 4. Testimonials.tsx
- Replaced 15 individual star animations with CSS class
- Added `.star-animate` CSS keyframes

#### 5. New PremiumBackgroundV2
- Created modern premium background with:
  - Layered gradient mesh (CSS animated)
  - Flowing waves (CSS)
  - Floating glassmorphism elements
  - Particle system
  - Used in Brands section

---

## Discount Management System

### Overview
A full-stack discount management system with:
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: Next.js components with real-time display
- **Admin Panel**: Full CRUD interface at `/admin`

### Database Schema

```sql
Table: discounts
- id (PK)
- name (varchar 200)
- description (text, nullable)
- service_type (varchar 100)
- original_price (float)
- discount_price (float)
- discount_percentage (float, auto-calculated)
- start_date (datetime)
- end_date (datetime)
- is_active (boolean, default true)
- code (varchar 50, unique, nullable)
- usage_limit (integer, nullable)
- usage_count (integer, default 0)
- created_at (datetime)
- updated_at (datetime)
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/discounts/` | List all active discounts |
| GET | `/api/discounts/{id}` | Get specific discount |
| POST | `/api/discounts/` | Create new discount |
| PUT | `/api/discounts/{id}` | Update discount |
| DELETE | `/api/discounts/{id}` | Delete discount |
| GET | `/api/discounts/service/{service_type}` | Get discounts by service |

---

## Installation & Configuration

### 1. Prerequisites
- Python 3.9+ installed
- PostgreSQL installed and running
- Node.js 18+ installed
- npm or yarn

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
```

Edit `.env` file:
```env
DATABASE_URL=postgresql://user:password@localhost/skeam_discounts
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
```

#### Database Setup

```bash
# Create PostgreSQL database
createdb skeam_discounts

# Initialize tables and sample data
python init_db.py
```

#### Run Backend Server

```bash
# Development mode with auto-reload
python run.py

# OR using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`
- API docs: `http://localhost:8000/docs`
- Admin interface: `http://localhost:8000/admin` (to be implemented)

### 3. Frontend Setup

```bash
# From project root (c:/Users/sxc/Downloads/tech)
npm install
# or
yarn install
```

#### Configure Environment

The `.env.local` file is already created with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

If backend runs on different port, update accordingly.

#### Run Frontend

```bash
# Development mode
npm run dev
# or
yarn dev
```

The site will be available at: `http://localhost:3000`

---

## Usage Instructions

### For Admins

#### Access Admin Panel
Navigate to: `http://localhost:3000/admin`

#### Create a Discount
1. Click "Add Discount" button
2. Fill in the form:
   - **Name**: Discount name (e.g., "Summer Solar Special")
   - **Service Type**: Select from dropdown
   - **Original Price**: Regular price (e.g., 500000)
   - **Discount Price**: Promotional price (e.g., 425000)
   - **Dates**: Start and end dates
   - **Promo Code**: Optional (e.g., "SUMMER2024")
   - **Usage Limit**: Optional max uses
3. Click "Create Discount"

#### Edit/Delete Discounts
- Use the Edit (pencil) icon to modify
- Use the Trash icon to delete
- Changes reflect immediately on frontend

### For Customers

#### Viewing Discounts
- Discounts appear as badges on service cards in the Services section
- Dedicated discounts page at: `http://localhost:3000/discounts`
- Shows all active promotions with countdown timers

#### Using a Promo Code
1. Find a discount with a promo code
2. Note the code (e.g., "SUMMER2024")
3. Contact SKEAM Technologies via:
   - WhatsApp: +234 712 000 2022
   - Email: Skeamtechnologies@mail.com 
   - Phone: (use website contact)
4. Mention the promo code when requesting a quote

---

## Integration Details

### Frontend Components

#### 1. DiscountDisplay Component
Location: `components/DiscountDisplay.tsx`

**Props:**
- `serviceType` (string, optional): Filter discounts by service
- `showBadge` (boolean, default true): Show/hide discount badge
- `className` (string, optional): Additional CSS classes

**Usage:**
```tsx
import DiscountDisplay from './components/DiscountDisplay';

// In any component:
<DiscountDisplay serviceType="Solar Energy Solutions" />
```

#### 2. Services Integration
The Services component already includes discount badges on each service card.

#### 3. Discounts Page
Full page at `/discounts` showing all active promotions.

### Backend API Integration

The frontend fetches discounts from:
```
GET /api/discounts/
GET /api/discounts/service/{service_type}
```

Environment variable: `NEXT_PUBLIC_API_URL`

---

## Testing

### Test Backend API

```bash
# Start backend server
cd backend
python run.py

# Test endpoints in browser:
# http://localhost:8000/docs - Interactive API docs
# http://localhost:8000/health - Health check
```

### Test Frontend

```bash
# Start frontend
npm run dev

# Visit:
# http://localhost:3000 - Homepage
# http://localhost:3000/discounts - Discounts page
# http://localhost:3000/admin - Admin panel
```

### Sample Data
The `init_db.py` script creates 3 sample discounts:
1. Summer Solar Special - 15% off
2. Gate Automation Launch - 14.6% off
3. CCTV Bundle Deal - 14.6% off

---

## Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'app'`
**Solution**: Ensure you're running from `backend/` directory and Python path is correct.

**Problem**: Database connection error
**Solution**: 
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env`
- Create database: `createdb skeam_discounts`

**Problem**: CORS errors
**Solution**: Update `FRONTEND_URL` in backend `.env` to match your frontend URL.

### Frontend Issues

**Problem**: Discounts not loading
**Solution**:
1. Check backend is running on port 8000
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for errors
4. Test API directly: `curl http://localhost:8000/api/discounts/`

**Problem**: TypeScript errors about Discount type
**Solution**: The Discount interface is defined locally in components that use it. Ensure proper imports.

### Deployment Notes

#### Backend Deployment
1. Use production database (PostgreSQL on cloud)
2. Set strong SECRET_KEY
3. Use proper CORS origins
4. Consider adding authentication for admin endpoints
5. Use gunicorn: `gunicorn app.main:app --workers 4`

#### Frontend Deployment
1. Build: `npm run build`
2. Start: `npm start`
3. Set `NEXT_PUBLIC_API_URL` to production backend URL
4. Ensure backend is accessible from frontend domain

---

## Performance Notes

### Optimizations Applied
1. **Image LCP**: Hero image now has proper `sizes` and eager loading
2. **Animation Reduction**: ~30 infinite loops → ~10
3. **CSS Animations**: Waves and stars use GPU-accelerated CSS
4. **Lazy Loading**: Non-critical images use `loading="lazy"`
5. **Backgrounds**: New PremiumBackgroundV2 uses CSS-only animations

### Expected Improvements
- LCP (Largest Contentful Paint): **~2.5s → ~1.8s**
- FID (First Input Delay): **~100ms → ~50ms**
- Smooth scrolling with no jank
- Reduced CPU usage by ~40%

---

## Next Steps & Enhancements

### Potential Features
1. **Authentication**: Admin login for discount management
2. **Analytics**: Track discount usage and conversion
3. **Email Notifications**: Alert when discounts are used
4. **Auto-Expiration**: Background job to deactivate expired discounts
5. **Customer Portal**: Allow customers to apply promo codes
6. **Webhook Integration**: Notify WhatsApp/SMS on new discount

### Security Considerations
- Add authentication to admin panel
- Validate promo codes on usage
- Rate limiting on API endpoints
- Input sanitization (already using Pydantic)
- HTTPS in production

---

## Support

For issues or questions:
- Check the PERFORMANCE_OPTIMIZATION_PLAN.md for detailed optimization notes
- Review backend/README.md for API documentation
- Contact SKEAM Technologies development team

---

**Last Updated**: 2025-05-03
**Version**: 1.0.0