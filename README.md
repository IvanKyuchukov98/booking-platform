# BookSpace — Service Booking Platform

> **[Live demo](https://booking-platform-liard-xi.vercel.app/)** · Service booking MVP built in 7 days as a portfolio piece.

A small but end-to-end full-stack application: customers browse services, book a time slot, and manage their bookings; admins create services and toggle their visibility. Built with Next.js 15's App Router, Server Actions, Prisma, and Postgres.

![Dashboard with bookings](docs/screenshots/dashboard.png)

## What it does

**Customer flow:** sign up → browse services on `/services` → pick a service → choose an available slot from the next 7 days → confirm with optional notes → see the booking on the dashboard → cancel an upcoming booking.

**Admin flow:** any user with `role=ADMIN` (set via a one-off script) sees an "Admin panel" button on their dashboard → create services with name, duration, and price → manage them in a sortable, filterable table → toggle visibility on the public listing.

## Stack

| Layer       | Choice                                                         |
| ----------- | -------------------------------------------------------------- |
| Framework   | Next.js 15 (App Router, Server Components, Server Actions)     |
| UI          | React 19 (`useActionState`, `useFormStatus`), Tailwind CSS v4  |
| Auth        | Clerk (email + OAuth, role gating via DB column)               |
| Database    | Postgres on Neon (serverless)                                  |
| ORM         | Prisma                                                         |
| Validation  | Zod (server-side, in every Server Action)                      |
| Tables      | Tanstack Table (sortable + filterable admin grid)              |
| Deployment  | Vercel (auto-deploy from `main`)                               |

## Architecture decisions

A few choices worth calling out — these are the kinds of tradeoffs an interviewer might ask about:

- **Server Actions over `/api` routes for mutations.** Less boilerplate, type-safe end-to-end, automatic cache invalidation via `revalidatePath`. Tradeoff: not consumable by mobile/external clients — would add `/api` routes if/when that becomes a need.
- **Clerk over Auth.js.** Saved ~2 days of OAuth + session plumbing. Tradeoff: vendor lock-in and free-tier ceiling. Defensible because the auth surface is small (one helper: `getOrCreateDbUser`).
- **Soft cancellations** via a `BookingStatus` enum (`CONFIRMED` / `CANCELLED`), not hard deletes. Preserves history and audit trail; freed slots are reclaimed by filtering on status when generating availability.
- **Defense in depth on admin gates.** Three independent layers: Clerk middleware (auth), `/admin/*` layout calls `requireAdmin()` (role), every admin Server Action calls `requireAdmin()` again (role). Each layer is unaware of the others.
- **Two queries on the dashboard, not one.** Upcoming and history are fetched as separate Prisma queries with `startsAt` comparisons in SQL — instead of one query plus an in-render clock check. Stays compatible with React 19's `react-hooks/purity` lint and pushes work to the database.
- **Pure slot generator.** `generateAvailableSlots()` is a pure function that takes existing bookings as input, so it's trivial to test and reason about.
- **Custom toast over a library.** `<Toast>` is ~25 lines and demonstrates `useEffect` cleanup + `key`-based remount for re-trigger. No `react-toastify` / `sonner` dependency.

## Known limitations & next steps

These are deliberately scoped out for a 7-day MVP — listing them here as product-thinking signal:

- **Race condition** between conflict-check and insert in `createBooking`. Production fix: a partial unique index `(serviceId, startsAt) WHERE status='CONFIRMED'` (raw-SQL migration, since Prisma doesn't model partial indexes), or wrap check + insert in a serializable transaction.
- **Hardcoded business hours** (Mon–Fri, 09–17, server-local time). A real product would store hours per service / per business and respect timezones.
- **No reschedule action** — cancel + rebook for now.
- **No email notifications** for booking confirmations or reminders.
- **No payments.** Stripe test-mode integration was a stretch goal that didn't make the cut.
- **Admin panel is a single page.** A dedicated admin route group with a sidebar (services / bookings / users) is the next iteration.

## Project structure

```
src/
├── app/
│   ├── (root)/                  # landing, layout, header
│   ├── admin/services/          # admin-only services CRUD (Tanstack Table)
│   ├── dashboard/               # signed-in user's bookings + cancel action
│   └── services/                # public listing + per-service booking flow
│       └── [id]/
├── lib/
│   ├── auth.ts                  # getOrCreateDbUser + requireAdmin
│   ├── prisma.ts                # PrismaClient singleton
│   └── slots.ts                 # pure slot generator
├── middleware.ts                # Clerk middleware
prisma/
└── schema.prisma                # User, Service, Booking + BookingStatus enum
scripts/
└── make-admin.ts                # promote a user to ADMIN by email
```

## Local setup

```bash
git clone https://github.com/IvanKyuchukov98/booking-platform
cd booking-platform
cp .env.example .env             # fill in DATABASE_URL, DIRECT_URL, CLERK_*
npm install
npx prisma migrate dev
npm run dev
```

Open http://localhost:3000 and sign up. After your first sign-in (so the Clerk-to-DB sync writes your row), promote yourself to admin:

```bash
npm run db:make-admin -- you@example.com
```

You'll see an **Admin panel** button on the dashboard.

## Built by

[Ivan Kyuchukov](https://github.com/IvanKyuchukov98) — frontend developer based in Bulgaria, transitioning to fullstack. April–May 2026.
