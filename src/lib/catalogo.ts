import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import Papa from "papaparse";
import { FilaCatalogo, aProducto, type Producto } from "./tipos";

/**
 * Fuente de datos del catálogo.
 *
 * - Producción: `GOOGLE_SHEET_CSV_URL` apunta al CSV publicado de la Google Sheet
 *   (Archivo → Compartir → Publicar en la web → CSV).
 * - Fallback / desarrollo: `src/data/catalogo.csv` versionado en el repo.
 */
const CSV_URL = process.env.GOOGLE_SHEET_CSV_URL;
export const REVALIDAR_SEGUNDOS = 60 * 30;

let cache: Promise<Producto[]> | null = null;

async function leerCsvCrudo(): Promise<string> {
  if (CSV_URL) {
    const res = await fetch(CSV_URL, {
      next: { revalidate: REVALIDAR_SEGUNDOS },
    });
    if (!res.ok) {
      throw new Error(`No se pudo descargar la Google Sheet (${res.status})`);
    }
    return res.text();
  }
  return readFile(join(process.cwd(), "src", "data", "catalogo.csv"), "utf8");
}

export function cargarCatalogo(): Promise<Producto[]> {
  if (!cache) {
    cache = (async () => {
      const crudo = await leerCsvCrudo();
      const { data } = Papa.parse<Record<string, string>>(crudo, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase(),
      });

      const productos: Producto[] = [];
      const vistos = new Set<string>();
      for (const fila of data) {
        const parsed = FilaCatalogo.safeParse(fila);
        if (!parsed.success || !parsed.data.activo) continue;
        const p = aProducto(parsed.data);
        if (vistos.has(p.slug)) continue;
        vistos.add(p.slug);
        productos.push(p);
      }
      return productos.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    })().catch((err) => {
      cache = null;
      throw err;
    });
  }
  return cache;
}

/** Productos con foto — los que se muestran como tarjeta. */
export async function productosConFoto(): Promise<Producto[]> {
  return (await cargarCatalogo()).filter((p) => p.foto);
}

export async function productosPorCategoria(
  categoria: string,
): Promise<Producto[]> {
  return (await productosConFoto()).filter((p) => p.categoria === categoria);
}

export async function productoPorSlug(
  slug: string,
): Promise<Producto | undefined> {
  return (await cargarCatalogo()).find((p) => p.slug === slug);
}

export async function slugsConFoto(): Promise<string[]> {
  return (await productosConFoto()).map((p) => p.slug);
}

export async function destacadosHP(): Promise<Producto[]> {
  const conFoto = await productosConFoto();
  const marcados = conFoto.filter((p) => p.destacadoHP);
  return (marcados.length ? marcados : conFoto).slice(0, 8);
}

/** Todo el catálogo para la vista "Catálogo completo" (con y sin foto). */
export async function catalogoCompleto(): Promise<Producto[]> {
  return cargarCatalogo();
}
