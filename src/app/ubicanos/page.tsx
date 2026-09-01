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
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { PaginaInstitucional } from "@/components/PaginaInstitucional";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Ubícanos y Contacto",
  description:
    "Visita nuestra tienda física en Lima o contáctanos por WhatsApp, teléfono y redes sociales para coordinar tus compras en HorsePower.",
};

const TIENDA = {
  direccion:
    process.env.NEXT_PUBLIC_DIRECCION?.trim() ||
    "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Perú, 01",
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

export default function UbicanosPage() {
  const mapaHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(TIENDA.direccion)}`;
  const mapaEmbedHref = `https://www.google.com/maps?q=${encodeURIComponent(TIENDA.direccion)}&output=embed`;
  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola HorsePower, quiero consultar sobre la ubicación y atención en tienda.")}`
    : "";

  return (
    <PaginaInstitucional
      eyebrow="Encuéntranos"
      titulo="Visítanos en tienda o contáctanos directamente."
      descripcion="Estamos ubicados en el corazón comercial de Lima. Puedes visitarnos de forma presencial o coordinar tus envíos a todo el Perú por WhatsApp."
    >
      <section className="overflow-hidden rounded-[2rem] border bg-tarjeta shadow-sm lg:grid lg:grid-cols-[1fr_1.1fr]">
        {/* Información de contacto */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-superficie px-3 py-1 text-xs font-bold uppercase tracking-wider text-acento">
              <IconMapPin size={14} />
              Tienda Oficial Lima
            </div>

            <h2 className="texto-display mt-4 text-3xl sm:text-4xl font-black text-texto">
              Nuestra Ubicación
            </h2>

            <div className="mt-8 space-y-4">
              {/* Dirección */}
              <div className="flex items-start gap-3.5 rounded-2xl bg-superficie p-4">
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
              </div>

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
              <div className="flex items-start gap-3.5 rounded-2xl bg-superficie p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tarjeta text-acento shadow-sm">
                  <IconPhone size={20} stroke={1.8} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-tenue">
                    Teléfono de Contacto
                  </p>
                  <a
                    href={`tel:${digitos(TIENDA.telefono)}`}
                    className="mt-1 block text-sm font-bold text-texto hover:text-acento transition-colors"
                  >
                    {TIENDA.telefono}
                  </a>
                </div>
              </div>

              {/* Correo */}
              {TIENDA.email && (
                <div className="flex items-start gap-3.5 rounded-2xl bg-superficie p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tarjeta text-acento shadow-sm">
                    <IconMail size={20} stroke={1.8} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-tenue">
                      Correo Electrónico
                    </p>
                    <a
                      href={`mailto:${TIENDA.email}`}
                      className="mt-1 block text-sm font-bold text-texto hover:text-acento transition-colors break-all"
                    >
                      {TIENDA.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones de acción y Redes Sociales */}
          <div className="mt-8 pt-6 border-t border-linea/60">
            <div className="flex flex-wrap gap-3">
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
                href={mapaHref}
                target="_blank"
                rel="noreferrer"
                className="boton-secundario inline-flex min-h-11 items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold"
              >
                Google Maps
                <IconExternalLink size={14} />
              </a>
            </div>

            {/* Redes Sociales */}
            {(TIENDA.instagram || TIENDA.facebook || TIENDA.tiktok) && (
              <div className="mt-5 flex items-center gap-2">
                <span className="text-xs font-semibold text-tenue mr-1">Síguenos:</span>
                {TIENDA.instagram && (
                  <a
                    href={TIENDA.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border hover:border-texto hover:bg-superficie text-tenue hover:text-texto transition"
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
                    className="p-2 rounded-lg border hover:border-texto hover:bg-superficie text-tenue hover:text-texto transition"
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
                    className="p-2 rounded-lg border hover:border-texto hover:bg-superficie text-tenue hover:text-texto transition"
                    aria-label="TikTok"
                  >
                    <IconBrandTiktok size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mapa Embebido */}
        <div className="relative min-h-[22rem] sm:min-h-[30rem] lg:min-h-full w-full bg-superficie border-t lg:border-t-0 lg:border-l border-linea/60">
          <iframe
            title="Mapa interactivo de ubicación de HorsePower"
            src={mapaEmbedHref}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </section>
    </PaginaInstitucional>
  );
}
