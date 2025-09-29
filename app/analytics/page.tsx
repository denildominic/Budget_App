'use client'
import { useMemo } from 'react'
import ChartByCategory from '../../components/ChartByCategory'
import ChartTrend from '../../components/ChartTrend'
import { useLocalStorage } from '../../hooks/useLocalStorage'

type Expense = { id: string; description: string; amount: number; categoryId: string; date: string }
type Category = { id: string; name: string; color: string }

export default function AnalyticsPage() {
  const [categories] = useLocalStorage<Category[]>('bb:categories', [])
  const [expenses]   = useLocalStorage<Expense[]>('bb:expenses', [])

  // filter to current month
  const monthKey = new Date().toISOString().slice(0, 7) // "YYYY-MM"
  const monthExpenses = useMemo(
    () => expenses.filter(e => e.date.slice(0, 7) === monthKey),
    [expenses, monthKey]
  )

  // by category
  const byCategory = useMemo(() => {
    const map = new Map<string, number>()
    for (const e of monthExpenses) map.set(e.categoryId, (map.get(e.categoryId) ?? 0) + e.amount)
    const lookup = Object.fromEntries(categories.map(c => [c.id, c]))
    return Array.from(map.entries()).map(([categoryId, value]) => ({
      label: lookup[categoryId]?.name ?? 'Other',
      value,
      color: lookup[categoryId]?.color ?? '#64748b',
    }))
  }, [monthExpenses, categories])

  // daily trend (MM-DD)
  const trend = useMemo(() => {
    const map = new Map<string, number>()
    for (const e of monthExpenses) {
      const label = e.date.slice(5, 10) // "MM-DD"
      map.set(label, (map.get(label) ?? 0) + e.amount)
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([label, value]) => ({ label, value }))
  }, [monthExpenses])

  return (
    <main className="space-y-6">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartByCategory data={byCategory} />
        <ChartTrend data={trend} />
      </section>
    </main>
  )
}
