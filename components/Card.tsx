import React from "react";

export default function Card({
  className = "",
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={
        // rounded corners, soft border, depth, nice padding
        `rounded-2xl border bg-white/90 p-6 shadow-[0_10px_30px_rgba(2,8,23,.08)] 
         dark:bg-black/70 backdrop-blur ${className}`
      }
    >
      {children}
    </div>
  );
}
