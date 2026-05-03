import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import { HeaderNav } from "./components/HeaderNav";
import "./globals.css";

const inter = localFont({
    src: [
        { path: "../../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../public/fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "BookSpace — Service Booking Platform",
    description: "Book appointments with local service providers in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" className={inter.variable}>
                <body className="antialiased flex min-h-screen flex-col">
                    <header className="bg-white border-b border-gray-c2c6d6">
                        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
                            <Link
                                href="/"
                                className="text-white-1a1c1c text-xl leading-[28px] font-semibold tracking-tight"
                            >
                                BookSpace
                            </Link>
                            <HeaderNav />
                        </div>
                    </header>
                    <div className="flex-1">{children}</div>
                    <footer className="bg-white border-t border-gray-c2c6d6">
                        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-4 md:flex-row">
                            <p className="text-xs leading-[16px] font-medium text-gray-5f5e5e">
                                © 2026 BookSpace · Portfolio MVP
                            </p>
                            <a
                                href="https://github.com/IvanKyuchukov98/booking-platform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs leading-[16px] font-medium text-gray-5f5e5e hover:text-white-1a1c1c transition-colors"
                            >
                                Source on GitHub →
                            </a>
                        </div>
                    </footer>
                </body>
            </html>
        </ClerkProvider>
    );
}
