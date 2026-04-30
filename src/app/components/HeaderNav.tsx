"use client";

import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function HeaderNav() {
    const { isLoaded, isSignedIn } = useUser();
    const { openSignIn, openSignUp } = useClerk();

    if (!isLoaded) {
        return <nav className="flex h-9 items-center gap-3" />;
    }

    if (isSignedIn) {
        return (
            <nav className="flex items-center gap-3">
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    Dashboard
                </Link>
                <UserButton />
            </nav>
        );
    }

    return (
        <nav className="flex items-center gap-3">
            <button
                type="button"
                onClick={() => openSignIn()}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
                Sign in
            </button>
            <button
                type="button"
                onClick={() => openSignUp()}
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
                Sign up
            </button>
        </nav>
    );
}
