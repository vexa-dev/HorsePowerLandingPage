import {
  IconArrowUpRight,
  IconBackpack,
  IconJacket,
  IconLuggage,
  IconShirt,
  IconToolsKitchen2,
  type IconProps,
} from "@tabler/icons-react";
import Link from "next/link";
import type { CategoriaSlug } from "@/lib/tipos";

type IconoCategoria = React.ComponentType<IconProps>;

const ICONOS: Record<CategoriaSlug, IconoCategoria> = {
  "casacas-y-chompas": IconJacket,
  "mochilas-y-morrales": IconBackpack,
  "maletas-y-viaje": IconLuggage,
  "loncheras-y-accesorios": IconToolsKitchen2,
};

export interface CategoriaHome {
  slug: string;
  nombre: string;
}

export function NavegacionCategorias({
  categorias,
}: {
  categorias: CategoriaHome[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-linea bg-tarjeta md:overflow-visible">
      <div className="grid min-w-max grid-flow-col auto-cols-[minmax(13.5rem,1fr)] md:min-w-0 md:grid-cols-4 md:grid-flow-row">
        {categorias.map((categoria) => {
          const Icono = ICONOS[categoria.slug as CategoriaSlug] ?? IconShirt;

          return (
            <Link
              key={categoria.slug}
              href={`/categoria/${categoria.slug}`}
              className="group relative flex min-h-28 items-center gap-3 border-r border-linea px-5 py-4 last:border-r-0 hover:bg-superficie"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-superficie text-acento transition-colors group-hover:bg-acento group-hover:text-texto-inverso">
                <Icono aria-hidden="true" size={22} stroke={1.7} />
              </span>
              <span className="min-w-0 flex-1 text-sm font-bold leading-tight">
                {categoria.nombre}
              </span>
              <IconArrowUpRight
                aria-hidden="true"
                size={18}
                stroke={1.8}
                className="shrink-0 text-tenue transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acento"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
