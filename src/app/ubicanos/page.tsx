import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconExternalLink,
  IconRoute,
  IconTruck,
  IconShieldCheck,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { PaginaInstitucional } from "@/components/PaginaInstitucional";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

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

  const redes = [tienda.instagram, tienda.facebook, tienda.tiktok].filter(
    Boolean,
  );

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

export default function UbicanosPage() {
  const mapa = construirEnlacesMapa(TIENDA);
  const negocioLd = construirNegocioLd(TIENDA);
  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola HorsePower, quiero consultar sobre la ubicación y atención en tienda.")}`
    : "";

  return (
    <PaginaInstitucional
      eyebrow="Encuéntranos"
      titulo="Visítanos en tienda."
      descripcion="Estamos en el corazón comercial de Lima. Ven de forma presencial o coordina tus envíos a todo el Perú por WhatsApp."
    >
      {/* JSON-LD: se escapa "<" para evitar cierre prematuro del <script>. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(negocioLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="overflow-hidden rounded-[2rem] border bg-tarjeta shadow-sm lg:grid lg:grid-cols-[1fr_1.1fr]">
        {/* Mapa */}
        <div className="relative order-first min-h-[24rem] w-full bg-superficie sm:min-h-[30rem] lg:order-last lg:min-h-full">
          <iframe
            title="Mapa interactivo de ubicación de HorsePower"
            src={mapa.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />

          <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-tarjeta/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-acento shadow-sm backdrop-blur">
            <IconMapPin size={13} stroke={2.2} />
            Tienda oficial · Lima
          </div>

          <a
            href={mapa.ver}
            target="_blank"
            rel="noreferrer"
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-xl bg-tarjeta/95 px-3.5 py-2 text-xs font-bold text-texto shadow-sm ring-1 ring-linea backdrop-blur transition hover:bg-tarjeta hover:text-acento"
          >
            Abrir en Google Maps
            <IconExternalLink size={14} />
          </a>
        </div>

        {/* Información de contacto */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          <div>
            <h2 className="texto-display text-3xl font-black text-texto sm:text-4xl">
              Nuestra Ubicación
            </h2>

            <div className="mt-8 space-y-3">
              {/* Dirección */}
              <a
                href={mapa.ver}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3.5 rounded-2xl bg-superficie p-4 transition hover:bg-superficie-fuerte"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tarjeta text-acento shadow-sm">
                  <IconMapPin size={20} stroke={1.8} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-tenue">
                    Dirección
                  </p>
                  <address className="mt-1 not-italic text-sm font-bold leading-relaxed text-texto">
                    {TIENDA.direccion}
                  </address>
                </div>
              </a>

              {/* Horario */}
              {TIENDA.horario && (
                <div className="flex items-start gap-3.5 rounded-2xl bg-superficie p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tarjeta text-acento shadow-sm">
                    <IconClock size={20} stroke={1.8} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-tenue">
                      Horario de Atención
                    </p>
                    <p className="mt-1 text-sm font-bold text-texto">
                      {TIENDA.horario}
                    </p>
                  </div>
                </div>
              )}

              {/* Teléfono / WhatsApp */}
              <a
                href={`tel:${digitos(TIENDA.telefono)}`}
                className="flex items-start gap-3.5 rounded-2xl bg-superficie p-4 transition hover:bg-superficie-fuerte"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tarjeta text-acento shadow-sm">
                  <IconPhone size={20} stroke={1.8} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-tenue">
                    Teléfono de Contacto
                  </p>
                  <p className="mt-1 text-sm font-bold text-texto">
                    {TIENDA.telefono}
                  </p>
                </div>
              </a>

              {/* Correo */}
              {TIENDA.email && (
                <a
                  href={`mailto:${TIENDA.email}`}
                  className="flex items-start gap-3.5 rounded-2xl bg-superficie p-4 transition hover:bg-superficie-fuerte"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tarjeta text-acento shadow-sm">
                    <IconMail size={20} stroke={1.8} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-tenue">
                      Correo Electrónico
                    </p>
                    <p className="mt-1 break-all text-sm font-bold text-texto">
                      {TIENDA.email}
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Botones de acción y Redes Sociales */}
          <div className="mt-8 border-t border-linea/60 pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="boton-acento inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold"
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
            </div>

            {/* Redes Sociales */}
            {(TIENDA.instagram || TIENDA.facebook || TIENDA.tiktok) && (
              <div className="mt-5 flex items-center gap-2">
                <span className="mr-1 text-xs font-semibold text-tenue">
                  Síguenos:
                </span>
                {TIENDA.instagram && (
                  <a
                    href={TIENDA.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-xl border text-tenue transition hover:border-texto hover:bg-superficie hover:text-texto"
                    aria-label="Instagram"
                  >
                    <IconBrandInstagram size={18} />
                  </a>
                )}
                {TIENDA.facebook && (
                  <a
                    href={TIENDA.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-xl border text-tenue transition hover:border-texto hover:bg-superficie hover:text-texto"
                    aria-label="Facebook"
                  >
                    <IconBrandFacebook size={18} />
                  </a>
                )}
                {TIENDA.tiktok && (
                  <a
                    href={TIENDA.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-xl border text-tenue transition hover:border-texto hover:bg-superficie hover:text-texto"
                    aria-label="TikTok"
                  >
                    <IconBrandTiktok size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Garantías */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {GARANTIAS.map(({ icono: Icono, titulo, detalle }) => (
          <div
            key={titulo}
            className="rounded-2xl border bg-tarjeta p-5 shadow-sm"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-superficie text-acento">
              <Icono size={20} stroke={1.8} />
            </span>
            <p className="mt-3 text-sm font-black text-texto">{titulo}</p>
            <p className="mt-1 text-xs leading-relaxed text-tenue">{detalle}</p>
          </div>
        ))}
      </div>
    </PaginaInstitucional>
  );
}
