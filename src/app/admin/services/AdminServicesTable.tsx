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
        <button
            type="submit"
            disabled={pending}
            className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
        >
            {pending ? "…" : isActive ? "Hide" : "Show"}
        </button>
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
                            <span className="font-medium">{row.original.name}</span>
                            {!row.original.isActive && (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                    Hidden
                                </span>
                            )}
                        </div>
                        {row.original.description && (
                            <p className="mt-0.5 max-w-md truncate text-xs text-gray-500">
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
                    <span className="text-sm text-gray-600">
                        {formatDuration(getValue<number>())}
                    </span>
                ),
            },
            {
                accessorKey: "priceCents",
                header: "Price",
                cell: ({ getValue }) => (
                    <span className="text-sm tabular-nums text-gray-600">
                        {formatPrice(getValue<number>())}
                    </span>
                ),
            },
            {
                accessorKey: "createdAt",
                header: "Created",
                cell: ({ getValue }) => (
                    <span className="text-xs text-gray-500">
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
            <div className="flex items-center justify-between">
                <input
                    type="search"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter by name…"
                    className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                />
                <span className="text-xs text-gray-500">
                    {table.getRowModel().rows.length} of {data.length}
                </span>
            </div>

            {data.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                    No services yet. Create your first one →
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id}>
                                    {hg.headers.map((header) => {
                                        const canSort = header.column.getCanSort();
                                        const sorted = header.column.getIsSorted();
                                        return (
                                            <th
                                                key={header.id}
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                {canSort ? (
                                                    <button
                                                        type="button"
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        className="inline-flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                        <span className="text-gray-400">
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
                        <tbody className="divide-y divide-gray-200">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50">
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
                                        className="px-4 py-8 text-center text-sm text-gray-500"
                                    >
                                        No services match &ldquo;{filter}&rdquo;.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
