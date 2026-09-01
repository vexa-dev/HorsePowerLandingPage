"use client";

import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import type { Producto } from "@/lib/tipos";
import {
  filtrarProductos,
  ordenarProductos,
  type TipoOrden,
} from "@/lib/catalogo-filtros";
import { PanelFiltrosCatalogo } from "./PanelFiltrosCatalogo";
import { useFiltrosCatalogo } from "./useFiltrosCatalogo";
import { TarjetaProducto } from "./TarjetaProducto";
import { IconSearch, IconX, IconArrowsSort } from "@tabler/icons-react";

export function GrillaConBuscador({ productos }: { productos: Producto[] }) {
  const [orden, setOrden] = useState<TipoOrden>("destacado");
  const { filtros, actualizarFiltros, limpiarFiltros } = useFiltrosCatalogo({
    incluirCategoria: false,
  });

  const fuse = useMemo(
    () =>
      new Fuse(productos, {
        keys: [
          "nombre",
          "nombreInterno",
          "categoria",
          "subcategoria",
          "genero",
          "colores",
          "tallas",
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [productos],
  );

  const resultadoBusqueda = useMemo(() => {
    const termino = filtros.q.trim();
    return termino
      ? fuse.search(termino).map((resultado) => resultado.item)
      : productos;
  }, [filtros.q, fuse, productos]);

  const filtrados = useMemo(
    () =>
      filtrarProductos(
        resultadoBusqueda,
        { ...filtros, q: "" },
        { incluirCategoria: false },
      ),
    [filtros, resultadoBusqueda],
  );

  const resultado = useMemo(
    () => ordenarProductos(filtrados, orden),
    [filtrados, orden],
  );

  return (
    <div className="lg:grid lg:grid-cols-[minmax(16rem,19rem)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <PanelFiltrosCatalogo
        productos={productos}
        productosParaOpciones={resultadoBusqueda}
        filtros={filtros}
        incluirCategoria={false}
        resultadoCount={resultado.length}
        onChange={actualizarFiltros}
        onClear={limpiarFiltros}
      />

      <section className="mt-6 min-w-0 lg:mt-0" aria-label="Resultados de productos">
        {/* Barra de herramientas: Buscador + Ordenamiento */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="relative flex-1"
          >
            <label htmlFor="buscar-productos" className="sr-only">
              Buscar productos
            </label>
            <div className="relative">
              <IconSearch
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tenue"
                aria-hidden="true"
              />
              <input
                id="buscar-productos"
                type="search"
                value={filtros.q}
                onChange={(event) =>
                  actualizarFiltros({ ...filtros, q: event.target.value })
                }
                placeholder="Buscar por nombre, color, talla o tipo..."
                className="min-h-12 w-full rounded-xl border bg-tarjeta pl-10 pr-10 text-sm outline-none transition focus:border-texto focus:ring-2 focus:ring-acento/20"
              />
              {filtros.q && (
                <button
                  type="button"
                  onClick={() => actualizarFiltros({ ...filtros, q: "" })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-tenue hover:text-texto"
                  aria-label="Limpiar búsqueda"
                >
                  <IconX size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Selector de Orden */}
          <div className="flex items-center gap-2 shrink-0">
            <label
              htmlFor="ordenar-por"
              className="flex items-center gap-1.5 text-xs font-semibold text-tenue"
            >
              <IconArrowsSort size={15} aria-hidden="true" />
              <span className="hidden sm:inline">Ordenar:</span>
            </label>
            <select
              id="ordenar-por"
              value={orden}
              onChange={(e) => setOrden(e.target.value as TipoOrden)}
              className="min-h-11 rounded-xl border bg-tarjeta px-3 text-xs font-semibold text-texto outline-none transition hover:border-texto focus:border-texto"
            >
              <option value="destacado">Destacados</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="nombre-asc">Nombre: A - Z</option>
              <option value="nombre-desc">Nombre: Z - A</option>
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs font-medium text-tenue" aria-live="polite">
            Mostrando <span className="font-bold text-texto">{resultado.length}</span> producto{resultado.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Grid de productos o Empty state */}
        {resultado.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-linea bg-superficie/50 px-6 py-16 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-superficie text-tenue mb-3">
              <IconSearch size={24} stroke={1.5} />
            </div>
            <p className="text-lg font-bold">
              No encontramos productos con esos filtros
            </p>
            <p className="mt-2 text-sm text-tenue max-w-md mx-auto">
              Prueba buscando con otro término o elimina alguno de los filtros aplicados.
            </p>
            <button
              type="button"
              onClick={limpiarFiltros}
              className="boton-oscuro mt-5 min-h-11 px-5 py-2.5"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:gap-5">
            {resultado.map((producto, index) => (
              <TarjetaProducto
                key={producto.slug}
                producto={producto}
                prioridad={index < 4}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
