import type { Order } from "./types";

export const ORDERS_STORAGE_KEY = "alltrek-orders";

export function readOrdersFromStorage(storage: Storage): Order[] {
  try {
    const raw = storage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function writeOrderToStorage(storage: Storage, order: Order) {
  const orders = readOrdersFromStorage(storage).filter((item) => item.id !== order.id);
  storage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([order, ...orders].slice(0, 20)));
}

export function getOrderFromStorage(storage: Storage, id: string) {
  return readOrdersFromStorage(storage).find((order) => order.id === id);
}
