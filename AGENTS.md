# WellFinanced AI Agent Instructions

## Project Overview

WellFinanced is a Mobile-First AI-powered Financial Assistant for Freelancers.

Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form
- Zod
- Lucide React

---

# General Rules

Always produce production-ready code.

Before finishing ANY task:

- Fix all TypeScript errors.
- Fix all ESLint errors.
- Remove unused imports.
- Remove unused variables.
- Prefer const over let.
- Remove dead code.
- Never leave TODOs unless requested.
- Never break existing functionality.

---

# Next.js Rules

- Use App Router.
- Use Server Components by default.
- Add "use client" only when necessary.
- Use next/image instead of img.
- Use next/link instead of anchor tags.
- Never create unnecessary Client Components.

---

# Tailwind Rules

Use Tailwind CSS v4 best practices.

Prefer:

- grow instead of flex-grow
- shrink-0 instead of flex-shrink-0
- h-px instead of h-[1px]

Avoid conflicting utilities.

Never use:

ring ring-1

or

text-white text-pink-400

Use only one utility for the same CSS property.

---

# Code Quality

Components must be:

- Reusable
- Small
- Readable
- Typed
- Modular

Extract repeated UI into reusable components.

---

# Folder Structure

Never change the architecture.

Use:

src/

components/

hooks/

lib/

services/

types/

constants/

utils/

app/

Do not create random folders.

---

# Design System

Follow the project's Design System.

Do NOT invent new colors.

Do NOT invent spacing.

Do NOT invent typography.

Respect existing design tokens.

Mobile First only.

Maximum width:

430px

Desktop should display a centered mobile layout.

Do NOT create desktop pages unless requested.

---

# User Stories

All features must follow the project User Stories.

Never invent business logic.

Never add fake features.

---

# Generated Files

Ignore folders:

stitch/

generated/

exports/

temp/

unless explicitly requested.

---

# Before Every Response

Mentally perform:

1. TypeScript check
2. ESLint check
3. Tailwind cleanup
4. Refactor duplicated code
5. Remove warnings
6. Ensure build succeeds

Only then generate the final code.