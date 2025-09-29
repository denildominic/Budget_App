import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budget App",
  description: "Budget App built with Next.js, Tailwind CSS, and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-10%,_#e7f6ff_0%,_transparent_55%),radial-gradient(900px_500px_at_80%_20%,_#f3e8ff_0%,_transparent_45%),white] text-black dark:bg-[radial-gradient(1200px_600px_at_50%_-10%,_#0b1720_0%,_transparent_55%),radial-gradient(900px_500px_at_80%_20%,_#13111c_0%,_transparent_45%),black] dark:text-white">
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            const k='bb-theme';
            const saved=localStorage.getItem(k);
            const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (saved==='dark'||(!saved&&prefersDark)) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
          } catch {}
        `}</Script>

        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
