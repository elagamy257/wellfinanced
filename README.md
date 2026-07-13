# 💰 Fintova

> **AI-Powered Financial Stability Engine for Freelancers & Independent Workers**

Fintova helps freelancers and independent workers achieve financial predictability by organizing income, expenses, and debts — powered by an AI assistant that learns their patterns and recommends smart financial practices.

---

## 🎯 What It Does

Freelancers face a unique financial challenge: irregular income vs. fixed monthly obligations. Fintova solves this through **5 AI-powered pillars**:

| Pillar | Feature | Description |
|--------|---------|-------------|
| 1️⃣ | **Predictive Income Forecasting** | Analyzes historical earnings to predict income for the next 1–3 months with confidence levels |
| 2️⃣ | **Cashflow Smoothing** | Simulates a "stable salary" from irregular income so you can budget like you have a steady paycheck |
| 3️⃣ | **Debt & Bill Prioritization** | AI-ranked payment queue sorted by due date, interest rate, and current cash position |
| 4️⃣ | **Behavioral Financial Advisor** | RAG-based personalized tips grounded in your own financial data — not generic advice |
| 5️⃣ | **Goal-Based Savings Planner** | Dynamic monthly contributions per goal, adjusted automatically when income fluctuates |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router + Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **State Management** | Zustand |
| **Server State** | TanStack Query (React Query v5) |
| **Forms & Validation** | React Hook Form + Zod |
| **HTTP Client** | Axios |
| **Theme** | next-themes (dark/light mode) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login & Register pages
│   └── (dashboard)/     # Main dashboard routes
├── components/
│   ├── layout/          # Layout components (Sidebar, Navbar, etc.)
│   └── ui/              # Reusable UI components (Button, Card, Modal, etc.)
├── features/            # Feature modules (co-located logic, UI, hooks)
│   ├── ai/              # AI advisor & recommendations
│   ├── analytics/       # Analytics & reporting
│   ├── auth/            # Authentication
│   ├── dashboard/       # Dashboard overview
│   ├── goals/           # Goal-based savings planner
│   ├── obligations/     # Debt & bill management
│   ├── profile/         # User profile
│   ├── reports/         # Financial reports
│   ├── savings/         # Savings tracking
│   ├── settings/        # App settings
│   ├── taxes/           # Tax tracking
│   └── transactions/    # Income & expense tracking
├── hooks/               # Shared custom hooks
├── lib/                 # Library configs (React Query client, etc.)
├── services/            # API service layer
├── store/               # Zustand global store
├── styles/              # Global styles
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v20+`
- npm `v10+`

### Installation

```bash
# Clone the repository
git clone https://github.com/elagamy257/wellfinanced.git
cd wellfinanced

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## ✅ MVP Scope & Assumptions

- **Data input is manual in v1** — no bank sync or external API integrations
- **AI Forecasting requires ≥ 3 months** of logged income history; the system degrades gracefully with less data
- **RAG-based Advisor** is grounded in the user's own financial history — not a generic knowledge base alone
- **Single-currency** per user profile — multi-currency is deferred
- The **"smoothed salary"** feature is a recommendation only — no actual fund movement occurs
- **No automatic bill payment** — requires payment integration (out of scope for MVP)

---

## 🗺️ Roadmap (Deferred to Future Stories)

- [ ] Automatic bill payment (requires payment integration)
- [ ] Aggregated wallet / multi-account view (requires bank/wallet API)
- [ ] Multi-currency support
- [ ] Team / shared freelance finances
- [ ] Mobile app

---

## 📄 License

This project is private and proprietary.
