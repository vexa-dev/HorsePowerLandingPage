"use client";

import Fuse from "fuse.js";
import { useMemo } from "react";
import type { Producto } from "@/lib/tipos";
import { filtrarProductos } from "@/lib/catalogo-filtros";
import { PanelFiltrosCatalogo } from "./PanelFiltrosCatalogo";
import { useFiltrosCatalogo } from "./useFiltrosCatalogo";
import { EstadoVacio } from "./EstadoVacio";
import { TarjetaProducto } from "./TarjetaProducto";

export function GrillaConBuscador({ productos }: { productos: Producto[] }) {
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

  const resultado = useMemo(
    () =>
      filtrarProductos(
        resultadoBusqueda,
        { ...filtros, q: "" },
        { incluirCategoria: false },
      ),
    [filtros, resultadoBusqueda],
  );

  return (
    <div className="lg:grid lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] lg:items-start lg:gap-8">
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
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="flex flex-col gap-2"
        >
          <label htmlFor="buscar-productos" className="text-sm font-semibold">
            Buscar productos
          </label>
          <input
            id="buscar-productos"
            type="search"
            value={filtros.q}
            onChange={(event) =>
              actualizarFiltros({ ...filtros, q: event.target.value })
            }
            placeholder="Nombre, color, talla o tipo"
            className="min-h-12 w-full rounded-xl border bg-tarjeta px-4 text-sm outline-none focus:border-texto focus:ring-2 focus:ring-acento/20"
          />
        </form>

        <p className="mt-5 text-sm text-tenue" aria-live="polite">
          {resultado.length} producto{resultado.length === 1 ? "" : "s"}
        </p>

        {resultado.length === 0 ? (
          <div className="mt-5">
            <EstadoVacio
              titulo="No encontramos productos con esos filtros."
              descripcion="Prueba con otro término o elimina alguno de los filtros activos."
              accion={
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="boton-oscuro min-h-11 px-4 py-2.5"
                >
                  Ver todos los productos
                </button>
              }
            />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {resultado.map((producto, index) => (
              <TarjetaProducto
                key={producto.slug}
                producto={producto}
                prioridad={index < 4}
                // A diferencia de la grilla del home (a todo el ancho), acá
                // desde lg conviven con el panel de filtros lateral
                // (minmax(15rem,18rem) + gap-8), así que la columna real es
                // bastante más angosta que un genérico "300px".
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
