# Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/blog-site.git
   git push -u origin main
   ```

2. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"

### Option 2: Vercel CLI

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login:**

   ```bash
   vercel login
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (choose your account)
   - Link to existing project? `N`
   - Project name? `blog-site` (or your preferred name)
   - In which directory is your code located? `./`

## 📝 Important Notes for SQLite Deployment

**⚠️ SQLite Limitation on Vercel:**

- Vercel is serverless, so the SQLite database resets on each deployment
- Perfect for demo/portfolio purposes
- For production, consider these alternatives:

### Production Database Options:

1. **Vercel Postgres** (Recommended)
2. **PlanetScale** (MySQL)
3. **Railway** (PostgreSQL)
4. **Supabase** (PostgreSQL)

## 🔄 Updating Your Deployment

### With GitHub Integration:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy!

### With CLI:

```bash
vercel --prod
```

## 🌍 Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## 🔧 Environment Variables (If Needed)

If you add environment variables later:

1. In Vercel dashboard: "Settings" → "Environment Variables"
2. Add your variables
3. Redeploy

## ✅ Deployment Checklist

- [ ] All files committed to Git
- [ ] Repository pushed to GitHub (if using GitHub integration)
- [ ] Vercel account created
- [ ] Project deployed successfully
- [ ] Database seeded (happens automatically on build)
- [ ] Site accessible via Vercel URL

## 🚀 Your Live Blog

After deployment, your blog will be available at:
`https://your-project-name.vercel.app`

Features that work out of the box:

- ✅ View all posts
- ✅ Read individual posts
- ✅ Create new posts
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Twinkling stars animation

**Note:** New posts created on the live site will persist until the next deployment (when using SQLite).
