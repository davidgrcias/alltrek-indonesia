"use client";

import Link from "next/link";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice, getProductById } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
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
  const { items, addItem } = useCart();
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
      setMessages((current) => [...current, { role: "assistant", content: agentResponse.answer }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : dict.agent.networkError;
      setMessages((current) => [...current, { role: "assistant", content: message }]);
    } finally {
      setLoading(false);
    }
  }

  function applyCartPatch() {
    lastResponse?.cartPatch?.add?.forEach((item) => addItem(item));
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3">
      {open && (
        <section className="h-[min(620px,calc(100svh-6rem))] w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-md border border-stone-200 bg-white shadow-2xl">
          <header className="flex h-14 items-center justify-between border-b border-stone-200 px-4">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-md bg-emerald-900 text-white">
                <Bot className="size-5" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-stone-950">{dict.agent.title}</h2>
                <p className="text-xs text-stone-500">{dict.agent.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-9 place-items-center rounded-md border border-stone-200 text-stone-700"
              aria-label={dict.agent.close}
            >
              <X className="size-4" />
            </button>
          </header>

          {status === "missing" ? (
            <div className="p-4 text-sm text-red-700">{dict.agent.configError}</div>
          ) : (
            <>
              <div ref={listRef} className="h-[calc(100%-8.75rem)] overflow-y-auto p-4">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={[
                        "max-w-[85%] rounded-md px-3 py-2 text-sm leading-6",
                        message.role === "user"
                          ? "ml-auto bg-emerald-900 text-white"
                          : "bg-stone-100 text-stone-800",
                      ].join(" ")}
                    >
                      {message.content}
                    </div>
                  ))}
                  {loading && (
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-600">
                      <Loader2 className="size-4 animate-spin" />
                      {dict.common.loading}
                    </div>
                  )}
                </div>

                {recommended.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {recommended.map((product) => (
                      <Link
                        key={product.id}
                        href={localizePath(locale, `/products/${product.slug}`)}
                        className="block rounded-md border border-stone-200 p-3 text-sm hover:border-emerald-800"
                      >
                        <span className="line-clamp-1 font-semibold text-stone-950">{product.name}</span>
                        <span className="text-stone-600">{formatPrice(product.price)}</span>
                      </Link>
                    ))}
                    {lastResponse?.cartPatch?.add?.length ? (
                      <button
                        type="button"
                        onClick={applyCartPatch}
                        className="h-10 w-full rounded-md bg-amber-400 px-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
                      >
                        {dict.common.addToCart}
                      </button>
                    ) : null}
                  </div>
                )}

                {lastResponse?.quickReplies?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lastResponse.quickReplies.map((reply) => (
                      <button
                        key={reply}
                        type="button"
                        onClick={() => sendMessage(reply)}
                        className="rounded-md border border-stone-200 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:border-emerald-800"
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
                className="flex h-20 items-center gap-2 border-t border-stone-200 p-3"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={dict.agent.placeholder}
                  className="h-11 min-w-0 flex-1 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-emerald-700"
                />
                <button
                  type="submit"
                  disabled={loading || status !== "configured"}
                  className="grid size-11 place-items-center rounded-md bg-emerald-900 text-white disabled:bg-stone-300"
                  aria-label={dict.agent.send}
                >
                  <Send className="size-4" />
                </button>
              </form>
            </>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-12 items-center gap-2 rounded-md bg-emerald-900 px-4 text-sm font-semibold text-white shadow-lg hover:bg-emerald-800"
        aria-label={open ? dict.agent.close : dict.agent.open}
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">{dict.agent.title}</span>
      </button>
    </div>
  );
}
