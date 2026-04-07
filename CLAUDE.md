@AGENTS.md

# Cyclone Atlas India

## Project Overview
**Cyclone Atlas India** is a visually striking, data-driven, and educational dashboard focused on cyclones and their impact on India's coastal regions. The project is designed with a "NASA mission control" aesthetic—modern, cinematic, and data-rich.

### Core Features
- **Interactive Timeline** (`/timeline`): Historical exploration of cyclone events with a sidebar list, detail panel, tactical map overlay, severity legend, and intelligence summary. Clicking a cyclone updates the entire view.
- **Future Risk Outlook** (`/risk`): A dynamic risk estimation engine using a weighted formula based on historical frequency, seasonal vulnerability, and coastal exposure. Gauge ring color and factor bars update in real-time.
- **Precaution Center** (`/precaution`): Safety-first guide for "Before, During, and After" cyclone stages.
- **Impact Archive** (`/archive`): Searchable, filterable grid of past cyclone incidents with detail modals. "Detailed Log Analysis" button opens full cyclone intelligence view.
- **AI Chat Assistant**: Gemini-powered sidebar assistant (`ChatAssistant.tsx`) with strict system prompt focused on Indian cyclone awareness and safety. Accessible via "Ask AI" button in navbar.

### Main Technologies
- **Framework**: Next.js 16.2.2 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS 4 with `@tailwindcss/postcss`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Google Gemini API (`@google/generative-ai`) — model: `gemini-2.5-flash`
- **Utilities**: `clsx`, `tailwind-merge` (combined in `src/lib/utils.ts` as `cn()`)
- **Package Manager**: pnpm

---

## Building and Running

- **Development**: `pnpm dev` (runs on port 3000)
- **Build**: `pnpm build`
- **Production Start**: `pnpm start`
- **Linting**: `pnpm lint`

