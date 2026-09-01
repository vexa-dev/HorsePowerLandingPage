import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productoPorSlug, slugsConFoto } from "@/lib/catalogo";
import {
  formatearSoles,
  nombreCategoria,
  precioMostrado,
} from "@/lib/tipos";
import { FichaProducto } from "@/components/FichaProducto";
import { GaleriaProducto } from "@/components/GaleriaProducto";

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
    // El metadata de Next.js hace merge superficial: un `openGraph` acá
    // reemplaza por completo el del layout raíz (no lo combina), así que
    // hay que repetir siteName/locale/type o se pierden en cada ficha.
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging
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
  const p = await productoPorSlug(slug);
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

  // Google dejó de mostrar el breadcrumb visual en resultados de búsqueda
  // mobile (ene. 2025), pero sigue usando este dato estructurado para
  // entender la jerarquía del sitio (AI Overviews incluido). Mismos 2-3
  // niveles que el breadcrumb visible más abajo.
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
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* JSON.stringify no sanitiza `<`; sin el replace, un nombre de producto
          con "</script>" (viene de la Google Sheet, sin validar) podría inyectar
          HTML/JS en la página. Ver node_modules/next/dist/docs/01-app/02-guides/json-ld.md */}
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

      <nav aria-label="Ruta de navegación" className="mb-4 text-sm text-tenue">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-texto">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/categoria/${p.categoria}`}
              className="hover:text-texto"
            >
              {nombreCategoria(p.categoria)}
            </Link>
          </li>
          {p.subcategoria && (
            <>
              <li aria-hidden="true">/</li>
              <li>{p.subcategoria}</li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-texto">
            {p.nombre}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <GaleriaProducto fotos={p.fotos} alt={p.nombre} />

        <div>
          <h1 className="texto-display text-2xl">{p.nombre}</h1>
          {p.genero && <p className="mt-1 text-sm text-tenue">{p.genero}</p>}

          <div className="mt-4">
            {precio != null ? (
              <p className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">
                  {formatearSoles(precio)}
                </span>
                {p.precioOferta != null && p.precio != null && (
                  <span className="text-tenue line-through">
                    {formatearSoles(p.precio)}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-tenue">Precio: consultar por WhatsApp</p>
            )}
          </div>

          <div className="mt-6">
            <FichaProducto producto={p} />
          </div>

          <p className="mt-6 text-xs text-tenue">
            La disponibilidad de tallas y colores se confirma por WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
