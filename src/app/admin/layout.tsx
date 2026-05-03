import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireAdmin();

    return (
        <div className="mx-auto max-w-[1200px] px-4 py-6">
            <div className="mb-6 flex items-center justify-between border-b border-gray-c2c6d6 pb-3">
                <h1 className="text-2xl leading-[32px] font-semibold text-white-1a1c1c">Admin</h1>
                <nav className="flex items-center gap-4">
                    <Link
                        href="/admin/services"
                        className="text-sm leading-[20px] text-white-1a1c1c hover:text-blue-0058be font-medium transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm leading-[20px] text-gray-5f5e5e hover:text transition-colors"
                    >
                        ← Back to dashboard
                    </Link>
                </nav>
            </div>
            {children}
        </div>
    );
}
