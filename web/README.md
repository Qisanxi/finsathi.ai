# FinSaathi Web — React (Next.js 16)

The v2 React transformation of FinSaathi. See the [root README](../README.md) for full documentation, architecture and flow diagrams.

## Quick start

```bash
bun install   # or npm install
bun run dev   # or npm run dev
```

Open http://localhost:3000. No environment variables or API keys are required.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui · Zustand (persisted) · Framer Motion · react-markdown + remark-gfm · server-side LLM SDK via `/api/chat`

## Layout

- `src/app/page.tsx` — view switcher (Landing ⇄ Profile ⇄ Chat)
- `src/components/finsathi/` — landing page, profile form, chat UI, comparator
- `src/lib/finsathi/` — ported core logic: data, prompts, intent modes, store
- `src/app/api/chat/route.ts` — chat backend (intent detection + LLM)
