// Slot generator for the booking flow.
//
// MVP rules (intentionally hardcoded — a real product would store these per-service or per-business):
// - Business hours: Mon–Fri, 09:00–17:00 (local server time)
// - Slot grid: aligned to the service's `durationMinutes`, starting at 09:00 each day
// - Window: starts at the next future slot, runs for `daysAhead` days
// - Taken slots: any CONFIRMED booking whose [startsAt, endsAt) overlaps the candidate slot

const OPEN_HOUR = 9;
const CLOSE_HOUR = 17;

type ExistingBooking = {
    startsAt: Date;
    endsAt: Date;
};

export type Slot = {
    startsAt: Date;
    endsAt: Date;
};

export function generateAvailableSlots({
    durationMinutes,
    existingBookings,
    from = new Date(),
    daysAhead = 7,
}: {
    durationMinutes: number;
    existingBookings: ExistingBooking[];
    from?: Date;
    daysAhead?: number;
}): Slot[] {
    const slots: Slot[] = [];
    const slotMs = durationMinutes * 60 * 1000;
    const dayMs = 24 * 60 * 60 * 1000;
    const now = from.getTime();

    for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
        const day = new Date(from.getTime() + dayOffset * dayMs);
        const dayOfWeek = day.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) continue;

        const dayOpen = new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            OPEN_HOUR,
            0,
            0,
            0,
        );
        const dayClose = new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            CLOSE_HOUR,
            0,
            0,
            0,
        );

        for (
            let cursor = dayOpen.getTime();
            cursor + slotMs <= dayClose.getTime();
            cursor += slotMs
        ) {
            const startsAt = new Date(cursor);
            const endsAt = new Date(cursor + slotMs);

            if (startsAt.getTime() <= now) continue;

            const overlaps = existingBookings.some(
                (b) => b.startsAt < endsAt && b.endsAt > startsAt,
            );
            if (overlaps) continue;

            slots.push({ startsAt, endsAt });
        }
    }

    return slots;
}

export function formatSlotLabel(slot: Slot): string {
    const date = slot.startsAt.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    const time = slot.startsAt.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
    return `${date} · ${time}`;
}
