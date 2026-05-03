import type { ComponentProps } from "react";

export function Card({ className = "", ...props }: ComponentProps<"div">) {
    return (
        <div
            className={`bg-white border border-gray-c2c6d6 rounded-lg ${className}`}
            {...props}
        />
    );
}
