import {
  IconArrowRight,
  IconBuildingStore,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconHeartHandshake,
  IconMapPin,
  IconMessageCircle,
  IconSearch,
  IconShieldCheck,
  IconShoppingBag,
  IconSparkles,
  IconTruckDelivery,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { productosConFoto } from "@/lib/catalogo";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";
import { RevealEnScroll } from "@/components/RevealEnScroll";
import { TiraProductos } from "./_componentes/TiraProductos";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sobre Nosotros | HorsePower",
  description:
    "Conoce HorsePower: ropa exterior, casacas y mochilas de confección duradera con tienda física en Lima y compra guiada por WhatsApp.",
  alternates: { canonical: "/nosotros" },
};

const STATS = [
  {
    cifra: "77+",
    etiqueta: "Modelos disponibles",
    detalle: "Casacas, chompas y mochilas",
  },
  {
    cifra: "100%",
    etiqueta: "Atención humana",
    detalle: "Asesoría directa por WhatsApp",
  },
  {
    cifra: "Todo el Perú",
    etiqueta: "Envíos diarios",
    detalle: "Lima y provincias vía agencias",
  },
  {
    cifra: "Tienda Física",
    etiqueta: "Lima Centro",
    detalle: "Pruébate o paga contraentrega",
  },
];

const VALORES = [
  {
    titulo: "Calidad y Resistencia",
    descripcion:
      "Prendas y mochilas confeccionadas con materiales de alto rendimiento, costuras reforzadas y cierres duraderos pensados para el uso exigente del día a día.",
    icon: IconShieldCheck,
    badge: "Durabilidad",
  },
  {
    titulo: "Atención Cercana y Humana",
    descripcion:
      "Nada de respuestas automáticas ni bots lentos: una asesora te acompaña en WhatsApp para confirmar medidas exactas en centímetros, colores y stock real antes de comprar.",
    icon: IconHeartHandshake,
    badge: "Trato Directo",
  },
  {
    titulo: "Envíos y Recojo Garantizado",
    descripcion:
      "Despachos rápidos y seguros a todo el Perú con número de seguimiento y boleta, además de recojo inmediato en nuestra tienda física de Lima con opción contraentrega.",
    icon: IconTruckDelivery,
    badge: "Seguridad",
  },
];

const PASOS = [
  {
    titulo: "Explora el catálogo",
    descripcion:
      "Recorre nuestras colecciones de casacas, chompas y mochilas con fotografías reales y especificaciones claras.",
    icon: IconSearch,
  },
  {
    titulo: "Arma tu pedido",
    descripcion:
      "Selecciona tus modelos, tallas y colores preferidos y agrégalos al carrito con un solo clic.",
    icon: IconShoppingBag,
  },
  {
    titulo: "Coordina por WhatsApp",
    descripcion:
      "Al enviar el pedido se abre WhatsApp con la lista lista para confirmar disponibilidad, envío o fecha de recojo en tienda.",
    icon: IconMessageCircle,
  },
];

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: "¿Cómo sé mi talla exacta antes de comprar por WhatsApp?",
    respuesta:
      "Nuestra asesora te pide tu estatura, peso aproximado o te comparte la tabla de medidas en centímetros de la prenda para garantizar que te quede perfecta antes de despachar.",
  },
  {
    pregunta: "¿Cómo se realizan los envíos a provincias?",
    respuesta:
      "Trabajamos con agencias seguras como Shalom, Olva Courier, Marvisur y Flores. Una vez depositado el paquete, te enviamos la foto de la boleta y la guía de remisión para que realices el seguimiento de tu encomienda.",
  },
  {
    pregunta: "¿Puedo visitar la tienda física para probarme o pagar contraentrega?",
    respuesta:
      "¡Por supuesto! Nuestra tienda física está ubicada en Jr. Andahuaylas Nº 198 Tda. 101, Lima. Puedes venir a probarte cualquier modelo y pagar al momento en efectivo, Yape, Plin o tarjeta.",
  },
  {
    pregunta: "¿Qué garantía tienen los productos y cambios de talla?",
    respuesta:
      "Todas nuestras prendas cuentan con garantía de confección. Si necesitas cambio de talla o modelo, puedes acercarte directamente a nuestra tienda física o coordinarlo por WhatsApp para el reenvío.",
  },
];

