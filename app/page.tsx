'use client'
import BudgetForm from '@/components/BudgetForm'
import { useLocalStorage } from '@/hooks/useLocalStorage'

function formatCurrency(cents: number, currency='USD') {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format((cents || 0) / 100)
}

export default function Home() {
  const [budgetCents, setBudgetCents] = useLocalStorage<number>('bb:budget', 0)

  return (
    <main className="space-y-6">
      <section className="rounded-2xl border bg-white p-6 dark:bg-black">
        <h1 className="text-2xl font-semibold">Set Your Monthly Budget</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Current: <strong>{formatCurrency(budgetCents)}</strong>
        </p>

        <div className="mt-4">
          <BudgetForm budgetCents={budgetCents} onSetBudget={setBudgetCents} />
        </div>
      </section>
    </main>
  )
}
