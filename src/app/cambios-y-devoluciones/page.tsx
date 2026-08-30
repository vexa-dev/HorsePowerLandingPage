import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cambios y devoluciones" };

export default function CambiosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
          Cambios y devoluciones
        </h1>
      </header>
      <p className="mt-8 rounded-2xl border-l-4 border-acento bg-superficie px-5 py-4 text-sm leading-relaxed text-tenue">
        Borrador — la dueña debe revisar y ajustar estas condiciones.
      </p>
      <div className="mt-8 space-y-5 text-base leading-relaxed">
        <p>
          Aceptamos cambios dentro de los <strong>7 días calendario</strong>{" "}
          posteriores a la entrega, presentando el producto sin uso, con
          etiquetas y el comprobante de pago.
        </p>
        <p>
          Los cambios por talla o color están sujetos a disponibilidad de stock
          en tienda.
        </p>
        <p>
          Para iniciar un cambio, escríbenos por WhatsApp indicando tu número de
          pedido.
        </p>
        <p>
          No se aceptan devoluciones de dinero salvo falla de fábrica
          comprobada.
        </p>
      </div>
    </div>
  );
}
