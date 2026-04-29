import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk middleware — runs on every matching request, exposes auth() to server code.
// Routes are public by default; we'll add protection on /dashboard later.
export default clerkMiddleware();

export const config = {
    matcher: [
        // Skip Next internals and static files

        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",      // Always run on API routes
        "/(api|trpc)(.*)",
    ],
};