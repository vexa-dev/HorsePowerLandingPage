import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIAS, nombreCategoria } from "@/lib/tipos";
import { productosPorCategoria } from "@/lib/catalogo";
import { GrillaConBuscador } from "@/components/GrillaConBuscador";

export const revalidate = 1800;

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoria = nombreCategoria(slug);
  return {
    title: categoria,
    description: `Explora el catálogo de ${categoria} de HorsePower.`,
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!CATEGORIAS.some((c) => c.slug === slug)) notFound();

  const productos = await productosPorCategoria(slug);
  const categoria = nombreCategoria(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
          {categoria}
        </h1>
        <p className="mt-4 leading-relaxed text-tenue">
          {productos.length} modelos con foto para revisar y coordinar por
          WhatsApp.
        </p>
      </header>
      {productos.length === 0 ? (
        <div className="rounded-2xl bg-superficie px-6 py-14 text-center">
          <p className="text-lg font-semibold">
            Aún no hay productos con foto en esta categoría.
          </p>
          <Link
            href="/catalogo-completo"
            className="boton-oscuro mt-5 inline-flex min-h-12 items-center px-5 py-3"
          >
            Ver catálogo completo
          </Link>
        </div>
      ) : (
        <GrillaConBuscador productos={productos} />
      )}
    </div>
  );
}
