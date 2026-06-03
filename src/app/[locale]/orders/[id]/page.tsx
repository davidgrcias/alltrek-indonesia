import { notFound } from "next/navigation";
import { OrderDetail } from "@/components/checkout/order-detail";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <OrderDetail id={id} dict={getDictionary(locale)} locale={locale} />;
}
