import type { ComponentProps } from "react";

const fieldClass =
    "w-full bg-white border border-gray-c2c6d6 rounded-md px-3 py-2 text-sm leading-[20px] text-white-1a1c1c placeholder:text-gray-727785 focus:outline-none focus:border-blue-0058be focus:ring-2 focus:ring-blue-0058be/20 transition-colors disabled:bg-white-f3f3f3 disabled:cursor-not-allowed";

export function Input({ className = "", ...props }: ComponentProps<"input">) {
    return <input className={`${fieldClass} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
    return <textarea className={`${fieldClass} ${className}`} {...props} />;
}

export function Select({ className = "", ...props }: ComponentProps<"select">) {
    return <select className={`${fieldClass} ${className}`} {...props} />;
}

export function Label({ className = "", ...props }: ComponentProps<"label">) {
    return (
        <label
            className={`block text-xs leading-[16px] font-medium text-gray-424754 mb-1 ${className}`}
            {...props}
        />
    );
}
