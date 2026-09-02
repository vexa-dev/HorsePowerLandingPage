import Image from "next/image";
import type { Producto } from "@/lib/tipos";

/**
 * Tira horizontal de fotos de producto en bucle infinito (marquee CSS).
 * Es decorativa: `aria-hidden`. La lista se renderiza dos veces para que la
 * animación `marquee-x` (-50%) cierre sin costura. Bajo
 * `prefers-reduced-motion` la regla global de globals.css detiene el bucle.
 */
export function TiraProductos({
  productos,
  duracion = "80s",
  reverso = false,
}: {
  productos: Producto[];
  duracion?: string;
  reverso?: boolean;
}) {
  const conFoto = productos.filter((p) => p.foto);
  if (conFoto.length === 0) return null;

  const secuencia = [...conFoto, ...conFoto];

  return (
    <div className="marquee overflow-hidden" aria-hidden>
      <ul
        className={`marquee-track flex gap-3 ${reverso ? "is-reverse" : ""}`}
        style={{ "--marquee-duracion": duracion } as React.CSSProperties}
      >
        {secuencia.map((p, i) => (
          <li
            key={`${p.slug}-${i}`}
            className="product-stage relative size-24 shrink-0 overflow-hidden rounded-xl border sm:size-28"
          >
            <Image
              src={`/${p.foto}`}
              alt=""
              fill
              loading="lazy"
              sizes="112px"
              className="object-contain p-2.5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
