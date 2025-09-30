"use client";
import React, { useState } from "react";

function parseCurrencyToCents(input: string) {
  const n = Number(input.replace(/[^0-9.\-]/g, ""));
  return Math.round((isNaN(n) ? 0 : n) * 100);
}

export default function BudgetForm({
  budgetCents,
  onSetBudget,
}: {
  budgetCents: number;
  onSetBudget: (c: number) => void;
}) {
  const [input, setInput] = useState((budgetCents / 100 || 0).toString());
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSetBudget(parseCurrencyToCents(input));
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        className="input"
        inputMode="decimal"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="$2,500"
      />
      <button className="btn btn-primary h-14">Set Budget</button>
    </form>
  );
}
