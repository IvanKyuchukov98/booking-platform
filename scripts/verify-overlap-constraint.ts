/**
 * Manual verification of the RoomBooking_no_overlap EXCLUDE constraint.
 *
 * Tests three properties against the live Neon DB:
 *   1. Overlapping bookings are rejected with SQLSTATE 23P01.
 *   2. Back-to-back bookings (checkout = next checkin) are ALLOWED (half-open
 *      `[checkIn, checkOut)` semantics).
 *   3. CANCELLED bookings free their dates so the slot becomes bookable again.
 *
 * Run with: npx tsx scripts/verify-overlap-constraint.ts
 *
 * Cleans up its own test user + bookings on exit so it can be re-run.
 */

import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isExclusionError(e: unknown): boolean {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    const code = (e.meta as { code?: string } | undefined)?.code;
    if (code === '23P01') return true;
  }
  return (
    e instanceof Error && /RoomBooking_no_overlap|exclusion/i.test(e.message)
  );
}

async function main() {
  console.log('--- Verifying RoomBooking_no_overlap EXCLUDE constraint ---\n');

  const room = await prisma.room.findFirst({ where: { isActive: true } });
  if (!room) {
    console.error('No active rooms found. Run `npm run db:seed` first.');
    process.exit(1);
  }
  console.log(`Test room: ${room.name} (${room.id})`);

  const stamp = Date.now();
  const user = await prisma.user.create({
    data: {
      email: `verify-overlap-${stamp}@example.com`,
      clerkId: `verify-overlap-${stamp}`,
      name: 'Overlap Verifier',
    },
  });
  console.log(`Created throwaway user: ${user.id}\n`);

  // Use far-future dates so we don't collide with real bookings.
  const A_IN = new Date('2030-06-10T00:00:00Z');
  const A_OUT = new Date('2030-06-15T00:00:00Z');

  const bookingA = await prisma.roomBooking.create({
    data: {
      userId: user.id,
      roomId: room.id,
      checkIn: A_IN,
      checkOut: A_OUT,
      guests: 2,
      totalCents: 50000,
      status: 'CONFIRMED',
    },
  });
  console.log(`[setup] Inserted CONFIRMED booking A: 2030-06-10 → 2030-06-15`);

  // -------- Test 1: overlapping booking must be rejected --------
  let overlapRejected = false;
  try {
    await prisma.roomBooking.create({
      data: {
        userId: user.id,
        roomId: room.id,
        checkIn: new Date('2030-06-12T00:00:00Z'),
        checkOut: new Date('2030-06-20T00:00:00Z'),
        guests: 2,
        totalCents: 50000,
        status: 'CONFIRMED',
      },
    });
    console.log('[test 1] FAIL — overlapping booking was accepted');
  } catch (e) {
    overlapRejected = isExclusionError(e);
    const msg = e instanceof Error ? e.message.split('\n')[0] : String(e);
    console.log(
      `[test 1] ${overlapRejected ? 'PASS' : 'FAIL'} — overlapping booking rejected (${msg})`,
    );
  }

  // -------- Test 2: back-to-back (checkin = previous checkout) must be allowed --------
  let backToBackAllowed = false;
  let backToBackId: string | undefined;
  try {
    const bookingB = await prisma.roomBooking.create({
      data: {
        userId: user.id,
        roomId: room.id,
        checkIn: A_OUT, // exactly when A checks out
        checkOut: new Date('2030-06-20T00:00:00Z'),
        guests: 2,
        totalCents: 50000,
        status: 'CONFIRMED',
      },
    });
    backToBackAllowed = true;
    backToBackId = bookingB.id;
    console.log('[test 2] PASS — back-to-back booking accepted');
  } catch (e) {
    const msg = e instanceof Error ? e.message.split('\n')[0] : String(e);
    console.log(`[test 2] FAIL — back-to-back booking rejected (${msg})`);
  }

  // -------- Test 3: CANCELLED booking frees its dates --------
  await prisma.roomBooking.update({
    where: { id: bookingA.id },
    data: { status: 'CANCELLED' },
  });
  let cancelledFrees = false;
  let cancelledRebookId: string | undefined;
  try {
    const bookingC = await prisma.roomBooking.create({
      data: {
        userId: user.id,
        roomId: room.id,
        checkIn: A_IN,
        checkOut: A_OUT,
        guests: 2,
        totalCents: 50000,
        status: 'CONFIRMED',
      },
    });
    cancelledFrees = true;
    cancelledRebookId = bookingC.id;
    console.log("[test 3] PASS — CANCELLED booking's dates rebooked cleanly");
  } catch (e) {
    const msg = e instanceof Error ? e.message.split('\n')[0] : String(e);
    console.log(`[test 3] FAIL — cancelled dates still blocked (${msg})`);
  }

  // Cleanup
  await prisma.roomBooking.deleteMany({ where: { userId: user.id } });
  await prisma.user.delete({ where: { id: user.id } });
  console.log('\n[cleanup] Removed test bookings + user.');

  const allPassed = overlapRejected && backToBackAllowed && cancelledFrees;
  console.log(
    `\n${allPassed ? '✓ All assertions passed.' : '✗ One or more assertions failed.'}`,
  );

  // suppress unused warnings
  void backToBackId;
  void cancelledRebookId;

  process.exit(allPassed ? 0 : 1);
}

main()
  .catch((e) => {
    console.error('Unexpected error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
