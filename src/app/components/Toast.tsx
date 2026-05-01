"use client";

import { useEffect, useState } from "react";

export function Toast({ show, message }: { show: boolean; message: string }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!show) return;
        setVisible(true);
        const timerId = setTimeout(() => setVisible(false), 3000);
        // Cleanup: if `show` re-fires (or the component unmounts) before 3s
        // are up, cancel the pending timer so we don't double-fire.
        return () => clearTimeout(timerId);
    }, [show]);

    if (!visible) return null;

    return (
        <div
            onClick={() => setVisible(false)}
            className="fixed right-6 top-6 z-50 cursor-pointer rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
            {message}
        </div>
    );
}
