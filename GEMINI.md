# Cyclone Atlas India

## Project Overview
**Cyclone Atlas India** is a visually striking, data-driven, and educational dashboard focused on cyclones and their impact on India's coastal regions. The project is designed with a "NASA mission control" aesthetic—modern, cinematic, and data-rich.

### Core Features
- **Interactive Timeline**: A historical exploration of cyclone events with spatial and seasonal mapping.
- **Future Risk Outlook**: A pattern-based risk estimation tool (rule-based or ML-lite) for coastal vulnerability.
- **Precaution Center**: A safety-first guide for "Before, During, and After" cyclone stages.
- **Impact Archive**: A searchable repository of past cyclone incidents.
- **AI Chat Assistant**: A Gemini-powered sidebar assistant specialized in Indian cyclone awareness and history.

### Main Technologies
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Viz**: [Recharts](https://recharts.org/) / [Chart.js](https://www.chartjs.org/)
- **AI**: [Google Gemini API](https://ai.google.dev/) (via Google AI SDK or Vercel AI SDK)

---

## Building and Running

The project uses `pnpm` as the package manager.

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Production Start**: `pnpm start`
- **Linting**: `pnpm lint`

---

## Architecture & Data Strategy

### Directory Structure
- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components (Navbar, Footer, Hero, Map, etc.).
- `src/data/`: Static JSON files (`cyclones.json`, `coastalRegions.json`) serving as the primary data source.
- `public/`: Assets such as SVG maps, cyclone icons, and textures.

### Data Model
Historical cyclone data is stored in `src/data/cyclones.json` with fields:
- `name`: Cyclone name (e.g., "Amphan")
- `year`: Year of occurrence
- `states`: Array of affected coastal states
- `intensity`: Category (e.g., "Extremely Severe")
- `impact`: Array of impact tags (flooding, power outage, etc.)

---

## Development Conventions

### Visual Design (The "UI Signature")
- **Color Palette**: Midnight Navy background (`#020617`), Slate surface cards, Cyan/Electric Blue accents.
- **Effects**: Use glassmorphism (`backdrop-blur-md`), glowing borders, and smooth Framer Motion transitions.
- **Typography**: Bold modern sans-serif for headings (Geist/Inter), clean readable body text.

### Implementation Standards
- **Surgical Updates**: Prefer small, targeted changes to components.
- **Verification**: Always verify data rendering against `cyclones.json`.
- **AI Integration**: The `ChatAssistant` component should have a strict system prompt focusing on safety and historical accuracy.
- **Responsive Design**: Ensure the dashboard remains usable on tablets and mobile devices, prioritizing the "Mission Control" feel on desktop.

---

## TODOs / Next Steps
- [ ] Finalize `src/data/cyclones.json` with at least 10 major historical cyclones.
- [ ] Implement the animated cyclone swirl hero component.
- [ ] Integrate Gemini API for the Chat Assistant side panel.
- [ ] Build the interactive SVG-based India coastal map.
