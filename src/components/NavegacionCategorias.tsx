import {
  IconArrowUpRight,
  IconBackpack,
  IconJacket,
  IconLuggage,
  IconShirt,
  IconShoppingBag,
  type IconProps,
} from "@tabler/icons-react";
import Link from "next/link";
import type { CategoriaSlug } from "@/lib/tipos";

type IconoCategoria = React.ComponentType<IconProps>;

const ICONOS: Record<CategoriaSlug, IconoCategoria> = {
  "casacas-y-chompas": IconJacket,
  "mochilas-y-morrales": IconBackpack,
  "maletas-y-viaje": IconLuggage,
  "loncheras-y-accesorios": IconShoppingBag,
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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {categorias.map((categoria) => {
        const Icono = ICONOS[categoria.slug as CategoriaSlug] ?? IconShirt;

        return (
          <Link
            key={categoria.slug}
            href={`/categoria/${categoria.slug}`}
            className="group relative flex flex-col justify-between rounded-2xl border border-linea bg-tarjeta p-3.5 sm:p-5 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-acento/40 hover:shadow-md active:translate-y-0"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-superficie text-acento transition-colors duration-200 group-hover:bg-acento group-hover:text-texto-inverso">
                <Icono aria-hidden="true" size={22} stroke={1.8} />
              </span>
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-superficie/60 text-tenue transition-colors duration-200 group-hover:bg-acento/10 group-hover:text-acento">
                <IconArrowUpRight
                  aria-hidden="true"
                  size={16}
                  stroke={2.2}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>

            <div className="mt-3 sm:mt-4">
              <span className="block text-sm sm:text-base font-bold leading-tight text-texto transition-colors group-hover:text-acento">
                {categoria.nombre}
              </span>
              <span className="mt-1 block text-[11px] sm:text-xs text-tenue">
                Ver modelos
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
