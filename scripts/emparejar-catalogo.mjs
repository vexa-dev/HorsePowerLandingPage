// Agrupa las fotos en productos (1 modelo = 1 producto con variantes) y cruza
// contra el Excel para pre-rellenar precio. Genera un CSV que se sube a la
// Google Sheet, donde la dueña completa precio / colores / tallas.
//
// Uso: node scripts/emparejar-catalogo.mjs
// Salida: scripts/catalogo-borrador.csv

import { readdir, writeFile } from "node:fs/promises";
import { extname, basename } from "node:path";
import Papa from "papaparse";
import {
  detectarTipo,
  detectarGenero,
  detectarCategoria,
  extraerModelo,
  extraerCodigoYTalla,
  nombrePresentable,
  slugify,
  LETRA_COLOR,
} from "./lib-nombres.mjs";
import { leerExcel, parecido } from "./lib-excel.mjs";

const ORIGEN = "Fotos HorsePower";

const archivos = (await readdir(ORIGEN)).filter((f) =>
  [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase()),
);

let excel = { modelos: new Set(), precios: new Map(), codigos: new Map() };
try {
  excel = await leerExcel();
  console.log(
    `Excel: ${excel.modelos.size} modelos, ${excel.precios.size} con precio`,
  );
} catch (e) {
  console.warn(`⚠  No se pudo leer el Excel (${e.message}). Sigo sin precios.`);
}

// --- Agrupar fotos por (tipo | genero | modelo) ---
const productos = new Map();
for (const archivo of archivos) {
  const base = basename(archivo, extname(archivo)).trim();
  const tipo = detectarTipo(base);
  const genero = detectarGenero(base);
  const modelo = extraerModelo(base);
  if (!modelo) continue;
  const { codigo, talla } = extraerCodigoYTalla(base);
  const clave = `${tipo}|${genero}|${modelo}`;

  if (!productos.has(clave)) {
    productos.set(clave, {
      tipo,
      genero,
      modelo,
      nombreLimpio: nombrePresentable(archivo),
      categoria: detectarCategoria(tipo),
      fotos: [],
      codigos: new Set(),
      tallas: new Set(),
    });
  }
  const p = productos.get(clave);
  p.fotos.push(slugify(base));
  if (codigo) p.codigos.add(codigo);
  if (talla) p.tallas.add(talla);
}

// --- Cruce con Excel + armado de filas ---
const TALLAS_ORDEN = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const filas = [];
let conPrecio = 0;
let enExcel = 0;

for (const p of productos.values()) {
  let precioExcel = "";
  for (const [modeloExcel, precio] of excel.precios) {
    if (parecido(p.modelo, modeloExcel)) {
      precioExcel = precio;
      break;
    }
  }
  const existeEnExcel = [...excel.modelos].some((m) => parecido(p.modelo, m));
  if (precioExcel) conPrecio++;
  if (existeEnExcel) enExcel++;

  const coloresTentativos = [...p.codigos]
    .map((c) => LETRA_COLOR[c[0]] || "")
    .filter(Boolean);

  filas.push({
    slug: slugify(p.nombreLimpio),
    activo: "si", // con foto se publica; el precio se completa luego en la Sheet
    categoria: p.categoria,
    subcategoria: p.tipo,
    genero: p.genero,
    nombre: p.nombreLimpio,
    nombre_original: p.modelo,
    codigos: [...p.codigos].join(", "),
    precio: precioExcel,
    precio_oferta: "",
    colores: [...new Set(coloresTentativos)].join(", "),
    tallas: [...p.tallas].sort(
      (a, b) => TALLAS_ORDEN.indexOf(a) - TALLAS_ORDEN.indexOf(b),
    ).join(", "),
    foto: `${p.fotos[0]}.webp`,
    fotos_disponibles: p.fotos.length,
    destacado_hp: "",
    en_excel: existeEnExcel ? "si" : "no",
  });
}

filas.sort((a, b) => a.slug.localeCompare(b.slug));

await writeFile(
  "scripts/catalogo-borrador.csv",
  Papa.unparse(filas, { quotes: true }),
);

console.log(
  `\n${filas.length} productos -> scripts/catalogo-borrador.csv\n` +
    `  ${enExcel} existen en el Excel\n` +
    `  ${conPrecio} con precio pre-rellenado desde el Excel\n` +
    `  ${filas.length - conPrecio} sin precio (se publican con "consultar"; la dueña completa en la Sheet)`,
);
