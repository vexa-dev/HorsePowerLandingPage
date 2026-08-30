"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { linkConsultaProducto } from "@/lib/whatsapp";
import { eventoWhatsApp } from "@/lib/analitica";
import { textoVisible } from "@/lib/tipos";

interface Fila {
  slug: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  precio: string;
  tieneFoto: boolean;
}

export function ListaCatalogoCompleto({ filas }: { filas: Fila[] }) {
  const id = useId().replace(/:/g, "");
  const [q, setQ] = useState("");

  const filtradas = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return filas;
    return filas.filter((f) =>
      `${f.nombre} ${f.categoria} ${f.subcategoria}`.toLowerCase().includes(t),
    );
  }, [q, filas]);

  return (
    <div>
      <label htmlFor={`${id}-q`} className="mb-2 block text-sm font-semibold">
        Buscar en el catálogo
      </label>
      <input
        id={`${id}-q`}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Nombre, categoría o tipo"
        className="mb-5 min-h-12 w-full rounded-xl border bg-tarjeta px-4 text-sm outline-none focus:border-texto focus:ring-2 focus:ring-acento/20"
      />
      <p className="mb-3 text-sm text-tenue" aria-live="polite">
        {filtradas.length} resultado{filtradas.length === 1 ? "" : "s"}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-1 text-left text-sm">
          <caption className="sr-only">Catálogo completo de HorsePower</caption>
          <thead className="text-xs uppercase tracking-[0.12em] text-tenue">
            <tr>
              <th className="px-3 py-3 pr-4">Modelo</th>
              <th className="px-3 py-3 pr-4">Categoría</th>
              <th className="px-3 py-3 pr-4">Precio</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtradas.map((f) => (
              <tr
                key={f.slug}
                className="bg-superficie/60 transition hover:bg-superficie"
              >
                <td className="px-3 py-4 pr-4 font-semibold">
                  {textoVisible(f.nombre)}
                </td>
                <td className="px-3 py-4 pr-4 text-tenue">
                  {f.categoria}
                  {f.subcategoria ? ` · ${f.subcategoria}` : ""}
                </td>
                <td className="px-3 py-4 pr-4 tabular-nums">
                  {f.precio || (
                    <span className="text-tenue">Consultar</span>
                  )}
                </td>
                <td className="px-3 py-4 text-right">
                  {f.tieneFoto ? (
                    <Link
                      href={`/producto/${f.slug}`}
                      className="whitespace-nowrap font-semibold text-acento hover:underline"
                    >
                      Ver ficha
                    </Link>
                  ) : (
                    <a
                      href={linkConsultaProducto({
                        nombre: f.nombre,
                        slug: f.slug,
                      })}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        eventoWhatsApp("catalogo-completo", { producto: f.slug })
                      }
                      className="whitespace-nowrap font-semibold text-acento hover:underline"
                    >
                      Consultar
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtradas.length === 0 && (
          <p className="py-10 text-center text-tenue">Sin resultados.</p>
        )}
      </div>
    </div>
  );
}
