"use client";

import Card from "../components/Card";
import BudgetForm from "../components/BudgetForm";
import ExpenseForm from "../components/ExpenseForm";
import ImportExport from "../components/ImportExport";
import { useLocalStorage } from "../hooks/useLocalStorage";

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format((cents || 0) / 100);
}

// Helpers for current month stats
function getMonthKey(d = new Date()) {
  return d.toISOString().slice(0, 7); // "YYYY-MM"
}
function getDaysInMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

type Expense = {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
};
type Category = { id: string; name: string; color: string };

const DEFAULT_CATEGORIES: Category[] = [
  { id: "food", name: "Food", color: "#06b6d4" },
  { id: "transport", name: "Transport", color: "#22c55e" },
  { id: "shopping", name: "Shopping", color: "#a855f7" },
  { id: "bills", name: "Bills", color: "#ef4444" },
  { id: "entertain", name: "Entertainment", color: "#f59e0b" },
  { id: "general", name: "General", color: "#64748b" },
];

export default function Home() {
  const [budgetCents, setBudgetCents] = useLocalStorage<number>("bb:budget", 0);
  const [categories, setCategories] = useLocalStorage<Category[]>(
    "bb:categories",
    DEFAULT_CATEGORIES
  );
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("bb:expenses", []);

  const addExpense = (data: {
    description: string;
    amount: number;
    categoryId: string;
    date: string;
  }) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `exp-${Date.now()}`;
    setExpenses((prev) => [{ id, ...data }, ...prev]);
  };
  const addCategory = (c: Category) => setCategories((prev) => [c, ...prev]);

  // delete a single expense by id (used in Recent)
  const deleteExpense = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  // Import/Export handlers
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
    setExpenses([]); // keep categories for usability
  };

  // Monthly stats
  const monthKey = getMonthKey();
  const monthExpenses = expenses.filter((e) => e.date.slice(0, 7) === monthKey);
  const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = Math.max(budgetCents - monthTotal, 0);
  const pct =
    budgetCents > 0
      ? Math.min(100, Math.round((monthTotal / budgetCents) * 100))
      : 0;
  const today = new Date();
  const daysInMonth = getDaysInMonth(today);
  const dayOfMonth = today.getDate();
  const projected = Math.round(
    (monthTotal / Math.max(1, dayOfMonth)) * daysInMonth
  );
  const onTrack = budgetCents > 0 ? projected <= budgetCents : false;

  return (
    <main className="space-y-6">
      {/* Budget Overview */}
      <Card>
        <h2 className="text-2xl font-semibold">Budget Overview</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {budgetCents > 0 ? (
            <>
              You&apos;ve used <strong>{pct}%</strong> of your monthly budget.
            </>
          ) : (
            <>Set a monthly budget to get started.</>
          )}
        </p>

        {/* Progress bar */}
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-900">
          <div
            className="h-full rounded-full bg-[hsl(var(--primary,199_89%_48%))]"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 text-sm">
          <div className="rounded-xl border px-3 py-2">
            <div className="text-gray-500 dark:text-gray-400">Total</div>
            <div className="font-medium tabular-nums">
              {formatCurrency(budgetCents)}
            </div>
          </div>
          <div className="rounded-xl border px-3 py-2">
            <div className="text-gray-500 dark:text-gray-400">Spent</div>
            <div className="font-medium tabular-nums">
              {formatCurrency(monthTotal)}
            </div>
          </div>
          <div className="rounded-xl border px-3 py-2">
            <div className="text-gray-500 dark:text-gray-400">Left</div>
            <div className="font-medium tabular-nums">
              {formatCurrency(remaining)}
            </div>
          </div>
          <div className="rounded-xl border px-3 py-2">
            <div className="text-gray-500 dark:text-gray-400">Projected</div>
            <div className="font-medium tabular-nums">
              {formatCurrency(projected)}{" "}
              <span
                className={
                  onTrack
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                ({onTrack ? "on track" : "over pace"})
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <h2 className="text-xl font-semibold">Data Management</h2>
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

      {/* Budget */}
      <Card>
        <h1 className="text-2xl font-semibold">Set Your Monthly Budget</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Current:{" "}
          <strong className="tabular-nums">
            {formatCurrency(budgetCents)}
          </strong>
        </p>
        <div className="mt-4">
          <BudgetForm budgetCents={budgetCents} onSetBudget={setBudgetCents} />
        </div>
      </Card>

      {/* Add Expense */}
      <Card>
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
      </Card>

      {/* Recent */}
      <Card>
        <h3 className="text-lg font-semibold">Recent (3)</h3>
        <ul className="mt-3 space-y-2">
          {expenses.slice(0, 3).map((e) => (
            <li
              key={e.id}
              className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <span className="truncate">{e.description}</span>
              </div>
              <span className="font-medium tabular-nums">
                {formatCurrency(e.amount)}
              </span>
              <button
                onClick={() => deleteExpense(e.id)}
                className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
                aria-label={`Delete ${e.description}`}
                title="Delete"
              >
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
