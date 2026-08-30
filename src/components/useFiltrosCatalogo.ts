"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  filtrosVacios,
  leerFiltros,
  serializarFiltros,
  type FiltrosCatalogo,
} from "@/lib/catalogo-filtros";

export function useFiltrosCatalogo({
  incluirCategoria = true,
}: {
  incluirCategoria?: boolean;
} = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtros = useMemo(() => {
    const leidos = leerFiltros(searchParams);
    return incluirCategoria ? leidos : { ...leidos, categoria: [] };
  }, [incluirCategoria, searchParams]);

  const actualizarFiltros = useCallback(
    (siguientes: FiltrosCatalogo) => {
      const normalizados = incluirCategoria
        ? siguientes
        : { ...siguientes, categoria: [] };
      const query = serializarFiltros(normalizados, incluirCategoria);
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [incluirCategoria, pathname, router],
  );

  const limpiarFiltros = useCallback(() => {
    actualizarFiltros(filtrosVacios());
  }, [actualizarFiltros]);

  return { filtros, actualizarFiltros, limpiarFiltros };
}
