'use client'
import { useState } from 'react'

function parseCurrencyToCents(input: string) {
  const n = Number(input.replace(/[^0-9.\-]/g, ''))
  return Math.round((isNaN(n) ? 0 : n) * 100)
}

export default function BudgetForm({
  budgetCents,
  onSetBudget,
}: {
  budgetCents: number
  onSetBudget: (cents: number) => void
}) {
  const [input, setInput] = useState((budgetCents / 100 || 0).toString())

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSetBudget(parseCurrencyToCents(input)) }}
      className="flex w-full flex-col gap-3 sm:flex-row"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-14 flex-1 rounded-2xl border bg-white px-4 text-base dark:bg-black"
        placeholder="$2,500"
        inputMode="decimal"
        aria-label="Monthly budget"
      />
      <button className="h-14 rounded-2xl bg-[hsl(var(--primary,199_89%_48%))] px-6 text-base font-medium text-white">
        Set Budget
      </button>
    </form>
  )
}
