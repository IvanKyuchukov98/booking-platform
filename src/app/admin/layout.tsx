import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireAdmin();

    return (
        <div className="mx-auto max-w-5xl px-6 py-10">
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
                <nav className="flex gap-4 text-sm">
                    <Link href="/admin/services" className="text-gray-700 hover:text-gray-900">
                        Services
                    </Link>
                    <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                        ← Back to dashboard
                    </Link>
                </nav>
            </div>
            {children}
        </div>
    );
}
