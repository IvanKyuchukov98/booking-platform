"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input, Label, Textarea } from "@/app/components/ui/Input";
import { Toast } from "@/app/components/Toast";
import { createService, type CreateServiceState } from "./actions";

const initialState: CreateServiceState = { error: null, ok: false, lastCreatedId: null };

export function CreateServiceForm() {
    const [state, formAction, isPending] = useActionState(createService, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.lastCreatedId) formRef.current?.reset();
    }, [state.lastCreatedId]);

    return (
        <Card className="p-6">
            {state.lastCreatedId && (
                <Toast key={state.lastCreatedId} message="Service created" />
            )}
            <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c mb-4">New service</h2>

            <form ref={formRef} action={formAction} className="space-y-3">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        placeholder="e.g. Men's haircut"
                    />
                </div>

                <div>
                    <Label htmlFor="description">
                        Description <span className="text-gray-727785">(optional)</span>
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        rows={2}
                        maxLength={500}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Label htmlFor="durationMinutes">Duration (min)</Label>
                        <Input
                            id="durationMinutes"
                            name="durationMinutes"
                            type="number"
                            required
                            min={5}
                            max={480}
                            step={5}
                            defaultValue={30}
                        />
                    </div>
                    <div>
                        <Label htmlFor="priceCents">Price (cents)</Label>
                        <Input
                            id="priceCents"
                            name="priceCents"
                            type="number"
                            required
                            min={0}
                            step={50}
                            defaultValue={2000}
                        />
                    </div>
                </div>

                {state.error && (
                    <p className="bg-pink-ffdad6 text-red-93000a rounded-md px-3 py-2 text-sm leading-[20px]">
                        {state.error}
                    </p>
                )}

                <Button type="submit" variant="primary" disabled={isPending}>
                    {isPending ? "Creating…" : "Create service"}
                </Button>
            </form>
        </Card>
    );
}
