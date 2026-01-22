"use client";
import { useMemo, useState } from "react";
import Card from "../../components/Card";
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

function formatCurrency(c: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format((c || 0) / 100);
}

export default function TransactionsPage() {
  const [categories] = useLocalStorage<Category[]>("bb:categories", []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("bb:expenses", []);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(
    () =>
      expenses
        .filter((e) =>
          q ? e.description.toLowerCase().includes(q.toLowerCase()) : true
        )
        .filter((e) => (cat === "all" ? true : e.categoryId === cat))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [expenses, q, cat]
  );

  const lookup = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories]
  );
  const del = (id: string) =>
    setExpenses((prev) => prev.filter((x) => x.id !== id));

  return (
    <main className="space-y-6">
      <Card>
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <div className="mt-4">
          <Filters
            q={q}
            setQ={setQ}
            category={cat}
            setCategory={setCat}
            categories={categories}
          />
        </div>
      </Card>

      <Card className="p-0 overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead className="bg-gray-50 dark:bg-gray-900/60">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No transactions!
                </td>
              </tr>
            )}
            {filtered.map((e) => {
              const c = lookup[e.categoryId];
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
                        style={{ backgroundColor: c?.color ?? "#64748b" }}
                      />
                      {c?.name ?? "Other"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">
                    {formatCurrency(e.amount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => del(e.id)} className="btn">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </main>
  );
}
