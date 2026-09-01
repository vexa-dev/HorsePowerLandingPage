"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  filtrarProductos,
  ordenarProductos,
  type TipoOrden,
} from "@/lib/catalogo-filtros";
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
import { TarjetaProducto } from "./TarjetaProducto";
import { useFiltrosCatalogo } from "./useFiltrosCatalogo";
import {
  IconSearch,
  IconX,
  IconArrowsSort,
  IconLayoutList,
  IconLayoutGrid,
  IconPhotoOff,
  IconArrowUpRight,
} from "@tabler/icons-react";

export function ListaCatalogoCompleto({
  productos,
}: {
  productos: Producto[];
}) {
  const [vista, setVista] = useState<"lista" | "grilla">("lista");
  const [orden, setOrden] = useState<TipoOrden>("destacado");
  const { filtros, actualizarFiltros, limpiarFiltros } = useFiltrosCatalogo();

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
    () => filtrarProductos(resultadoBusqueda, { ...filtros, q: "" }),
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
        resultadoCount={resultado.length}
        onChange={actualizarFiltros}
        onClear={limpiarFiltros}
      />

      <section className="mt-6 min-w-0 lg:mt-0" aria-label="Catálogo completo">
        {/* Barra de herramientas: Buscador + Orden + Selector de Vista */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="relative flex-1"
          >
            <label htmlFor="buscar-catalogo" className="sr-only">
              Buscar en el catálogo
            </label>
            <div className="relative">
              <IconSearch
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tenue"
                aria-hidden="true"
              />
              <input
                id="buscar-catalogo"
                type="search"
                value={filtros.q}
                onChange={(event) =>
                  actualizarFiltros({ ...filtros, q: event.target.value })
                }
                placeholder="Buscar por nombre, tipo, color o talla..."
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

          <div className="flex items-center gap-2 shrink-0">
            {/* Selector de Orden */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="ordenar-catalogo" className="sr-only">
                Ordenar por
              </label>
              <IconArrowsSort size={15} className="text-tenue hidden sm:inline" aria-hidden="true" />
              <select
                id="ordenar-catalogo"
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

            {/* Alternar vista Lista / Grilla */}
            <div className="flex items-center rounded-xl border bg-tarjeta p-1">
              <button
                type="button"
                onClick={() => setVista("lista")}
                className={`p-1.5 rounded-lg transition ${
                  vista === "lista"
                    ? "bg-texto text-fondo"
                    : "text-tenue hover:text-texto"
                }`}
                aria-label="Vista en lista"
                title="Vista en lista"
              >
                <IconLayoutList size={18} />
              </button>
              <button
                type="button"
                onClick={() => setVista("grilla")}
                className={`p-1.5 rounded-lg transition ${
                  vista === "grilla"
                    ? "bg-texto text-fondo"
                    : "text-tenue hover:text-texto"
                }`}
                aria-label="Vista en cuadrícula"
                title="Vista en cuadrícula"
              >
                <IconLayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs font-medium text-tenue" aria-live="polite">
            Mostrando <span className="font-bold text-texto">{resultado.length}</span> modelos
          </p>
        </div>

        {/* Estado vacío o Lista de productos */}
        {resultado.length === 0 ? (
          <div className="mt-6">
            <EstadoVacio
              titulo="No encontramos modelos con esos filtros."
              descripcion="Prueba con otra combinación o elimina los filtros activos."
              accion={
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="boton-oscuro min-h-11 px-5 py-2.5"
                >
                  Ver todo el catálogo
                </button>
              }
            />
          </div>
        ) : vista === "grilla" ? (
          /* Vista Grilla */
          <div className="mt-6 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:gap-5">
            {resultado.map((producto, index) => (
              <TarjetaProducto
                key={producto.slug}
                producto={producto}
                prioridad={index < 4}
              />
            ))}
          </div>
        ) : (
          /* Vista Lista / Tabla Responsive */
          <div className="mt-6 space-y-3">
            {resultado.map((producto) => {
              const precio = precioMostrado(producto);
              const enOferta = producto.precioOferta != null;

              return (
                <div
                  key={producto.slug}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border bg-tarjeta p-3.5 sm:p-4 transition-all hover:border-texto hover:shadow-[0_12px_24px_-15px_rgba(21,22,25,0.1)]"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Miniatura */}
                    <div className="product-stage relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-xl border border-linea/60">
                      {producto.foto ? (
                        <Image
                          src={`/${producto.foto}`}
                          alt={producto.nombre}
                          fill
                          sizes="80px"
                          className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-tenue bg-superficie">
                          <IconPhotoOff size={20} stroke={1.5} />
                        </div>
                      )}
                    </div>

                    {/* Información */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {producto.foto ? (
                          <Link
                            href={`/producto/${producto.slug}`}
                            className="font-bold text-texto hover:text-acento transition-colors text-sm sm:text-base line-clamp-1"
                          >
                            {textoVisible(producto.nombre)}
                          </Link>
                        ) : (
                          <span className="font-bold text-texto text-sm sm:text-base line-clamp-1">
                            {textoVisible(producto.nombre)}
                          </span>
                        )}
                        {enOferta && (
                          <span className="rounded bg-acento px-1.5 py-0.5 text-[10px] font-black uppercase text-texto-inverso">
                            Oferta
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-tenue">
                        <span className="font-medium text-texto">
                          {nombreCategoria(producto.categoria)}
                        </span>
                        {producto.subcategoria && (
                          <span>· {textoVisible(producto.subcategoria)}</span>
                        )}
                        {producto.genero && (
                          <span>· {producto.genero}</span>
                        )}
                      </div>

                      {producto.colores.length > 0 && (
                        <p className="mt-1 text-[11px] text-tenue line-clamp-1">
                          <span className="font-semibold">Colores:</span>{" "}
                          {producto.colores.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Precio y Acción */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-linea/40">
                    <div className="text-left sm:text-right min-w-[6rem]">
                      {precio != null ? (
                        <div>
                          <p className="font-black text-texto text-sm sm:text-base tabular-nums">
                            {formatearSoles(precio)}
                          </p>
                          {enOferta && producto.precio != null && (
                            <p className="text-[11px] text-tenue line-through tabular-nums">
                              {formatearSoles(producto.precio)}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-tenue">
                          Por consultar
                        </span>
                      )}
                    </div>

                    <div className="shrink-0">
                      {producto.foto ? (
                        <Link
                          href={`/producto/${producto.slug}`}
                          className="boton-oscuro inline-flex min-h-10 items-center gap-1 px-4 py-2 text-xs font-bold"
                        >
                          Ver ficha
                          <IconArrowUpRight size={15} />
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
