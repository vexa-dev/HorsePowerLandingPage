import Link from "next/link";
import { TarjetaProducto } from "./TarjetaProducto";
import { type Producto, nombreCategoria } from "@/lib/tipos";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";

export function ProductosRelacionados({
  productoActual,
  productos,
}: {
  productoActual: Producto;
  productos: Producto[];
}) {
  // Filtrar productos con foto, que no sean el actual, priorizando la misma categoría
  const afinesMismaCategoria = productos.filter(
    (p) => p.slug !== productoActual.slug && p.categoria === productoActual.categoria && p.foto,
  );

  const otrosConFoto = productos.filter(
    (p) => p.slug !== productoActual.slug && p.categoria !== productoActual.categoria && p.foto,
  );

  const seleccionados = [...afinesMismaCategoria, ...otrosConFoto].slice(0, 4);

  if (seleccionados.length === 0) return null;

  return (
    <section className="mt-16 border-t border-linea pt-12 sm:mt-24 sm:pt-16" aria-labelledby="titulo-relacionados">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-superficie px-3 py-1 text-xs font-black uppercase tracking-wider text-acento">
            <IconSparkles size={14} />
            Recomendaciones
          </span>
          <h2 id="titulo-relacionados" className="texto-display mt-2 text-2xl font-black tracking-tight sm:text-3xl text-texto">
            También te podría interesar
          </h2>
          <p className="mt-1 text-xs text-tenue sm:text-sm">
            Modelos en {nombreCategoria(productoActual.categoria)} y colecciones complementarias.
          </p>
        </div>

        <Link
          href={`/categoria/${productoActual.categoria}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-acento hover:underline"
        >
          Ver más {nombreCategoria(productoActual.categoria)}
          <IconArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
        {seleccionados.map((p) => (
          <TarjetaProducto key={p.slug} producto={p} />
        ))}
      </div>
    </section>
  );
}
