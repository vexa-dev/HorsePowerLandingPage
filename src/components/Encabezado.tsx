"use client";

import {
  IconArrowUpRight,
  IconBackpack,
  IconBrandWhatsapp,
  IconChevronDown,
  IconChevronRight,
  IconLuggage,
  IconMapPin,
  IconMenu2,
  IconSearch,
  IconShirt,
  IconShoppingBag,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CATEGORIAS } from "@/lib/tipos";
import { useCarrito } from "@/lib/carrito";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

function esRutaActiva(pathname: string, ruta: string): boolean {
  return pathname === ruta || pathname.startsWith(`${ruta}/`);
}

const DESCRIPCIONES_CATEGORIA: Record<string, string> = {
  "casacas-y-chompas": "Modelos térmicos y urbanos",
  "mochilas-y-morrales": "Para estudio, trabajo y salidas",
  "maletas-y-viaje": "Resistentes con ruedas y candado",
  "loncheras-y-accesorios": "Térmicas, cartucheras y más",
};

const ICONOS_CATEGORIA: Record<string, typeof IconShirt> = {
  "casacas-y-chompas": IconShirt,
  "mochilas-y-morrales": IconBackpack,
  "maletas-y-viaje": IconLuggage,
  "loncheras-y-accesorios": IconShoppingBag,
};

