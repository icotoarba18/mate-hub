# 🧮 MateHub — Interactive Mathematics Platform (Middle & High School)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/ES6+-JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%203-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/Math-KaTeX-3298dc)](https://katex.org/)
[![Supabase](https://img.shields.io/badge/Cloud-Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![Open Source](https://img.shields.io/badge/Open%20Source-100%25%20Free-brightgreen.svg)](#)

> **MateHub** is a modern, interactive, and completely free web educational platform designed for middle and high school students (grades 5 through 12, following the Romanian national curriculum). The platform offers instant access to official curriculum topics, theory summaries rendered in real-time with **LaTeX (KaTeX)**, tiered practice worksheets with step-by-step solutions and scoring rubrics, official exam simulations for the **National Evaluation (8th grade)** and **Baccalaureate (12th grade)** with live timers and diagnosis, an engaging gamification engine (XP, daily streaks 🔥, badges), and cloud synchronization powered by **Supabase**.

---

## 🚀 Key Features

### 📚 1. Official Curriculum Coverage (Grades 5–12)
- **Middle School (Grades V–VIII):** Natural numbers, fractions, algebraic calculus, equations and inequalities, plane geometry, and solid geometry (prisms, pyramids, cylinders, cones, spheres).
- **High School (Grades IX–XII):** Sets and mathematical logic, functions, trigonometry, vectors, complex numbers, matrices and determinants, systems of linear equations, limits, derivatives, and integral calculus.

### 📐 2. Mathematical Theory with KaTeX Rendering
- Crisp, pixel-perfect mathematical formulas rendered client-side using standard **KaTeX/LaTeX** (both inline `$x^2$` and display blocks `$$\int f(x)dx$$`).
- Step-by-step solved examples and instant interactive **Quick Check Quizzes** with immediate visual feedback.

### 📝 3. Smart Worksheet Generator
- Accessible directly from each lesson view with the **"Generate Worksheet"** action.
- Choice between **3 difficulty tiers**: *Easy*, *Medium*, and *Advanced*.
- Dynamically generates a targeted set of **5 lesson-specific exercises**, each featuring a **"View Step-by-Step Solution & Rubric"** toggle with detailed scoring criteria.
- Direct print / PDF export support formatted cleanly for offline homework.

### ⏱️ 4. Official Exam Simulation Module (EN & BAC)
- **National Evaluation Simulation (8th Grade)**: 120 minutes, official subject breakdown: Subject I (multiple-choice), Subject II (geometry), Subject III (algebra and analysis with complete rubrics).
- **Baccalaureate Simulation (12th Grade)**: 180 minutes, full national examination format with Subjects I, II, and III.
- **Interactive live timer** with start, pause, and resume capabilities.
- **Smart Evaluation & Diagnosis**: calculates an estimated grade and automatically recommends lessons the student should review based on incorrect answers.

### 🎮 5. Gamification Engine (XP, Streaks & Levels)
- **Experience Points (XP)**: awarded automatically upon completing lessons (+50 XP), solving worksheets (+100 XP), or finishing mock exams (+300 XP).
- **Daily Streak Counter (🔥)**: motivates students to maintain daily learning habits.
- **7 Progressive Mastery Levels**: from *Math Novice (Level 1)* to *Olympic Legend (Level 7)*.
- **Unlockable Achievement Badges**: *First Step*, *Practical Mind*, *Continuous Fire*, *Perfect 10*, *Marathoner*, *Math Master*.

### 🎨 6. Visual Customization & Dark Mode
- Eye-friendly, modern Dark Mode designed to prevent eye strain during extensive study sessions.
- **4 Immersive Visual Themes**:
  - 🎮 **Gaming** (Neon Pink & Violet accents)
  - 🚀 **Space** (Cosmic Cyan & Sky Blue accents)
  - ⚡ **Cyberpunk** (Electric Yellow & High-contrast Black accents)
  - 🪶 **Minimal** (Clean Monochromatic Slate accents)

### ☁️ 7. Cloud Authentication & Profile Sync (Supabase)
- User registration and login backed by **Supabase Auth Cloud** (`supabase.auth.signUp` and `supabase.auth.signInWithPassword`).
- Real-time cloud persistence for XP, streak counts, unlocked badges, and completed lessons in the `profiles` table.
- **Local Fallback Mode**: fully functional offline or without cloud credentials via `localStorage`.

### 🔍 8. Spotlight Search (Cmd+K / Ctrl+K) & Responsive Header
- Instant search modal inspired by macOS Spotlight and Notion.
- Minimalist header with a dedicated slide-over drawer menu for mobile and tablet touchscreens.

---

## 🏛️ Project Architecture (OOP & Modular ES6)

The project strictly follows **Object-Oriented Programming (OOP)** and **Separation of Concerns (SoC)** principles, organized into self-contained classes and modules:

```text
matehub/
├── index.html                      # Semantic single-page HTML entry point
├── README.md                       # Comprehensive documentation
└── js/
    ├── app.js                      # Main orchestrator & global event bridge
    ├── services/
    │   ├── AuthService.js          # Class: Supabase cloud auth, session handling & sync
    │   ├── GamificationManager.js  # Class: XP logic, streaks, levels 1-7 & badge modals
    │   └── ThemeManager.js         # Class: Dynamic themes & localStorage persistence
    ├── ui/
    │   └── UIManager.js            # Class: View routing, KaTeX rendering, worksheets & exam simulator
    └── data/
        ├── curriculum.js           # Curriculum database (Grades V–XII, chapters, lessons, formulas)
        ├── worksheets.js           # Worksheets database (3 difficulty tiers, 5 problems, rubrics)
        └── simulations.js          # Exam simulation database for EN8 and BAC12
```

### Core Classes Overview:

| Class | Responsibility |
| :--- | :--- |
| **`AuthService`** | Manages cloud registration, password authentication with Supabase, active session persistence, dynamic header user pill/avatar rendering, and profile data synchronization. |
| **`GamificationManager`** | Calculates XP rewards, level transitions, daily streak logic (`🔥`), badge unlocking, animated toast notifications, and user achievement modals. |
| **`ThemeManager`** | Controls theme CSS class application on the `<body>` element, handles the theme switcher dropdown, and persists user preferences in `localStorage`. |
| **`UIManager`** | Orchestrates screen transitions (Home, Class Select, Curriculum, Theory, Exam Simulations), exam countdown timers, worksheet modals, Spotlight Search, and triggers KaTeX re-rendering. |
| **`app.js`** | Instantiates services, provides global compatibility bridges for inline HTML attributes (`onclick`, `onsubmit`), and boots the application on `DOMContentLoaded`. |

---

## 🛠️ Technology Stack

- **Frontend Core:** Semantic HTML5, modern JavaScript (ES6+ Classes, async/await).
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) (Native Dark Mode, Glassmorphism, smooth animations).
- **Math Engine:** [KaTeX](https://katex.org/) (High-performance web math typesetting).
- **Backend & Database:** [Supabase](https://supabase.com/) (Managed PostgreSQL Cloud & Supabase Auth).
- **Icons:** [Font Awesome 6](https://fontawesome.com/).
- **Deployment:** [Vercel](https://vercel.com/) (Global Edge CDN static hosting).

---

## 💻 Local Setup & Development

MateHub is built as a zero-build static single-page application (no mandatory `npm install` or bundlers required). It runs immediately on any operating system.

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/matehub.git
cd matehub
```

### Step 2: Run in Your Browser

Choose any of the following lightweight methods:

#### Option A: Using Python (Recommended)
If you have Python 3 installed:
```bash
python3 -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000`

#### Option B: Using Node.js (`npx serve`)
```bash
npx serve .
```

#### Option C: VS Code Live Server
If you use Visual Studio Code, install the **Live Server** extension, right-click `index.html`, and select **"Open with Live Server"**.

#### Option D: Direct Browser Launch
Simply double-click `index.html` to open it in Google Chrome, Safari, Mozilla Firefox, or Microsoft Edge.

---

## ☁️ Supabase Cloud Configuration (Optional)

MateHub includes an integrated local storage fallback. To connect your own Supabase project:

1. Create a free account at [supabase.com](https://supabase.com) and start a new project.
2. In the Supabase dashboard, navigate to the **SQL Editor** and run the following script to create the `profiles` table:

```sql
-- Create profiles table for MateHub users
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  grade text,
  xp integer default 0,
  streak integer default 1,
  best_streak integer default 1,
  last_active_date date default current_date,
  completed_lessons jsonb default '[]'::jsonb,
  unlocked_badges jsonb default '{}'::jsonb,
  worksheets_count integer default 0,
  exams_count integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policy: Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using ( auth.uid() = id );

-- Policy: Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Policy: Insert profile on registration
create policy "Users can insert own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );
```

3. Open `js/services/AuthService.js` and set `this.supabaseUrl` and `this.supabaseAnonKey` to match your keys from **Project Settings -> API**.

---

## 🚀 Hosting & Deployment (Vercel)

MateHub is optimized for 1-click deployment on **Vercel** with **$0 hosting costs (Hobby Plan)** and global edge performance.

### Method 1: Deployment via Vercel CLI
```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Log in and deploy from project directory
cd matehub
vercel
```
Follow the terminal prompts (press `Enter` to accept defaults). You will receive an instant production URL (e.g., `https://matehub.vercel.app`).

### Method 2: Deployment via GitHub / GitLab Integration
1. Push your repository to GitHub.
2. Navigate to [vercel.com](https://vercel.com) and select **"Add New..." -> "Project"**.
3. Import your `matehub` repository.
4. Vercel automatically detects the static HTML/JS structure. Click **"Deploy"**.
5. Every subsequent `git push` triggers automatic, instantaneous production deployments!

---

## 🤝 Contributing

Contributions are warmly welcomed! To contribute new lessons, formula enhancements, or feature ideas:

1. **Fork** the repository.
2. Create your feature branch (`git checkout -b feature/amazing-lesson`).
3. Commit your changes (`git commit -m 'Add lesson on Theorem of Three Perpendiculars'`).
4. Push to your branch (`git push origin feature/amazing-lesson`).
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the terms of the **MIT License** — completely free for personal, educational, and commercial use. See the license file for details.

---

<p align="center">
  Built with passion for accessible mathematics education 🇷🇴 • <strong>MateHub</strong>
</p>
