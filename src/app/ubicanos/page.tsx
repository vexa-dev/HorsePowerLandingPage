import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBuildingStore,
  IconClock,
  IconExternalLink,
  IconMail,
  IconMapPin,
  IconPhone,
  IconRoute,
  IconShieldCheck,
  IconTruck,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";
import { BotonCopiar } from "./_componentes/BotonCopiar";
import { CtaFlotante } from "./_componentes/CtaFlotante";
import { EstadoTienda } from "./_componentes/EstadoTienda";

const SITIO = process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export const metadata: Metadata = {
  title: "Ubícanos y Contacto",
  description:
    "Visita nuestra tienda física en Lima o contáctanos por WhatsApp, teléfono y redes sociales para coordinar tus compras en HorsePower.",
  alternates: { canonical: "/ubicanos" },
};

const TIENDA = {
  direccion:
    process.env.NEXT_PUBLIC_DIRECCION?.trim() ||
    "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Perú, 01",
  lat: process.env.NEXT_PUBLIC_TIENDA_LAT?.trim() || "",
  lng: process.env.NEXT_PUBLIC_TIENDA_LNG?.trim() || "",
  horario:
    process.env.NEXT_PUBLIC_HORARIO?.trim() ||
    "Lunes a Sábado: 9:00 am - 8:00 pm",
  telefono:
    process.env.NEXT_PUBLIC_TELEFONO_CONTACTO?.trim() || "+51 908 843 695",
  email:
    process.env.NEXT_PUBLIC_EMAIL_CONTACTO?.trim() ||
    "ventashorsepower@gmail.com",
  /** Lista separada por comas: "Efectivo, Yape, Plin, Visa". Opcional. */
  metodosPago: process.env.NEXT_PUBLIC_METODOS_PAGO?.trim() || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK?.trim() || "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK?.trim() || "",
};

function digitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/**
 * Enlaces de mapa. Si hay coordenadas exactas se usan para que el pin caiga
 * justo sobre la tienda; si no, se recurre a la dirección de texto (que Google
 * geocodifica de forma aproximada).
 */
function construirEnlacesMapa(tienda: typeof TIENDA) {
  const tieneCoords = Boolean(tienda.lat && tienda.lng);
  const punto = tieneCoords ? `${tienda.lat},${tienda.lng}` : tienda.direccion;

  return {
    embed: tieneCoords
      ? `https://www.google.com/maps?q=${encodeURIComponent(punto)}&z=17&hl=es&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(punto)}&output=embed`,
    ver: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(punto)}`,
    comoLlegar: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(punto)}`,
  };
}

const REDES = [
  { url: TIENDA.instagram, icono: IconBrandInstagram, nombre: "Instagram" },
  { url: TIENDA.facebook, icono: IconBrandFacebook, nombre: "Facebook" },
  { url: TIENDA.tiktok, icono: IconBrandTiktok, nombre: "TikTok" },
].filter((r) => r.url);

const GARANTIAS = [
  {
    icono: IconTruck,
    titulo: "Envíos a todo el Perú",
    detalle: "Coordinamos el despacho por agencia a nivel nacional.",
  },
  {
    icono: IconShieldCheck,
    titulo: "Compra presencial segura",
    detalle: "Revisa y prueba el producto antes de pagar en tienda.",
  },
  {
    icono: IconBrandWhatsapp,
    titulo: "Atención por WhatsApp",
    detalle: "Resolvemos dudas y reservamos tu pedido en minutos.",
  },
];

/**
 * Datos estructurados LocalBusiness para que Google (y las AI Overviews)
 * entiendan la ficha de negocio: dirección, contacto, geo y horario.
 * El horario solo se declara si se usa el valor por defecto (Lun-Sáb 9-20);
 * si el cliente cambia NEXT_PUBLIC_HORARIO a otro formato, se omite para no
 * publicar un horario incorrecto.
 */
function construirNegocioLd(tienda: typeof TIENDA) {
  const usaHorarioPorDefecto =
    tienda.horario === "Lunes a Sábado: 9:00 am - 8:00 pm";

  const redes = REDES.map((r) => r.url);

  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "HorsePower",
    url: `${SITIO}/ubicanos`,
    image: `${SITIO}/logo/LogoHorsePower.svg`,
    telephone: tienda.telefono,
    email: tienda.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: tienda.direccion,
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    geo:
      tienda.lat && tienda.lng
        ? {
            "@type": "GeoCoordinates",
            latitude: tienda.lat,
            longitude: tienda.lng,
          }
        : undefined,
    openingHoursSpecification: usaHorarioPorDefecto
      ? {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "20:00",
        }
      : undefined,
    sameAs: redes.length > 0 ? redes : undefined,
  };
}

