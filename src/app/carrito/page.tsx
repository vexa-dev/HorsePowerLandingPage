import type { Metadata } from "next";
import Link from "next/link";
import { VistaCarrito } from "@/components/VistaCarrito";
import { IconChevronRight } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Tu Carrito",
  description: "Revisa los productos seleccionados y coordina tu pedido por WhatsApp con HorsePower.",
  robots: { index: false },
};

export default function CarritoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Migas de pan" className="mb-6 flex items-center gap-2 text-xs font-medium text-tenue">
        <Link href="/" className="hover:text-texto transition-colors">
          Inicio
        </Link>
        <IconChevronRight size={14} aria-hidden="true" />
        <span className="font-semibold text-texto" aria-current="page">
          Carrito de compras
        </span>
      </nav>

      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          Tu carrito
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-tenue">
          Verifica las tallas, colores y cantidades. Al finalizar, te derivaremos directamente a WhatsApp con el detalle listo.
        </p>
      </header>

      <VistaCarrito />
    </div>
  );
}