function MenuProductosDesktop() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activo =
    esRutaActiva(pathname, "/catalogo-completo") ||
    esRutaActiva(pathname, "/categoria") ||
    esRutaActiva(pathname, "/producto");

  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  useEffect(() => {
    function alClicFuera(evento: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(evento.target as Node)) {
        setAbierto(false);
      }
    }
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAbierto(false);
      }
    }

    if (abierto) {
      document.addEventListener("pointerdown", alClicFuera);
      document.addEventListener("keydown", alPresionarTecla);
    }
    return () => {
      document.removeEventListener("pointerdown", alClicFuera);
      document.removeEventListener("keydown", alPresionarTecla);
    };
  }, [abierto]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setAbierto((prev) => !prev)}
        aria-expanded={abierto}
        aria-haspopup="true"
        aria-current={activo ? "page" : undefined}
        className={`header-nav-link inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] transition ${
          activo ? "nav-link-active" : ""
        }`}
      >
        <span>Productos</span>
        <IconChevronDown
          aria-hidden="true"
          size={15}
          stroke={2.2}
          className={`transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
        />
      </button>

      {abierto && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[32rem] -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="header-dropdown-panel rounded-2xl border border-linea bg-tarjeta/98 p-3 shadow-panel backdrop-blur-xl">
            {/* Acceso directo a Catálogo Completo */}
            <Link
              href="/catalogo-completo"
              onClick={() => setAbierto(false)}
              className="group flex items-center justify-between rounded-xl bg-superficie p-3.5 transition hover:bg-superficie-fuerte hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-acento/10 text-acento group-hover:bg-acento group-hover:text-texto-inverso transition">
                  <IconShoppingBag size={20} stroke={2} />
                </div>
                <div>
                  <span className="block text-sm font-bold !text-texto">
                    Catálogo completo
                  </span>
                  <span className="block text-xs !text-tenue">
                    Ver todos los modelos disponibles
                  </span>
                </div>
              </div>
              <IconArrowUpRight
                aria-hidden="true"
                size={18}
                stroke={2}
                className="text-acento transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* Grid de Categorías */}
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {CATEGORIAS.map((cat) => {
                const Icono = ICONOS_CATEGORIA[cat.slug] || IconShoppingBag;
                const categoriaActiva = pathname === `/categoria/${cat.slug}`;

                return (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    onClick={() => setAbierto(false)}
                    aria-current={categoriaActiva ? "page" : undefined}
                    className={`group flex items-start gap-2.5 rounded-xl p-2.5 transition ${
                      categoriaActiva
                        ? "bg-acento/10 text-acento font-semibold"
                        : "hover:bg-superficie text-texto"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg transition ${
                        categoriaActiva
                          ? "bg-acento text-texto-inverso"
                          : "bg-superficie !text-tenue group-hover:bg-acento/15 group-hover:!text-acento"
                      }`}
                    >
                      <Icono size={17} stroke={1.8} />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`block truncate text-xs font-bold leading-tight transition-colors ${
                          categoriaActiva
                            ? "!text-acento"
                            : "!text-texto group-hover:!text-acento"
                        }`}
                      >
                        {cat.nombre}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] !text-tenue">
                        {DESCRIPCIONES_CATEGORIA[cat.slug] || "Ver colección"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EnlaceNavDesktop({ href, children }: { href: string; children: string }) {
  const pathname = usePathname();
  const activo = esRutaActiva(pathname, href);

  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={`header-nav-link whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] transition ${
        activo ? "nav-link-active" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export function Encabezado() {
  const pathname = usePathname();
  const { cantidadTotal, listo } = useCarrito();
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);
  const [productosMovilAbierto, setProductosMovilAbierto] = useState(true);

  const esInicio = pathname === "/";
  const carritoActivo = esRutaActiva(pathname, "/carrito");

  // Cerrar el drawer móvil al cambiar de ruta
  useEffect(() => {
    setMenuMovilAbierto(false);
  }, [pathname]);

  // Bloquear scroll de la página cuando el drawer móvil está abierto
  useEffect(() => {
    if (menuMovilAbierto) {
      const estiloOriginal = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = estiloOriginal;
      };
    }
  }, [menuMovilAbierto]);

  // Detector de scroll para la página de inicio
  useEffect(() => {
    if (!esInicio) {
      setDesplazado(false);
      return;
    }

    const alHacerScroll = () => {
      setDesplazado(window.scrollY > 40);
    };

    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, [esInicio]);

  // Clases del header según si es Inicio (hero/scrolled) o subpágina
  const claseContenedorHeader = esInicio
    ? `header-full-slim fixed inset-x-0 top-0 z-40 w-full ${
        desplazado ? "header-home-scrolled" : "header-home-hero"
      }`
    : "header-full-slim header-sticky-page sticky top-0 z-40 w-full";

  return (
    <>
      <header className={claseContenedorHeader}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
          {/* Lado izquierdo: Botón hamburguesa (móvil) + Logotipo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuMovilAbierto(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={menuMovilAbierto}
              className="header-mobile-toggle inline-flex size-10 items-center justify-center rounded-full p-2 transition lg:hidden"
            >
              <IconMenu2 size={22} stroke={2.2} />
            </button>

            <Link
              href="/"
              aria-label="HorsePower, volver al inicio"
              className="flex items-center gap-2.5 transition-transform hover:opacity-95 active:scale-95"
            >
              <Image
                src="/logo/LogoHorsePower.svg"
                alt="HorsePower"
                width={38}
                height={38}
                priority
                className="header-logo size-9 object-contain sm:size-10"
              />
              <span className="header-brand texto-display text-base tracking-[0.12em] sm:text-lg">
                HORSE<span className="text-acento">POWER</span>
              </span>
            </Link>
          </div>

          {/* Centro: Navegación principal de escritorio */}
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-1.5 lg:flex"
          >
            <EnlaceNavDesktop href="/">Inicio</EnlaceNavDesktop>
            <MenuProductosDesktop />
            <EnlaceNavDesktop href="/nosotros">Nosotros</EnlaceNavDesktop>
            <EnlaceNavDesktop href="/ubicanos">Ubícanos</EnlaceNavDesktop>
          </nav>

          {/* Lado derecho: Búsqueda rápida + Botón de Carrito */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Acceso rápido a búsqueda en catálogo */}
            <Link
              href="/catalogo-completo"
              aria-label="Buscar productos en el catálogo"
              className="header-mobile-toggle inline-flex size-10 items-center justify-center rounded-full p-2 transition hover:bg-superficie"
              title="Buscar en el catálogo"
            >
              <IconSearch size={19} stroke={2} />
            </Link>

            {/* Botón Carrito tipo Píldora */}
            <Link
              href="/carrito"
              aria-current={carritoActivo ? "page" : undefined}
              aria-label={`Carrito de compras${
                listo && cantidadTotal > 0
                  ? `, ${cantidadTotal} ${cantidadTotal === 1 ? "producto" : "productos"}`
                  : ""
              }`}
              className={`header-cart-slim relative inline-flex h-10 items-center justify-center gap-2 rounded-full px-3.5 text-xs font-black uppercase tracking-[0.06em] sm:px-4 ${
                carritoActivo ? "ring-2 ring-white/50" : ""
              }`}
            >
              <IconShoppingBag aria-hidden="true" size={18} stroke={2.1} />
              <span className="hidden sm:inline">Carrito</span>
              {listo && cantidadTotal > 0 && (
                <span className="badge-bounce inline-flex min-w-[20px] h-5 items-center justify-center rounded-full bg-texto-inverso px-1.5 text-center text-[11px] font-black leading-none text-acento shadow-xs">
                  {cantidadTotal}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Drawer / Menú lateral para dispositivos móviles */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          menuMovilAbierto
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuMovilAbierto(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-sm flex-col justify-between bg-tarjeta text-texto shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          menuMovilAbierto ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal de navegación"
      >
        {/* Cabecera del Drawer */}
        <div>
          <div className="flex items-center justify-between border-b border-linea px-5 py-4">
            <Link
              href="/"
              onClick={() => setMenuMovilAbierto(false)}
              className="flex items-center gap-2"
            >
              <Image
                src="/logo/LogoHorsePower.svg"
                alt="HorsePower"
                width={34}
                height={34}
                className="size-8 object-contain"
              />
              <span className="texto-display text-base tracking-[0.12em]">
                HORSE<span className="text-acento">POWER</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuMovilAbierto(false)}
              aria-label="Cerrar menú"
              className="inline-flex size-9 items-center justify-center rounded-full text-tenue transition hover:bg-superficie hover:text-texto"
            >
              <IconX size={20} stroke={2} />
            </button>
          </div>

          {/* Enlaces de Navegación Móvil */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100dvh-14rem)]">
            <Link
              href="/"
              onClick={() => setMenuMovilAbierto(false)}
              aria-current={pathname === "/" ? "page" : undefined}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition ${
                pathname === "/"
                  ? "border-l-4 border-acento bg-acento/10 font-black text-acento shadow-xs"
                  : "text-texto hover:bg-superficie font-semibold"
              }`}
            >
              <span>Inicio</span>
              {pathname === "/" && (
                <span className="size-2 rounded-full bg-acento" />
              )}
            </Link>

            {/* Acordeón de Productos */}
            <div className="rounded-xl bg-superficie/60 p-1.5">
              <button
                type="button"
                onClick={() => setProductosMovilAbierto((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wider text-texto"
              >
                <span>Productos</span>
                <IconChevronDown
                  size={16}
                  stroke={2.2}
                  className={`transition-transform duration-200 ${
                    productosMovilAbierto ? "rotate-180" : ""
                  }`}
                />
              </button>

              {productosMovilAbierto && (
                <div className="mt-1 space-y-1 pl-2">
                  <Link
                    href="/catalogo-completo"
                    onClick={() => setMenuMovilAbierto(false)}
                    aria-current={pathname === "/catalogo-completo" ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                      pathname === "/catalogo-completo"
                        ? "bg-acento text-white shadow-xs"
                        : "bg-acento/10 text-acento hover:bg-acento/20"
                    }`}
                  >
                    <span>Ver todo el catálogo</span>
                    <IconArrowUpRight size={16} stroke={2} />
                  </Link>

                  {CATEGORIAS.map((cat) => {
                    const Icono = ICONOS_CATEGORIA[cat.slug] || IconShoppingBag;
                    const esCatActiva = pathname === `/categoria/${cat.slug}`;

                    return (
                      <Link
                        key={cat.slug}
                        href={`/categoria/${cat.slug}`}
                        onClick={() => setMenuMovilAbierto(false)}
                        aria-current={esCatActiva ? "page" : undefined}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                          esCatActiva
                            ? "bg-acento text-white shadow-xs"
                            : "text-tenue hover:bg-superficie hover:text-texto"
                        }`}
                      >
                        <Icono size={16} stroke={1.8} className={esCatActiva ? "text-white" : "text-tenue"} />
                        <span>{cat.nombre}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/nosotros"
              onClick={() => setMenuMovilAbierto(false)}
              aria-current={pathname === "/nosotros" ? "page" : undefined}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition ${
                pathname === "/nosotros"
                  ? "border-l-4 border-acento bg-acento/10 font-black text-acento shadow-xs"
                  : "text-texto hover:bg-superficie font-semibold"
              }`}
            >
              <span>Nosotros</span>
              {pathname === "/nosotros" && (
                <span className="size-2 rounded-full bg-acento" />
              )}
            </Link>

            <Link
              href="/ubicanos"
              onClick={() => setMenuMovilAbierto(false)}
              aria-current={pathname === "/ubicanos" ? "page" : undefined}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition ${
                pathname === "/ubicanos"
                  ? "border-l-4 border-acento bg-acento/10 font-black text-acento shadow-xs"
                  : "text-texto hover:bg-superficie font-semibold"
              }`}
            >
              <span>Ubícanos</span>
              {pathname === "/ubicanos" && (
                <span className="size-2 rounded-full bg-acento" />
              )}
            </Link>
          </nav>
        </div>

        {/* Footer del Drawer Móvil: WhatsApp + Ubicación */}
        <div className="border-t border-linea p-5 space-y-3 bg-superficie/30">
          <a
            href={
              NUMERO_WHATSAPP
                ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
                    "Hola HorsePower, deseo hacer una consulta sobre sus productos.",
                  )}`
                : "https://wa.me/"
            }
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#20bd5a]"
          >
            <IconBrandWhatsapp size={18} stroke={2} />
            <span>Asistencia por WhatsApp</span>
          </a>

          <div className="flex items-center gap-2 text-xs text-tenue px-1">
            <IconMapPin size={16} stroke={1.8} className="shrink-0 text-acento" />
            <span className="truncate">Gamarra, La Victoria · Lima, Perú</span>
          </div>
        </div>
      </aside>
    </>
  );
}
