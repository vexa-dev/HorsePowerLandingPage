"use client";

import {
  IconArrowUpRight,
  IconChevronDown,
  IconShoppingBag,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { CATEGORIAS } from "@/lib/tipos";
import { useCarrito } from "@/lib/carrito";

function esRutaActiva(pathname: string, ruta: string): boolean {
  return pathname === ruta || pathname.startsWith(`${ruta}/`);
}

function claseEnlace(activo: boolean): string {
  return activo
    ? "nav-link-active whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em]"
    : "whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-tenue hover:bg-superficie hover:text-texto";
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

export function Encabezado() {
  const pathname = usePathname();
  const { cantidadTotal, listo } = useCarrito();
  const carritoActivo = esRutaActiva(pathname, "/carrito");

  return (
    <header className="sticky top-0 z-40 border-b bg-fondo/95 backdrop-blur">
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
            className="size-10 object-contain"
          />
          <span className="hidden text-[1.05rem] font-black tracking-[0.14em] sm:inline">
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
          className={`${carritoActivo ? "nav-link-active" : "border hover:border-texto hover:bg-superficie"} inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em]`}
        >
          <IconShoppingBag aria-hidden="true" size={17} stroke={1.9} />
          <span className="hidden sm:inline">Carrito</span>
          {listo && cantidadTotal > 0 && (
            <span className="min-w-5 rounded-full bg-acento px-1.5 text-center text-xs font-bold tracking-normal text-texto-inverso">
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
    </header>
  );
}
