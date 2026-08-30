import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBook2,
  IconFileText,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShieldCheck,
  type IconProps,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

const TIENDA = {
  direccion:
    process.env.NEXT_PUBLIC_DIRECCION?.trim() ||
    "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Peru, 01",
  horario: process.env.NEXT_PUBLIC_HORARIO?.trim() || "",
  telefono:
    process.env.NEXT_PUBLIC_TELEFONO_CONTACTO?.trim() || "+51 908 843 695",
  email:
    process.env.NEXT_PUBLIC_EMAIL_CONTACTO?.trim() ||
    "ventashorsepower@gmail.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK?.trim() || "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK?.trim() || "",
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
      className="inline-flex size-10 items-center justify-center rounded-lg border text-tenue hover:border-texto hover:bg-superficie hover:text-texto"
    >
      <Icono aria-hidden="true" size={19} stroke={1.8} />
    </a>
  );
}

function EnlaceLegal({
  href,
  label,
  icon: Icono,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<IconProps>;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-tenue hover:text-texto"
    >
      <Icono aria-hidden="true" size={17} stroke={1.8} />
      <span>{label}</span>
    </Link>
  );
}

export function PieDePagina() {
  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}`
    : "";
  const telefonoHref = digitos(TIENDA.telefono);

  return (
    <footer className="border-t bg-superficie/25 text-sm">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8 lg:py-16">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo/LogoHorsePower.svg"
              alt="HorsePower"
              width={42}
              height={42}
              className="size-9 object-contain"
            />
            <p className="text-lg font-black tracking-[0.12em]">
              HORSE<span className="text-acento">POWER</span>
            </p>
          </div>
          <p className="mt-3 max-w-xs leading-relaxed text-tenue">
            Casacas, chompas, mochilas y más. Compra coordinada por WhatsApp.
          </p>

          {(telefonoHref || whatsappHref || TIENDA.email || TIENDA.direccion || TIENDA.horario) && (
            <div className="mt-7 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em]">
                Contacto
              </p>
              {telefonoHref && (
                <a
                  href={`tel:${telefonoHref}`}
                  className="flex items-center gap-2 text-tenue hover:text-texto"
                >
                  <IconPhone aria-hidden="true" size={17} stroke={1.8} />
                  {formatoTelefono(TIENDA.telefono)}
                </a>
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-tenue hover:text-acento"
                >
                  <IconBrandWhatsapp aria-hidden="true" size={17} stroke={1.8} />
                  Escríbenos por WhatsApp
                </a>
              )}
              {TIENDA.email && (
                <a
                  href={`mailto:${TIENDA.email}`}
                  className="flex items-center gap-2 text-tenue hover:text-texto"
                >
                  <IconMail aria-hidden="true" size={17} stroke={1.8} />
                  {TIENDA.email}
                </a>
              )}
              {TIENDA.direccion && (
                <p className="flex items-start gap-2 leading-relaxed text-tenue">
                  <IconMapPin
                    aria-hidden="true"
                    size={17}
                    stroke={1.8}
                    className="mt-0.5 shrink-0"
                  />
                  <span>{TIENDA.direccion}</span>
                </p>
              )}
              {TIENDA.horario && <p className="text-tenue">{TIENDA.horario}</p>}
            </div>
          )}

          {(TIENDA.instagram || TIENDA.facebook || TIENDA.tiktok) && (
            <div className="mt-6 flex gap-2">
              {TIENDA.instagram && (
                <EnlaceSocial
                  href={TIENDA.instagram}
                  label="Instagram de HorsePower"
                  icon={IconBrandInstagram}
                />
              )}
              {TIENDA.facebook && (
                <EnlaceSocial
                  href={TIENDA.facebook}
                  label="Facebook de HorsePower"
                  icon={IconBrandFacebook}
                />
              )}
              {TIENDA.tiktok && (
                <EnlaceSocial
                  href={TIENDA.tiktok}
                  label="TikTok de HorsePower"
                  icon={IconBrandTiktok}
                />
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em]">
            Compra y ayuda
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <Link className="text-tenue hover:text-texto" href="/">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className="text-tenue hover:text-texto"
                href="/catalogo-completo"
              >
                Catálogo completo
              </Link>
            </li>
            <li>
              <Link className="text-tenue hover:text-texto" href="/carrito">
                Carrito
              </Link>
            </li>
            <li>
              <Link className="text-tenue hover:text-texto" href="/nosotros">
                Nosotros
              </Link>
            </li>
            <li>
              <Link className="text-tenue hover:text-texto" href="/ubicanos">
                Ubícanos
              </Link>
            </li>
            <li>
              <Link
                className="text-tenue hover:text-texto"
                href="/cambios-y-devoluciones"
              >
                Cambios y devoluciones
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em]">Legal</p>
          <ul className="mt-5 space-y-3">
            <li>
              <EnlaceLegal
                href="/politica-de-privacidad"
                label="Política de privacidad"
                icon={IconShieldCheck}
              />
            </li>
            <li>
              <EnlaceLegal
                href="/terminos-y-condiciones"
                label="Términos y condiciones"
                icon={IconFileText}
              />
            </li>
            <li>
              {TIENDA.libroReclamaciones ? (
                <a
                  href={TIENDA.libroReclamaciones}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-tenue hover:text-texto"
                >
                  <IconBook2 aria-hidden="true" size={17} stroke={1.8} />
                  Libro de reclamaciones
                </a>
              ) : (
                <EnlaceLegal
                  href="/libro-de-reclamaciones"
                  label="Libro de reclamaciones"
                  icon={IconBook2}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t px-4 py-5 text-center text-xs leading-relaxed text-tenue">
        © {new Date().getFullYear()} HorsePower. Los precios y la disponibilidad
        se confirman por WhatsApp.
      </div>
    </footer>
  );
}
