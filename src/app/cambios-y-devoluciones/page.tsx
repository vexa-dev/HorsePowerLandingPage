import type { Metadata } from "next";
import Link from "next/link";
import {
  IconCheck,
  IconClock,
  IconHelpCircle,
  IconMessageCircle,
  IconShieldCheck,
} from "@tabler/icons-react";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Políticas de Cambios y Devoluciones",
  description:
    "Conoce las condiciones, plazos y pasos para realizar cambios de prendas, tallas o modelos en HorsePower.",
  alternates: {
    canonical: "/cambios-y-devoluciones",
  },
};

export default function CambiosPage() {
  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola HorsePower, deseo consultar sobre el cambio de un producto.")}`
    : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-2xl border-b border-linea/60 pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-superficie px-3 py-1 text-xs font-bold uppercase tracking-wider text-acento mb-3">
          <IconShieldCheck size={14} />
          Garantía HorsePower
        </div>
        <h1 className="texto-display text-3xl sm:text-5xl font-black text-texto">
          Cambios y Devoluciones
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-tenue">
          Tu satisfacción es nuestra prioridad. Te brindamos todas las facilidades para que disfrutes de tu prenda con la talla y modelo correcto.
        </p>
      </header>

      {/* Tarjeta de condiciones principales */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-tarjeta p-6 shadow-sm">
          <div className="flex items-center gap-3 text-acento">
            <IconClock size={24} />
            <h3 className="font-bold text-base text-texto">Plazo para Cambios</h3>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-tenue">
            Tienes hasta <strong>7 días calendario</strong> posteriores a la recepción de tu compra para solicitar un cambio de talla o color.
          </p>
        </div>

        <div className="rounded-2xl border bg-tarjeta p-6 shadow-sm">
          <div className="flex items-center gap-3 text-acento">
            <IconCheck size={24} />
            <h3 className="font-bold text-base text-texto">Estado de la Prenda</h3>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-tenue">
            El producto debe encontrarse <strong>sin señales de uso, sin lavar</strong>, con sus etiquetas originales intactas y comprobante de compra.
          </p>
        </div>
      </div>

      {/* Pasos para el cambio */}
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-texto">¿Cómo solicitar un cambio?</h2>
        
        <div className="space-y-4 text-sm leading-relaxed text-tenue">
          <div className="flex gap-4 rounded-2xl bg-superficie p-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-texto text-fondo font-bold text-xs">
              1
            </span>
            <div>
              <p className="font-bold text-texto">Escríbenos por WhatsApp</p>
              <p className="mt-1 text-xs text-tenue">
                Envíanos una foto del producto recibido, la boleta de compra y el nuevo modelo/talla que necesitas.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-superficie p-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-texto text-fondo font-bold text-xs">
              2
            </span>
            <div>
              <p className="font-bold text-texto">Confirmación de Stock</p>
              <p className="mt-1 text-xs text-tenue">
                Nuestra asesora verificará la disponibilidad inmediata de la variante solicitada en tienda.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-superficie p-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-texto text-fondo font-bold text-xs">
              3
            </span>
            <div>
              <p className="font-bold text-texto">Entrega o Despacho</p>
              <p className="mt-1 text-xs text-tenue">
                Puedes realizar el cambio directamente en nuestra tienda física en Lima o mediante envío por courier (los gastos de envío por cambio de preferencia corren por cuenta del comprador).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fallas de fábrica y devoluciones */}
      <section className="mt-12 rounded-2xl border border-linea/80 bg-tarjeta p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <IconHelpCircle size={20} className="text-acento" />
          <h2 className="text-lg font-bold text-texto">Fallas de Fábrica y Devoluciones</h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-tenue">
          En el improbable caso de que una prenda presente una falla de costura, cierre o confección atribuible a fábrica, asumiremos el 100% de los costos de reemplazo o devolución íntegra del dinero.
        </p>
        <p className="text-xs text-tenue">
          No se aceptan devoluciones de dinero por cambio de opinión o errores en la elección de talla si el producto coincide con lo solicitado.
        </p>
      </section>

      {/* Botón CTA */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="boton-acento inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-bold shadow-md"
          >
            <IconMessageCircle size={18} stroke={2} />
            Coordinar un cambio por WhatsApp
          </a>
        )}
        <Link
          href="/ubicanos"
          className="boton-secundario inline-flex min-h-12 items-center px-5 py-3 text-sm font-bold"
        >
          Visitar Tienda Física
        </Link>
      </div>
    </div>
  );
}