/** Fila de la ficha de contacto: icono + etiqueta + contenido (valor / acciones). */
function FilaDato({
  icono: Icono,
  etiqueta,
  children,
}: {
  icono: typeof IconMapPin;
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3.5 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-acento/10 text-acento">
        <Icono size={20} stroke={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-tenue">
          {etiqueta}
        </p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
}

export default function UbicanosPage() {
  const mapa = construirEnlacesMapa(TIENDA);
  const negocioLd = construirNegocioLd(TIENDA);
  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola HorsePower, quiero consultar sobre la ubicación y atención en tienda.")}`
    : "";
  const metodosPago = TIENDA.metodosPago
    ? TIENDA.metodosPago.split(",").map((m) => m.trim()).filter(Boolean)
    : [];

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* JSON-LD: se escapa "<" para evitar cierre prematuro del <script>. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(negocioLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Encabezado */}
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
          <span className="size-1.5 rounded-full bg-acento" aria-hidden />
          Encuéntranos
        </p>
        <h1 className="texto-display mt-5 text-balance text-4xl leading-[1.02] sm:text-5xl">
          Visítanos en tienda.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-tenue">
          Estamos en el corazón comercial de Lima. Ven de forma presencial o
          coordina tus envíos a todo el Perú por WhatsApp.
        </p>

        <ul className="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-texto">
          <li className="inline-flex items-center gap-1.5 rounded-full border bg-tarjeta px-3 py-1.5">
            <IconMapPin size={14} className="text-acento" />
            Cercado de Lima
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full border bg-tarjeta px-3 py-1.5">
            <IconClock size={14} className="text-acento" />
            {TIENDA.horario}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full border bg-tarjeta px-3 py-1.5">
            <IconTruck size={14} className="text-acento" />
            Envíos a todo el Perú
          </li>
        </ul>
      </header>

      <span id="cta-ancla" aria-hidden className="block" />

      {/* Tarjeta principal: mapa + ficha */}
      <section className="premium-card mt-10 overflow-hidden rounded-[2rem] border bg-tarjeta shadow-md lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-center">
        {/* Mapa */}
        <div className="relative min-h-[20rem] w-full overflow-hidden bg-superficie sm:min-h-[26rem] lg:m-3 lg:min-h-0 lg:h-[30rem] lg:self-center lg:rounded-2xl">
          <iframe
            title="Mapa interactivo de ubicación de HorsePower"
            src={mapa.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />

          <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-tarjeta/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-acento shadow-md backdrop-blur">
            <IconMapPin size={13} stroke={2.2} />
            Tienda oficial · Lima
          </div>

          <a
            href={mapa.ver}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-xl bg-tarjeta/95 px-3.5 py-2 text-xs font-bold text-texto shadow-md ring-1 ring-linea backdrop-blur transition hover:bg-tarjeta hover:text-acento"
          >
            Ver mapa ampliado
            <IconExternalLink size={14} />
          </a>
        </div>

        {/* Ficha de contacto */}
        <div className="flex flex-col p-6 sm:p-10 lg:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-acento/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-acento">
              <IconBuildingStore size={13} stroke={2.2} />
              Tienda oficial
            </span>
            <EstadoTienda horario={TIENDA.horario} />
          </div>

          <h2 className="texto-display mt-3 text-3xl font-black text-texto sm:text-4xl">
            Nuestra Ubicación
          </h2>
          <p className="mt-2 text-sm text-tenue">
            Atención presencial y coordinación de envíos a todo el país.
          </p>

          <ul className="mt-6 divide-y divide-linea/60 overflow-hidden rounded-2xl border">
            <FilaDato icono={IconMapPin} etiqueta="Dirección">
              <div className="flex items-start gap-2">
                <address className="min-w-0 flex-1 not-italic text-sm font-bold leading-relaxed text-texto">
                  {TIENDA.direccion}
                </address>
                <BotonCopiar
                  valor={TIENDA.direccion}
                  etiqueta="dirección"
                />
              </div>
              <a
                href={mapa.ver}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-acento hover:underline"
              >
                Abrir en Google Maps
                <IconExternalLink size={12} />
              </a>
            </FilaDato>

            {TIENDA.horario && (
              <FilaDato icono={IconClock} etiqueta="Horario de atención">
                <p className="text-sm font-bold text-texto">{TIENDA.horario}</p>
              </FilaDato>
            )}

            <FilaDato icono={IconPhone} etiqueta="Teléfono de contacto">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${digitos(TIENDA.telefono)}`}
                  className="min-w-0 flex-1 text-sm font-bold text-texto hover:text-acento"
                >
                  {TIENDA.telefono}
                </a>
                <BotonCopiar valor={TIENDA.telefono} etiqueta="teléfono" />
              </div>
            </FilaDato>

            {TIENDA.email && (
              <FilaDato icono={IconMail} etiqueta="Correo electrónico">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${TIENDA.email}`}
                    className="min-w-0 flex-1 break-all text-sm font-bold text-texto hover:text-acento"
                  >
                    {TIENDA.email}
                  </a>
                  <BotonCopiar valor={TIENDA.email} etiqueta="correo" />
                </div>
              </FilaDato>
            )}

            {metodosPago.length > 0 && (
              <FilaDato icono={IconBuildingStore} etiqueta="Pago en tienda">
                <div className="flex flex-wrap gap-1.5">
                  {metodosPago.map((m) => (
                    <span
                      key={m}
                      className="rounded-md bg-superficie px-2 py-0.5 text-xs font-bold text-texto"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </FilaDato>
            )}
          </ul>

          {/* Acciones */}
          <div className="mt-6 flex flex-col gap-2.5 border-t border-linea/60 pt-6 sm:flex-row sm:flex-wrap">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="boton-acento inline-flex min-h-11 flex-[2] items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold"
              >
                <IconBrandWhatsapp size={18} stroke={2} />
                Escribir a WhatsApp
              </a>
            )}
            <a
              href={mapa.comoLlegar}
              target="_blank"
              rel="noreferrer"
              className="boton-oscuro inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold"
            >
              <IconRoute size={18} stroke={2} />
              Cómo llegar
            </a>
            <a
              href={`tel:${digitos(TIENDA.telefono)}`}
              className="boton-secundario inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold"
            >
              <IconPhone size={18} stroke={2} />
              Llamar
            </a>
          </div>

          {REDES.length > 0 && (
            <div className="mt-5 flex items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-tenue">
                Síguenos:
              </span>
              {REDES.map(({ url, icono: Icono, nombre }) => (
                <a
                  key={nombre}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl border text-tenue transition hover:border-texto hover:bg-superficie hover:text-texto"
                  aria-label={nombre}
                >
                  <Icono size={18} />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Garantías */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {GARANTIAS.map(({ icono: Icono, titulo, detalle }) => (
          <div
            key={titulo}
            className="rounded-2xl border bg-tarjeta p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-superficie text-acento">
              <Icono size={20} stroke={1.8} />
            </span>
            <p className="mt-3 text-sm font-black text-texto">{titulo}</p>
            <p className="mt-1 text-xs leading-relaxed text-tenue">{detalle}</p>
          </div>
        ))}
      </div>

      {/* Ayuda para llegar */}
      <div className="mt-6 rounded-2xl border bg-superficie p-6 sm:p-8">
        <h3 className="texto-display text-xl font-black text-texto">
          ¿Cómo llegar a la tienda?
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-tenue">
          Estamos en el Cercado de Lima, sobre Jr. Andahuaylas, una de las zonas
          de galerías más conocidas del centro. Si no nos ubicas, escríbenos por
          WhatsApp con tu ubicación y te guiamos paso a paso.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={mapa.comoLlegar}
            target="_blank"
            rel="noreferrer"
            className="boton-oscuro inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-xs font-bold"
          >
            <IconRoute size={18} stroke={2} />
            Trazar ruta en Maps
          </a>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="boton-secundario inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-xs font-bold"
            >
              <IconBrandWhatsapp size={18} stroke={2} />
              Pedir indicaciones
            </a>
          )}
        </div>
      </div>

      {/* Cierre */}
      <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Link
          href="/catalogo-completo"
          className="boton-oscuro inline-flex min-h-12 items-center px-5 py-3"
        >
          Ver catálogo antes de visitarnos
        </Link>
        <span className="text-sm text-tenue">
          o escríbenos y coordinamos todo por WhatsApp.
        </span>
      </div>

      <span id="cta-fin" aria-hidden className="block" />

      <CtaFlotante whatsappHref={whatsappHref} comoLlegarHref={mapa.comoLlegar} />
    </article>
  );
}
