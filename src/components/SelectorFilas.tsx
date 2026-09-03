"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";

interface SelectorFilasProps {
  valor: number;
  opciones?: number[];
  onChange: (nuevoValor: number) => void;
  posicion?: "arriba" | "abajo";
  etiqueta?: string;
}

export function SelectorFilas({
  valor,
  opciones = [10, 15, 20, 50],
  onChange,
  posicion = "abajo",
  etiqueta = "Ver:",
}: SelectorFilasProps) {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function manejarClicFuera(evento: PointerEvent) {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(evento.target as Node)
      ) {
        setAbierto(false);
      }
    }

    function manejarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAbierto(false);
      }
    }

    if (abierto) {
      document.addEventListener("pointerdown", manejarClicFuera);
      document.addEventListener("keydown", manejarTecla);
    }

    return () => {
      document.removeEventListener("pointerdown", manejarClicFuera);
      document.removeEventListener("keydown", manejarTecla);
    };
  }, [abierto]);

  return (
    <div ref={contenedorRef} className="relative inline-flex items-center gap-1.5">
      {etiqueta && (
        <span className="text-xs font-medium text-tenue">{etiqueta}</span>
      )}

      {/* Botón activador del menú personalizado */}
      <button
        type="button"
        onClick={() => setAbierto((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-label={`${etiqueta} ${valor} filas por página`}
        className={`inline-flex h-8 items-center justify-between gap-2 rounded-lg border bg-tarjeta px-2.5 text-xs font-bold text-texto transition-all duration-150 !outline-none focus:!outline-none focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-texto/20 ${
          abierto
            ? "border-texto bg-superficie shadow-xs"
            : "border-linea hover:border-texto/60 hover:bg-superficie/60"
        }`}
      >
        <span>{valor} por pág.</span>
        <IconChevronDown
          size={14}
          stroke={2.4}
          className={`text-tenue transition-transform duration-200 ${
            abierto ? "rotate-180 text-texto" : ""
          }`}
        />
      </button>

      {/* Menú flotante estilizado sin estilos genéricos del navegador */}
      {abierto && (
        <div
          role="listbox"
          aria-label="Opciones de filas por página"
          className={`absolute right-0 z-50 min-w-[130px] rounded-xl border border-linea/90 bg-tarjeta p-1 shadow-lg transition-all ${
            posicion === "arriba"
              ? "bottom-full mb-1.5"
              : "top-full mt-1.5"
          }`}
        >
          {opciones.map((opcion) => {
            const esSeleccionado = opcion === valor;
            return (
              <button
                key={opcion}
                type="button"
                role="option"
                aria-selected={esSeleccionado}
                onClick={() => {
                  onChange(opcion);
                  setAbierto(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors !outline-none focus:!outline-none focus-visible:!outline-none ${
                  esSeleccionado
                    ? "bg-superficie font-extrabold text-texto"
                    : "font-medium text-texto/80 hover:bg-superficie/70 hover:text-texto"
                }`}
              >
                <span>{opcion} por pág.</span>
                {esSeleccionado && (
                  <IconCheck size={14} stroke={2.5} className="text-acento" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
