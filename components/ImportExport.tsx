"use client";
import React, { useRef } from "react";

export default function ImportExport({
  onImport,
  onExport,
  onClear,
}: {
  onImport: (data: unknown) => void;
  onExport: () => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = async (file: File) => {
    const text = await file.text();
    try {
      const json = JSON.parse(text);
      onImport(json);
    } catch {
      alert("Invalid JSON file");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onExport}
        className="rounded-xl border px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        Export
      </button>
      <button
        onClick={() => inputRef.current?.click()}
        className="rounded-xl border px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        Import
      </button>
      <button
        onClick={onClear}
        className="rounded-xl border px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
      >
        Clear
      </button>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="application/json"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) readFile(f);
        }}
      />
    </div>
  );
}
