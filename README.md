# 💼 JobBoard — Remote Job Listing Platform

A fully functional job board application built with Next.js 15, TypeScript and Tailwind CSS. Browse real remote job listings, search and filter by category and job type, view detailed job descriptions and post new job vacancies.

## 🚀 Live Demo

🔗 https://job-board-ten-mu.vercel.app/

---

## 📸 Features

- 🏠 **Homepage** — Hero section with featured 6 job listings fetched from real API
- 🔍 **Job Listings** — Full job board with search, category filter and job type filter
- ⚡ **Debounced Search** — 500ms delay prevents excessive API calls while typing
- 🔗 **URL-based State** — Filters stored in URL query params — shareable and bookmarkable
- 📄 **Job Detail** — Full job description, company info, job type, region and Apply button
- 📝 **Post a Job** — Full form with validation covering all fields
- 📱 **Mobile Responsive** — Clean layout across all screen sizes

---

## 🧠 Key Architecture Decisions

### URL-based State vs useState for Filters

Most developers store search filters in `useState`. This project uses **URL query params** instead:

```
❌ useState — filter lost when you share the link
/jobs  ← your friend sees ALL jobs, not your filtered results

✅ URL state — filter preserved in the link
/jobs?search=react&category=Software+Development&type=full_time
← your friend sees exactly what you see
```

Three reasons URL state wins:
- **Shareable** — send the URL, the recipient sees the same filtered results
- **Bookmarkable** — save your search for later
- **Browser back/forward works** — pressing back restores your previous search

### Server Components for Data Fetching

Job listings and job detail pages are **Server Components** — data fetched on the server before HTML is sent to the browser. No `useEffect`, no loading spinners, instant content.

```tsx
// Server Component — fetch directly in the component
export default async function JobsPage({ searchParams }) {
  const { search } = await searchParams;
  const res = await fetch("https://remotive.com/api/remote-jobs");
  const jobs = data.jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );
  return <JobsList jobs={jobs} />;
}
```

### Debounced Search

The `SearchBar` uses `useEffect` with cleanup to debounce input — waits 500ms after the user stops typing before updating the URL:

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search); // fires 500ms after last keystroke
  }, 500);

  return () => clearTimeout(timer); // cancel if user types again
}, [search]);
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework — App Router, SSR, file-based routing |
| TypeScript | Type safety throughout |
| Tailwind CSS | Utility-first styling |
| Remotive API | Real remote job listings |
| URL Search Params | Filter state management |
| useEffect + cleanup | Debounced search |

---

## ⚛️ Concepts Demonstrated

- Server Components — data fetching without useEffect
- `searchParams` as Promise — Next.js 15 async searchParams pattern
- `await params` — Next.js 15 dynamic route params
- URL-based state — `useRouter` + `useSearchParams` for filter management
- Debouncing — `useEffect` cleanup to prevent excessive API calls
- `dangerouslySetInnerHTML` — rendering HTML job descriptions from API
- Type conversion — `String(j.id) === id` for URL string to API number comparison
- Controlled forms — full validation with inline error messages
- Union types — `React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>`
- `Array.filter()` — server-side filtering by search, category and job type
- `Array.find()` — locating a specific job by id
- `Array.slice()` — limiting featured jobs to 6 on homepage

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                   → Root layout with Navbar
│   ├── page.tsx                     → Homepage with featured jobs
│   ├── jobs/
│   │   ├── page.tsx                 → Job listings with search + filter
│   │   └── [id]/
│   │       └── page.tsx             → Job detail page
│   └── post-job/
│       └── page.tsx                 → Post a job form
├── components/
│   ├── Navbar.tsx                   → Site navigation
│   ├── SearchBar.tsx                → Debounced search input (Client)
│   └── FilterBar.tsx                → Category + job type filters (Client)
└── types/
    └── index.ts                     → Job and JobsResponse interfaces
```

---

## 🔌 API

This project uses the **Remotive API** for real remote job listings:

```
GET https://remotive.com/api/remote-jobs          → All jobs
GET https://remotive.com/api/remote-jobs?limit=6  → Limited jobs (homepage)
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Oluwamighty/job-board.git

# Navigate into the project
cd job-board

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Responsive Design

Every page is fully responsive across:
- 📱 Mobile (< 640px) — single column, full-width inputs
- 💻 Tablet (640px - 1024px) — two-column job grid
- 🖥️ Desktop (> 1024px) — three-column job grid, full search bar

---

## 🔮 Future Improvements

- Connect to a real database (PostgreSQL + Prisma)
- User authentication — save jobs to personal account
- Pagination — load more jobs on scroll
- Email notifications for new job matches
- Company profiles and dashboards

---

## 👨‍💻 Author

**Ojo Azeez Olawale**
- GitHub: [@Oluwamighty](https://github.com/Oluwamighty)
- Portfolio: [oluwamighty.github.io/portfolio](https://oluwamighty.github.io/portfolio)
- Email: olawaleojo42@gmail.com

---

## 📄 License

MIT License — feel free to use this project as a reference or starting point.