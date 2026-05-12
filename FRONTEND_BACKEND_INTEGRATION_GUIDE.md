# Frontend-Backend Integration Guide

## Current Setup Analysis

### Backend (Django REST Framework)
- **Location**: `backend/` directory
- **Port**: Runs on `http://localhost:8000`
- **API Endpoints**:
  - `GET /api/v1/discounts/` - List all active discounts
  - `GET /api/v1/discounts/{id}` - Get specific discount
  - `GET /api/v1/discounts/service/{service_type}` - Filter by service type (using `by_service` action)
  - `POST /api/v1/discounts/` - Create new discount
  - `PUT /api/v1/discounts/{id}` - Update discount
  - `DELETE /api/v1/discounts/{id}` - Delete discount
- **Base URL**: `http://localhost:8000/api/v1`

### Frontend (Next.js)
- **Location**: Root directory
- **Port**: Runs on `http://localhost:3000`
- **Discounts Page**: `app/discounts/page.tsx`
- **Current API Configuration**: Uses `NEXT_PUBLIC_API_URL` environment variable

## The Problem

**Misconfigured API Endpoint**: The frontend is currently pointing to `http://localhost:8000/api` but the backend serves endpoints under `/api/v1/`, not `/api`.

### Current Configuration
- **Frontend `.env.local`**: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- **Backend URLs**: Available at `/api/v1/` and `/discounts/` (both work)

### What's Happening
When the frontend calls `${API_URL}/discounts/`, it's hitting `http://localhost:8000/api/discounts/` which doesn't exist. It should be `http://localhost:8000/api/v1/discounts/`.

## Solution Steps

### 1. Update Frontend Environment Variable

**File**: `.env.local` (in project root)

Change:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

To:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 2. Verify Backend CORS Configuration

The backend already has CORS properly configured in `backend/skeam/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    os.getenv('FRONTEND_URL', 'http://localhost:3000'),
]
CORS_ALLOW_CREDENTIALS = True
```

The `FRONTEND_URL` is read from the environment. The `.env.example` file shows:
```env
FRONTEND_URL=http://localhost:3000
```

This is correct and allows the Next.js frontend to make requests.

### 3. Backend Environment Setup

**File**: `backend/.env` (create from example)

```bash
cd backend
cp .env.example .env
```

Edit `.env` if needed (defaults are fine for local development):
```env
DATABASE_URL=postgresql://user:password@localhost/skeam_discounts
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
```

Note: The backend uses SQLite by default (see `settings.py`), so `DATABASE_URL` is not required for local development.

### 4. Initialize and Run Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Initialize database (creates db.sqlite3 and tables)
python manage.py migrate

# Optional: Load sample data
python manage.py loaddata fixtures/sample_discounts.json

# Run the server
python manage.py runserver
# or
uvicorn skeam.wsgi:application --reload --host 0.0.0.0 --port 8000
```

The backend will be available at:
- API: `http://localhost:8000/api/v1/`
- Admin: `http://localhost:8000/admin/`
- Health check: `http://localhost:8000/health`

### 5. Run Frontend

```bash
# In a separate terminal (from project root)
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 6. Test the Integration

1. Start both servers (backend on port 8000, frontend on port 3000)
2. Visit `http://localhost:3000/discounts`
3. The page should fetch and display discounts from the backend

If using sample data:
- Username: `admin`
- Password: `admin` (check `backend/discounts/admin.py` for credentials)

## API Response Format

The backend returns discounts in this format:

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
    "updated_at": "2025-05-15T10:30:00Z"
  }
]
```

## Troubleshooting

### Issue: "Failed to fetch discounts"
**Solution**: 
- Ensure backend is running on `http://localhost:8000`
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Open browser console and try: `fetch('http://localhost:8000/api/v1/discounts/')`

### Issue: CORS error in browser
**Solution**:
- Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Restart the backend server after changing `.env` file
- The backend must have `corsheaders` in INSTALLED_APPS and middleware (already configured)

### Issue: No discounts showing
**Solution**:
- Check that there are active discounts in the database with dates that include today
- Use Django admin at `http://localhost:8000/admin/` to verify data
- Or load sample data: `python manage.py loaddata fixtures/sample_discounts.json`

### Issue: 404 on API endpoints
**Solution**:
- Verify you're using `/api/v1/` prefix, not `/api/`
- Check backend URLs are correctly configured in `backend/skeam/urls.py`

## Quick Start Summary

```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Terminal 2: Frontend
npm install
npm run dev
```

Visit: `http://localhost:3000/discounts`

## Architecture Notes

- **Frontend**: Next.js 16 with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Django 4.2 with Django REST Framework, SQLite (development)
- **Communication**: REST API with JSON responses
- **CORS**: Configured via `django-cors-headers`
- **Data Flow**: Frontend fetches → Backend returns JSON → Frontend renders

Both applications are now properly connected and will communicate successfully.