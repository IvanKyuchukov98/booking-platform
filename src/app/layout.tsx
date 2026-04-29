import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import { HeaderNav } from "./components/HeaderNav";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookSpace — Service Booking Platform",
  description: "Book appointments with local service providers in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <ClerkProvider>
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            BookSpace
          </Link>
          <HeaderNav />
        </header>
        {children}
        </body>
        </html>
      </ClerkProvider>
  );
}