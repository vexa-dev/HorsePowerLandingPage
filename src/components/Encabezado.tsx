"use client";

import {
  IconArrowUpRight,
  IconChevronDown,
  IconShoppingBag,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { CATEGORIAS } from "@/lib/tipos";
import { useCarrito } from "@/lib/carrito";

function esRutaActiva(pathname: string, ruta: string): boolean {
  return pathname === ruta || pathname.startsWith(`${ruta}/`);
}

function claseEnlace(activo: boolean): string {
  return activo
    ? "header-nav-link nav-link-active whitespace-nowrap rounded-lg px-3 py-2 text-xs font-extrabold uppercase tracking-[0.08em]"
    : "header-nav-link whitespace-nowrap rounded-lg px-3 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-tenue hover:bg-superficie hover:text-texto";
}

function MenuProductos({ compacto = false }: { compacto?: boolean }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const activo =
    esRutaActiva(pathname, "/catalogo-completo") ||
    esRutaActiva(pathname, "/categoria") ||
    esRutaActiva(pathname, "/producto");

  useEffect(() => {
    menuRef.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    function alClicFuera(evento: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(evento.target as Node)) {
        menuRef.current?.removeAttribute("open");
      }
    }
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        menuRef.current?.removeAttribute("open");
      }
    }

    document.addEventListener("pointerdown", alClicFuera);
    document.addEventListener("keydown", alPresionarTecla);
    return () => {
      document.removeEventListener("pointerdown", alClicFuera);
      document.removeEventListener("keydown", alPresionarTecla);
    };
  }, []);

  return (
    <details ref={menuRef} className="product-menu group relative">
      <summary
        aria-current={activo ? "page" : undefined}
        className={`${claseEnlace(activo)} inline-flex items-center gap-1.5`}
      >
        Productos
        <IconChevronDown
          aria-hidden="true"
          size={16}
          stroke={2}
          className="transition-transform"
        />
      </summary>
      <div
        className={`absolute z-50 pt-3 ${compacto ? "left-0 w-[min(calc(100vw-2rem),24rem)]" : "right-0 w-[27rem]"}`}
      >
        <div className="rounded-2xl border bg-tarjeta p-3 shadow-panel">
          <Link
            href="/catalogo-completo"
            className="group flex items-center justify-between rounded-xl bg-superficie p-3 hover:bg-superficie-fuerte"
          >
            <span>
              <span className="block text-sm font-bold">Catálogo completo</span>
              <span className="mt-1 block text-xs text-tenue">
                Ver todos los modelos
              </span>
            </span>
            <IconArrowUpRight
              aria-hidden="true"
              size={18}
              stroke={1.8}
              className="text-acento transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <div className="mt-2 grid gap-1 sm:grid-cols-2">
            {CATEGORIAS.map((categoria) => {
              const categoriaActiva = pathname === `/categoria/${categoria.slug}`;

              return (
                <Link
                  key={categoria.slug}
                  href={`/categoria/${categoria.slug}`}
                  aria-current={categoriaActiva ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm hover:bg-superficie ${categoriaActiva ? "font-bold text-acento" : "text-tenue hover:text-texto"}`}
                >
                  {categoria.nombre}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </details>
  );
}

function EnlaceNav({ href, children }: { href: string; children: string }) {
  const pathname = usePathname();
  const activo = esRutaActiva(pathname, href);

  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={claseEnlace(activo)}
    >
      {children}
    </Link>
  );
}

function HeaderInicio({ children }: { children: ReactNode }) {
  const [desplazado, setDesplazado] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>(
      "[data-hero-sentinel]",
    );

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada) {
          setDesplazado(!entrada.isIntersecting);
        }
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`header-home fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 ${desplazado ? "header-home-scrolled" : ""}`}
    >
      {children}
    </header>
  );
}

export function Encabezado() {
  const pathname = usePathname();
  const { cantidadTotal, listo } = useCarrito();
  const carritoActivo = esRutaActiva(pathname, "/carrito");
  const esInicio = pathname === "/";

  const claseHeader = "sticky top-0 z-40 border-b bg-fondo/95 backdrop-blur";

  const contenidoHeader = (
    <>
      <div className="mx-auto grid min-h-18 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="HorsePower, inicio"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo/LogoHorsePower.svg"
            alt="HorsePower"
            width={44}
            height={44}
            priority
            className="header-logo size-10 object-contain"
          />
          <span className="header-brand texto-display hidden text-[1.05rem] tracking-[0.14em] sm:inline">
            HORSE<span className="text-acento">POWER</span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden min-w-0 items-center justify-center gap-1 lg:flex"
        >
          <EnlaceNav href="/">Inicio</EnlaceNav>
          <MenuProductos />
          <EnlaceNav href="/nosotros">Nosotros</EnlaceNav>
          <EnlaceNav href="/ubicanos">Ubícanos</EnlaceNav>
        </nav>

        <Link
          href="/carrito"
          aria-current={carritoActivo ? "page" : undefined}
          aria-label={`Carrito${listo && cantidadTotal > 0 ? `, ${cantidadTotal} ${cantidadTotal === 1 ? "producto" : "productos"}` : ""}`}
          className={`${carritoActivo ? "nav-link-active" : ""} header-cart relative inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-lg px-0 text-xs font-extrabold uppercase tracking-[0.08em] sm:h-12 sm:w-auto sm:px-5`}
        >
          <IconShoppingBag aria-hidden="true" size={19} stroke={1.9} />
          <span className="hidden sm:inline">Carrito</span>
          {listo && cantidadTotal > 0 && (
            <span className="absolute -right-1 -top-1 min-w-5 rounded-full border-2 border-acento bg-texto-inverso px-1.5 text-center text-[11px] font-bold leading-4 tracking-normal text-acento sm:static sm:border-0 sm:text-xs sm:leading-normal">
              {cantidadTotal}
            </span>
          )}
        </Link>
      </div>

      <nav
        aria-label="Navegación móvil"
        className="relative z-50 flex flex-wrap items-center gap-1 px-4 pb-3 lg:hidden sm:px-6"
      >
        <EnlaceNav href="/">Inicio</EnlaceNav>
        <MenuProductos compacto />
        <EnlaceNav href="/nosotros">Nosotros</EnlaceNav>
        <EnlaceNav href="/ubicanos">Ubícanos</EnlaceNav>
      </nav>
    </>
  );

  return esInicio ? (
    <HeaderInicio>{contenidoHeader}</HeaderInicio>
  ) : (
    <header className={claseHeader}>{contenidoHeader}</header>
  );
}
