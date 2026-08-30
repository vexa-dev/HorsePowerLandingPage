import type { Metadata } from "next";
import { PaginaLegalBorrador } from "@/components/PaginaLegalBorrador";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  robots: { index: false, follow: false },
};

export default function TerminosPage() {
  return (
    <PaginaLegalBorrador
      titulo="Términos y condiciones"
      descripcion="Borrador de las reglas para consultar el catálogo y coordinar compras con HorsePower."
    >
      <section>
        <h2 className="text-xl font-bold">1. Alcance del sitio</h2>
        <p className="mt-3">
          HorsePower presenta un catálogo de ropa y accesorios. La información
          visible en el sitio puede cambiar según la fuente de productos y la
          disponibilidad confirmada por la empresa.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">2. Precios y disponibilidad</h2>
        <p className="mt-3">
          Los precios y la disponibilidad se confirman por WhatsApp antes de
          cerrar cada pedido. El carrito organiza la consulta, pero no procesa
          pagos ni garantiza una reserva de stock.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">3. Coordinación del pedido</h2>
        <p className="mt-3">
          La persona interesada puede seleccionar productos, variantes y
          cantidades para enviar una consulta. Las condiciones finales de pago,
          entrega y recepción deben confirmarse directamente con HorsePower.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">4. Cambios y devoluciones</h2>
        <p className="mt-3">
          Las condiciones actualmente publicadas se encuentran en la página de
          cambios y devoluciones. La dueña debe revisar ambos documentos para
          asegurar que no existan contradicciones antes de aprobarlos.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">5. Revisión del documento</h2>
        <p className="mt-3">
          Completar la identificación legal de la empresa, las condiciones de
          entrega, medios de pago, propiedad intelectual y mecanismo de
          resolución de controversias antes de publicar la versión definitiva.
        </p>
      </section>
    </PaginaLegalBorrador>
  );
}
