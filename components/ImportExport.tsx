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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const readFile = async (file: File) => {
    const text = await file.text();
    try {
      onImport(JSON.parse(text));
    } catch {
      alert("Invalid JSON");
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={onExport} className="btn">
        Export
      </button>
      <button onClick={() => inputRef.current?.click()} className="btn">
        Import
      </button>
      <button onClick={onClear} className="btn text-red-600 border-red-200">
        Clear
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) readFile(f);
        }}
      />
    </div>
  );
}
