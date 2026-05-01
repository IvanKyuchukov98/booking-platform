"use client";

import { useActionState, useEffect, useRef } from "react";
import { createService, type CreateServiceState } from "./actions";
import {Toast} from "@/app/components/Toast";

const initialState: CreateServiceState = { error: null, ok: false };

export function CreateServiceForm() {
    const [state, formAction, isPending] = useActionState(createService, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.ok) formRef.current?.reset();
    }, [state.ok]);

    return (
        <form
            ref={formRef}
            action={formAction}
            className="space-y-4 rounded-lg border border-gray-200 bg-white p-6"
        >
            <Toast show={state.ok} message="Service created" />
            <h2 className="text-lg font-semibold">New service</h2>

            <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="e.g. Men's haircut"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                />
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Description <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={2}
                    maxLength={500}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="durationMinutes"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Duration (minutes)
                    </label>
                    <input
                        id="durationMinutes"
                        name="durationMinutes"
                        type="number"
                        required
                        min={5}
                        max={480}
                        step={5}
                        defaultValue={30}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                    />
                </div>
                <div>
                    <label
                        htmlFor="priceCents"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Price (cents)
                    </label>
                    <input
                        id="priceCents"
                        name="priceCents"
                        type="number"
                        required
                        min={0}
                        step={50}
                        defaultValue={2000}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                    />
                </div>
            </div>

            {state.error && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
                {isPending ? "Creating…" : "Create service"}
            </button>
        </form>
    );
}
