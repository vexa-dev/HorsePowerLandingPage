"use client";

import {
  IconAdjustmentsHorizontal,
  IconCheck,
  IconChevronDown,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  CAMPOS_FILTRO,
  cantidadFiltrosActivos,
  filtrosActivos,
  normalizarTexto,
  obtenerOpcionesFiltro,
  quitarFiltro,
  type CampoFiltro,
  type FiltrosCatalogo,
} from "@/lib/catalogo-filtros";
import { textoVisible, type Producto } from "@/lib/tipos";

const ETIQUETAS: Record<CampoFiltro, string> = {
  categoria: "Categoría",
  subcategoria: "Tipo de producto",
  genero: "Género",
  color: "Color",
  talla: "Talla",
};

const COLOR_SWATCHES: Record<string, string> = {
  acero: "bg-slate-400",
  amarillo: "bg-yellow-400",
  arena: "bg-amber-100",
  azul: "bg-blue-600",
  beige: "bg-stone-300",
  camello: "bg-amber-700",
  celeste: "bg-sky-300",
  fucsia: "bg-fuchsia-500",
  gris: "bg-gray-500",
  jade: "bg-emerald-500",
  marron: "bg-amber-900",
  morado: "bg-violet-600",
  negro: "bg-black",
  perla: "bg-slate-100",
  plomo: "bg-zinc-500",
  rojo: "bg-red-600",
  rosado: "bg-pink-300",
  terracota: "bg-orange-700",
  verde: "bg-green-600",
  vino: "bg-red-900",
};

interface PanelFiltrosCatalogoProps {
  productos: Producto[];
  productosParaOpciones?: Producto[];
  filtros: FiltrosCatalogo;
  incluirCategoria?: boolean;
  resultadoCount: number;
  onChange: (filtros: FiltrosCatalogo) => void;
  onClear: () => void;
}

interface ContenidoFiltrosProps
  extends PanelFiltrosCatalogoProps {
  idPrefix: string;
  onClose?: () => void;
}

function claseMuestraColor(valor: string): string {
  return COLOR_SWATCHES[normalizarTexto(valor)] ?? "bg-superficie-fuerte";
}

