import {
  IconChecklist,
  IconHeartHandshake,
  IconMessageCircle,
  IconSearch,
  IconShieldCheck,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Link from "next/link";
import type { Metadata } from "next";
import { PaginaInstitucional } from "@/components/PaginaInstitucional";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce HorsePower: prendas, casacas y mochilas diseñadas para tu día a día con confección duradera y atención directa por WhatsApp.",
};

const PILARES = [
  {
    titulo: "Calidad y Resistencia",
    descripcion:
      "Prendas confeccionadas con materiales de alto rendimiento pensadas para protegerte del frío y resistir el uso diario.",
    icon: IconShieldCheck,
  },
  {
    titulo: "Atención Cercana",
    descripcion:
      "Sin procesos automáticos impersonales: coordinas directamente con una asesora que te confirma medidas, fotos y stock real.",
    icon: IconHeartHandshake,
  },
  {
    titulo: "Envíos a Todo el Perú",
    descripcion:
      "Llegamos a Lima y provincias a través de agencias seguras y servicio de contraentrega o transferencias bancarias.",
    icon: IconTruckDelivery,
  },
];

const PASOS = [
  {
    titulo: "Explora el catálogo",
    descripcion:
      "Navega por nuestras colecciones de casacas, chompas, mochilas y accesorios con fotos y especificaciones.",
    icon: IconSearch,
  },
  {
    titulo: "Arma tu pedido",
    descripcion:
      "Selecciona tu color, talla y cantidad favorita directamente desde la ficha de cada modelo.",
    icon: IconShoppingBag,
  },
  {
    titulo: "Coordina por WhatsApp",
    descripcion:
      "Al enviar tu carrito, abrimos WhatsApp con el detalle listo para confirmar disponibilidad y método de entrega.",
    icon: IconMessageCircle,
  },
];

export default function NosotrosPage() {
  return (
    <PaginaInstitucional
      eyebrow="Sobre HorsePower"
      titulo="Prendas y accesorios diseñados para acompañar tu ritmo."
      descripcion="En HorsePower combinamos diseño funcional, abrigo y durabilidad en cada casaca, chompa y accesorio, brindando una experiencia de compra personalizada y transparente."
    >
      {/* Sección Principal / Manifiesto */}
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-texto p-7 text-fondo sm:p-10 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
              Nuestra Propuesta
            </p>
            <h2 className="texto-display mt-5 max-w-xl text-3xl leading-tight sm:text-4xl text-fondo">
              Diseño urbano, abrigo confiable y trato directo.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-fondo/80 text-sm sm:text-base">
              Nacimos con el objetivo de ofrecer ropa exterior y accesorios de alta calidad que se adapten al clima y a la rutina urbana. Creemos en el comercio transparente: te mostramos modelos reales y te asesoramos paso a paso antes de que realices tu compra.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-fondo/15 flex flex-wrap gap-4">
            <Link
              href="/categoria/casacas-y-chompas"
              className="boton-acento inline-flex min-h-11 items-center px-5 py-2.5 text-xs font-bold"
            >
              Ver Casacas y Chompas
            </Link>
            <Link
              href="/ubicanos"
              className="inline-flex min-h-11 items-center rounded-xl border border-fondo/20 px-5 py-2.5 text-xs font-bold text-fondo hover:bg-fondo/10 transition"
            >
              Conoce nuestra tienda
            </Link>
          </div>
        </div>

        {/* Pilares */}
        <aside className="space-y-4">
          {PILARES.map(({ titulo, descripcion, icon: Icono }) => (
            <div
              key={titulo}
              className="rounded-[1.5rem] border bg-tarjeta p-6 transition hover:border-texto hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-superficie text-acento">
                  <Icono size={20} stroke={2} />
                </span>
                <h3 className="font-bold text-base text-texto">{titulo}</h3>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-tenue">
                {descripcion}
              </p>
            </div>
          ))}
        </aside>
      </section>

      {/* Sección Cómo Funciona */}
      <section className="mt-16 sm:mt-20" aria-labelledby="como-funciona">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
              Proceso de Compra
            </p>
            <h2 id="como-funciona" className="texto-display mt-2 text-2xl sm:text-3xl font-black">
              Cómo comprar en HorsePower
            </h2>
          </div>
          <p className="text-xs text-tenue max-w-sm">
            Sin registros complicados ni pasarelas obligatorias. Todo rápido y seguro por chat.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PASOS.map(({ titulo, descripcion, icon: Icono }, index) => (
            <article key={titulo} className="rounded-2xl border bg-tarjeta p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-superficie text-acento">
                    <Icono aria-hidden="true" size={24} stroke={1.8} />
                  </span>
                  <span className="text-xs font-black tabular-nums text-tenue">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-texto">{titulo}</h3>
                <p className="mt-2 text-xs leading-relaxed text-tenue">{descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PaginaInstitucional>
  );
}
