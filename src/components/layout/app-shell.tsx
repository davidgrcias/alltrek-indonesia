import { AgentWidget } from "@/components/agent/agent-widget";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

export function AppShell({
  children,
  dict,
  locale,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <CartProvider>
      <SiteHeader dict={dict} locale={locale} />
      <main className="min-h-screen bg-stone-50">{children}</main>
      <SiteFooter dict={dict} locale={locale} />
      <AgentWidget dict={dict} locale={locale} />
    </CartProvider>
  );
}
