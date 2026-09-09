"use client";

import { RouteChips } from "@/components/farmadent/nav";
import { useDictionary } from "@/lib/i18n";

/**
 * Option A only: the horizontally scrolling row of route chips, active
 * route filled in the accent. A route group (parentheses excluded from
 * the URL) so it doesn't touch /jedna-strana (Option B) or the unlinked
 * /book, /login, /account stubs.
 */
export default function RoutedLayout({ children }: { children: React.ReactNode }) {
  const dict = useDictionary();
  return (
    <div>
      <RouteChips dict={dict} />
      {children}
    </div>
  );
}