### Environment Variables
- `NEXT_PUBLIC_GEMINI_API_KEY` — Google Gemini API key (stored in `.env.local`)
  - Must be a valid key from [Google AI Studio](https://aistudio.google.com/apikey)
  - Free tier has rate limits; if exhausted, AI chat shows "CONNECTION REFUSED" with "System Offline" status (this is handled gracefully in the UI)

---

## Architecture & Data Strategy

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (wraps PageTransition)
│   ├── page.tsx            # Home dashboard (hero, recent events, map, footer)
│   ├── globals.css         # Global styles + Tailwind @theme tokens
│   ├── archive/page.tsx    # Impact Archive (filterable grid + detail modal)
│   ├── risk/page.tsx       # Risk Outlook (dynamic calc engine + gauge)
│   ├── timeline/page.tsx   # Intelligence Timeline (sidebar + detail panel + map)
│   └── precaution/page.tsx # Precaution Center
├── components/
│   ├── ChatAssistant.tsx   # AI chat sidebar panel (Gemini integration)
│   ├── CoastalMap.tsx      # Interactive SVG map of India (highlights affected states)
│   ├── Hero.tsx            # Animated hero section
│   ├── InsightCards.tsx    # Stat cards (cyclone count, fatalities, etc.)
│   ├── Navbar.tsx          # Glass navbar with active route state + "Ask AI" button
│   └── PageTransition.tsx  # Route change animation wrapper
├── data/
│   ├── cyclones.json       # 10 major historical cyclones
│   └── coastalRegions.json # Coastal states with risk levels and regions
└── lib/
    ├── gemini.ts           # Gemini API wrapper (chatWithGemini function)
    └── utils.ts            # cn() utility (clsx + tailwind-merge)
```

### Data Model — `cyclones.json`
```typescript
interface Cyclone {
  name: string;           // e.g., "Amphan"
  year: number;           // e.g., 2020
  date: string;           // e.g., "May 20, 2020"
  states: string[];       // e.g., ["West Bengal", "Odisha"]
  intensity: string;      // e.g., "Super Cyclonic Storm"
  landfall: string;       // e.g., "Bakkhali, West Bengal"
  description: string;    // Multi-sentence impact description
  impact: string[];       // e.g., ["flooding", "power outage", "infrastructure damage"]
}
```

### Data Model — `coastalRegions.json`
```typescript
interface CoastalRegion {
  state: string;          // e.g., "Gujarat"
  region: string;         // "East Coast" | "West Coast" | "Islands"
  riskLevel: string;      // "Very High" | "High" | "Medium" | "Low"
}
```

### Risk Calculation Engine (`risk/page.tsx`)
The `computeRisk()` function uses a weighted formula:
- **Historical Frequency (40%)**: `(cycloneCountForState / totalCyclones) * 100`
- **Base Score × Seasonal Multiplier (30%)**: Risk level base (Very High=80, High=60, Medium=40, Low=20) × month multiplier (peak months=1.3, moderate=1.0, off-season=0.6)
- **Coastal Exposure (20%)**: East Coast=88, West Coast=62, Islands=55
- **Seasonal Vulnerability (10%)**: multiplier × 70

Thresholds: `≥80 Critical` | `≥60 High` | `≥30 Moderate` | `<30 Low`

---

## Development Conventions

### Visual Design (The "UI Signature")
- **Color Palette**: Midnight Navy background (`#020617`), Slate surface cards, Cyan/Electric Blue accents (`accent-cyan`, `accent-blue` defined in globals.css @theme)
- **Effects**: Glassmorphism (`glass-card` class: `backdrop-blur-xl`, `bg-slate-900/30`, `border-white/10`), glowing borders, smooth Framer Motion transitions
- **Typography**: Bold modern sans-serif for headings (Geist/Inter), clean readable body text, monospace for IDs/codes
- **Animation**: `animate-slide-up` for page transitions and detail panels, `active:scale-[0.98]` on interactive cards

### CSS Classes (defined in `globals.css`)
- `.glass-card` — Standard glassmorphism card
- `.glass-navbar` — Navigation bar glass effect
- `.btn-primary` — Cyan solid button
- `.btn-secondary` — Outline button
- `.nav-link`, `.nav-link-active` — Navigation link states
- `.animate-slide-up` — Slide-up entry animation

### Implementation Standards
- **Surgical Updates**: Prefer small, targeted changes to components. Do NOT redesign the UI.
- **Accessibility**: All interactive cards must have `tabIndex={0}`, `role="button"`, `aria-label`, and `onKeyDown` (Enter/Space) handlers with focus ring styling.
- **Footer Links**: Use the `footerRouteMap` dictionary in `page.tsx` to map link text to routes.
- **Verification**: Always verify data rendering against `cyclones.json` and `coastalRegions.json`.
- **AI Integration**: The `ChatAssistant` component has a strict system prompt focusing on safety and historical accuracy. Uses `gemini-2.5-flash` model. Error states are handled with "CONNECTION REFUSED" UI.
- **Deprecated APIs**: Use `onKeyDown` instead of `onKeyPress`. Wrap event handlers to avoid passing event objects as string arguments.
- **Responsive Design**: Ensure the dashboard remains usable on tablets and mobile, prioritizing the "Mission Control" feel on desktop.

---

## Resolved Issues (Session: April 6, 2026)
- [x] Fixed build-breaking missing `import Link` in `archive/page.tsx` and `risk/page.tsx`
- [x] Replaced hardcoded risk score (66) with dynamic `computeRisk()` weighted calculation
- [x] Fixed risk factor bars from hardcoded "85%" to computed percentages
- [x] Updated Gemini model from deprecated `gemini-1.5-flash` (404) to `gemini-2.0-flash`
- [x] Fixed deprecated `onKeyPress` → `onKeyDown` in `ChatAssistant.tsx`
- [x] Fixed type error: `handleSend` wrapped in arrow function on send button
- [x] Fixed dead footer links (all `href="#"` → actual route mapping)
- [x] Added keyboard accessibility to ArchiveCard, Recent Event cards, TimelineCard
- [x] Updated Gemini model to `gemini-2.5-flash` (Session: April 7, 2026)

## Known Issues / Status
- ⚠️ **Gemini API Key Quota**: Free tier quota may be exhausted. Replace key in `.env.local` with a fresh one from [Google AI Studio](https://aistudio.google.com/apikey) if chat shows "System Offline".
- The `1 Issue` / `2 Issues` badge visible in dev mode is Next.js dev overlay (not a production concern).
