// app/layout.tsx
import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "FakeForge — Free Fake REST API",
  description:
    "FakeForge gives you instant fake JSON APIs for products, users, posts, carts, todos & more. No setup, no auth, no rate limits.",
  keywords: ["fake api", "rest api", "mock api", "json api", "dummy data", "fake data"],
  authors: [{ name: "FakeForge" }],
  openGraph: {
    title: "FakeForge — Free Fake REST API",
    description: "Instant fake JSON APIs for developers. No setup required.",
    url: "https://fakeforge.vercel.app",
    siteName: "FakeForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FakeForge — Free Fake REST API",
    description: "Instant fake JSON APIs for developers. No setup required.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${mono.variable}`}>
      <body className="bg-[#0F1117] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}