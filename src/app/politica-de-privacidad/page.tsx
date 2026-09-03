import type { Metadata } from "next";
import { PaginaLegalBorrador } from "@/components/PaginaLegalBorrador";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo protegemos y tratamos tus datos personales al navegar en el catálogo de HorsePower y coordinar pedidos.",
  alternates: {
    canonical: "/politica-de-privacidad",
  },
};

const EMAIL_CONTACTO =
  process.env.NEXT_PUBLIC_EMAIL_CONTACTO?.trim() || "ventashorsepower@gmail.com";
const DIRECCION =
  process.env.NEXT_PUBLIC_DIRECCION?.trim() ||
  "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Perú, 01";

export default function PoliticaPrivacidadPage() {
  return (
    <PaginaLegalBorrador
      titulo="Política de Privacidad"
      descripcion="En HorsePower valoramos tu confianza y nos comprometemos a proteger tus datos personales conforme a la Ley de Protección de Datos Personales (Ley Nº 29733) y su reglamento en Perú."
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">1. Responsable del Tratamiento</h2>
        <p className="leading-relaxed text-tenue">
          El responsable del tratamiento de los datos personales recopilados a través de este sitio web es <strong>HorsePower</strong>, con domicilio comercial en {DIRECCION}, Lima, Perú, y correo electrónico de contacto oficial: <strong>{EMAIL_CONTACTO}</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">2. Información que Recopilamos</h2>
        <p className="leading-relaxed text-tenue">
          Para navegar en nuestro catálogo digital no es necesario crear una cuenta de usuario ni registrar credenciales de acceso.
        </p>
        <p className="leading-relaxed text-tenue">
          Cuando decides armar un pedido y coordinar una compra a través de nuestro canal de <strong>WhatsApp</strong>, recopilamos únicamente la información necesaria para gestionar tu entrega:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-tenue text-sm">
          <li>Nombre y apellidos de contacto.</li>
          <li>Número de teléfono móvil / WhatsApp.</li>
          <li>Dirección de entrega (distrito, ciudad, referencias).</li>
          <li>Detalle de los productos solicitados (modelos, tallas, colores y cantidades).</li>
          <li>Datos de facturación o comprobante de pago (en caso de requerir boleta o factura).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">3. Finalidad del Tratamiento de Datos</h2>
        <p className="leading-relaxed text-tenue">
          Los datos personales facilitados voluntariamente por el usuario serán utilizados exclusivamente para los siguientes fines:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-tenue text-sm">
          <li>Gestionar, confirmar y enviar los pedidos solicitados.</li>
          <li>Coordinar el método de pago y la entrega del producto.</li>
          <li>Absolver consultas técnicas sobre tallas, disponibilidad y stock.</li>
          <li>Atender solicitudes de cambios, garantías o reclamos.</li>
          <li>Medir el tráfico y rendimiento del catálogo mediante herramientas analíticas agregadas y anónimas.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">4. Uso de Cookies y Tecnologías Similares</h2>
        <p className="leading-relaxed text-tenue">
          Nuestro sitio web utiliza cookies técnicas para recordar tus preferencias de navegación y productos en el carrito de compras (almacenamiento local en tu navegador). También podemos emplear herramientas de analítica (como Vercel Analytics o Google Analytics) para comprender de forma anónima cómo interactúan los usuarios con el catálogo y optimizar la velocidad de carga.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">5. Seguridad y Confidencialidad</h2>
        <p className="leading-relaxed text-tenue">
          HorsePower no comercializa, transfiere ni cede tus datos personales a terceros con fines publicitarios. La información de entrega solo se compartirá con los servicios de mensajería o agencias de transporte encargadas de trasladar tu paquete.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-texto">6. Ejercicio de Derechos ARCO</h2>
        <p className="leading-relaxed text-tenue">
          En cualquier momento puedes ejercer tus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> enviando un mensaje a nuestro correo <strong>{EMAIL_CONTACTO}</strong> o a nuestro canal oficial de WhatsApp, detallando tu solicitud.
        </p>
      </section>
    </PaginaLegalBorrador>
  );
}
