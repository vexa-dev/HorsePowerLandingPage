import Link from "next/link";
import { CATEGORIAS } from "@/lib/tipos";
import { destacadosHP, productosConFoto } from "@/lib/catalogo";
import { TarjetaProducto } from "@/components/TarjetaProducto";

export const revalidate = 1800;

export default async function Home() {
  const [destacados, todos] = await Promise.all([
    destacadosHP(),
    productosConFoto(),
  ]);

  const porCategoria = CATEGORIAS.map((c) => ({
    ...c,
    total: todos.filter((p) => p.categoria === c.slug).length,
  })).filter((c) => c.total > 0);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="py-12 sm:py-16">
        <h1 className="texto-display max-w-2xl text-4xl leading-tight sm:text-5xl">
          Casacas, chompas y mochilas{" "}
          <span className="text-acento">HorsePower</span>
        </h1>
        <p className="mt-4 max-w-xl text-tenue">
          Explora el catálogo, arma tu pedido y coordínalo por WhatsApp. El precio
          y la disponibilidad se confirman por el chat.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/categoria/casacas-y-chompas" className="boton-oscuro px-5 py-2.5">
            Ver casacas
          </Link>
          <Link href="/catalogo-completo" className="boton-secundario px-5 py-2.5">
            Catálogo completo
          </Link>
        </div>
      </section>

      <section className="py-6">
        <h2 className="mb-4 text-lg font-bold">Categorías</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {porCategoria.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="rounded-lg border p-4 transition hover:border-texto"
            >
              <p className="font-semibold">{c.nombre}</p>
              <p className="text-xs text-tenue">{c.total} productos</p>
            </Link>
          ))}
        </div>
      </section>

      {destacados.length > 0 && (
        <section className="py-10">
          <h2 className="mb-4 text-lg font-bold">Destacados</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {destacados.map((p, i) => (
              <TarjetaProducto key={p.slug} producto={p} prioridad={i < 4} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
