"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Check,
  ClipboardCheck,
  Loader2,
  MessageCircle,
  PackageCheck,
  Send,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { motionEase } from "@/components/motion/reveal";
import { writeCheckoutDraft } from "@/lib/checkout";
import { availabilityLabels, formatPrice, getProductById } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import { getWhatsAppUrl, store } from "@/lib/store";
import type { Dictionary } from "@/dictionaries/id";
import type { AgentMessage, AgentResponse, Locale, Product } from "@/lib/types";

type ChatStatus = "checking" | "configured" | "missing";

export function AgentWidget({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ChatStatus>("checking");
  const [messages, setMessages] = useState<AgentMessage[]>([
    { role: "assistant", content: dict.agent.starter },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<AgentResponse | null>(null);
  const [appliedPatchKey, setAppliedPatchKey] = useState("");
  const [cartActionNotice, setCartActionNotice] = useState("");
  const { items, lines, addItem, removeItem } = useCart();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/agent")
      .then((response) => response.json())
      .then((data: { configured?: boolean }) => setStatus(data.configured ? "configured" : "missing"))
      .catch(() => setStatus("missing"));
  }, []);

  useEffect(() => {
    function openAgent() {
      setOpen(true);
    }

    window.addEventListener("alltrek-agent-open", openAgent);
    return () => window.removeEventListener("alltrek-agent-open", openAgent);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const recommended = useMemo(
    () =>
      lastResponse?.recommendedProductIds
        .map(getProductById)
        .filter((product): product is Product => Boolean(product)) ?? [],
    [lastResponse],
  );
  const bundleProducts = useMemo(
    () =>
      lastResponse?.bundle?.productIds
        .map(getProductById)
        .filter((product): product is Product => Boolean(product)) ?? [],
    [lastResponse],
  );
  const patchKey = useMemo(() => JSON.stringify(lastResponse?.cartPatch ?? null), [lastResponse]);
  const patchApplied = Boolean(lastResponse?.cartPatch) && appliedPatchKey === patchKey;
  const patchItems = useMemo(
    () =>
      lastResponse?.cartPatch?.add
        ?.map((item) => ({
          ...item,
          product: getProductById(item.productId),
        }))
        .filter((item): item is typeof item & { product: Product } => Boolean(item.product)) ?? [],
    [lastResponse],
  );
  const showCheckoutLink = Boolean(lastResponse?.checkoutIntent && lines.length > 0);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const hasStarted = messages.length > 1 || Boolean(lastResponse);
  const statusLabel =
    status === "checking"
      ? dict.agent.statusChecking
      : status === "configured"
        ? dict.agent.statusOnline
        : dict.agent.statusOffline;
  const statusDotClass =
    status === "configured"
      ? "bg-emerald-500"
      : status === "checking"
        ? "bg-amber-400"
        : "bg-red-500";
  const cartSummary =
    cartCount > 0
      ? `${cartCount} ${locale === "id" ? "item" : cartCount === 1 ? "item" : "items"} / ${formatPrice(
          lines.reduce((total, line) => total + line.lineTotal, 0),
        )}`
      : dict.agent.emptyCartHint;
  const handoffHref = useMemo(() => {
    const handoff = lastResponse?.handoff;
    if (!handoff || handoff.channel === "none") {
      return undefined;
    }

    if (handoff.channel === "whatsapp") {
      return getWhatsAppUrl(handoff.reason || lastResponse?.answer || dict.agent.starter);
    }

    if (handoff.channel === "tokopedia") {
      return store.tokopediaUrl;
    }

    return store.mapsUrl;
  }, [dict.agent.starter, lastResponse]);

  async function sendMessage(content = input.trim()) {
    if (!content || loading || status !== "configured") {
      return;
    }

    const nextMessages: AgentMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: nextMessages, cart: items }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? dict.agent.networkError);
      }
      const agentResponse = data as AgentResponse;
      setLastResponse(agentResponse);
      setAppliedPatchKey("");
      setCartActionNotice("");
      setMessages((current) => [...current, { role: "assistant", content: agentResponse.answer }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : dict.agent.networkError;
      setMessages((current) => [...current, { role: "assistant", content: message }]);
    } finally {
      setLoading(false);
    }
  }

  function applyCartPatch() {
    lastResponse?.cartPatch?.remove?.forEach((productId) => removeItem(productId));
    lastResponse?.cartPatch?.add?.forEach((item) => addItem(item));
    setAppliedPatchKey(patchKey);
    setCartActionNotice(dict.agent.cartUpdated);
  }

  function persistCheckoutDraft() {
    if (lastResponse?.checkoutDraft) {
      writeCheckoutDraft(window.localStorage, lastResponse.checkoutDraft);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.32, ease: motionEase }}
          className="flex h-[min(720px,calc(100svh-6rem))] w-[min(460px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[8px] border border-stone-900/15 bg-[#fffdf7] shadow-2xl shadow-stone-950/20"
        >
          <header className="flex shrink-0 items-start justify-between gap-3 border-b border-stone-900/10 bg-white/70 px-4 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="relative grid size-10 place-items-center rounded-[8px] bg-emerald-900 text-white">
                  <Bot className="size-5" />
                  <span className={`absolute -right-0.5 -top-0.5 size-3 rounded-full ring-2 ring-white ${statusDotClass}`} />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-stone-950">{dict.agent.title}</h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1">
                      <span className={`size-1.5 rounded-full ${statusDotClass}`} />
                      {statusLabel}
                    </span>
                    <span className="text-stone-300">/</span>
                    <span>{dict.agent.subtitle}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-[8px] border border-stone-900/10 bg-[#fffdf7] px-2.5 py-1.5 text-xs text-stone-600">
                <ShoppingCart className="size-3.5 text-emerald-800" />
                <span className="font-medium text-stone-800">{dict.agent.cartContext}</span>
                <span className="truncate">{cartSummary}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-9 shrink-0 place-items-center rounded-[8px] border border-stone-900/15 bg-white text-stone-700"
              aria-label={dict.agent.close}
            >
              <X className="size-4" />
            </button>
          </header>

          {status === "missing" ? (
            <div className="flex flex-1 flex-col justify-between gap-4 p-4">
              <div className="rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                {dict.agent.configError}
              </div>
              <a
                href={getWhatsAppUrl(dict.agent.starter)}
                target="_blank"
                rel="noreferrer"
                className="button-rise inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-emerald-900 px-4 text-sm font-semibold text-white"
              >
                <MessageCircle className="size-4" />
                {dict.agent.whatsappCta}
              </a>
            </div>
          ) : (
            <>
              <div ref={listRef} className="flex-1 overflow-y-auto p-4">
                {!hasStarted && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, ease: motionEase }}
                    className="mb-4 rounded-[8px] border border-emerald-900/15 bg-emerald-900/5 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-amber-400 text-stone-950">
                        <Sparkles className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-stone-950">{dict.agent.promptTitle}</p>
                        <p className="mt-1 text-xs leading-5 text-stone-600">{dict.agent.promptCopy}</p>
                      </div>
                    </div>
                    <div className="mt-3 grid gap-2">
                      {dict.agent.starterPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => sendMessage(prompt)}
                          disabled={loading || status !== "configured"}
                          className="button-rise flex min-h-10 items-center gap-2 rounded-[8px] border border-stone-900/10 bg-white px-3 text-left text-xs font-semibold text-stone-800 disabled:bg-stone-100 disabled:text-stone-400"
                        >
                          <PackageCheck className="size-4 shrink-0 text-emerald-800" />
                          <span>{prompt}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <motion.div
                      key={`${message.role}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: motionEase }}
                      className={[
                        "max-w-[85%] whitespace-pre-line rounded-[8px] px-3 py-2 text-sm leading-6",
                        message.role === "user"
                          ? "ml-auto bg-emerald-900 text-white"
                          : "bg-stone-100 text-stone-800 shadow-sm",
                      ].join(" ")}
                    >
                      {message.content}
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="inline-flex items-center gap-2 rounded-[8px] bg-stone-100 px-3 py-2 text-sm text-stone-600">
                      <Loader2 className="size-4 animate-spin" />
                      {dict.common.loading}
                    </div>
                  )}
                </div>

                {lastResponse?.bundle && bundleProducts.length > 0 && (
                  <div className="mt-4 rounded-[8px] border border-emerald-900/15 bg-emerald-900/5 p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-800">
                        <ShoppingBag className="size-4" />
                        {dict.agent.bundleTitle}
                      </div>
                      <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-stone-600">
                        {bundleProducts.length} {locale === "id" ? "produk" : "picks"}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-stone-950">{lastResponse.bundle.title}</h3>
                    <p className="mt-2 leading-6 text-stone-600">{lastResponse.bundle.reason}</p>
                    <div className="mt-3 grid gap-2">
                      {bundleProducts.map((product) => (
                        <ProductMiniCard key={product.id} product={product} locale={locale} />
                      ))}
                    </div>
                  </div>
                )}

                {recommended.length > 0 && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-stone-500">
                      <Sparkles className="size-4 text-amber-500" />
                      {dict.agent.recommendedTitle}
                    </div>
                    <div className="grid gap-2">
                    {recommended.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <ProductMiniCard product={product} locale={locale} />
                      </motion.div>
                    ))}
                    </div>
                  </div>
                )}

                {(lastResponse?.cartPatch || showCheckoutLink || handoffHref) && (
                  <div className="mt-4 rounded-[8px] border border-stone-900/10 bg-white/75 p-3">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-stone-500">
                      <ClipboardCheck className="size-4 text-emerald-800" />
                      {dict.agent.nextActions}
                    </div>
                    {lastResponse?.cartPatch && (
                      <div className="mb-3 rounded-[8px] bg-stone-50 p-2">
                        <p className="text-xs font-semibold text-stone-700">{dict.agent.cartPatchPreview}</p>
                        <div className="mt-2 space-y-1 text-xs text-stone-600">
                          {patchItems.map((item) => (
                            <div key={`${item.productId}-${item.variantId}`} className="flex justify-between gap-3">
                              <span className="line-clamp-1">{item.product.name}</span>
                              <span className="shrink-0 font-semibold">x{item.quantity}</span>
                            </div>
                          ))}
                          {lastResponse.cartPatch.remove?.length ? (
                            <div className="flex justify-between gap-3 text-red-700">
                              <span>{locale === "id" ? "Hapus produk dari keranjang" : "Remove from cart"}</span>
                              <span className="shrink-0 font-semibold">x{lastResponse.cartPatch.remove.length}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                    <div className="grid gap-2">
                    {lastResponse?.cartPatch && (
                      <button
                        type="button"
                        onClick={applyCartPatch}
                        disabled={patchApplied}
                        className="button-rise inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-amber-400 px-3 text-sm font-semibold text-stone-950 disabled:bg-stone-200 disabled:text-stone-500"
                      >
                        {patchApplied ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
                        {patchApplied ? dict.agent.cartUpdated : dict.agent.applyCartPatch}
                      </button>
                    )}
                    {cartActionNotice && (
                      <p className="text-xs font-medium text-emerald-800">{cartActionNotice}</p>
                    )}
                    {lastResponse?.checkoutIntent?.note && (
                      <p className="rounded-[8px] border border-stone-900/10 bg-white px-3 py-2 text-xs leading-5 text-stone-600">
                        {lastResponse.checkoutIntent.note}
                      </p>
                    )}
                    {showCheckoutLink && (
                      <Link
                        href={localizePath(locale, "/checkout")}
                        onClick={persistCheckoutDraft}
                        className="button-rise inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-emerald-900 px-3 text-sm font-semibold text-white"
                      >
                        <ClipboardCheck className="size-4" />
                        {dict.agent.checkoutCta}
                      </Link>
                    )}
                    {handoffHref && (
                      <a
                        href={handoffHref}
                        target="_blank"
                        rel="noreferrer"
                        className="button-rise inline-flex h-10 items-center justify-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-3 text-sm font-semibold text-stone-800"
                      >
                        <MessageCircle className="size-4" />
                        {lastResponse?.handoff?.channel === "tokopedia"
                          ? dict.agent.tokopediaCta
                          : lastResponse?.handoff?.channel === "store"
                            ? dict.agent.storeCta
                            : dict.agent.whatsappCta}
                      </a>
                    )}
                    </div>
                  </div>
                )}

                {lastResponse?.quickReplies?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lastResponse.quickReplies.map((reply) => (
                      <button
                        key={reply}
                        type="button"
                        onClick={() => sendMessage(reply)}
                        className="rounded-[8px] border border-stone-900/15 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:border-emerald-800"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
                className="shrink-0 border-t border-stone-900/10 bg-white/75 p-3"
              >
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    rows={1}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    placeholder={dict.agent.placeholder}
                    className="max-h-24 min-h-11 min-w-0 flex-1 resize-none rounded-[8px] border border-stone-900/15 bg-white px-3 py-3 text-sm leading-5 text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                  />
                  <button
                    type="submit"
                    disabled={loading || status !== "configured" || !input.trim()}
                    className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-emerald-900 text-white disabled:bg-stone-300"
                    aria-label={dict.agent.send}
                  >
                    {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="button-rise relative inline-flex h-12 items-center gap-2 rounded-[8px] bg-emerald-900 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20"
        aria-label={open ? dict.agent.close : dict.agent.open}
      >
        <span className={`absolute -right-1 -top-1 size-3 rounded-full ring-2 ring-white ${statusDotClass}`} />
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">{dict.agent.title}</span>
        {cartCount > 0 && (
          <span className="ml-1 grid min-w-5 place-items-center rounded bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-stone-950">
            {cartCount}
          </span>
        )}
      </motion.button>
    </div>
  );
}

function ProductMiniCard({ product, locale }: { product: Product; locale: Locale }) {
  return (
    <Link
      href={localizePath(locale, `/products/${product.slug}`)}
      className="group grid grid-cols-[64px_minmax(0,1fr)] gap-3 rounded-[8px] border border-stone-900/12 bg-white p-2 text-sm transition hover:border-emerald-800 hover:shadow-md hover:shadow-emerald-900/10"
    >
      <div className="relative aspect-square overflow-hidden rounded-[8px] bg-stone-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="64px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 py-0.5">
        <p className="line-clamp-2 text-sm font-semibold leading-5 text-stone-950 group-hover:text-emerald-800">
          {product.name}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-stone-900">{formatPrice(product.price)}</span>
          <span className="rounded bg-emerald-900/5 px-2 py-0.5 font-medium text-emerald-900">
            {availabilityLabels[product.availability][locale]}
          </span>
        </div>
      </div>
    </Link>
  );
}
