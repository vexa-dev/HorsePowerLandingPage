"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { Producto } from "@/lib/tipos";
import { TarjetaProducto } from "./TarjetaProducto";

export function GrillaConBuscador({
  productos,
  conFiltroSubcategoria = true,
}: {
  productos: Producto[];
  conFiltroSubcategoria?: boolean;
}) {
  const [q, setQ] = useState("");
  const [sub, setSub] = useState<string>("");

  const subcategorias = useMemo(
    () =>
      [...new Set(productos.map((p) => p.subcategoria).filter(Boolean))].sort(),
    [productos],
  );

  const fuse = useMemo(
    () =>
      new Fuse(productos, {
        keys: ["nombre", "subcategoria", "colores", "genero", "nombreInterno"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [productos],
  );

  const resultado = useMemo(() => {
    let lista = q.trim()
      ? fuse.search(q.trim()).map((r) => r.item)
      : productos;
    if (sub) lista = lista.filter((p) => p.subcategoria === sub);
    return lista;
  }, [q, sub, fuse, productos]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar producto, color…"
          className="min-w-0 flex-1 rounded-md border bg-tarjeta px-3 py-2 text-sm outline-none focus:border-texto"
        />
        {conFiltroSubcategoria && subcategorias.length > 1 && (
          <select
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            className="rounded-md border bg-tarjeta px-3 py-2 text-sm"
          >
            <option value="">Todo</option>
            {subcategorias.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className="mb-3 text-xs text-tenue">
        {resultado.length} producto{resultado.length === 1 ? "" : "s"}
      </p>

      {resultado.length === 0 ? (
        <p className="py-16 text-center text-tenue">
          No encontramos productos con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {resultado.map((p) => (
            <TarjetaProducto key={p.slug} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
