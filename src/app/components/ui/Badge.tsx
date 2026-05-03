import type { ComponentProps } from "react";

type Variant = "success" | "neutral" | "warning" | "danger" | "info";

const variantClass: Record<Variant, string> = {
    success: "bg-green-100 text-green-800",
    neutral: "bg-white-f3f3f3 text-white-1a1c1c",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
};

type BadgeProps = ComponentProps<"span"> & {
    variant?: Variant;
};

export function Badge({ variant = "neutral", className = "", ...props }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded px-2 py-[2px] text-xs leading-[16px] font-medium uppercase tracking-wide ${variantClass[variant]} ${className}`}
            {...props}
        />
    );
}
