// Genera dos tablas de códigos -> color para que la dueña las valide.
// Uso: node scripts/tabla-colores.mjs
// Salida: scripts/colores-desde-fotos.csv  y  scripts/colores-desde-excel.csv

import { readdir, writeFile } from "node:fs/promises";
import { extname, basename } from "node:path";
import Papa from "papaparse";
import { extraerCodigoYTalla, extraerModelo, LETRA_COLOR } from "./lib-nombres.mjs";
import { leerExcel } from "./lib-excel.mjs";

const ORIGEN = "Fotos HorsePower";

// --- (a) Desde las fotos ---
const archivos = (await readdir(ORIGEN)).filter((f) =>
  [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase()),
);
const desdeFotos = new Map(); // codigo -> Set(modelo)
for (const archivo of archivos) {
  const base = basename(archivo, extname(archivo)).trim();
  const { codigo } = extraerCodigoYTalla(base);
  if (!codigo) continue;
  if (!desdeFotos.has(codigo)) desdeFotos.set(codigo, new Set());
  desdeFotos.get(codigo).add(extraerModelo(base));
}
const filasFotos = [...desdeFotos.entries()]
  .sort()
  .map(([codigo, modelos]) => ({
    codigo,
    color_por_confirmar: LETRA_COLOR[codigo[0]] || "",
    color_final: "",
    modelos: [...modelos].join(", "),
  }));
await writeFile(
  "scripts/colores-desde-fotos.csv",
  Papa.unparse(filasFotos, { quotes: true }),
);

// --- (b) Desde el Excel ---
let filasExcel = [];
try {
  const { codigos } = await leerExcel();
  filasExcel = [...codigos.entries()]
    .sort()
    .map(([codigo, refs]) => ({
      codigo,
      color_por_confirmar: LETRA_COLOR[codigo[0]] || "",
      color_final: "",
      referencias: [...refs].slice(0, 8).join(" | "),
    }));
  await writeFile(
    "scripts/colores-desde-excel.csv",
    Papa.unparse(filasExcel, { quotes: true }),
  );
} catch (e) {
  console.warn(`⚠  No se pudo leer el Excel: ${e.message}`);
}

console.log(
  `${filasFotos.length} códigos desde fotos -> scripts/colores-desde-fotos.csv\n` +
    `${filasExcel.length} códigos desde Excel -> scripts/colores-desde-excel.csv`,
);
