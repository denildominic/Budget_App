"use client";
import React from "react";
type Category = { id: string; name: string; color: string };

export default function Filters({
  q,
  setQ,
  category,
  setCategory,
  categories,
}: {
  q: string;
  setQ: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  categories: Category[];
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      <input
        className="input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search description..."
      />
      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setQ("");
            setCategory("all");
          }}
          className="btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
