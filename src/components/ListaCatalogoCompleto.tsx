"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { linkConsultaProducto } from "@/lib/whatsapp";
import { eventoWhatsApp } from "@/lib/analitica";

interface Fila {
  slug: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  precio: string;
  tieneFoto: boolean;
}

export function ListaCatalogoCompleto({ filas }: { filas: Fila[] }) {
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
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar modelo…"
        className="mb-4 w-full rounded-md border bg-tarjeta px-3 py-2 text-sm outline-none focus:border-texto"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-tenue">
            <tr>
              <th className="py-2 pr-3">Modelo</th>
              <th className="py-2 pr-3">Categoría</th>
              <th className="py-2 pr-3">Precio</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {filtradas.map((f) => (
              <tr key={f.slug} className="border-b">
                <td className="py-2 pr-3 font-medium">{f.nombre}</td>
                <td className="py-2 pr-3 text-tenue">
                  {f.categoria}
                  {f.subcategoria ? ` · ${f.subcategoria}` : ""}
                </td>
                <td className="py-2 pr-3">
                  {f.precio || (
                    <span className="text-tenue">Consultar</span>
                  )}
                </td>
                <td className="py-2 text-right">
                  {f.tieneFoto ? (
                    <Link
                      href={`/producto/${f.slug}`}
                      className="text-acento hover:underline"
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
                      className="text-acento hover:underline"
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
