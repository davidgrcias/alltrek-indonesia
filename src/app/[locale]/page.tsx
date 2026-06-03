import { notFound } from "next/navigation";
import { HomePage } from "@/components/sections/home-page";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage dict={getDictionary(locale)} locale={locale} />;
}
