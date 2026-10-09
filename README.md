# Jeevith | Full-Stack Developer Portfolio

A modern, high-performance personal portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features dynamic interactive cursor lighting effects, an integrated REST API backend, a built-in interactive terminal, and a live project management dashboard.

---

## ✨ Features

- **Dynamic Interactive Cursor Glow**: Smooth physics-interpolated radial spotlight tracking cursor motion with responsive background parallax.
- **Project Showcase**: Filterable portfolio projects with live demo links, source code, and tech tags.
- **Interactive Terminal**: CLI modal interface for exploring system stats, skills, projects, and contact info via command line.
- **Project Management Admin**: Modal & drawer to view, add, and manage portfolio projects via REST APIs.
- **Interactive Contact Form**: Direct message dispatch with validation and feedback.
- **Light Theme with Dark Royal Blue Accents**: Elegant, accessible, high-contrast modern design.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Backend & API**: Next.js Route Handlers (`/api/projects`, `/api/skills`, `/api/experience`, `/api/contact`, `/api/stats`)
- **Database**: Local JSON persistence engine (`data/db.json`)
- **Fonts**: Inter via `next/font/google`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone git@github.com:jeevith-LS/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── data/
│   └── db.json                 # JSON database store
├── src/
│   ├── app/
│   │   ├── api/                # REST API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main portfolio page
│   ├── components/             # React UI components
│   └── types/                  # TypeScript definitions
└── public/                     # Static assets & icons
```

---

## 📜 License
MIT
