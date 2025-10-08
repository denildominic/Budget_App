"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Thin wrapper around next-themes that forwards all props so you can use:
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>…
 */
export function ThemeProvider(
  props: React.ComponentProps<typeof NextThemesProvider>
) {
  return <NextThemesProvider {...props} />;
}
