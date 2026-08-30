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
  ropa: IconShirt,
};

export interface CategoriaConTotal {
  slug: string;
  nombre: string;
  total: number;
}

export function NavegacionCategorias({
  categorias,
}: {
  categorias: CategoriaConTotal[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {categorias.map((categoria, index) => {
        const Icono = ICONOS[categoria.slug as CategoriaSlug] ?? IconShirt;

        return (
          <Link
            key={categoria.slug}
            href={`/categoria/${categoria.slug}`}
            className={`group flex min-h-28 items-center gap-4 rounded-2xl border bg-tarjeta p-4 shadow-[0_12px_30px_-26px_rgb(21_22_25/0.7)] hover:-translate-y-0.5 hover:border-acento hover:bg-superficie ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-[14.5rem] lg:flex-col lg:items-start lg:justify-between" : ""}`}
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-superficie text-acento transition group-hover:bg-acento group-hover:text-texto-inverso">
              <Icono aria-hidden="true" size={24} stroke={1.7} />
            </span>
            <span className="min-w-0 flex-1 lg:flex-none">
              <span className="block text-sm font-bold leading-tight">
                {categoria.nombre}
              </span>
              <span className="mt-1 block text-xs text-tenue">
                {categoria.total} {categoria.total === 1 ? "modelo" : "modelos"}
              </span>
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
  );
}
