"use client";

import { useMemo } from "react";
import Link from "next/link";
import { filtrarProductos } from "@/lib/catalogo-filtros";
import { linkConsultaProducto } from "@/lib/whatsapp";
import {
  formatearSoles,
  nombreCategoria,
  precioMostrado,
  textoVisible,
  type Producto,
} from "@/lib/tipos";
import { PanelFiltrosCatalogo } from "./PanelFiltrosCatalogo";
import { BotonWhatsApp } from "./BotonWhatsApp";
import { EstadoVacio } from "./EstadoVacio";
import { useFiltrosCatalogo } from "./useFiltrosCatalogo";

export function ListaCatalogoCompleto({
  productos,
}: {
  productos: Producto[];
}) {
  const { filtros, actualizarFiltros, limpiarFiltros } = useFiltrosCatalogo();
  const resultadoBusqueda = useMemo(
    () =>
      filtrarProductos(productos, {
        q: filtros.q,
        categoria: [],
        subcategoria: [],
        genero: [],
        color: [],
        talla: [],
      }),
    [filtros.q, productos],
  );
  const resultado = useMemo(
    () => filtrarProductos(productos, filtros),
    [filtros, productos],
  );

  return (
    <div className="lg:grid lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <PanelFiltrosCatalogo
        productos={productos}
        productosParaOpciones={resultadoBusqueda}
        filtros={filtros}
        resultadoCount={resultado.length}
        onChange={actualizarFiltros}
        onClear={limpiarFiltros}
      />

      <section className="mt-6 min-w-0 lg:mt-0" aria-label="Catálogo completo">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="flex flex-col gap-2"
        >
          <label htmlFor="buscar-catalogo" className="text-sm font-semibold">
            Buscar en el catálogo
          </label>
          <input
            id="buscar-catalogo"
            type="search"
            value={filtros.q}
            onChange={(event) =>
              actualizarFiltros({ ...filtros, q: event.target.value })
            }
            placeholder="Nombre, categoría, color o talla"
            className="min-h-12 w-full rounded-xl border bg-tarjeta px-4 text-sm outline-none focus:border-texto focus:ring-2 focus:ring-acento/20"
          />
        </form>

        <p className="mt-5 text-sm text-tenue" aria-live="polite">
          {resultado.length} resultado{resultado.length === 1 ? "" : "s"}
        </p>

        {resultado.length === 0 ? (
          <div className="mt-5">
            <EstadoVacio
              titulo="No encontramos modelos con esos filtros."
              descripcion="Prueba con otra combinación o elimina los filtros activos."
              accion={
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="boton-oscuro min-h-11 px-4 py-2.5"
                >
                  Ver todo el catálogo
                </button>
              }
            />
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border">
            <table className="min-w-[42rem] w-full border-separate border-spacing-y-1 text-left text-sm">
              <caption className="sr-only">
                Catálogo completo de HorsePower
              </caption>
              <thead className="text-xs uppercase tracking-[0.12em] text-tenue">
                <tr>
                  <th className="px-4 py-3 pr-5">Modelo</th>
                  <th className="px-4 py-3 pr-5">Categoría</th>
                  <th className="px-4 py-3 pr-5">Precio</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {resultado.map((producto) => {
                  const precio = precioMostrado(producto);

                  return (
                    <tr
                      key={producto.slug}
                      className="bg-superficie/60 transition hover:bg-superficie"
                    >
                      <td className="px-4 py-4 pr-5 font-semibold">
                        {textoVisible(producto.nombre)}
                      </td>
                      <td className="px-4 py-4 pr-5 text-tenue">
                        {nombreCategoria(producto.categoria)}
                        {producto.subcategoria
                          ? ` · ${textoVisible(producto.subcategoria)}`
                          : ""}
                      </td>
                      <td className="px-4 py-4 pr-5 tabular-nums">
                        {precio != null ? (
                          formatearSoles(precio)
                        ) : (
                          <span className="text-tenue">Consultar</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        {producto.foto ? (
                          <Link
                            href={`/producto/${producto.slug}`}
                            className="whitespace-nowrap font-semibold text-acento hover:underline"
                          >
                            Ver ficha
                          </Link>
                        ) : (
                          <BotonWhatsApp
                            href={linkConsultaProducto(producto)}
                            origen="catalogo-completo"
                            detalle={{ producto: producto.slug }}
                            tamano="sm"
                          >
                            Consultar
                          </BotonWhatsApp>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
