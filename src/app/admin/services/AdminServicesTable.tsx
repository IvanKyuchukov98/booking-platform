"use client";

import { useMemo, useState } from "react";
import {
    type ColumnDef,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useFormStatus } from "react-dom";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { toggleServiceActive } from "./actions";

export type AdminServiceRow = {
    id: string;
    name: string;
    description: string | null;
    durationMinutes: number;
    priceCents: number;
    isActive: boolean;
    createdAt: Date;
};

function formatPrice(cents: number) {
    return `€${(cents / 100).toFixed(2)}`;
}

function formatDuration(minutes: number) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}m`;
}

function ToggleButton({ isActive }: { isActive: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="secondary" size="sm" disabled={pending}>
            {pending ? "…" : isActive ? "Hide" : "Show"}
        </Button>
    );
}

export function AdminServicesTable({ data }: { data: AdminServiceRow[] }) {
    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true },
    ]);
    const [filter, setFilter] = useState("");

    const columns = useMemo<ColumnDef<AdminServiceRow>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                cell: ({ row }) => (
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm leading-[20px] text-white-1a1c1c font-medium">
                                {row.original.name}
                            </span>
                            {!row.original.isActive && (
                                <Badge variant="neutral">Hidden</Badge>
                            )}
                        </div>
                        {row.original.description && (
                            <p className="text-sm leading-[20px] text-gray-5f5e5e mt-1 max-w-3 truncate">
                                {row.original.description}
                            </p>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: "durationMinutes",
                header: "Duration",
                cell: ({ getValue }) => (
                    <span className="text-sm leading-[20px] text-gray-5f5e5e">
                        {formatDuration(getValue<number>())}
                    </span>
                ),
            },
            {
                accessorKey: "priceCents",
                header: "Price",
                cell: ({ getValue }) => (
                    <span className="text-sm leading-[20px] text-gray-5f5e5e tabular-nums">
                        {formatPrice(getValue<number>())}
                    </span>
                ),
            },
            {
                accessorKey: "createdAt",
                header: "Created",
                cell: ({ getValue }) => (
                    <span className="text-sm leading-[20px] text-gray-5f5e5e">
                        {getValue<Date>().toLocaleDateString()}
                    </span>
                ),
            },
            {
                id: "actions",
                header: "",
                enableSorting: false,
                cell: ({ row }) => (
                    <form action={toggleServiceActive.bind(null, row.original.id)}>
                        <ToggleButton isActive={row.original.isActive} />
                    </form>
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter: filter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, _columnId, value) =>
            row.original.name.toLowerCase().includes(String(value).toLowerCase()),
    });

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <Input
                    type="search"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter by name…"
                    className="w-64"
                />
                <span className="text-xs leading-[16px] font-medium text-gray-727785">
                    {table.getRowModel().rows.length} of {data.length}
                </span>
            </div>

            {data.length === 0 ? (
                <Card className="p-6">
                    <div className="border border-dashed border-gray-c2c6d6 rounded-lg px-6 py-12 text-center">
                        <p className="text-sm leading-[20px] text-gray-5f5e5e">
                            No services yet. Create your first one →
                        </p>
                    </div>
                </Card>
            ) : (
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white-f3f3f3 border-b border-gray-c2c6d6">
                                {table.getHeaderGroups().map((hg) => (
                                    <tr key={hg.id}>
                                        {hg.headers.map((header) => {
                                            const canSort = header.column.getCanSort();
                                            const sorted = header.column.getIsSorted();
                                            return (
                                                <th
                                                    key={header.id}
                                                    scope="col"
                                                    className="px-4 py-3 text-xs leading-[16px] font-medium text-gray-727785 uppercase tracking-wide"
                                                >
                                                    {canSort ? (
                                                        <button
                                                            type="button"
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            className="inline-flex items-center gap-1 hover:text-white-1a1c1c transition-colors"
                                                        >
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext(),
                                                            )}
                                                            <span className="opacity-60">
                                                                {sorted === "asc"
                                                                    ? "↑"
                                                                    : sorted === "desc"
                                                                      ? "↓"
                                                                      : "↕"}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-c2c6d6">
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="hover:bg-white-f3f3f3 transition-colors">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-3">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {table.getRowModel().rows.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className="px-4 py-12 text-center text-sm leading-[20px] text-gray-5f5e5e"
                                        >
                                            No services match &ldquo;{filter}&rdquo;.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}
