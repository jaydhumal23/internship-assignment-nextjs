import { redirect } from "next/navigation";

/**
 * Custom Next.js 404 Handler
 * Instead of displaying a default 404 error page, we immediately redirect
 * all unmapped or invalid routes back to the main landing page.
 */
export default function NotFoundRedirect() {
  redirect("/");
}
