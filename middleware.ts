import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/webhook",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

const isIgnoredRoute = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);

export default clerkMiddleware((auth, req) => {
  // Check for ignored routes first
  if (isIgnoredRoute(req)) {
    return; // Don't apply any Clerk middleware logic for ignored routes
  }

  // Check for public routes after checking ignored routes
  if (isPublicRoute(req)) {
    return; // Allow access to public routes without authentication
  }

  // If not a public or ignored route, protect the route
  auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
