"use client";

import { eventoWhatsApp } from "@/lib/analitica";

export function BotonWhatsApp({
  href,
  origen,
  detalle,
  children,
  className = "",
}: {
  href: string;
  origen: "carrito" | "ficha" | "catalogo-completo";
  detalle?: Record<string, string | number>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => eventoWhatsApp(origen, detalle)}
      className={
        "boton-acento inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 shadow-[0_12px_24px_-18px_var(--acento)] hover:-translate-y-0.5 " +
        className
      }
    >
      {children}
    </a>
  );
}
