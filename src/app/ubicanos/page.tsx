import {
  IconBrandWhatsapp,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { PaginaInstitucional } from "@/components/PaginaInstitucional";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Ubícanos",
  robots: { index: false, follow: false },
};

const DIRECCION = "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Peru, 01";
const TELEFONO = "+51 908 843 695";
const EMAIL = "ventashorsepower@gmail.com";

function digitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

export default function UbicanosPage() {
  const mapaHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION)}`;
  const mapaEmbedHref = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}&output=embed`;
  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola, quiero coordinar una visita a HorsePower.")}`
    : "";

  return (
    <PaginaInstitucional
      eyebrow="Encuéntranos"
      titulo="Estamos cerca de ti."
      descripcion="Visítanos en Lima o coordina tu pedido con el equipo HorsePower antes de acercarte."
    >
      <section className="overflow-hidden rounded-[2rem] bg-[#174f97] p-2 shadow-[0_30px_80px_-45px_rgb(23_79_151/0.75)] lg:grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col rounded-[1.5rem] bg-[#174f97] px-5 py-9 text-texto-inverso sm:px-10 sm:py-12 lg:px-10 lg:py-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-texto-inverso/70">
            Tienda HorsePower
          </p>
          <h2 className="mt-5 max-w-sm text-4xl font-black leading-[0.96] tracking-[-0.06em] sm:text-5xl">
            Estamos
            <br />
            <span className="font-serif font-normal italic text-[#f0b4bd]">
              cerca de ti
            </span>
          </h2>

          <div className="mt-10 space-y-3">
            <div className="flex gap-4 rounded-2xl bg-[#ffffff]/10 p-4 ring-1 ring-[#ffffff]/10">
              <IconMapPin
                aria-hidden="true"
                className="mt-0.5 shrink-0"
                size={21}
                stroke={1.8}
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-texto-inverso/60">
                  Dirección
                </p>
                <address className="mt-1 not-italic text-sm font-semibold leading-relaxed">
                  {DIRECCION}
                </address>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-[#ffffff]/10 p-4 ring-1 ring-[#ffffff]/10">
              <IconPhone
                aria-hidden="true"
                className="mt-0.5 shrink-0"
                size={21}
                stroke={1.8}
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-texto-inverso/60">
                  Teléfono / WhatsApp
                </p>
                <a
                  href={`tel:${digitos(TELEFONO)}`}
                  className="mt-1 block text-sm font-semibold hover:text-[#f0b4bd]"
                >
                  {TELEFONO}
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-[#ffffff]/10 p-4 ring-1 ring-[#ffffff]/10">
              <IconMail
                aria-hidden="true"
                className="mt-0.5 shrink-0"
                size={21}
                stroke={1.8}
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-texto-inverso/60">
                  Correo
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-1 block break-all text-sm font-semibold hover:text-[#f0b4bd]"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${digitos(TELEFONO)}`}
              className="boton-acento inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 hover:-translate-y-0.5"
            >
              <IconPhone aria-hidden="true" size={18} stroke={1.8} />
              Llamar para coordinar
            </a>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#ffffff]/30 px-5 py-3 text-sm font-bold text-texto-inverso transition hover:border-[#ffffff]/70 hover:bg-[#ffffff]/10"
              >
                <IconBrandWhatsapp aria-hidden="true" size={18} stroke={1.8} />
                WhatsApp
              </a>
            )}
          </div>
        </div>

        <div className="relative min-h-[25rem] overflow-hidden rounded-[1.5rem] bg-[#dfe8ef] sm:min-h-[32rem] lg:min-h-[38rem]">
          <iframe
            title="Mapa de ubicación de HorsePower"
            src={mapaEmbedHref}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
          <a
            href={mapaHref}
            target="_blank"
            rel="noreferrer"
            className="absolute right-4 top-4 inline-flex items-center rounded-xl bg-[#ffffff] px-4 py-2.5 text-sm font-bold text-texto shadow-[0_12px_24px_-16px_rgb(21_22_25/0.7)] transition hover:-translate-y-0.5 hover:bg-[#f7f7f4]"
          >
            Abrir en Google Maps
          </a>
        </div>
      </section>
    </PaginaInstitucional>
  );
}
