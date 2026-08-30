import { z } from "zod";

export const CATEGORIAS = [
  { slug: "casacas-y-chompas", nombre: "Casacas y Chompas" },
  { slug: "mochilas-y-morrales", nombre: "Mochilas y Morrales" },
  { slug: "maletas-y-viaje", nombre: "Maletas y Viaje" },
  { slug: "loncheras-y-accesorios", nombre: "Loncheras y Accesorios" },
] as const;

export type CategoriaSlug = (typeof CATEGORIAS)[number]["slug"];

export function nombreCategoria(slug: string): string {
  return CATEGORIAS.find((c) => c.slug === slug)?.nombre ?? "Catálogo";
}

const listaSeparada = z
  .string()
  .optional()
  .transform((v) =>
    (v ?? "")
      .split(/[,;/]/)
      .map((s) => s.trim())
      .filter(Boolean),
  );

const booleano = z
  .string()
  .optional()
  .transform((v) => /^(si|sí|s|true|1|x)$/i.test((v ?? "").trim()));

const numeroOpcional = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v) => {
    const n = Number(String(v ?? "").replace(/[^\d.]/g, ""));
    return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
  });

/** Una fila cruda de la Google Sheet / CSV. */
export const FilaCatalogo = z.object({
  slug: z.string().min(1),
  activo: booleano,
  categoria: z.string().default("ropa"),
  subcategoria: z.string().optional().default(""),
  genero: z.string().optional().default(""),
  nombre: z.string().min(1),
  nombre_original: z.string().optional().default(""),
  precio: numeroOpcional,
  precio_oferta: numeroOpcional,
  colores: listaSeparada,
  tallas: listaSeparada,
  foto: z.string().optional().default(""),
  fotos: z
    .string()
    .optional()
    .transform((v) =>
      (v ?? "")
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  destacado_hp: booleano,
});

export interface Producto {
  slug: string;
  nombre: string;
  nombreInterno: string;
  categoria: string;
  subcategoria: string;
  genero: string;
  precio?: number;
  precioOferta?: number;
  colores: string[];
  tallas: string[];
  foto?: string; // foto principal, ruta relativa dentro de /public
  fotos: string[]; // todas las fotos del modelo (para el carrusel)
  destacadoHP: boolean;
}

function rutaFoto(nombre: string): string {
  const n = nombre.trim();
  return n.startsWith("productos/") ? n : `productos/${n}`;
}

export function aProducto(fila: z.infer<typeof FilaCatalogo>): Producto {
  const lista = (fila.fotos.length
    ? fila.fotos
    : fila.foto?.trim()
      ? [fila.foto]
      : []
  ).map(rutaFoto);
  // la columna `foto` (si existe) manda como principal
  const principal = fila.foto?.trim() ? rutaFoto(fila.foto) : lista[0];
  const fotos = principal
    ? [principal, ...lista.filter((f) => f !== principal)]
    : [];
  const foto = fotos[0];
  return {
    slug: fila.slug.trim(),
    nombre: fila.nombre.trim(),
    nombreInterno: fila.nombre_original.trim(),
    categoria: fila.categoria.trim() || "ropa",
    subcategoria: fila.subcategoria.trim(),
    genero: fila.genero.trim(),
    precio: fila.precio,
    precioOferta:
      fila.precio_oferta && fila.precio && fila.precio_oferta < fila.precio
        ? fila.precio_oferta
        : undefined,
    colores: fila.colores,
    tallas: fila.tallas,
    foto,
    fotos,
    destacadoHP: fila.destacado_hp,
  };
}

export function precioMostrado(p: Producto): number | undefined {
  return p.precioOferta ?? p.precio;
}

export function formatearSoles(n: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(n);
}
