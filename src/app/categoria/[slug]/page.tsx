import { notFound } from "next/navigation";
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
  return { title: nombreCategoria(slug) };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!CATEGORIAS.some((c) => c.slug === slug)) notFound();

  const productos = await productosPorCategoria(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-black">{nombreCategoria(slug)}</h1>
      {productos.length === 0 ? (
        <p className="text-tenue">
          Aún no hay productos con foto en esta categoría.
        </p>
      ) : (
        <GrillaConBuscador productos={productos} />
      )}
    </div>
  );
}
