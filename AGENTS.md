# WellFinanced AI Agent Rules

## Project Overview

WellFinanced is a production-grade Mobile-First AI Financial Assistant for Freelancers.

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

# Mobile First

The application is Mobile First.

Rules:

- Maximum width: 430px
- Desktop displays a centered mobile container
- Never create desktop layouts unless explicitly requested
- Never allow horizontal scrolling

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