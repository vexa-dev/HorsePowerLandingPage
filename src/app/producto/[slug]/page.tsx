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
  return {
    title: p.nombre,
    description: `${p.nombre} en HorsePower.${
      precio ? ` Desde ${formatearSoles(precio)}.` : ""
    } Coordina tu compra por WhatsApp.`,
    openGraph: {
      title: p.nombre,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    category: nombreCategoria(p.categoria),
    image: p.fotos.length ? p.fotos.map((f) => `/${f}`) : undefined,
    offers: precio
      ? {
          "@type": "Offer",
          priceCurrency: "PEN",
          price: precio,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="mb-4 text-sm text-tenue">
        <Link href={`/categoria/${p.categoria}`} className="hover:text-texto">
          {nombreCategoria(p.categoria)}
        </Link>
        {" / "}
        {p.subcategoria}
      </p>

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
