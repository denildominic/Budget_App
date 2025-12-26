ByteBudget — Modern Personal Finance Dashboard
ByteBudget is a fast, minimalist budget app built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui. It focuses on clarity, keyboard-friendly
input, and real-time insights so you can track spending without friction.

✨ Features
Beautiful Light/Dark UI with system preference + manual toggle
Accounts & Categories (income/expense) with editable budgets
Smart Transactions (quick add, CSV import, inline edit)
Analytics: monthly burn rate, category trends, cashflow, savings rate
Goals: envelopes/targets with progress bars
Search & Filters: by account, category, date range, amount, text
Offline-friendly UI; optimistic updates for snappy interactions
Accessible: semantic components, focus states, keyboard shortcuts
UI built with shadcn/ui components and Tailwind design tokens for a clean, Apple-like aesthetic.

🧰 Tech Stack
Next.js 15 (App Router + Turbopack)
TypeScript
Tailwind CSS + shadcn/ui
Zustand or Redux Toolkit (state)
Zod (schema validation)
Prisma + SQLite/PostgreSQL (data)
Next Themes (dark mode)
React Hook Form (forms)

🚀 Quick Start

# 1) Clone the Budget App repository

https://github.com/denildominic/Budget_App.git

cd Budget_App

# 2) Install dependencies

npm install

### or: pnpm i / yarn

# 3) Environment

cp .env.example .env.local

# 4) Dev

npm run dev

open http://localhost:3000

Build & start

npm run build
npm run start



