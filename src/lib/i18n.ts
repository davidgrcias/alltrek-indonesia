import { en } from "../dictionaries/en";
import { id, type Dictionary } from "../dictionaries/id";
import type { Locale } from "./types";

export const locales: Locale[] = ["id", "en"];

const dictionaries: Record<Locale, Dictionary> = { id, en };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "id" ? "en" : "id";
}

export function localizePath(locale: Locale, path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");
  if (isLocale(segments[1] ?? "")) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function lookup(dictionary: Dictionary, path: string) {
  return path.split(".").reduce<unknown>((node, key) => {
    if (node && typeof node === "object" && key in node) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, dictionary);
}
