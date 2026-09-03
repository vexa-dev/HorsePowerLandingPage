import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CATEGORIAS, nombreCategoria } from "@/lib/tipos";
import { productosPorCategoria } from "@/lib/catalogo";
import { GrillaConBuscador } from "@/components/GrillaConBuscador";
import { IconChevronRight, IconSparkles } from "@tabler/icons-react";

const SITIO = process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export const revalidate = 60;

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
  const urlCategoria = `${SITIO}/categoria/${slug}`;
  const descripcion = `Explora el catálogo de ${categoria} de HorsePower Perú. Modelos exclusivos, tallas y colores disponibles para compra directa por WhatsApp.`;

  return {
    title: categoria,
    description: descripcion,
    alternates: {
      canonical: urlCategoria,
    },
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: "HorsePower",
      url: urlCategoria,
      title: `${categoria} | HorsePower`,
      description: descripcion,
    },
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
  const urlCategoria = `${SITIO}/categoria/${slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `${SITIO}/catalogo-completo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoria,
        item: urlCategoria,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Breadcrumb */}
      <nav aria-label="Migas de pan" className="mb-6 flex items-center gap-2 text-xs font-medium text-tenue">
        <Link href="/" className="hover:text-texto transition-colors">
          Inicio
        </Link>
        <IconChevronRight size={14} aria-hidden="true" />
        <Link href="/catalogo-completo" className="hover:text-texto transition-colors">
          Catálogo
        </Link>
        <IconChevronRight size={14} aria-hidden="true" />
        <span className="font-semibold text-texto" aria-current="page">
          {categoria}
        </span>
      </nav>

      {/* Cabecera de Categoría */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-linea/60 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-superficie px-3 py-1 text-xs font-bold uppercase tracking-wider text-acento mb-3">
            <IconSparkles size={14} stroke={2} />
            Colección Oficial
          </div>
          <h1 className="texto-display text-3xl font-black tracking-tight sm:text-5xl">
            {categoria}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-tenue max-w-xl">
            Explora nuestros modelos disponibles. Selecciona tu talla y color favorito para coordinar directamente por WhatsApp.
          </p>
        </div>
      </header>

      {/* Tabs / Pills de navegación rápida entre categorías */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIAS.map((cat) => {
          const esActiva = cat.slug === slug;
          return (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                esActiva
                  ? "bg-texto !text-white shadow-sm"
                  : "border border-linea bg-tarjeta text-texto hover:border-texto hover:bg-superficie"
              }`}
            >
              {cat.nombre}
            </Link>
          );
        })}
      </div>

      {productos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-linea bg-superficie/60 px-6 py-16 text-center">
          <p className="text-lg font-bold">
            Aún no hay productos con foto en esta categoría.
          </p>
          <p className="mt-2 text-sm text-tenue max-w-md mx-auto">
            Puedes consultar todos los modelos en lista o contactarnos directamente.
          </p>
          <Link
            href="/catalogo-completo"
            className="boton-oscuro mt-6 inline-flex min-h-12 items-center px-6 py-3"
          >
            Ver catálogo completo
          </Link>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="rounded-2xl bg-superficie px-6 py-16 text-center text-sm font-medium text-tenue motion-safe:animate-pulse">
              Cargando catálogo…
            </div>
          }
        >
          <GrillaConBuscador productos={productos} />
        </Suspense>
      )}
    </div>
  );
}
