"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIAS } from "@/lib/tipos";
import { useCarrito } from "@/lib/carrito";

export function Encabezado() {
  const pathname = usePathname();
  const { cantidadTotal, listo } = useCarrito();

  return (
    <header className="sticky top-0 z-40 border-b bg-fondo/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-black tracking-tight">
          HORSE<span className="text-acento">POWER</span>
        </Link>

        <nav className="ml-4 hidden gap-4 text-sm md:flex">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className={
                pathname === `/categoria/${c.slug}`
                  ? "font-semibold"
                  : "text-tenue hover:text-texto"
              }
            >
              {c.nombre}
            </Link>
          ))}
          <Link href="/catalogo-completo" className="text-tenue hover:text-texto">
            Catálogo completo
          </Link>
        </nav>

        <Link
          href="/carrito"
          className="ml-auto inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium hover:border-texto"
        >
          Carrito
          {listo && cantidadTotal > 0 && (
            <span className="rounded-full bg-acento px-1.5 text-xs font-bold text-white">
              {cantidadTotal}
            </span>
          )}
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-2 text-xs md:hidden">
        {CATEGORIAS.map((c) => (
          <Link
            key={c.slug}
            href={`/categoria/${c.slug}`}
            className="whitespace-nowrap text-tenue"
          >
            {c.nombre}
          </Link>
        ))}
        <Link href="/catalogo-completo" className="whitespace-nowrap text-tenue">
          Catálogo completo
        </Link>
      </div>
    </header>
  );
}
