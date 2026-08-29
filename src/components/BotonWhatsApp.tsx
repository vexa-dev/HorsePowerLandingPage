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
        "inline-flex items-center justify-center gap-2 rounded-md bg-acento px-4 py-2.5 font-semibold text-white transition hover:bg-acento-hover " +
        className
      }
    >
      {children}
    </a>
  );
}
