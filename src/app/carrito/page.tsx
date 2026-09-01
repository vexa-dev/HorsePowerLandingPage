import type { Metadata } from "next";
import { VistaCarrito } from "@/components/VistaCarrito";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false },
};

export default function CarritoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <h1 className="texto-display text-4xl sm:text-5xl">
          Tu carrito
        </h1>
        <p className="mt-4 leading-relaxed text-tenue">
          Revisa tus modelos y envía el pedido por WhatsApp para confirmar
          disponibilidad.
        </p>
      </header>
      <VistaCarrito />
    </div>
  );
}