function ContenidoFiltros({
  productos,
  productosParaOpciones,
  filtros,
  incluirCategoria = true,
  onChange,
  onClear,
  resultadoCount,
  idPrefix,
  onClose,
}: ContenidoFiltrosProps) {
  const activos = filtrosActivos(filtros, incluirCategoria);
  const productosDeOpciones = productosParaOpciones ?? productos;

  function alternar(campo: CampoFiltro, valor: string) {
    const valores = filtros[campo];
    const estaActivo = valores.some(
      (item) => normalizarTexto(item) === normalizarTexto(valor),
    );
    const siguientes = estaActivo
      ? valores.filter(
          (item) => normalizarTexto(item) !== normalizarTexto(valor),
        )
      : [...valores, valor];

    onChange({ ...filtros, [campo]: siguientes });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {activos.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Filtros activos">
            {activos.map((activo) => (
              <button
                key={`${activo.campo}-${activo.valor}`}
                type="button"
                onClick={() => onChange(quitarFiltro(filtros, activo))}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border bg-superficie px-2.5 py-1.5 text-xs font-semibold hover:border-texto"
                aria-label={`Quitar ${activo.etiqueta}`}
              >
                <span className="truncate">{activo.etiqueta}</span>
                <IconX aria-hidden="true" size={14} stroke={2} />
              </button>
            ))}
          </div>
        )}

        {activos.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-tenue underline decoration-transparent underline-offset-4 hover:text-texto hover:decoration-current"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="divide-y">
        {CAMPOS_FILTRO.map((campo, groupIndex) => {
          if (campo === "categoria" && !incluirCategoria) return null;

          const opciones = obtenerOpcionesFiltro(
            productosDeOpciones,
            { ...filtros, q: "" },
            campo,
            incluirCategoria,
          );
          if (opciones.length === 0) return null;

          return (
            <details
              key={campo}
              open={groupIndex < 2}
              className="group/filter py-4 first:pt-0 last:pb-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
                {ETIQUETAS[campo]}
                <IconChevronDown
                  aria-hidden="true"
                  size={17}
                  stroke={1.8}
                  className="transition-transform group-open/filter:rotate-180"
                />
              </summary>
              <div className="mt-3 space-y-1.5" role="group" aria-label={ETIQUETAS[campo]}>
                {opciones.map((opcion, optionIndex) => {
                  const seleccionado = filtros[campo].some(
                    (valor) =>
                      normalizarTexto(valor) === normalizarTexto(opcion.valor),
                  );
                  const id = `${idPrefix}-${campo}-${optionIndex}`;

                  return (
                    <label key={opcion.valor} htmlFor={id} className="block cursor-pointer">
                      <input
                        id={id}
                        type="checkbox"
                        name={`${idPrefix}-${campo}`}
                        value={opcion.valor}
                        checked={seleccionado}
                        onChange={() => alternar(campo, opcion.valor)}
                        aria-label={`${ETIQUETAS[campo]}: ${opcion.etiqueta}`}
                        aria-checked={seleccionado}
                        className="sr-only"
                      />
                      <span
                        className={`flex min-h-10 items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${seleccionado ? "border-texto bg-texto text-texto-inverso" : "border-transparent hover:border-linea hover:bg-superficie"}`}
                      >
                        {campo === "color" && (
                          <span
                            aria-hidden="true"
                            className={`size-3 shrink-0 rounded-full border border-black/10 ${claseMuestraColor(opcion.valor)}`}
                          />
                        )}
                        <span className="min-w-0 flex-1 truncate">
                          {textoVisible(opcion.etiqueta)}
                        </span>
                        <span className="shrink-0 text-xs tabular-nums opacity-60">
                          {opcion.total}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex size-4 shrink-0 items-center justify-center transition ${seleccionado ? "opacity-100" : "opacity-0"}`}
                        >
                          <IconCheck size={14} stroke={2.5} />
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="boton-oscuro sticky bottom-0 min-h-12 w-full px-4 py-3"
        >
          Ver {resultadoLabel(resultadoCount)}
        </button>
      )}
    </div>
  );
}

function resultadoLabel(total: number): string {
  return `${total} producto${total === 1 ? "" : "s"}`;
}

export function PanelFiltrosCatalogo({
  productos,
  productosParaOpciones,
  filtros,
  incluirCategoria = true,
  resultadoCount,
  onChange,
  onClear,
}: PanelFiltrosCatalogoProps) {
  const id = useId().replace(/:/g, "");
  const [abierto, setAbierto] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const estabaAbierto = useRef(false);
  const cantidadActivos = cantidadFiltrosActivos(filtros, incluirCategoria);

  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") setAbierto(false);
    }

    if (abierto) {
      document.addEventListener("keydown", alPresionarTecla);
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (estabaAbierto.current) triggerRef.current?.focus();
    }

    estabaAbierto.current = abierto;
    return () => {
      document.removeEventListener("keydown", alPresionarTecla);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <div className="lg:row-span-2">
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setAbierto(true)}
          className="boton-secundario inline-flex min-h-11 items-center gap-2 px-4 py-2.5"
          aria-haspopup="dialog"
          aria-expanded={abierto}
          aria-controls={`${id}-drawer`}
        >
          <IconAdjustmentsHorizontal aria-hidden="true" size={18} stroke={1.8} />
          Filtros
          {cantidadActivos > 0 && (
            <span className="rounded-full bg-texto px-2 py-0.5 text-xs text-fondo">
              {cantidadActivos}
            </span>
          )}
        </button>
        <p className="text-sm text-tenue" aria-live="polite">
          {resultadoLabel(resultadoCount)}
        </p>
      </div>

      {filtrosActivos(filtros, incluirCategoria).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 lg:hidden" aria-label="Filtros activos">
          {filtrosActivos(filtros, incluirCategoria).map((activo) => (
            <button
              key={`${activo.campo}-${activo.valor}`}
              type="button"
              onClick={() => onChange(quitarFiltro(filtros, activo))}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border bg-superficie px-2.5 py-1.5 text-xs font-semibold hover:border-texto"
              aria-label={`Quitar ${activo.etiqueta}`}
            >
              <span className="truncate">{activo.etiqueta}</span>
              <IconX aria-hidden="true" size={14} stroke={2} />
            </button>
          ))}
        </div>
      )}

      <aside className="mt-5 hidden lg:sticky lg:top-28 lg:block">
        <div className="rounded-2xl border bg-tarjeta p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold">Filtrar</p>
              <p className="mt-1 text-xs text-tenue">
                {resultadoLabel(resultadoCount)}
              </p>
            </div>
            {cantidadActivos > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-xs font-semibold text-tenue hover:text-texto"
              >
                Limpiar
              </button>
            )}
          </div>
          <ContenidoFiltros
            productos={productos}
            productosParaOpciones={productosParaOpciones}
            filtros={filtros}
            incluirCategoria={incluirCategoria}
            resultadoCount={resultadoCount}
            onChange={onChange}
            onClear={onClear}
            idPrefix={`${id}-desktop`}
          />
        </div>
      </aside>

      {abierto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar filtros"
            className="absolute inset-0 bg-texto/35"
            onClick={() => setAbierto(false)}
          />
          <aside
            id={`${id}-drawer`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-drawer-title`}
            className="absolute inset-y-0 right-0 flex w-[min(92vw,25rem)] flex-col overflow-y-auto bg-tarjeta p-5 shadow-[-24px_0_60px_-35px_rgb(21_22_25/0.7)]"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p id={`${id}-drawer-title`} className="text-lg font-bold">
                  Filtros
                </p>
                <p className="mt-1 text-xs text-tenue">
                  {resultadoLabel(resultadoCount)}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setAbierto(false)}
                className="inline-flex size-10 items-center justify-center rounded-xl border hover:border-texto hover:bg-superficie"
                aria-label="Cerrar filtros"
              >
                <IconX aria-hidden="true" size={19} stroke={1.8} />
              </button>
            </div>
            <ContenidoFiltros
              productos={productos}
              productosParaOpciones={productosParaOpciones}
              filtros={filtros}
              incluirCategoria={incluirCategoria}
              resultadoCount={resultadoCount}
              onChange={onChange}
              onClear={onClear}
              idPrefix={`${id}-mobile`}
              onClose={() => setAbierto(false)}
            />
          </aside>
        </div>
      )}
    </div>
  );
}
