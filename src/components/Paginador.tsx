"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { SelectorFilas } from "./SelectorFilas";

interface PaginadorProps {
  paginaActual: number;
  totalPaginas: number;
  totalItems: number;
  itemsPorPagina: number;
  alCambiarPagina: (pagina: number) => void;
  alCambiarItemsPorPagina?: (cantidad: number) => void;
  opcionesPorPagina?: number[];
  nombreItem?: string;
}

export function Paginador({
  paginaActual,
  totalPaginas,
  totalItems,
  itemsPorPagina,
  alCambiarPagina,
  alCambiarItemsPorPagina,
  opcionesPorPagina = [10, 15, 20, 50],
  nombreItem = "modelos",
}: PaginadorProps) {
  if (totalItems === 0) return null;

  const inicio = Math.min((paginaActual - 1) * itemsPorPagina + 1, totalItems);
  const fin = Math.min(paginaActual * itemsPorPagina, totalItems);

  // Algoritmo de rango de páginas con elipsis
  const obtenerNumerosPagina = (): (number | "ellipsis")[] => {
    if (totalPaginas <= 7) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }

    if (paginaActual <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPaginas];
    }

    if (paginaActual >= totalPaginas - 3) {
      return [
        1,
        "ellipsis",
        totalPaginas - 4,
        totalPaginas - 3,
        totalPaginas - 2,
        totalPaginas - 1,
        totalPaginas,
      ];
    }

    return [
      1,
      "ellipsis",
      paginaActual - 1,
      paginaActual,
      paginaActual + 1,
      "ellipsis",
      totalPaginas,
    ];
  };

  const numeros = obtenerNumerosPagina();

  return (
    <nav
      aria-label="Paginación de resultados"
      className="mt-6 flex flex-col gap-4 rounded-2xl border border-linea/80 bg-tarjeta p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Información y Selector de filas personalizado */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-tenue">
        <p className="font-medium text-texto">
          Mostrando <span className="font-bold text-texto">{inicio}</span> a{" "}
          <span className="font-bold text-texto">{fin}</span> de{" "}
          <span className="font-bold text-texto">{totalItems}</span> {nombreItem}
        </p>

        {alCambiarItemsPorPagina && (
          <div className="border-l border-linea/80 pl-3">
            <SelectorFilas
              valor={itemsPorPagina}
              opciones={opcionesPorPagina}
              onChange={alCambiarItemsPorPagina}
              posicion="arriba"
              etiqueta="Ver:"
            />
          </div>
        )}
      </div>

      {/* Controles de navegación */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-1">
          {/* Botón Anterior */}
          <button
            type="button"
            onClick={() => alCambiarPagina(Math.max(1, paginaActual - 1))}
            disabled={paginaActual <= 1}
            aria-label="Página anterior"
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-linea bg-tarjeta px-2.5 text-xs font-semibold text-texto transition hover:bg-superficie hover:border-texto disabled:opacity-40 disabled:pointer-events-none !outline-none focus:!outline-none focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-texto/20"
          >
            <IconChevronLeft size={15} stroke={2.2} />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Botones de número de página */}
          <div className="flex items-center gap-1">
            {numeros.map((item, idx) => {
              if (item === "ellipsis") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-8 w-7 items-center justify-center text-xs text-tenue select-none"
                    aria-hidden="true"
                  >
                    …
                  </span>
                );
              }

              const esActiva = item === paginaActual;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => alCambiarPagina(item)}
                  aria-label={`Página ${item}`}
                  aria-current={esActiva ? "page" : undefined}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold transition !outline-none focus:!outline-none focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-texto/20 ${
                    esActiva
                      ? "bg-texto text-fondo shadow-xs"
                      : "border border-linea bg-tarjeta text-texto hover:bg-superficie hover:border-texto"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Botón Siguiente */}
          <button
            type="button"
            onClick={() => alCambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
            disabled={paginaActual >= totalPaginas}
            aria-label="Página siguiente"
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-linea bg-tarjeta px-2.5 text-xs font-semibold text-texto transition hover:bg-superficie hover:border-texto disabled:opacity-40 disabled:pointer-events-none !outline-none focus:!outline-none focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-texto/20"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <IconChevronRight size={15} stroke={2.2} />
          </button>
        </div>
      )}
    </nav>
  );
}
