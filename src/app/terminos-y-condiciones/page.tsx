import type { Metadata } from "next";
import { PaginaLegalBorrador } from "@/components/PaginaLegalBorrador";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones generales para el uso del catálogo web y la coordinación de compras en HorsePower.",
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
};

const DIRECCION =
  process.env.NEXT_PUBLIC_DIRECCION?.trim() ||
  "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Perú, 01";

export default function TerminosPage() {
  return (
    <PaginaLegalBorrador
      titulo="Términos y Condiciones"
      descripcion="A continuación se detallan las condiciones generales que rigen el uso del catálogo web de HorsePower y el proceso de consulta y compra de nuestros productos."
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">1. Naturaleza del Catálogo Web</h2>
        <p className="leading-relaxed text-tenue">
          HorsePower pone a disposición de los usuarios un catálogo digital informativo e interactivo con prendas de vestir, casacas, chompas, mochilas y accesorios. Este sitio web opera como una vitrina virtual con carrito para armar listas de pedidos y derivar la compra al canal de atención directa en <strong>WhatsApp</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">2. Precios y Disponibilidad de Stock</h2>
        <p className="leading-relaxed text-tenue">
          Los precios indicados en el catálogo están expresados en <strong>Soles peruanos (PEN)</strong> e incluyen los impuestos de ley cuando corresponda. Debido al flujo constante de ventas en tienda física ({DIRECCION}), el stock de tallas y colores está sujeto a confirmación final por parte de nuestra asesora a través de WhatsApp antes de procesar el pago.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">3. Proceso de Compra y Medios de Pago</h2>
        <p className="leading-relaxed text-tenue">
          El catálogo web no procesa cobros automáticos mediante pasarelas de tarjetas bancarias. Los acuerdos comerciales se cierran en el chat oficial de WhatsApp, donde el cliente podrá abonar a través de:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-tenue text-sm">
          <li>Billeteras digitales: <strong>Yape</strong> y <strong>Plin</strong>.</li>
          <li>Transferencias interbancarias y depósitos (BCP, BBVA, Interbank, Banco de la Nación).</li>
          <li>Pago contraentrega en puntos de entrega o zonas autorizadas en Lima.</li>
          <li>Pago presencial en tienda física en efectivo o POS.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">4. Envíos y Plazos de Entrega</h2>
        <p className="leading-relaxed text-tenue">
          Los despachos en Lima Metropolitana se coordinan mediante mensajería particular o motorizado. Para envíos a provincias a nivel nacional, trabajamos con agencias reconocidas (Olva Courier, Shalom, Marvisur u otras de preferencia del cliente). El costo de envío y el tiempo estimado de llegada se acuerdan expresamente antes del despacho.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">5. Propiedad Intelectual</h2>
        <p className="leading-relaxed text-tenue">
          El logotipo, nombre comercial, diseño del sitio, textos y fotografías de productos son propiedad de HorsePower o se usan con la correspondiente autorización. Queda prohibida la reproducción, distribución o modificación no autorizada de estos contenidos con fines comerciales.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">6. Legislación y Jurisdicción Aplicable</h2>
        <p className="leading-relaxed text-tenue">
          Estos términos se rigen por las leyes de la República del Perú. Ante cualquier controversia, las partes se someten a la competencia de los juzgados y tribunales del distrito judicial de Lima.
        </p>
      </section>
    </PaginaLegalBorrador>
  );
}
