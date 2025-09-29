'use client'
import BudgetForm from '@/components/BudgetForm'
import ExpenseForm from '../components/ExpenseForm'
import { useLocalStorage } from '@/hooks/useLocalStorage'

function formatCurrency(cents: number, currency='USD') {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format((cents || 0) / 100)
}

type Expense = { id: string; description: string; amount: number; categoryId: string; date: string }
type Category = { id: string; name: string; color: string }

const DEFAULT_CATEGORIES: Category[] = [
  { id:'food',       name:'Food',          color:'#06b6d4' },
  { id:'transport',  name:'Transport',     color:'#22c55e' },
  { id:'shopping',   name:'Shopping',      color:'#a855f7' },
  { id:'bills',      name:'Bills',         color:'#ef4444' },
  { id:'entertain',  name:'Entertainment', color:'#f59e0b' },
  { id:'general',    name:'General',       color:'#64748b' },
]

export default function Home() {
  const [budgetCents, setBudgetCents] = useLocalStorage<number>('bb:budget', 0)
  const [categories, setCategories]   = useLocalStorage<Category[]>('bb:categories', DEFAULT_CATEGORIES)
  const [expenses, setExpenses]       = useLocalStorage<Expense[]>('bb:expenses', [])

  const addExpense = (data: {description:string; amount:number; categoryId:string; date:string}) => {
    const id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
      ? crypto.randomUUID()
      : `exp-${Date.now()}`
    setExpenses(prev => [{ id, ...data }, ...prev])
  }

  const addCategory = (c: Category) => setCategories(prev => [c, ...prev])

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

      {/* Add Expense */}
      <section className="rounded-2xl border bg-white p-6 dark:bg-black">
        <h2 className="text-xl font-semibold">Add Expense</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose a category or pick <strong>Other</strong> to add a custom type.
        </p>
        <div className="mt-4">
          <ExpenseForm
            categories={categories}
            onAdd={addExpense}
            onAddCategory={addCategory}
          />
        </div>
      </section>

      {/* Quick sanity list (last 3 expenses) */}
      <section className="rounded-2xl border bg-white p-6 dark:bg-black">
        <h3 className="text-lg font-semibold">Recent (3)</h3>
        <ul className="mt-3 space-y-2">
          {expenses.slice(0,3).map(e => (
            <li key={e.id} className="flex items-center justify-between rounded-xl border px-3 py-2">
              <span className="truncate">{e.description}</span>
              <span className="font-medium">{formatCurrency(e.amount)}</span>
            </li>
          ))}
          {expenses.length === 0 && (
            <li className="text-sm text-gray-500 dark:text-gray-400">No expenses yet</li>
          )}
        </ul>
      </section>


    </main>
  )
}
