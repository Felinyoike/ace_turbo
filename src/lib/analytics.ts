declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", eventName, params);
  } else if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

export function trackAddToCart(item: { id: number; name: string; price: number; quantity: number }) {
  trackEvent("add_to_cart", {
    currency: "GBP",
    value: item.price * item.quantity,
    items: [
      {
        item_id: String(item.id),
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }
    ]
  });
}

export function trackRemoveFromCart(item: { id: number; name: string; price: number; quantity: number }) {
  trackEvent("remove_from_cart", {
    currency: "GBP",
    value: item.price * item.quantity,
    items: [
      {
        item_id: String(item.id),
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }
    ]
  });
}

export function trackBeginCheckout(value: number, items: { id: number; name: string; price: number; quantity: number }[]) {
  trackEvent("begin_checkout", {
    currency: "GBP",
    value,
    items: items.map((i) => ({
      item_id: String(i.id),
      item_name: i.name,
      price: i.price,
      quantity: i.quantity
    }))
  });
}

export function trackPurchase(orderId: string | number, value: number, items: { id: number; name: string; price: number; quantity: number }[]) {
  trackEvent("purchase", {
    transaction_id: String(orderId),
    currency: "GBP",
    value,
    items: items.map((i) => ({
      item_id: String(i.id),
      item_name: i.name,
      price: i.price,
      quantity: i.quantity
    }))
  });
}

export function trackPageView(path: string, title: string) {
  trackEvent("page_view", {
    page_title: title,
    page_location: path
  });
}

export function buildGaPageView(path: string, title: string) {
  return {
    event: "page_view",
    page_title: title,
    page_location: path
  };
}

export function buildCommerceEvent(name: string, payload: Record<string, unknown>) {
  return {
    event: name,
    ...payload
  };
}
