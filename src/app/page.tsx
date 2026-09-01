import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS, formatearSoles, precioMostrado } from "@/lib/tipos";
import { destacadosHP, productosConFoto } from "@/lib/catalogo";
import { TarjetaProducto } from "@/components/TarjetaProducto";
import { NavegacionCategorias } from "@/components/NavegacionCategorias";
import { RevealEnScroll } from "@/components/RevealEnScroll";

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

  const heroProducto = destacados[0];
  const precioHero = heroProducto ? precioMostrado(heroProducto) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section
        className={`grid items-center gap-10 py-12 sm:py-16 lg:gap-16 lg:py-20 ${
          heroProducto ? "lg:grid-cols-[1.1fr_1fr]" : ""
        }`}
      >
        <div className="hero-copy">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold text-tenue">
            Catálogo actualizado cada semana
          </span>
          <h1 className="texto-display mt-4 max-w-xl text-4xl leading-tight sm:text-5xl">
            Casacas, chompas y mochilas{" "}
            <span className="text-acento">HorsePower</span>
          </h1>
          <p className="mt-4 max-w-xl text-tenue">
            Explora el catálogo, arma tu pedido y coordínalo por WhatsApp. El
            precio y la disponibilidad se confirman por el chat, sin
            pasarela de pago.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalogo-completo" className="boton-oscuro px-5 py-2.5">
              Ver catálogo completo
            </Link>
            {/* Ancla dentro de la misma página: <a> nativa, no next/link
                (Link no dispara el scroll al hash en navegación same-route). */}
            <a href="#destacados" className="boton-secundario px-5 py-2.5">
              Ver destacados
            </a>
          </div>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-linea pt-6">
            <div>
              <dt className="texto-display text-2xl">{todos.length}+</dt>
              <dd className="text-xs text-tenue">modelos</dd>
            </div>
            <div>
              <dt className="texto-display text-2xl">{porCategoria.length}</dt>
              <dd className="text-xs text-tenue">categorías</dd>
            </div>
            <div>
              <dt className="texto-display text-2xl">100%</dt>
              <dd className="text-xs text-tenue">por WhatsApp</dd>
            </div>
          </dl>
        </div>

        {heroProducto && (
          <div className="hero-stage">
            <Link
              href={`/producto/${heroProducto.slug}`}
              className="product-stage group relative block aspect-square overflow-hidden rounded-3xl border border-linea shadow-lg"
            >
              {heroProducto.foto && (
                <Image
                  src={`/${heroProducto.foto}`}
                  alt={heroProducto.nombre}
                  fill
                  preload
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain p-8 transition group-hover:scale-[1.03]"
                />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-acento px-3 py-1 text-xs font-bold text-texto-inverso">
                Destacado
              </span>
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-tarjeta/90 p-3 backdrop-blur">
                <p className="line-clamp-1 text-sm font-semibold">
                  {heroProducto.nombre}
                </p>
                {precioHero != null ? (
                  <p className="text-sm font-bold text-acento">
                    {formatearSoles(precioHero)}
                  </p>
                ) : (
                  <p className="text-xs text-tenue">Consultar por WhatsApp</p>
                )}
              </div>
            </Link>
          </div>
        )}
      </section>

      <section className="py-6">
        <RevealEnScroll>
          <h2 className="texto-display mb-4 text-2xl">Categorías</h2>
          <NavegacionCategorias categorias={porCategoria} />
        </RevealEnScroll>
      </section>

      {destacados.length > 0 && (
        <section
          id="destacados"
          className="scroll-mt-[160px] py-10 sm:py-14 lg:scroll-mt-[88px]"
        >
          <div className="mb-4 flex items-end justify-between">
            <h2 className="texto-display text-2xl">Destacados</h2>
            <Link
              href="/catalogo-completo"
              className="text-sm font-semibold text-acento hover:underline"
            >
              Ver todo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {destacados.map((p, i) => (
              <RevealEnScroll
                key={p.slug}
                delay={Math.min(i, 7) * 0.06}
                className="h-full"
              >
                <TarjetaProducto producto={p} className="h-full" />
              </RevealEnScroll>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
