"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { eventoWhatsApp } from "@/lib/analitica";

const CLASES_TAMANO = {
  sm: "min-h-9 gap-1.5 px-3 py-1.5 text-sm",
  md: "min-h-12 gap-2 px-5 py-3",
  lg: "min-h-14 gap-2.5 px-6 py-3.5 text-base",
} as const;

export function BotonWhatsApp({
  href,
  origen,
  detalle,
  tamano = "md",
  ancho = "auto",
  conIcono = true,
  children,
  className = "",
  onClick,
}: {
  href: string;
  origen: "carrito" | "ficha" | "catalogo-completo";
  detalle?: Record<string, string | number>;
  tamano?: keyof typeof CLASES_TAMANO;
  ancho?: "auto" | "completo";
  conIcono?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        eventoWhatsApp(origen, detalle);
        onClick?.();
      }}
      className={
        "boton-acento inline-flex items-center justify-center font-semibold shadow-[0_12px_24px_-18px_var(--acento)] hover:-translate-y-0.5 active:translate-y-0 " +
        CLASES_TAMANO[tamano] +
        (ancho === "completo" ? " w-full" : "") +
        (className ? ` ${className}` : "")
      }
    >
      {conIcono && (
        <IconBrandWhatsapp aria-hidden="true" size={tamano === "sm" ? 16 : 20} />
      )}
      {children}
    </a>
  );
}
