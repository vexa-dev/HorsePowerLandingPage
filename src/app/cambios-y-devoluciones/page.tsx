import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cambios y devoluciones" };

export default function CambiosPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 prose-sm">
      <h1 className="text-2xl font-black">Cambios y devoluciones</h1>
      <p className="mt-4 text-tenue">
        Borrador — la dueña debe revisar y ajustar estas condiciones.
      </p>
      <div className="mt-6 space-y-4 text-sm leading-relaxed">
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
