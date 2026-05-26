import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Courtroom of Ideas",
  description:
    "Put big ideas on trial. A single-player thinking instrument for learning by judging the case.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <header className="rule-bottom">
          <div className="mx-auto w-full max-w-6xl px-6 py-5 flex items-baseline justify-between gap-6">
            <Link href="/" className="block group">
              <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
                Vol. I · Est. 2026
              </div>
              <div className="font-display text-2xl md:text-3xl tracking-tight">
                Courtroom of Ideas
              </div>
            </Link>
            <nav className="font-ui small-caps text-[11px] text-[var(--ink-soft)] flex items-center gap-6">
              <Link href="/" className="hover:text-[var(--ink)]">
                Docket
              </Link>
              <span className="text-[var(--ink-faint)]">Single player · v1</span>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="rule-top mt-16">
          <div className="mx-auto w-full max-w-6xl px-6 py-6 font-ui text-xs text-[var(--ink-faint)] flex flex-wrap justify-between gap-3">
            <span>
              Courtroom of Ideas — a thinking instrument, not a verdict generator.
            </span>
            <span>
              Cases are authored editorial content. No personal data is collected.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
