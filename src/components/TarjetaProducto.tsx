import Image from "next/image";
import Link from "next/link";
import {
  formatearSoles,
  precioMostrado,
  textoVisible,
  type Producto,
} from "@/lib/tipos";
import { claseMuestraColor } from "@/lib/catalogo-filtros";
import { IconArrowRight } from "@tabler/icons-react";

export function TarjetaProducto({
  producto,
  prioridad = false,
  className = "",
  style,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px",
}: {
  producto: Producto;
  prioridad?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Grillas con menos ancho disponible (ej. sidebar de filtros) deben pasar
   * un valor propio; el default asume una grilla a todo el ancho. */
  sizes?: string;
}) {
  const precio = precioMostrado(producto);
  const enOferta = producto.precioOferta != null;
  const coloresVisibles = producto.colores.slice(0, 4);
  const coloresRestantes = producto.colores.length - coloresVisibles.length;

  return (
    <Link
      href={`/producto/${producto.slug}`}
      style={style}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-tarjeta transition-all duration-300 hover:-translate-y-1 hover:border-texto hover:shadow-[0_20px_40px_-20px_rgb(var(--sombra-rgb)/0.18)] ${className}`}
    >
      {/* Contenedor de la foto */}
      <div className="product-stage relative aspect-square w-full overflow-hidden">
        {producto.foto ? (
          <Image
            src={`/${producto.foto}`}
            alt={producto.nombre}
            fill
            preload={prioridad}
            sizes={sizes}
            className="object-contain p-3 transition-transform duration-500 will-change-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium text-tenue">
            Sin foto disponible
          </div>
        )}

        {/* Badges superiores */}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5 z-10">
          {enOferta && (
            <span className="rounded-md bg-acento px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-texto-inverso shadow-sm">
              Oferta
            </span>
          )}
          {producto.destacadoHP && !enOferta && (
            <span className="rounded-md bg-texto px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-fondo shadow-sm">
              Top
            </span>
          )}
        </div>

        {/* Badge de subcategoría o género */}
        {(producto.subcategoria || producto.genero) && (
          <div className="absolute right-2.5 top-2.5 z-10">
            <span className="rounded-md bg-fondo/80 px-2 py-0.5 text-[10px] font-semibold backdrop-blur text-tenue">
              {producto.subcategoria || producto.genero}
            </span>
          </div>
        )}

        {/* Botón flotante al hacer hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="boton-oscuro flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg text-xs font-bold shadow-md">
            Ver detalle
            <IconArrowRight size={14} stroke={2.5} />
          </span>
        </div>
      </div>

      {/* Información del producto */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          {/* Swatches de colores */}
          {producto.colores.length > 0 && (
            <div className="mb-2 flex items-center gap-1.5" aria-label="Colores disponibles">
              {coloresVisibles.map((color) => (
                <span
                  key={color}
                  title={color}
                  className={`size-2.5 rounded-full ${claseMuestraColor(color)}`}
                />
              ))}
              {coloresRestantes > 0 && (
                <span className="text-[10px] font-medium text-tenue tabular-nums">
                  +{coloresRestantes}
                </span>
              )}
            </div>
          )}

          <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-texto group-hover:text-acento transition-colors">
            {textoVisible(producto.nombre)}
          </h3>
        </div>

        {/* Precio */}
        <div className="mt-3 pt-2 border-t border-linea/60">
          {precio != null ? (
            <div className="flex items-baseline justify-between gap-2">
              <p className="flex items-baseline gap-2">
                <span className="text-base font-black tracking-tight text-texto">
                  {formatearSoles(precio)}
                </span>
                {enOferta && producto.precio != null && (
                  <span className="text-xs text-tenue line-through tabular-nums">
                    {formatearSoles(producto.precio)}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <p className="text-xs font-medium text-tenue">
              Consultar por WhatsApp
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
