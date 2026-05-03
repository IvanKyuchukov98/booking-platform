"use client";

import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export function HeaderNav() {
    const { isLoaded, isSignedIn } = useUser();
    const { openSignIn, openSignUp } = useClerk();

    if (!isLoaded) {
        return <nav className="flex h-9 items-center gap-3" />;
    }

    if (isSignedIn) {
        return (
            <nav className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="text-sm leading-[20px] text-gray-5f5e5e hover:text-white-1a1c1c font-medium transition-colors"
                >
                    Dashboard
                </Link>
                <Link
                    href="/services"
                    className="text-sm leading-[20px] text-gray-5f5e5e hover:text-white-1a1c1c font-medium transition-colors"
                >
                    Browse services
                </Link>
                <UserButton />
            </nav>
        );
    }

    return (
        <nav className="flex items-center gap-2">
            <Button variant="ghost" size="md" onClick={() => openSignIn()}>
                Sign in
            </Button>
            <Button variant="primary" size="md" onClick={() => openSignUp()}>
                Sign up
            </Button>
        </nav>
    );
}
