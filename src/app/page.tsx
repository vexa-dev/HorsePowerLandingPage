import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/tipos";
import { destacadosHP, productosConFoto } from "@/lib/catalogo";
import { TarjetaProducto } from "@/components/TarjetaProducto";
import { NavegacionCategorias } from "@/components/NavegacionCategorias";
import { RevealEnScroll } from "@/components/RevealEnScroll";
import { EstadoVacio } from "@/components/EstadoVacio";

export const revalidate = 1800;

export default async function Home() {
  const [destacados, todos] = await Promise.all([
    destacadosHP(),
    productosConFoto(),
  ]);

  const categoriasConProductos = CATEGORIAS.map((c) => ({
    ...c,
    total: todos.filter((p) => p.categoria === c.slug).length,
  })).filter((c) => c.total > 0);
  const porCategoria = categoriasConProductos.map(({ slug, nombre }) => ({
    slug,
    nombre,
  }));

  return (
    <div>
      <section className="hero-photo relative isolate min-h-[clamp(32rem,calc(100dvh-4.5rem),44rem)] overflow-hidden bg-texto text-texto-inverso">
        <span
          data-hero-sentinel
          aria-hidden="true"
          className="absolute left-0 top-0 h-px w-px"
        />
        <Image
          src="/hero/horsepower-portada.jpeg"
          alt="Interior de tienda con mochilas y prendas en exhibición"
          fill
          preload
          sizes="100vw"
          className="hero-photo-image object-cover"
        />
        <div className="hero-photo-overlay absolute inset-0 z-10" aria-hidden="true" />
        <div className="relative z-20 mx-auto flex min-h-[clamp(32rem,calc(100dvh-4.5rem),44rem)] max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-16">
          <div className="hero-copy max-w-xl">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-texto/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Catálogo HorsePower
            </span>
            <h1 className="texto-display mt-5 max-w-2xl text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Casacas, chompas y mochilas
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
              Modelos para tu día a día. Arma tu pedido y coordina la compra por
              WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/catalogo-completo" className="boton-acento px-5 py-3">
                Explorar catálogo
              </Link>
              {/* Ancla dentro de la misma página: <a> nativa, no next/link
                  (Link no dispara el scroll al hash en navegación same-route). */}
              <a
                href="#destacados"
                className="inline-flex items-center rounded-md border border-white/50 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Ver destacados
              </a>
            </div>
          </div>
        </div>
        <div
          className="hero-photo-curve absolute inset-x-[-8%] bottom-[-1px] z-30 h-10 bg-fondo sm:h-14"
          aria-hidden="true"
        />
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section
          className="border-b border-linea py-7 sm:py-8"
          aria-label="Resumen del catálogo"
        >
          <dl className="grid grid-cols-3 gap-4 sm:max-w-xl sm:gap-8">
            <div>
              <dt className="texto-display text-2xl sm:text-3xl">{todos.length}+</dt>
              <dd className="mt-1 text-xs text-tenue">modelos</dd>
            </div>
            <div>
              <dt className="texto-display text-2xl sm:text-3xl">{porCategoria.length}</dt>
              <dd className="mt-1 text-xs text-tenue">categorías</dd>
            </div>
            <div>
              <dt className="texto-display text-2xl sm:text-3xl">100%</dt>
              <dd className="mt-1 text-xs text-tenue">por WhatsApp</dd>
            </div>
          </dl>
        </section>

        <section className="py-6">
          <RevealEnScroll>
            <h2 className="texto-display mb-4 text-2xl">Categorías</h2>
            <NavegacionCategorias categorias={porCategoria} />
          </RevealEnScroll>
        </section>

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
          {destacados.length > 0 ? (
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
          ) : (
            <EstadoVacio
              titulo="Aún no hay productos con foto en el catálogo."
              descripcion="Mientras se actualiza, revisa el catálogo completo donde también están los modelos sin foto."
              accion={
                <Link
                  href="/catalogo-completo"
                  className="boton-oscuro inline-flex min-h-12 items-center px-5 py-3"
                >
                  Ver catálogo completo
                </Link>
              }
            />
          )}
        </section>
      </div>
    </div>
  );
}
