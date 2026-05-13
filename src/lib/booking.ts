export const CLEANING_FEE_CENTS = 25000;
export const SERVICE_FEE_CENTS = 115000;
export const BOOKING_PENDING_EXPIRY_MINUTES = 30;

export function todayIsoDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

export function activeBookingCutoff(): Date {
  return new Date(Date.now() - BOOKING_PENDING_EXPIRY_MINUTES * 60 * 1000);
}

export function isoDate(d: Date): string {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  )
    .toISOString()
    .split('T')[0];
}

export function enumerateDates(
  startIso: string,
  endIsoExclusive: string,
): string[] {
  const out: string[] = [];
  const end = new Date(`${endIsoExclusive}T00:00:00Z`).getTime();
  const cursor = new Date(`${startIso}T00:00:00Z`);
  while (cursor.getTime() < end) {
    out.push(cursor.toISOString().split('T')[0]);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

export function computeNights(checkIn: string, checkOut: string): number {
  const a = new Date(`${checkIn}T00:00:00Z`).getTime();
  const b = new Date(`${checkOut}T00:00:00Z`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / (1000 * 60 * 60 * 24)));
}

export function computeTotalCents(
  pricePerNightCents: number,
  nights: number,
): number {
  return nights * pricePerNightCents + CLEANING_FEE_CENTS + SERVICE_FEE_CENTS;
}
