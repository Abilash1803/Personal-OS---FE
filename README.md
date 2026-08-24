# Personal OS — Frontend

A privacy-focused, local-first **Personal Productivity Operating System** built with **React 19, Vite, TailwindCSS v4, and PWA**.

Designed mobile-first for day-to-day execution, strategic goal management, focus sessions, time tracking, and productivity analytics.

---

## 🌟 Key Features

- **🎯 Strategic Goals Architecture:** Life Areas → Strategic Goals → Task Templates → Daily Execution.
- **⚡ Deep Focus Engine:** Built-in Pomodoro/stopwatch focus timer with session notes and distraction tracking.
- **📅 Daily Planner & Agenda:** Calendar matrices, horizontal week strips, meetings, and quick-add tasks.
- **📊 Consistency Analytics:** 90-day GitHub-style consistency heatmap, goal performance charts, and rule-based insights.
- **📝 Reflection & Review System:** Daily, weekly, and monthly automated review summaries.
- **📲 Progressive Web App (PWA):** 1-tap mobile installation, offline caching, and native bottom sheet modals.
- **🔒 Local-First + Supabase Cloud Sync:** 100% functional offline with LocalStorage; bi-directional sync with Supabase PostgreSQL.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in your Supabase project credentials (available in your Supabase dashboard):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Database Setup (Supabase)

Personal OS uses **Supabase PostgreSQL** with Row-Level Security (RLS) policies.

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open [`supabase-schema.sql`](./supabase-schema.sql) and execute the script.
4. Copy your **Project URL** and **anon public API key** from *Project Settings → API* into your `.env` file.

---

## ☁️ Deploy to Vercel (100% Free)

1. Push this repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add the **Environment Variables** in the Vercel project settings:
   - `VITE_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-publishable-anon-key`
5. Click **Deploy**.

---

## 📱 Mobile App Installation (PWA)

### Android:
1. Open your Vercel deployment URL in **Chrome** or **Brave**.
2. Tap the floating **"Install PersonalOS"** prompt banner at the bottom.
3. Tap **Install** to add the app directly to your home screen and app drawer.

### iOS (iPhone / iPad):
1. Open your Vercel deployment URL in **Safari**.
2. Tap the **Share** button (⎋ with arrow).
3. Tap **"Add to Home Screen"** and tap **Add**.

---

## 🛠️ Project Structure

```
frontend/
├── public/                # Static assets, SVG icons, PWA manifest
├── src/
│   ├── app/               # Router configuration
│   ├── components/        # Reusable UI & PWA components (Modals, Buttons, Banners)
│   ├── context/           # Toast and application contexts
│   ├── features/          # Feature domains (dashboard, goals, planner, focus, analytics, reviews, settings)
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # AppLayout, BottomNav, MobileHeader, Sidebar
│   ├── pages/             # Route views (Dashboard, Goals, Planner, Focus, History, Analytics, Reviews, Settings)
│   ├── services/          # LocalStorage, Supabase Client, Sync & Analytics services
│   └── utils/             # Date, ID (UUID), and PWA utilities
├── supabase-schema.sql    # Complete PostgreSQL DDL & RLS security policies
├── vercel.json            # Vercel SPA routing & security headers
└── vite.config.js         # Vite & PWA build configuration
```

---

## 📄 License
MIT
