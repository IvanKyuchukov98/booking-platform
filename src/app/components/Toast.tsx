"use client";

import { useEffect, useState } from "react";

export function Toast({ message }: { message: string }) {
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => setDismissed(true), 3000);
        return () => clearTimeout(timerId);
    }, []);

    if (dismissed) return null;

    return (
        <div
            onClick={() => setDismissed(true)}
            className="fixed right-6 top-6 z-50 cursor-pointer rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
            {message}
        </div>
    );
}
