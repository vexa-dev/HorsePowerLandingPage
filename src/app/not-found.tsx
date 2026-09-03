import Link from "next/link";
import {
  IconArrowRight,
  IconBackpack,
  IconBrandWhatsapp,
  IconHome,
  IconLuggage,
  IconShirt,
  IconShoppingBag,
} from "@tabler/icons-react";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

const CATEGORIAS_404 = [
  {
    slug: "casacas-y-chompas",
    nombre: "Casacas y Chompas",
    icono: IconShirt,
    descripcion: "Térmicas y urbanas",
  },
  {
    slug: "mochilas-y-morrales",
    nombre: "Mochilas y Morrales",
    icono: IconBackpack,
    descripcion: "Para estudio y salidas",
  },
  {
    slug: "maletas-y-viaje",
    nombre: "Maletas y Viaje",
    icono: IconLuggage,
    descripcion: "Ruedas y alta resistencia",
  },
  {
    slug: "loncheras-y-accesorios",
    nombre: "Loncheras y Accesorios",
    icono: IconShoppingBag,
    descripcion: "Térmicas y cartucheras",
  },
];

export default function NotFound() {
  const whatsappUrl = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
        "Hola HorsePower, estaba navegando por su catálogo web y no encontré la prenda o página que buscaba. ¿Podrían orientarme?",
      )}`
    : `https://wa.me/51908843695?text=${encodeURIComponent(
        "Hola HorsePower, estaba navegando por su catálogo web y no encontré la prenda o página que buscaba. ¿Podrían orientarme?",
      )}`;

  return (
    <div className="relative isolate flex min-h-[clamp(32rem,calc(84dvh-4rem),48rem)] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 lg:px-8">
      {/* 404 gigante sutil en segundo plano */}
      <div
        aria-hidden="true"
        className="texto-display pointer-events-none absolute -top-4 select-none text-[130px] font-black tracking-tighter text-linea/40 sm:text-[210px] lg:-top-10 lg:text-[270px]"
      >
        404
      </div>

      {/* Resplandor ambiental de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-80 rounded-full bg-acento/10 blur-3xl sm:size-[420px]"
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        {/* Badge técnico HorsePower */}
        <div className="inline-flex items-center gap-2 rounded-full border border-acento/30 bg-superficie px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-acento shadow-xs">
          <span className="size-2 rounded-full bg-acento animate-pulse" />
          <span>Error 404 · Ruta fuera de mapa</span>
        </div>

        {/* Título de impacto */}
        <h1 className="texto-display mt-6 text-3xl leading-[1.08] tracking-tight text-texto sm:text-5xl lg:text-6xl">
          Te saliste de la ruta
        </h1>

        {/* Descripción empática orientada a la marca */}
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-tenue sm:text-base">
          El producto o la página que buscas ya no está disponible, cambió de
          destino o el enlace no es válido. Pero la resistencia de HorsePower
          sigue activa.
        </p>

        {/* Acciones principales */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/catalogo-completo"
            className="boton-acento inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-[0.08em] sm:text-sm"
          >
            <span>Explorar catálogo completo</span>
            <IconArrowRight size={18} stroke={2.5} />
          </Link>

          <Link
            href="/"
            className="boton-secundario inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-[0.08em] sm:text-sm"
          >
            <IconHome size={18} stroke={2.2} />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Bloque de rescate: Accesos directos a las categorías */}
        <div className="mt-12 w-full">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-linea sm:w-16" />
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-tenue">
              O explora directamente por categoría
            </p>
            <span className="h-px w-8 bg-linea sm:w-16" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORIAS_404.map((cat) => {
              const Icono = cat.icono;
              return (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-linea bg-tarjeta p-3.5 text-center shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-acento hover:bg-superficie hover:shadow-md"
                >
                  <div className="mb-2.5 flex size-10 items-center justify-center rounded-lg bg-superficie text-texto transition-colors duration-200 group-hover:bg-acento group-hover:text-texto-inverso">
                    <Icono size={20} stroke={2.2} />
                  </div>
                  <span className="line-clamp-1 text-xs font-bold text-texto group-hover:text-acento">
                    {cat.nombre}
                  </span>
                  <span className="mt-0.5 hidden text-[11px] text-tenue sm:line-clamp-1">
                    {cat.descripcion}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Asistencia por WhatsApp */}
        <div className="mt-10 rounded-2xl border border-linea/80 bg-tarjeta/70 px-4 py-3 text-xs text-tenue backdrop-blur-xs sm:px-6 sm:text-sm">
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span>¿Buscabas un modelo o talla en específico?</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-acento hover:underline"
            >
              <IconBrandWhatsapp size={17} stroke={2.3} className="text-[#25D366]" />
              <span>Pregúntanos por WhatsApp</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
