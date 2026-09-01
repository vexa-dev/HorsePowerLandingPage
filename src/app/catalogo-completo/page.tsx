import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { catalogoCompleto } from "@/lib/catalogo";
import { ListaCatalogoCompleto } from "@/components/ListaCatalogoCompleto";
import { IconChevronRight, IconListDetails } from "@tabler/icons-react";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Catálogo Completo",
  description:
    "Explora todos los modelos HorsePower disponibles, con y sin foto. Consulta disponibilidad, tallas y precios por WhatsApp.",
};

export default async function CatalogoCompletoPage() {
  const productos = await catalogoCompleto();
  const conFoto = productos.filter((p) => p.foto).length;
  const sinFoto = productos.length - conFoto;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Migas de pan" className="mb-6 flex items-center gap-2 text-xs font-medium text-tenue">
        <Link href="/" className="hover:text-texto transition-colors">
          Inicio
        </Link>
        <IconChevronRight size={14} aria-hidden="true" />
        <span className="font-semibold text-texto" aria-current="page">
          Catálogo completo
        </span>
      </nav>

      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-linea/60 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-superficie px-3 py-1 text-xs font-bold uppercase tracking-wider text-acento mb-3">
            <IconListDetails size={14} stroke={2} />
            Inventario General
          </div>
          <h1 className="texto-display text-3xl font-black tracking-tight sm:text-5xl">
            Catálogo completo
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-tenue max-w-2xl">
            {productos.length} modelos en inventario ({conFoto} con foto y {sinFoto} bajo pedido o consulta directa). Elige cualquier prenda para coordinar por WhatsApp.
          </p>
        </div>
      </header>

      <div className="mt-6">
        <Suspense
          fallback={
            <div className="rounded-2xl bg-superficie px-6 py-16 text-center text-sm font-medium text-tenue motion-safe:animate-pulse">
              Cargando catálogo completo…
            </div>
          }
        >
          <ListaCatalogoCompleto productos={productos} />
        </Suspense>
      </div>
    </div>
  );
}
