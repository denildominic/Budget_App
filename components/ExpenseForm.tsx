'use client'
import { useMemo, useState } from 'react'

type CategoryShape = { id: string; name: string; color: string }

function parseCurrencyToCents(input: string) {
  const n = Number(input.replace(/[^0-9.\-]/g, ''))
  return Math.round((isNaN(n) ? 0 : n) * 100)
}

export default function ExpenseForm({
  categories,
  onAdd,
  onAddCategory,
}: {
  categories: CategoryShape[]
  onAdd: (data: { description: string; amount: number; categoryId: string; date: string }) => void
  onAddCategory: (c: CategoryShape) => void
}) {
  const [desc, setDesc] = useState('')
  const [cat, setCat] = useState(categories[0]?.id ?? 'general')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [customName, setCustomName] = useState('')

  const OTHER = 'other'
  const options = useMemo(
    () => [...categories, { id: OTHER, name: 'Other', color: '#64748b' }],
    [categories]
  )

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const cents = parseCurrencyToCents(amount)
    if (!desc || cents <= 0) return

    let categoryId = cat
    if (cat === OTHER) {
      const name = customName.trim()
      if (!name) return
      const id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
        ? crypto.randomUUID()
        : `custom-${Date.now()}`
      onAddCategory({ id, name, color: '#64748b' })
      categoryId = id
    }

    onAdd({ description: desc, amount: cents, categoryId, date })
    setDesc('')
    setAmount('')
    setCustomName('')
    setCat(categories[0]?.id ?? 'general')
  }

  return (
    <form onSubmit={submit} className="grid w-full grid-cols-1 gap-3 md:grid-cols-12">
      <div className="md:col-span-4">
        <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Description</label>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="e.g., Groceries at Target"
          className="h-14 w-full rounded-2xl border bg-white px-4 text-base dark:bg-black"
        />
      </div>

      <div className="md:col-span-3">
        <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Category</label>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="h-14 w-full rounded-2xl border bg-white px-4 text-base dark:bg-black"
        >
          {options.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {cat === OTHER && (
        <div className="md:col-span-3">
          <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Custom Type</label>
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter custom category"
            className="h-14 w-full rounded-2xl border bg-white px-4 text-base dark:bg-black"
          />
        </div>
      )}

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="$0.00"
          inputMode="decimal"
          className="h-14 w-full rounded-2xl border bg-white px-4 text-base dark:bg-black"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-14 w-full rounded-2xl border bg-white px-4 text-base dark:bg-black"
        />
      </div>

      <div className="md:col-span-12">
        <button className="h-14 w-full rounded-2xl bg-[hsl(var(--secondary,262_83%_58%))] text-base font-medium text-white">
          Add Expense
        </button>
      </div>
    </form>
  )
}
