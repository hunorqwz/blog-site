# Blog Site

A minimalist personal blog built with Next.js, Material UI, and SQLite via Prisma. It features clean design, easy navigation, a lightweight backend for managing and displaying blog posts, and beautiful twinkling star animations.

## 🚀 Features

- **Modern Stack**: Next.js 14 + TypeScript + Material UI
- **Database**: SQLite with Prisma ORM
- **Responsive Design**: Mobile-friendly layout
- **Dark/Light Mode**: Toggle between themes
- **Animated Background**: Subtle twinkling stars
- **Clean UI**: Minimalist design with hover effects

## 🛠️ Development Setup

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Setup database:**

   ```bash
   npm run db:setup
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:setup` - Initialize database with seed data
- `npm run db:push` - Push Prisma schema to database
- `npm run db:generate` - Generate Prisma client

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Database Setup:**
   Since Vercel is serverless, the SQLite database will be reset on each deployment. For production, consider:
   - Using Vercel Postgres (recommended)
   - PlanetScale
   - Railway
   - Supabase

### Alternative: Keep SQLite for Simple Deployment

For a simple demo deployment with SQLite:

1. The database will reset on each deployment
2. Seed data will be recreated each time
3. Perfect for demo/portfolio purposes

## 🗄️ Database Schema

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
}
```

## 🎨 Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Library**: Material UI
- **Database**: SQLite + Prisma ORM
- **Deployment**: Vercel (recommended)
- **Styling**: Emotion (via MUI)

## 📱 Pages

- **Home** (`/`) - List all blog posts
- **Post** (`/post/[id]`) - View individual post
- **New Post** (`/new`) - Create new blog post

## 🌟 Design Features

- Clean, minimal design
- Twinkling star background animation
- Responsive layout
- Dark/Light theme toggle
- Glass morphism effects on cards
- Smooth hover animations
