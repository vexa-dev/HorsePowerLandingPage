import {
  IconArrowRight,
  IconHeartHandshake,
  IconMessageCircle,
  IconSearch,
  IconShieldCheck,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { productosConFoto } from "@/lib/catalogo";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";
import { RevealEnScroll } from "@/components/RevealEnScroll";
import { TiraProductos } from "./_componentes/TiraProductos";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce HorsePower: ropa exterior, casacas y mochilas de confección duradera, con una compra guiada y cerrada por WhatsApp.",
  alternates: { canonical: "/nosotros" },
};

const VALORES = [
  {
    titulo: "Calidad y resistencia",
    descripcion:
      "Prendas confeccionadas con materiales de alto rendimiento, pensadas para abrigar y aguantar el uso diario.",
    icon: IconShieldCheck,
  },
  {
    titulo: "Atención cercana",
    descripcion:
      "Nada de procesos automáticos: coordinas con una asesora que confirma medidas, fotos y stock real antes de comprar.",
    icon: IconHeartHandshake,
  },
  {
    titulo: "Envíos a todo el Perú",
    descripcion:
      "Llegamos a Lima y provincias por agencias seguras, con contraentrega o transferencia bancaria.",
    icon: IconTruckDelivery,
  },
];

const PASOS = [
  {
    titulo: "Explora el catálogo",
    descripcion:
      "Recorre las colecciones de casacas, chompas, mochilas y accesorios con fotos y especificaciones reales.",
    icon: IconSearch,
  },
  {
    titulo: "Arma tu pedido",
    descripcion:
      "Elige color, talla y cantidad desde la ficha de cada modelo y súmalo a tu carrito.",
    icon: IconShoppingBag,
  },
  {
    titulo: "Coordina por WhatsApp",
    descripcion:
      "Al enviar el carrito abrimos WhatsApp con el detalle listo para confirmar disponibilidad y entrega.",
    icon: IconMessageCircle,
  },
];

/** Contenedor centrado que comparten todas las bandas. */
const CONTENIDO = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

/** Etiqueta de sección en versalitas. */
function Rotulo({ children, id }: { children: string; id?: string }) {
  return (
    <h2
      id={id}
      className="text-[11px] font-bold uppercase tracking-[0.2em] text-tenue"
    >
      {children}
    </h2>
  );
}

export default async function NosotrosPage() {
  const productos = await productosConFoto();
  const tira = productos.slice(0, 20);

  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola HorsePower, quiero conocer más sobre sus productos.")}`
    : "";

  return (
    <div className="bg-fondo">
      {/* ─── Encabezado (fondo) ───────────────────────────────────────── */}
      <section className={`${CONTENIDO} pt-16 pb-20 sm:pt-20 sm:pb-24`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-acento">
          Sobre HorsePower
        </p>
        <div className="mt-5 grid gap-x-10 gap-y-8 lg:grid-cols-[1.7fr_1fr] lg:items-end">
          <h1 className="texto-display text-pretty text-4xl leading-[1.03] sm:text-6xl">
            Ropa exterior y accesorios, con trato directo.
          </h1>
          <p className="text-lg leading-relaxed text-tenue lg:pb-2">
            Vendemos casacas, chompas, mochilas y accesorios pensados para el día
            a día. Trabajamos con catálogo abierto y cerramos cada pedido por
            WhatsApp, con asesoría real antes de que compres.
          </p>
        </div>
      </section>

      {/* ─── Manifiesto (superficie) ─────────────────────────────────── */}
      <section className="border-y border-linea bg-superficie-fuerte">
        <div
          className={`${CONTENIDO} grid gap-x-10 gap-y-6 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr]`}
        >
          <h2 className="texto-display text-2xl leading-snug text-texto sm:text-4xl">
            Creemos en el comercio directo y transparente: modelos reales,
            asesoría antes de comprar y cierre por WhatsApp.
          </h2>
          <p className="leading-relaxed text-tenue lg:pt-2">
            Nuestra propuesta es simple: ropa exterior y accesorios de buena
            calidad, mostrados tal cual son, con alguien que te acompaña paso a
            paso. Sin pasarelas de pago obligatorias y sin registros.
          </p>
        </div>
      </section>

      {/* ─── Valores (fondo) ─────────────────────────────────────────── */}
      <section className={`${CONTENIDO} py-16 sm:py-20`} aria-labelledby="valores">
        <Rotulo id="valores">Lo que nos define</Rotulo>
        <div className="mt-8 grid gap-x-10 gap-y-10 border-t border-linea pt-10 sm:grid-cols-3">
          {VALORES.map(({ titulo, descripcion, icon: Icono }, i) => (
            <RevealEnScroll key={titulo} delay={i * 0.08}>
              <div className="sm:border-l sm:border-linea sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
                <Icono size={24} stroke={1.8} className="text-acento" />
                <h3 className="mt-5 text-lg font-black text-texto">{titulo}</h3>
                <p className="mt-2.5 leading-relaxed text-tenue">
                  {descripcion}
                </p>
              </div>
            </RevealEnScroll>
          ))}
        </div>
      </section>

      {/* ─── Cómo comprar (superficie) ──────────────────────────────── */}
      <section className="border-y border-linea bg-superficie-fuerte">
        <div
          className={`${CONTENIDO} py-16 sm:py-20`}
          aria-labelledby="proceso"
        >
          <Rotulo id="proceso">Cómo comprar</Rotulo>
          <ol className="mt-8 grid gap-x-10 gap-y-10 border-t border-linea pt-10 md:grid-cols-3">
            {PASOS.map(({ titulo, descripcion, icon: Icono }, index) => (
              <RevealEnScroll key={titulo} delay={index * 0.08}>
                <li className="md:border-l md:border-linea md:pl-8 md:first:border-l-0 md:first:pl-0">
                  <div className="flex items-center gap-3">
                    <span className="texto-display text-3xl text-acento sm:text-4xl">
                      0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-linea" aria-hidden />
                    <Icono size={20} stroke={1.8} className="text-tenue" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-texto">{titulo}</h3>
                  <p className="mt-2 leading-relaxed text-tenue">{descripcion}</p>
                </li>
              </RevealEnScroll>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Tira de productos (fondo) ──────────────────────────────── */}
      {tira.length > 0 && (
        <section className={`${CONTENIDO} py-16 sm:py-20`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-tenue">
            Algunos de nuestros modelos
          </p>
          <div className="mt-8">
            <TiraProductos productos={tira} duracion="90s" />
          </div>
        </section>
      )}

      {/* ─── Cierre (superficie) ────────────────────────────────────── */}
      <section className="border-t border-linea bg-superficie-fuerte">
        <div
          className={`${CONTENIDO} grid gap-6 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center`}
        >
          <h2 className="texto-display text-2xl leading-tight text-texto sm:text-3xl">
            ¿Quieres ver todo el catálogo o visitarnos?
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link
              href="/catalogo-completo"
              className="boton-oscuro inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-xs font-bold"
            >
              Ver catálogo completo
              <IconArrowRight size={15} stroke={2.4} />
            </Link>
            <Link
              href="/ubicanos"
              className="boton-secundario inline-flex min-h-11 items-center bg-tarjeta px-5 py-2.5 text-xs font-bold"
            >
              Cómo llegar a la tienda
            </Link>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 px-2 py-2.5 text-xs font-bold text-acento underline-offset-4 hover:underline"
              >
                <IconMessageCircle size={15} stroke={2} />
                Escribir por WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
