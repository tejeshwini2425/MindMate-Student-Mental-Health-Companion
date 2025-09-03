import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindfulPath",
  description: "Mental health & Manifestation guide for students",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen">
        <AuthProvider>
          {/* Header/Navbar */}
          <header className="bg-white/80 border-b sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold">
                MindfulPath 🌱
              </Link>
              <nav className="flex gap-3">
                <Link href="/journals" className="text-sm hover:underline">
                  Journals
                </Link>
                <Link href="/manifestations" className="text-sm hover:underline">
                  Manifestations
                </Link>
              </nav>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>

          <footer className="mt-12 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} MindfulPath
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
