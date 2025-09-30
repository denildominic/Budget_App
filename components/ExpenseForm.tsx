"use client";
import React, { useMemo, useState } from "react";

type Category = { id: string; name: string; color: string };

function parseCurrencyToCents(input: string) {
  const n = Number(input.replace(/[^0-9.\-]/g, ""));
  return Math.round((isNaN(n) ? 0 : n) * 100);
}

export default function ExpenseForm({
  categories,
  onAdd,
  onAddCategory,
}: {
  categories: Category[];
  onAdd: (data: {
    description: string;
    amount: number;
    categoryId: string;
    date: string;
  }) => void;
  onAddCategory: (c: Category) => void;
}) {
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState(categories[0]?.id ?? "general");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [customName, setCustomName] = useState("");
  const OTHER = "other";
  const options = useMemo(
    () => [...categories, { id: OTHER, name: "Other", color: "#64748b" }],
    [categories]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cents = parseCurrencyToCents(amount);
    if (!desc || cents <= 0) return;
    let categoryId = cat;
    if (cat === OTHER) {
      const name = customName.trim();
      if (!name) return;
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `c-${Date.now()}`;
      onAddCategory({ id, name, color: "#64748b" });
      categoryId = id;
    }
    onAdd({ description: desc, amount: cents, categoryId, date });
    setDesc("");
    setAmount("");
    setCustomName("");
    setCat(categories[0]?.id ?? "general");
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-12">
      <div className="md:col-span-4">
        <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
          Description
        </label>
        <input
          className="input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="e.g., Groceries at Target"
        />
      </div>

      <div className="md:col-span-3">
        <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
          Category
        </label>
        <select
          className="select"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>

      {cat === OTHER && (
        <div className="md:col-span-3">
          <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
            Custom Type
          </label>
          <input
            className="input"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter custom category"
          />
        </div>
      )}

      <div className="md:col-span-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
          Amount
        </label>
        <input
          className="input"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="$0.00"
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
          Date
        </label>
        <input
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="md:col-span-12">
        <button className="btn btn-primary h-14 w-full">Add Expense</button>
      </div>
    </form>
  );
}
