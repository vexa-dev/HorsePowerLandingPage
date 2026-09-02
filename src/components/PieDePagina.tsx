import {
  IconArrowUpRight,
  IconBook2,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconClock,
  IconCreditCard,
  IconMail,
  IconMapPin,
  IconPhone,
  type IconProps,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/tipos";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

const TIENDA = {
  direccion:
    process.env.NEXT_PUBLIC_DIRECCION?.trim() ||
    "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Peru, 01",
  horario:
    process.env.NEXT_PUBLIC_HORARIO?.trim() ||
    "Lunes a Sábado: 9:00 am – 8:00 pm",
  telefono:
    process.env.NEXT_PUBLIC_TELEFONO_CONTACTO?.trim() || "+51 908 843 695",
  email:
    process.env.NEXT_PUBLIC_EMAIL_CONTACTO?.trim() ||
    "ventashorsepower@gmail.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || "https://instagram.com/horsepower.pe",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK?.trim() || "https://facebook.com/horsepower.pe",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK?.trim() || "https://tiktok.com/@horsepower.pe",
  libroReclamaciones:
    process.env.NEXT_PUBLIC_LIBRO_RECLAMACIONES?.trim() || "",
};

function digitos(telefono: string): string {
  return telefono.replace(/\D/g, "");
}

function formatoTelefono(telefono: string): string {
  const numero = digitos(telefono);
  if (numero.length === 11 && numero.startsWith("51")) {
    return `+51 ${numero.slice(2, 5)} ${numero.slice(5, 8)} ${numero.slice(8)}`;
  }
  return telefono;
}

function EnlaceSocial({
  href,
  label,
  icon: Icono,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<IconProps>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-linea bg-tarjeta text-tenue shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-acento hover:bg-acento hover:text-white"
    >
      <Icono aria-hidden="true" size={17} stroke={1.8} />
    </a>
  );
}

export function PieDePagina() {
  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
        "Hola HorsePower, deseo consultar información sobre sus productos.",
      )}`
    : "https://wa.me/";
  const telefonoHref = digitos(TIENDA.telefono);

  return (
    <footer className="border-t border-linea bg-superficie/60 text-texto">
      {/* ─── Cuadrícula Principal (4 Columnas Equilibradas) ───────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-4 lg:gap-12 lg:px-8 lg:py-16">
        {/* Columna 1: Marca & Propuesta */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo/LogoHorsePower.svg"
              alt="HorsePower"
              width={38}
              height={38}
              className="size-9 object-contain"
            />
            <span className="texto-display text-lg tracking-[0.14em]">
              HORSE<span className="text-acento">POWER</span>
            </span>
          </Link>

          <p className="max-w-sm text-xs leading-relaxed text-tenue sm:text-sm">
            Casacas, chompas, mochilas y maletas con la máxima durabilidad y abrigo. Diseñados para resistir tu día a día y tus viajes.
          </p>

          <div className="pt-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-texto">
              Síguenos
            </p>
            <div className="flex items-center gap-2">
              <EnlaceSocial
                href={TIENDA.instagram}
                label="Instagram de HorsePower"
                icon={IconBrandInstagram}
              />
              <EnlaceSocial
                href={TIENDA.facebook}
                label="Facebook de HorsePower"
                icon={IconBrandFacebook}
              />
              <EnlaceSocial
                href={TIENDA.tiktok}
                label="TikTok de HorsePower"
                icon={IconBrandTiktok}
              />
            </div>
          </div>
        </div>

        {/* Columna 2: Categorías Directas */}
        <div className="mt-10 lg:mt-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-texto">
            Categorías
          </p>
          <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-tenue">
            {CATEGORIAS.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="transition-colors hover:text-acento hover:underline"
                >
                  {cat.nombre}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/catalogo-completo"
                className="inline-flex items-center gap-1.5 font-bold text-acento transition-colors hover:text-acento-hover hover:underline"
              >
                <span>Ver catálogo completo</span>
                <IconArrowUpRight size={15} stroke={2} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Compra y Ayuda */}
        <div className="mt-10 lg:mt-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-texto">
            Compra y Ayuda
          </p>
          <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-tenue">
            <li>
              <Link href="/" className="transition-colors hover:text-acento hover:underline">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/carrito" className="transition-colors hover:text-acento hover:underline">
                Carrito de compras
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="transition-colors hover:text-acento hover:underline">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/ubicanos" className="transition-colors hover:text-acento hover:underline">
                Ubícanos (Tienda física)
              </Link>
            </li>
            <li>
              <Link
                href="/cambios-y-devoluciones"
                className="transition-colors hover:text-acento hover:underline"
              >
                Cambios y devoluciones
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-privacidad"
                className="transition-colors hover:text-acento hover:underline"
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/terminos-y-condiciones"
                className="transition-colors hover:text-acento hover:underline"
              >
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 4: Atención & Contacto Directo */}
        <div className="mt-10 lg:mt-0 space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-texto">
            Atención al Cliente
          </p>

          <div className="space-y-2.5 text-xs sm:text-sm text-tenue">
            {telefonoHref && (
              <a
                href={`tel:${telefonoHref}`}
                className="flex items-center gap-2 transition-colors hover:text-texto"
              >
                <IconPhone size={16} stroke={1.8} className="shrink-0 text-acento" />
                <span>{formatoTelefono(TIENDA.telefono)}</span>
              </a>
            )}

            {TIENDA.email && (
              <a
                href={`mailto:${TIENDA.email}`}
                className="flex items-center gap-2 truncate transition-colors hover:text-texto"
              >
                <IconMail size={16} stroke={1.8} className="shrink-0 text-acento" />
                <span className="truncate">{TIENDA.email}</span>
              </a>
            )}

            {TIENDA.horario && (
              <div className="flex items-start gap-2">
                <IconClock size={16} stroke={1.8} className="mt-0.5 shrink-0 text-acento" />
                <span>{TIENDA.horario}</span>
              </div>
            )}

            {TIENDA.direccion && (
              <div className="flex items-start gap-2 leading-relaxed">
                <IconMapPin size={16} stroke={1.8} className="mt-0.5 shrink-0 text-acento" />
                <span>{TIENDA.direccion}</span>
              </div>
            )}
          </div>

          {/* Botón CTA directo a WhatsApp */}
          <div className="pt-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#20bd5a] hover:shadow-md"
            >
              <IconBrandWhatsapp size={18} stroke={2} />
              <span>Pedir asesoría por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Barra Inferior (Bottom Bar) ────────────────────────────────────── */}
      <div className="border-t border-linea bg-superficie py-6 text-xs text-tenue">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} HorsePower. Todos los derechos reservados. Precios y stock confirmados por WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Métodos de Pago */}
            <div className="flex items-center gap-1.5 text-[11px] text-tenue">
              <IconCreditCard size={15} stroke={1.8} className="text-tenue/70" />
              <span>Yape · Plin · Transferencias BCP / BBVA</span>
            </div>

            <span className="hidden sm:inline text-linea">|</span>

            {/* Libro de Reclamaciones */}
            {TIENDA.libroReclamaciones ? (
              <a
                href={TIENDA.libroReclamaciones}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-linea bg-tarjeta px-2.5 py-1 text-[11px] font-semibold text-texto shadow-2xs transition hover:border-acento hover:text-acento"
              >
                <IconBook2 size={14} stroke={1.8} />
                <span>Libro de Reclamaciones</span>
              </a>
            ) : (
              <Link
                href="/libro-de-reclamaciones"
                className="inline-flex items-center gap-1.5 rounded-lg border border-linea bg-tarjeta px-2.5 py-1 text-[11px] font-semibold text-texto shadow-2xs transition hover:border-acento hover:text-acento"
              >
                <IconBook2 size={14} stroke={1.8} />
                <span>Libro de Reclamaciones</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
