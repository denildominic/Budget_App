import type { Metadata } from "next";
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css'


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
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
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
