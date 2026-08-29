import Image from "next/image";
import Link from "next/link";
import {
  formatearSoles,
  precioMostrado,
  type Producto,
} from "@/lib/tipos";

export function TarjetaProducto({ producto }: { producto: Producto }) {
  const precio = precioMostrado(producto);
  const enOferta = producto.precioOferta != null;

  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-tarjeta transition hover:border-texto"
    >
      <div className="relative aspect-square bg-linea/40">
        {producto.foto ? (
          <Image
            src={`/${producto.foto}`}
            alt={producto.nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-tenue">
            Sin foto
          </div>
        )}
        {enOferta && (
          <span className="absolute left-2 top-2 rounded bg-acento px-1.5 py-0.5 text-xs font-bold text-white">
            OFERTA
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 text-sm font-medium">{producto.nombre}</p>
        <div className="mt-auto pt-1">
          {precio != null ? (
            <p className="flex items-baseline gap-2">
              <span className="font-bold">{formatearSoles(precio)}</span>
              {enOferta && producto.precio != null && (
                <span className="text-xs text-tenue line-through">
                  {formatearSoles(producto.precio)}
                </span>
              )}
            </p>
          ) : (
            <p className="text-xs text-tenue">Precio: consultar por WhatsApp</p>
          )}
        </div>
      </div>
    </Link>
  );
}
