"use client";
import { useMemo, useState } from "react";
import Filters from "../../components/Filters";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type Expense = {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
};
type Category = { id: string; name: string; color: string };

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format((cents || 0) / 100);
}

export default function TransactionsPage() {
  const [categories] = useLocalStorage<Category[]>("bb:categories", []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("bb:expenses", []);

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    return expenses
      .filter((e) =>
        q ? e.description.toLowerCase().includes(q.toLowerCase()) : true
      )
      .filter((e) => (cat === "all" ? true : e.categoryId === cat))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, q, cat]);

  const lookup = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories]
  );
  const del = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  return (
    <main className="space-y-6">
      <section className="rounded-2xl border bg-white p-6 dark:bg-black">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <div className="mt-4">
          <Filters
            q={q}
            setQ={setQ}
            category={cat}
            setCategory={setCat}
            categories={categories}
          />
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl border bg-white dark:bg-black">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="bg-gray-50 text-left dark:bg-gray-900/60">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No transactions
                </td>
              </tr>
            )}
            {filtered.map((e) => {
              const cat = lookup[e.categoryId];
              return (
                <tr key={e.id} className="border-t">
                  <td className="px-4 py-3">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{e.description}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: cat?.color ?? "#64748b" }}
                      />
                      {cat?.name ?? "Other"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">
                    {formatCurrency(e.amount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => del(e.id)}
                      className="rounded-lg border px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
