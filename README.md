# Nexus Global Group — Executive Intelligence Platform

A multifunctional executive website for **Nexus Global Group**, combining a premium marketing landing page, an interactive dashboard, and supporting pages for Aviation and Education divisions.

Built with **Next.js 16 (App Router)**, **TypeScript**, and a custom dark-theme design system.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Nav, global fonts
│   ├── globals.css         # Design system, tokens, all page styles
│   ├── page.tsx            # Landing/Home page
│   ├── dashboard/          # Executive dashboard (KPIs, pipeline, priorities)
│   ├── oportunidades/      # Opportunities pipeline with filters/sorting
│   ├── prioridades/        # Priority initiatives with progress bars
│   ├── plano-15-dias/      # 15-day action timeline/checklist
│   ├── servicos/           # Services pages (Aviation + Education)
│   ├── contato/            # Contact form
│   ├── briefing/           # AI-powered daily executive briefing
│   ├── curso-pe-de-galinha/ # Legacy page
│   └── api/
│       ├── briefing/       # Briefing generation API (OpenAI)
│       └── image/          # AI image generation API
├── components/
│   ├── Nav.tsx             # Responsive sticky navigation
│   ├── Button.tsx          # Reusable button component
│   └── UI.tsx              # Card, StatCard, Badge, SectionHeader components
├── data/
│   └── dashboard-data.ts   # Mock/seed data for dashboard (typed)
└── lib/
    ├── types.ts            # Core briefing types
    ├── dashboard-types.ts  # Dashboard data interfaces
    └── seed.ts             # Briefing seed data
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Copy env example and fill in your OpenAI key (for briefing generation only)
cp .env.example .env.local

# Start development server
npm run dev
# → http://localhost:3000
```

**The site runs fully without an API key** — all dashboard and landing pages use static mock data. The API key is only required to generate new AI briefings via the `/briefing` page.

---

## Customizing Branding / Content

| What to change | Where |
|---|---|
| Brand name, nav links | `src/components/Nav.tsx` |
| Colors, spacing, typography | `src/app/globals.css` → `:root` section |
| Landing page copy & sections | `src/app/page.tsx` |
| Dashboard KPIs & mock data | `src/data/dashboard-data.ts` |
| Service descriptions | `src/app/servicos/page.tsx` |
| Contact channels | `src/app/contato/page.tsx` |
| Briefing seed content | `src/lib/seed.ts` |

---

## Plugging in APIs

All dashboard data is currently served from `src/data/dashboard-data.ts` with fully typed TypeScript interfaces in `src/lib/dashboard-types.ts`.

To connect live data:

1. **Replace** the `dashboardData` import in each page with an `async` data-fetching function (Server Component) or a `useSWR` / `React Query` hook (Client Component).
2. The interfaces (`KPIItem`, `Opportunity`, `PriorityItem`, etc.) are already defined — your API responses just need to match them.
3. For the briefing page, configure `OPENAI_API_KEY` and `NEXUS_ACCESS_CODE` in `.env.local`.

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, services, capabilities, CTAs |
| `/dashboard` | Executive dashboard — KPIs, pipeline, priorities, 15-day plan, alerts |
| `/oportunidades` | Opportunities pipeline with status/segment filters and sorting |
| `/prioridades` | Priority initiatives with progress tracking |
| `/plano-15-dias` | 15-day action timeline with status filtering |
| `/servicos` | Aviation and Education service catalog |
| `/contato` | Contact form and channel information |
| `/briefing` | AI-powered daily executive briefing (requires API key) |

---

## Recommended Next Steps

1. **API integration** — Connect dashboard widgets to live CRM, ERP, or custom backend APIs
2. **Authentication** — Add role-based access control (e.g., NextAuth.js) for dashboard/admin sections
3. **CMS** — Move landing page copy and service descriptions to a headless CMS (e.g., Sanity, Contentful)
4. **Analytics** — Add event tracking for CTA clicks, dashboard usage, form submissions
5. **i18n** — Add English language support for international clients
6. **Notifications** — Real-time alerts panel with WebSocket or SSE for operational risk events
