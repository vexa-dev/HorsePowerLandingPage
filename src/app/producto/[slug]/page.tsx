import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productoPorSlug, slugsConFoto, catalogoCompleto } from "@/lib/catalogo";
import {
  formatearSoles,
  nombreCategoria,
  precioMostrado,
} from "@/lib/tipos";
import { FichaProducto } from "@/components/FichaProducto";
import { GaleriaProducto } from "@/components/GaleriaProducto";
import { ProductosRelacionados } from "@/components/ProductosRelacionados";
import { IconChevronRight } from "@tabler/icons-react";

const SITIO = process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export const revalidate = 1800;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await slugsConFoto()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await productoPorSlug(slug);
  if (!p) return {};
  const precio = precioMostrado(p);
  const descripcion = `${p.nombre} en HorsePower.${
    precio ? ` Desde ${formatearSoles(precio)}.` : ""
  } Coordina tu compra por WhatsApp.`;
  const urlProducto = `${SITIO}/producto/${p.slug}`;

  return {
    title: p.nombre,
    description: descripcion,
    alternates: {
      canonical: urlProducto,
    },
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: "HorsePower",
      url: urlProducto,
      title: p.nombre,
      description: descripcion,
      images: p.foto ? [`/${p.foto}`] : [],
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [p, todos] = await Promise.all([
    productoPorSlug(slug),
    catalogoCompleto(),
  ]);

  if (!p) notFound();

  const precio = precioMostrado(p);
  const urlProducto = `${SITIO}/producto/${p.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    url: urlProducto,
    sku: p.slug,
    category: nombreCategoria(p.categoria),
    brand: { "@type": "Brand", name: "HorsePower" },
    image: p.fotos.length ? p.fotos.map((f) => `${SITIO}/${f}`) : undefined,
    offers: precio
      ? {
          "@type": "Offer",
          url: urlProducto,
          priceCurrency: "PEN",
          price: precio,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO },
      {
        "@type": "ListItem",
        position: 2,
        name: nombreCategoria(p.categoria),
        item: `${SITIO}/categoria/${p.categoria}`,
      },
      { "@type": "ListItem", position: 3, name: p.nombre, item: urlProducto },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Breadcrumb Mejorado */}
      <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-tenue">
        <Link href="/" className="hover:text-texto transition-colors">
          Inicio
        </Link>
        <IconChevronRight size={13} aria-hidden="true" />
        <Link
          href={`/categoria/${p.categoria}`}
          className="hover:text-texto transition-colors"
        >
          {nombreCategoria(p.categoria)}
        </Link>
        {p.subcategoria && (
          <>
            <IconChevronRight size={13} aria-hidden="true" />
            <span className="text-tenue">{p.subcategoria}</span>
          </>
        )}
        <IconChevronRight size={13} aria-hidden="true" />
        <span aria-current="page" className="font-bold text-texto truncate max-w-[200px] sm:max-w-none">
          {p.nombre}
        </span>
      </nav>

      {/* Grid Principal: Galería a la izquierda y Detalles a la derecha */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Galería (5 columnas en desktop) */}
        <div className="lg:col-span-6">
          <GaleriaProducto fotos={p.fotos} alt={p.nombre} />
        </div>

        {/* Detalles e interactividad (6 columnas en desktop) */}
        <div className="space-y-5 lg:col-span-6">
          {/* Chips de Categoría y Género */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-superficie px-3 py-1 text-xs font-bold uppercase tracking-wider text-acento border border-linea">
              {nombreCategoria(p.categoria)}
            </span>
            {p.genero && (
              <span className="rounded-full bg-tarjeta px-3 py-1 text-xs font-bold text-tenue border border-linea">
                {p.genero}
              </span>
            )}
            {p.precioOferta != null && (
              <span className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-1 text-xs font-black uppercase tracking-wider border border-rose-500/20">
                En Oferta
              </span>
            )}
          </div>

          <h1 className="texto-display text-2xl font-black text-texto sm:text-3xl lg:text-4xl">
            {p.nombre}
          </h1>

          {/* Bloque de Precio */}
          <div>
            {precio != null ? (
              <div className="flex items-baseline gap-3">
                <span className="texto-display text-3xl font-black tracking-tight text-texto sm:text-4xl">
                  {formatearSoles(precio)}
                </span>
                {p.precioOferta != null && p.precio != null && (
                  <span className="text-base font-bold text-tenue line-through">
                    {formatearSoles(p.precio)}
                  </span>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-superficie/60 p-3 text-xs font-semibold text-tenue">
                Precio y disponibilidad a consultar por WhatsApp
              </div>
            )}
          </div>

          {/* Ficha interactiva (colores, tallas, guía, botones y garantías) */}
          <div className="pt-2">
            <FichaProducto producto={p} />
          </div>
        </div>
      </div>

      {/* Sección de Productos Relacionados */}
      <ProductosRelacionados productoActual={p} productos={todos} />
    </div>
  );
}
