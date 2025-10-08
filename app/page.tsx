"use client";
import Card from "../components/Card";
import { Stat } from "@/components/Stat";
import { BudgetProgress } from "@/components/BudgetProgress";
import BudgetForm from "../components/BudgetForm";
import ExpenseForm from "../components/ExpenseForm";
import ImportExport from "../components/ImportExport";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMemo } from "react";

function formatCurrency(cents: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format((cents || 0) / 100);
}

type Expense = {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
};
type Category = { id: string; name: string; color: string };

const fmt = (cents: number): string =>
  (cents < 0 ? "-" : "") + `$${(Math.abs(cents) / 100).toFixed(2)}`;

const DEFAULT_CATEGORIES: Category[] = [
  { id: "food", name: "Food", color: "#06b6d4" },
  { id: "transport", name: "Transport", color: "#22c55e" },
  { id: "shopping", name: "Shopping", color: "#a855f7" },
  { id: "bills", name: "Bills", color: "#ef4444" },
  { id: "entertain", name: "Entertainment", color: "#f59e0b" },
  { id: "general", name: "General", color: "#64748b" },
];

export default function Page() {
  const [budgetCents, setBudgetCents] = useLocalStorage<number>("bb:budget", 0);
  const [categories, setCategories] = useLocalStorage<Category[]>(
    "bb:categories",
    DEFAULT_CATEGORIES
  );
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("bb:expenses", []);

  const addExpense = (d: {
    description: string;
    amount: number;
    categoryId: string;
    date: string;
  }) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `exp-${Date.now()}`;
    setExpenses((prev) => [{ id, ...d }, ...prev]);
  };
  const addCategory = (c: Category) => setCategories((prev) => [c, ...prev]);
  const deleteExpense = (id: string) =>
    setExpenses((prev) => prev.filter((x) => x.id !== id));

  const spentCents = useMemo<number>(
    () => expenses.reduce((s, e) => s + e.amount, 0),
    [expenses]
  );

  const leftCents = Math.max(0, budgetCents - spentCents);

  const onExport = () => {
    const payload = { budgetCents, categories, expenses };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "budget-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const onImport = (data: unknown) => {
    const obj = data as any;
    if (!obj || typeof obj !== "object") return alert("Invalid JSON");
    if (typeof obj.budgetCents === "number") setBudgetCents(obj.budgetCents);
    if (Array.isArray(obj.categories)) setCategories(obj.categories);
    if (Array.isArray(obj.expenses)) setExpenses(obj.expenses);
  };
  const onClear = () => {
    if (!confirm("Clear all data?")) return;
    setBudgetCents(0);
    setExpenses([]);
  };

  // monthly stats
  const monthKey = new Date().toISOString().slice(0, 7);
  const monthExpenses = expenses.filter((e) => e.date.slice(0, 7) === monthKey);
  const monthTotal = monthExpenses.reduce((s, e) => s + e.amount, 0);
  const remaining = Math.max(budgetCents - monthTotal, 0);
  const pct =
    budgetCents > 0
      ? Math.min(100, Math.round((monthTotal / budgetCents) * 100))
      : 0;
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const projected = Math.round(
    (monthTotal / Math.max(1, today.getDate())) * daysInMonth
  );
  const onTrack = budgetCents > 0 ? projected <= budgetCents : false;

  const projectedText = useMemo<string>(() => {
    if (budgetCents <= 0) return "$0.00";
    const now = new Date();
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    const day = now.getDate();
    const allowedSoFar = Math.round((budgetCents * day) / daysInMonth);
    const over = spentCents - allowedSoFar;
    const label = fmt(Math.abs(over));
    return over > 0 ? `${label} (over pace)` : `${label} (under pace)`;
  }, [budgetCents, spentCents]);

  const progressPct = budgetCents ? (spentCents / budgetCents) * 100 : 0;

  return (
    <main className="mx-auto max-w-container px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      <Card
        title="Budget Overview"
        subtitle="Set a monthly budget to get started."
      >
        <div className="space-y-4">
          <BudgetProgress pct={progressPct} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Stat label="Total" value={fmt(budgetCents)} />
            <Stat label="Spent" value={fmt(spentCents)} />
            <Stat label="Left" value={fmt(leftCents)} />
            <Stat
              label="Projected"
              value={projectedText}
              note={
                projectedText.includes("over") ? (
                  <span className="text-red-500">over pace</span>
                ) : (
                  <span className="text-emerald-500">under pace</span>
                )
              }
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">Data Management</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Backup or restore your data as JSON.
        </p>
        <div className="mt-4">
          <ImportExport
            onExport={onExport}
            onImport={onImport}
            onClear={onClear}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold">Set Your Monthly Budget</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Current:{" "}
            <strong className="tabular-nums">
              {formatCurrency(budgetCents)}
            </strong>
          </p>
          <div className="mt-4">
            <BudgetForm
              budgetCents={budgetCents}
              onSetBudget={setBudgetCents}
            />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">Add Expense</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Pick <strong>Other</strong> to add a custom category.
          </p>
          <div className="mt-4">
            <ExpenseForm
              categories={categories}
              onAdd={addExpense}
              onAddCategory={addCategory}
            />
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold">Recent (3)</h3>
        <ul className="mt-3 space-y-2">
          {expenses.slice(0, 3).map((e) => (
            <li
              key={e.id}
              className="flex items-center gap-3 rounded-xl border px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <span className="truncate">{e.description}</span>
              </div>
              <div className="tabular-nums font-medium">
                {formatCurrency(e.amount)}
              </div>
              <button onClick={() => deleteExpense(e.id)} className="btn">
                Delete
              </button>
            </li>
          ))}
          {expenses.length === 0 && (
            <li className="text-sm text-gray-500 dark:text-gray-400">
              No expenses yet
            </li>
          )}
        </ul>
      </Card>
    </main>
  );
}
