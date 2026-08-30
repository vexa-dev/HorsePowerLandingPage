import type { Metadata } from "next";
import { PaginaLegalBorrador } from "@/components/PaginaLegalBorrador";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: false },
};

export default function PoliticaPrivacidadPage() {
  return (
    <PaginaLegalBorrador
      titulo="Política de privacidad"
      descripcion="Borrador sobre el tratamiento de la información que puede recibirse al visitar el catálogo o coordinar un pedido."
    >
      <section>
        <h2 className="text-xl font-bold">1. Responsable</h2>
        <p className="mt-3">
          Completar la razón social, el RUC, el domicilio y el canal oficial de
          contacto de HorsePower antes de publicar esta política.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">2. Información que podemos recibir</h2>
        <p className="mt-3">
          El catálogo no requiere crear una cuenta. Si una persona coordina un
          pedido por WhatsApp, puede compartir su nombre, número de contacto,
          dirección de entrega, datos del pedido y cualquier información que
          incluya voluntariamente en el chat.
        </p>
        <p className="mt-3">
          El sitio también puede recibir datos técnicos básicos mediante cookies
          y herramientas de analítica, según el consentimiento otorgado.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">3. Finalidades</h2>
        <p className="mt-3">
          La información se usaría para responder consultas, coordinar pedidos,
          confirmar disponibilidad, mejorar el catálogo, medir el uso del sitio
          y atender solicitudes relacionadas con la compra.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">4. Servicios de terceros</h2>
        <p className="mt-3">
          El flujo actual puede involucrar WhatsApp, Vercel Analytics y Google
          Analytics cuando este último esté configurado. La dueña debe revisar
          sus condiciones y definir los plazos de conservación aplicables.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">5. Derechos y contacto</h2>
        <p className="mt-3">
          Completar aquí el procedimiento y el canal para ejercer los derechos
          de acceso, rectificación, cancelación u oposición que correspondan.
        </p>
      </section>
    </PaginaLegalBorrador>
  );
}
