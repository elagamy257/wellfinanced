# Fintova AI Agent Rules

## Project Overview

Fintova is a production-grade Mobile-First AI Financial Assistant for Freelancers.

Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- App Router

---

# Core Principle

Every generated code must be production-ready.

Never generate demo-quality code.

Never leave the project in a broken state.

---

# design
The provided HTML from Stitch is a visual reference only.

Never translate it literally.

Rebuild every screen using reusable React components, Tailwind CSS utilities, and the project's design system.

Never embed CSS inside React components.

Never use <style> blocks or custom non-standard CSS classes (e.g. `.inp`, `.field`, `.btn-primary`). Everything must be 100% Tailwind CSS classes mapped to globals.css tokens.

Never copy HTML structure blindly.

Extract repeated UI into reusable components.

### UI Library Reuse
Always reuse components from `src/components/ui/` (e.g., `Input`, `Button`, `Card`, `Modal`). Do NOT rebuild forms, buttons, or inputs with custom HTML tags if a reusable component already exists in the design system.

### Page Layout Responsiveness
General pages (such as Login, Register, Landing Page, etc.) must be fully responsive across all viewports:
- Desktop should render a spacious, proper desktop layout (e.g., dual-pane or full-screen grid).
- Never wrap general auth/landing pages in a forced mobile-viewport simulator wrapper (like `max-w-[430px] border-x shadow-2xl`) on desktop.
- Save mobile viewport containment strictly for dashboard/app simulation views if explicitly requested.

Follow production-grade architecture, not prototype code.

# Before Finishing Any Task

Always perform a final review.

Fix:

- TypeScript errors
- ESLint errors
- Build errors
- Hydration issues
- Accessibility issues
- Dead code
- Unused imports
- Unused variables
- Duplicate code
- Tailwind conflicts

Never finish until the edited files are clean.

---

# Responsive Layout

The application must be fully responsive (Mobile & Desktop).

Rules:

- Match the design in the stitch files for both desktop and mobile viewports.
- Never allow horizontal scrolling.
- Mobile layout should work perfectly (320px–430px).

---

# Next.js Rules

- Use Server Components by default
- Add "use client" only when required
- Use next/image instead of img
- Use next/link instead of a
- Never move client libraries into Server Components

---

# Client Component Rules

Libraries requiring browser APIs must stay inside Client Components.

Examples:

- React Hooks
- Framer Motion
- Zustand
- React Hook Form
- Recharts
- Browser Storage
- Window / Document APIs

---

# Hydration Safety

Avoid hydration mismatches.

When reading client-only state:

- localStorage
- sessionStorage
- persisted Zustand stores

Always wait until mounted.

---

# Tailwind CSS Rules

Use Tailwind CSS v4 canonical utilities.

Prefer:

- grow
- shrink-0
- h-px

Never:

- duplicate utilities
- conflicting classes
- duplicate ring utilities
- duplicate text colors

Use design tokens.

Never hardcode colors if a token already exists.

---

# Components

Components must be:

- reusable
- typed
- modular
- readable
- small

Extract repeated UI.

Avoid giant files.

---

# Project Structure

Respect the existing architecture.

Do not create random folders.

---

# Design System

Follow:

- style.txt

Do not invent:

- colors
- typography
- spacing
- radius

---

# Business Logic

Follow:

- user story.txt

Do not invent features.

Do not change business rules.

---

# Generated Files

Ignore:

- stitch/
- generated/
- exports/
- temp/

unless explicitly requested.

---

# Charts

Charts must be responsive.

Never use fixed widths.

Always prevent overflow.

---

# Images

Always prefer next/image.

Optimize assets.

---

# Final Checklist

Before every response verify:

✓ TypeScript passes

✓ ESLint passes

✓ Build passes

✓ No hydration issues

✓ No Tailwind conflicts

✓ No unused imports

✓ No unused variables

✓ No duplicate code

✓ Mobile layout works (320–430px)

✓ Components are reusable

Only then return the final code.