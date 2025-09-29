'use client'
import React from 'react'

type Category = { id: string; name: string; color: string }

export default function Filters({
  q, setQ,
  category, setCategory,
  categories
}: {
  q: string; setQ: (v: string) => void
  category: string; setCategory: (v: string) => void
  categories: Category[]
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search description..."
        className="h-12 rounded-xl border bg-white px-3 dark:bg-black"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-12 rounded-xl border bg-white px-3 dark:bg-black"
      >
        <option value="all">All categories</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button
        onClick={() => { setQ(''); setCategory('all'); }}
        className="h-12 rounded-xl border px-3 hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        Reset
      </button>
    </div>
  )
}
