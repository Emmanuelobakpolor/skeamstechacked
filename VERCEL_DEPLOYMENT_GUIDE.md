# Deploy React/Next.js Frontend to Vercel - Complete Guide

## Overview

You have a **Next.js** project (not plain React) at:
```
C:\Users\sxc\Downloads\tech\
```

This is perfect for Vercel - Vercel is built by the Next.js team!

---

## Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"** (easiest)
4. Authorize Vercel to access your GitHub
5. ✅ Account created!

---

## Step 2: Deploy to Vercel

### Option A: Automatic (Recommended)

1. Go to https://vercel.com/new
2. Click **"Select a Git Repository"**
3. Search for: `skeamstech` (your repo)
4. Click **"Import"**

### Option B: From Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repo

---

## Step 3: Configure Project

Vercel will automatically detect:
- ✅ Framework: **Next.js**
- ✅ Root Directory: (leave default)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

### You only need to set 1 thing:

**Environment Variables** (if your React app needs backend URL)

Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://acked-backend.onrender.com` |

Or if you're using a different variable name in your code, use that instead.

---

## Step 4: Deploy

1. Click **"Deploy"**
2. Vercel starts building (takes 1-2 minutes)
3. Watch the build progress
4. When done, you'll get a URL like:
   ```
   https://skeamstech.vercel.app
   ```

✅ **Your React app is LIVE!**

---

## After Deployment

### Your React App URL
```
https://skeamstech.vercel.app
```

### Update Backend CORS Settings

Go to Render dashboard for your backend:
1. Backend Service → Environment tab
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   http://localhost:3000,https://skeamstech.vercel.app
   ```
3. Update `CSRF_TRUSTED_ORIGINS`:
   ```
   https://skeamstech.vercel.app
   ```
4. Save (auto-redeploys)

---

## Step 5: Connect Frontend to Backend

In your React/Next.js code, use:

```javascript
// In your API calls
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Example fetch
fetch(`${API_URL}/shop/categories/`)
  .then(res => res.json())
  .then(data => console.log(data))
```

Or if using axios:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
});

export default api;
```

---

## Vercel Settings Summary

### Project Settings (Auto-Detected)

| Setting | Value |
|---------|-------|
| **Framework** | Next.js |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |
| **Install Command** | `npm ci` |
| **Node Version** | 18.x (or latest) |

### Environment Variables

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://acked-backend.onrender.com` |

(Add more if your app needs them)

---

## Your Final URLs

| Service | URL |
|---------|-----|
| **Frontend (Vercel)** | `https://skeamstech.vercel.app` |
| **Backend API (Render)** | `https://acked-backend.onrender.com` |
| **API Categories** | `https://acked-backend.onrender.com/shop/categories/` |
| **API Products** | `https://acked-backend.onrender.com/shop/products/` |

---

## Deployment Checklist

- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Vercel detected Next.js project
- [ ] Added environment variables (if needed)
- [ ] Clicked "Deploy"
- [ ] Build completed successfully
- [ ] Frontend is live at vercel URL
- [ ] Updated backend CORS settings
- [ ] Tested frontend → backend API calls
- [ ] Everything working!

---

## Common Issues

### Build Fails

**Error: "npm: command not found"**
- Vercel should auto-detect Node.js
- Check: Project Settings → Node Version
- Should be 16.x or higher

**Error: "Module not found"**
- Check: All dependencies in `package.json`
- Locally run: `npm install`
- Push to GitHub: `git add package-lock.json`
- Vercel will reinstall

### API Calls Don't Work

**Error: CORS error in browser console**
- Update backend CORS settings (see Step 4)
- Make sure `NEXT_PUBLIC_API_URL` is set
- Wait 1 minute for backend to redeploy

**Error: 404 on API endpoint**
- Check backend is running (`https://acked-backend.onrender.com/shop/categories/`)
- Verify environment variable is correct
- Check frontend code for API URL

### Blank Page

**No content showing**
- Check browser console (F12) for errors
- Check Vercel deployment logs
- Check backend is accessible

---

## Quick Deploy Steps

1. **Create Account** - https://vercel.com (sign up with GitHub)
2. **Import Project** - https://vercel.com/new (select your repo)
3. **Configure** - Set `NEXT_PUBLIC_API_URL` environment variable
4. **Deploy** - Click "Deploy" button
5. **Wait** - 1-2 minutes for build
6. **Visit** - Your Vercel URL (e.g., https://skeamstech.vercel.app)
7. **Update Backend** - Add Vercel URL to Render CORS settings
8. **Test** - Visit frontend, test API calls

---

## Vercel Features (All Free)

✅ Automatic deployments from GitHub
✅ Automatic SSL/HTTPS certificate
✅ CDN global edge network
✅ Serverless functions
✅ Environment variables
✅ Preview deployments for PRs
✅ Custom domains
✅ Unlimited bandwidth

---

## If You Have Custom Domain

1. Buy domain (GoDaddy, Namecheap, etc.)
2. Go to Vercel dashboard → Project → Settings
3. Go to "Domains" tab
4. Add your custom domain
5. Update domain DNS settings to point to Vercel
6. Vercel auto-configures SSL

---

## Summary

**Total Time:** ~5 minutes

**What You Get:**
- ✅ React/Next.js frontend deployed
- ✅ HTTPS/SSL certificate
- ✅ Global CDN delivery
- ✅ Auto-deploys on GitHub push
- ✅ Connected to backend API

**Your URLs:**
- Frontend: `https://skeamstech.vercel.app`
- Backend: `https://acked-backend.onrender.com`

**Status:** Ready to deploy! 🚀

---

**Created:** May 12, 2026
**Project Type:** Next.js
**Deployment Platform:** Vercel
