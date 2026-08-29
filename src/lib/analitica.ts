"use client";

// Eventos de analítica. GA4 se carga solo si hay consentimiento de cookies
// (ver BannerCookies) y `NEXT_PUBLIC_GA_ID` está definido.

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function evento(nombre: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", nombre, params);
}

/** Clic en cualquier botón que abre WhatsApp. */
export function eventoWhatsApp(
  origen: "carrito" | "ficha" | "catalogo-completo",
  detalle: Params = {},
): void {
  evento("click_whatsapp", { origen, ...detalle });
}
