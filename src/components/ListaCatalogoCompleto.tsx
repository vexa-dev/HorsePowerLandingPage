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
  IconTable,
  IconLayoutGrid,
  IconPhotoOff,
  IconArrowUpRight,
} from "@tabler/icons-react";

export function ListaCatalogoCompleto({
  productos,
}: {
  productos: Producto[];
}) {
  const [vista, setVista] = useState<"tabla" | "grilla">("tabla");
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
                placeholder="Buscar por modelo, categoría, color o talla..."
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

            {/* Alternar vista Tabla / Grilla */}
            <div className="flex items-center rounded-xl border bg-tarjeta p-1">
              <button
                type="button"
                onClick={() => setVista("tabla")}
                className={`p-1.5 rounded-lg transition ${
                  vista === "tabla"
                    ? "bg-texto text-fondo shadow-sm"
                    : "text-tenue hover:text-texto"
                }`}
                aria-label="Vista en tabla"
                title="Vista en tabla"
              >
                <IconTable size={18} />
              </button>
              <button
                type="button"
                onClick={() => setVista("grilla")}
                className={`p-1.5 rounded-lg transition ${
                  vista === "grilla"
                    ? "bg-texto text-fondo shadow-sm"
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
          <span className="text-[11px] text-tenue hidden sm:inline">
            Desplaza horizontalmente para ver todos los datos
          </span>
        </div>

        {/* Estado vacío o Contenido */}
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
          /* Vista Tabla con Scroll Horizontal Contenido */
          <div className="mt-6 overflow-hidden rounded-2xl border bg-tarjeta shadow-sm">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="min-w-[48rem] w-full text-left text-sm border-collapse">
                <caption className="sr-only">
                  Catálogo completo de modelos HorsePower
                </caption>
                <thead className="border-b bg-superficie/80 text-[11px] font-bold uppercase tracking-wider text-tenue">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 w-16">Foto</th>
                    <th scope="col" className="px-4 py-3.5">Modelo</th>
                    <th scope="col" className="px-4 py-3.5">Categoría</th>
                    <th scope="col" className="px-4 py-3.5">Variantes</th>
                    <th scope="col" className="px-4 py-3.5 text-right">Precio</th>
                    <th scope="col" className="px-4 py-3.5 text-center w-36">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-linea/60">
                  {resultado.map((producto) => {
                    const precio = precioMostrado(producto);
                    const enOferta = producto.precioOferta != null;

                    return (
                      <tr
                        key={producto.slug}
                        className="transition-colors hover:bg-superficie/60"
                      >
                        {/* Foto / Placeholder */}
                        <td className="px-4 py-3">
                          <div className="product-stage relative size-12 overflow-hidden rounded-lg border border-linea/60 shrink-0">
                            {producto.foto ? (
                              <Image
                                src={`/${producto.foto}`}
                                alt={producto.nombre}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                              />
                            ) : (
                              <div className="flex size-full items-center justify-center text-tenue bg-superficie">
                                <IconPhotoOff size={16} stroke={1.5} />
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Modelo */}
                        <td className="px-4 py-3 font-semibold">
                          <div className="flex items-center gap-2">
                            {producto.foto ? (
                              <Link
                                href={`/producto/${producto.slug}`}
                                className="font-bold text-texto hover:text-acento transition-colors line-clamp-1"
                              >
                                {textoVisible(producto.nombre)}
                              </Link>
                            ) : (
                              <span className="font-bold text-texto line-clamp-1">
                                {textoVisible(producto.nombre)}
                              </span>
                            )}
                            {enOferta && (
                              <span className="rounded bg-acento px-1.5 py-0.5 text-[9px] font-black uppercase text-texto-inverso">
                                Oferta
                              </span>
                            )}
                          </div>
                          {producto.genero && (
                            <p className="text-[11px] font-normal text-tenue">
                              {producto.genero}
                            </p>
                          )}
                        </td>

                        {/* Categoría */}
                        <td className="px-4 py-3 text-xs text-tenue">
                          <span className="font-semibold text-texto">
                            {nombreCategoria(producto.categoria)}
                          </span>
                          {producto.subcategoria && (
                            <p className="text-[11px] text-tenue">
                              {textoVisible(producto.subcategoria)}
                            </p>
                          )}
                        </td>

                        {/* Variantes (Colores y tallas) */}
                        <td className="px-4 py-3 text-xs text-tenue">
                          {producto.colores.length > 0 && (
                            <p className="line-clamp-1">
                              <span className="font-medium text-texto">Colores:</span>{" "}
                              {producto.colores.join(", ")}
                            </p>
                          )}
                          {producto.tallas.length > 0 && (
                            <p className="line-clamp-1 text-[11px]">
                              <span className="font-medium text-texto">Tallas:</span>{" "}
                              {producto.tallas.join(", ")}
                            </p>
                          )}
                          {producto.colores.length === 0 && producto.tallas.length === 0 && (
                            <span className="text-[11px] italic">A consultar</span>
                          )}
                        </td>

                        {/* Precio */}
                        <td className="px-4 py-3 text-right tabular-nums">
                          {precio != null ? (
                            <div>
                              <p className="font-black text-texto text-sm">
                                {formatearSoles(precio)}
                              </p>
                              {enOferta && producto.precio != null && (
                                <p className="text-[10px] text-tenue line-through">
                                  {formatearSoles(producto.precio)}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-tenue italic">
                              Consultar
                            </span>
                          )}
                        </td>

                        {/* Acción */}
                        <td className="px-4 py-3 text-center">
                          {producto.foto ? (
                            <Link
                              href={`/producto/${producto.slug}`}
                              className="boton-oscuro inline-flex min-h-9 items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold w-full"
                            >
                              Ver ficha
                              <IconArrowUpRight size={14} />
                            </Link>
                          ) : (
                            <BotonWhatsApp
                              href={linkConsultaProducto(producto)}
                              origen="catalogo-completo"
                              detalle={{ producto: producto.slug }}
                              tamano="sm"
                              ancho="completo"
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
          </div>
        )}
      </section>
    </div>
  );
}
