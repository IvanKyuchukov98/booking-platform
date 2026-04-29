import type { Metadata } from "next";                                                                                                                                                                                                        import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
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
          <nav className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <UserButton />
            </Show>
          </nav>
        </header>
        {children}
        </body>
        </html>
      </ClerkProvider>
  );
}