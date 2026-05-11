-- Prevent overlapping bookings for the same room at the database level.
-- Closes the TOCTOU race between the JS-side `findFirst` overlap check and
-- the subsequent `create` in `src/app/rooms/[id]/actions.ts`.
--
-- Half-open `[checkIn, checkOut)` so back-to-back stays (new guest checks in
-- on the previous guest's checkout day) are allowed.
--
-- Only PENDING + CONFIRMED rows participate; CANCELLED bookings free their
-- dates. Cannot be expressed in Prisma schema, so this migration is
-- authored manually.

CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "RoomBooking"
ADD CONSTRAINT "RoomBooking_no_overlap"
EXCLUDE USING gist (
    "roomId" WITH =,
    tsrange("checkIn", "checkOut", '[)') WITH &&
) WHERE (status IN ('PENDING', 'CONFIRMED'));