const CONTENIDO = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default async function NosotrosPage() {
  const productos = await productosConFoto();
  const tira = productos.slice(0, 20);

  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
        "Hola HorsePower, quiero consultar sobre sus productos y tienda física.",
      )}`
    : "";

  return (
    <div className="bg-fondo text-texto">
      {/* ─── 1. Hero con Fotografía y Propuesta de Marca ─────────────────────── */}
      <section className="relative overflow-hidden border-b border-linea bg-superficie/40 py-12 sm:py-18 lg:py-20">
        <div className={CONTENIDO}>
          {/* Breadcrumb */}
          <nav aria-label="Migas de pan" className="mb-6 flex items-center gap-2 text-xs font-semibold text-tenue">
            <Link href="/" className="hover:text-texto transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-texto" aria-current="page">
              Sobre Nosotros
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Texto de cabecera */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-acento/20 bg-acento/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-acento">
                <IconSparkles size={14} />
                Confección Peruana & Trato Directo
              </span>

              <h1 className="texto-display mt-5 text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Ropa exterior y accesorios de alta duración.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-tenue sm:text-lg">
                En HorsePower diseñamos casacas, chompas y mochilas pensadas para resistir el ritmo del día a día. Creemos en el comercio transparente: con atención humana por WhatsApp y una tienda física en Lima donde siempre eres bienvenido.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/catalogo-completo" className="boton-oscuro inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-bold shadow-sm">
                  Explorar catálogo
                  <IconArrowRight size={16} />
                </Link>
                <Link href="/ubicanos" className="boton-secundario inline-flex min-h-12 items-center gap-2 bg-tarjeta px-5 py-3 text-sm font-bold">
                  <IconMapPin size={16} className="text-acento" />
                  Visitar tienda física
                </Link>
              </div>
            </div>

            {/* Fotografía de portada */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-linea bg-tarjeta shadow-md sm:aspect-5/4">
                <Image
                  src="/hero/horsepower-portada.jpeg"
                  alt="Tienda física de HorsePower en Lima con exhibición de mochilas y prendas"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Badge inferior en foto */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-texto/80 p-3 text-texto-inverso backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-acento text-texto-inverso">
                      <IconBuildingStore size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-bold leading-tight">Tienda Física HorsePower</p>
                      <p className="text-[11px] text-white/70">Jr. Andahuaylas 198, Lima</p>
                    </div>
                  </div>
                  <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Abierto
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Cifras de Confianza (Trust Counters) ────────────────────────── */}
      <section className="border-b border-linea bg-superficie/60 py-10 sm:py-12">
        <div className={CONTENIDO}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <RevealEnScroll key={s.etiqueta} delay={i * 0.06}>
                <div className="rounded-2xl border border-linea/60 bg-tarjeta p-5 shadow-2xs">
                  <p className="texto-display text-2xl font-black text-acento sm:text-3xl lg:text-4xl">
                    {s.cifra}
                  </p>
                  <p className="mt-2 text-xs font-bold text-texto sm:text-sm">
                    {s.etiqueta}
                  </p>
                  <p className="mt-0.5 text-[11px] text-tenue">
                    {s.detalle}
                  </p>
                </div>
              </RevealEnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Pilares de Valor (Tarjetas con Elevación) ───────────────────── */}
      <section className={`${CONTENIDO} py-16 sm:py-20`} aria-labelledby="valores">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-wider text-acento">
            Nuestros Pilares
          </p>
          <h2 id="valores" className="texto-display mt-2 text-2xl font-black tracking-tight sm:text-4xl">
            Lo que define a cada prenda HorsePower
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {VALORES.map(({ titulo, descripcion, icon: Icono, badge }, i) => (
            <RevealEnScroll key={titulo} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-linea bg-tarjeta p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-acento/50 hover:shadow-md sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-acento/10 text-acento ring-1 ring-acento/20 transition group-hover:bg-acento group-hover:text-texto-inverso">
                    <Icono size={24} stroke={2} />
                  </span>
                  <span className="rounded-full bg-superficie px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-tenue border border-linea/60">
                    {badge}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-black text-texto">
                  {titulo}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-tenue">
                  {descripcion}
                </p>
              </div>
            </RevealEnScroll>
          ))}
        </div>
      </section>

      {/* ─── 4. Sección Destacada: Nuestra Tienda Física en Lima ────────────── */}
      <section className="border-y border-linea bg-superficie-fuerte py-16 sm:py-20">
        <div className={CONTENIDO}>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-linea bg-tarjeta px-3 py-1 text-xs font-bold text-tenue">
                <IconBuildingStore size={15} className="text-acento" />
                Punto de Venta y Retiro en Lima
              </span>

              <h2 className="texto-display text-2xl font-black tracking-tight sm:text-4xl">
                ¿Prefieres ver y probarte las prendas en persona?
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-tenue">
                Visita nuestro local comercial en el centro de Lima. Podrás revisar la calidad de confección, probarte todas las tallas de casacas y mochilas, o retirar tu pedido coordinado por la web sin costo de envío.
              </p>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-linea bg-tarjeta p-4 shadow-2xs">
                  <IconMapPin size={20} className="text-acento shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-texto">Ubicación exacta</p>
                    <p className="mt-0.5 text-xs text-tenue">Jr. Andahuaylas Nº 198 Tda. 101, Lima</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-linea bg-tarjeta p-4 shadow-2xs">
                  <IconClock size={20} className="text-acento shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-texto">Horario de atención</p>
                    <p className="mt-0.5 text-xs text-tenue">Lunes a Sábado: 9:00 am – 8:00 pm</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/ubicanos"
                  className="boton-oscuro inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-xs font-bold"
                >
                  Ver mapa y cómo llegar
                  <IconArrowRight size={15} />
                </Link>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-linea bg-tarjeta px-5 py-2.5 text-xs font-bold text-texto hover:bg-superficie transition"
                  >
                    <IconMessageCircle size={16} className="text-[#25D366]" />
                    Consultar por WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-linea bg-tarjeta p-6 sm:p-7 shadow-xs space-y-4">
                <p className="text-xs font-black uppercase tracking-wider text-acento">
                  Beneficios en Tienda Física
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-tenue">
                  <li className="flex items-center gap-2.5">
                    <IconCheck size={18} className="text-acento shrink-0" />
                    <span>Pruébate modelos y confirma tu talla con tranquilidad</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <IconCheck size={18} className="text-acento shrink-0" />
                    <span>Pago contraentrega: Efectivo, Yape, Plin o tarjetas</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <IconCheck size={18} className="text-acento shrink-0" />
                    <span>Recojo de pedidos web al instante y sin cobro de delivery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <IconCheck size={18} className="text-acento shrink-0" />
                    <span>Garantía de cambio inmediata presentando tu boleta</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Cómo Comprar (3 Pasos Claros) ────────────────────────────────── */}
      <section className={`${CONTENIDO} py-16 sm:py-20`}>
        <div className="max-w-xl">
          <p className="text-xs font-black uppercase tracking-wider text-acento">
            Proceso de Compra
          </p>
          <h2 className="texto-display mt-2 text-2xl font-black tracking-tight sm:text-4xl">
            Cómo comprar en 3 pasos sencillos
          </h2>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {PASOS.map(({ titulo, descripcion, icon: Icono }, index) => (
            <RevealEnScroll key={titulo} delay={index * 0.08}>
              <li className="h-full rounded-2xl border border-linea bg-tarjeta p-6 shadow-2xs">
                <div className="flex items-center justify-between border-b border-linea/60 pb-4">
                  <span className="texto-display text-3xl font-black text-acento sm:text-4xl">
                    0{index + 1}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-xl bg-superficie text-tenue">
                    <Icono size={20} stroke={1.8} />
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-texto">{titulo}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-tenue">{descripcion}</p>
              </li>
            </RevealEnScroll>
          ))}
        </ol>
      </section>

      {/* ─── 6. Preguntas Frecuentes de Confianza (FAQ) ──────────────────────── */}
      <section className="border-t border-linea bg-superficie/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-wider text-acento">
              Preguntas Frecuentes
            </p>
            <h2 className="texto-display mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Todo lo que necesitas saber antes de comprar
            </h2>
          </div>

          <div className="mt-8 space-y-3.5">
            {PREGUNTAS_FRECUENTES.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-2xl border border-linea bg-tarjeta p-4 sm:p-5 shadow-2xs transition-all open:border-acento/50 open:shadow-xs"
              >
                <summary className="flex cursor-pointer items-center justify-between text-xs sm:text-sm font-bold text-texto list-none">
                  <span>{faq.pregunta}</span>
                  <IconChevronDown
                    size={18}
                    className="shrink-0 text-tenue transition-transform duration-200 group-open:rotate-180 group-open:text-acento"
                  />
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-tenue sm:text-sm border-t border-linea/40 pt-3">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Tira de Productos en Exhibición ─────────────────────────────── */}
      {tira.length > 0 && (
        <section className={`${CONTENIDO} py-16 sm:py-20`}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-tenue">
                Nuestras Colecciones
              </p>
              <h2 className="texto-display mt-1 text-2xl font-bold sm:text-3xl">
                Algunos de nuestros modelos
              </h2>
            </div>
            <Link
              href="/catalogo-completo"
              className="hidden text-xs font-bold text-acento hover:underline sm:inline-flex items-center gap-1"
            >
              Ver todo el catálogo →
            </Link>
          </div>
          <div>
            <TiraProductos productos={tira} duracion="90s" />
          </div>
        </section>
      )}

      {/* ─── 8. Cierre y Llamado a la Acción ─────────────────────────────────── */}
      <section className="border-t border-linea bg-superficie-fuerte">
        <div
          className={`${CONTENIDO} grid gap-6 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center`}
        >
          <div>
            <h2 className="texto-display text-2xl font-black leading-tight text-texto sm:text-3xl">
              ¿Listo para renovar tu outfit con HorsePower?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-tenue">
              Explora el catálogo en línea o escríbenos directamente para asesorarte con tu pedido.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/catalogo-completo"
              className="boton-oscuro inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold shadow-sm"
            >
              Ver catálogo completo
              <IconArrowRight size={16} />
            </Link>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="boton-secundario inline-flex min-h-12 items-center gap-2 bg-tarjeta px-5 py-3 text-xs sm:text-sm font-bold"
              >
                <IconMessageCircle size={16} className="text-[#25D366]" />
                Consultar por WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
