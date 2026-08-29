// Convierte las fotos originales (PNG ~7MB) a WebP ~1600px para la web.
// Uso: node scripts/optimizar-fotos.mjs
//
// Entrada:  ./Fotos HorsePower/*.png
// Salida:   ./public/productos/<slug>.webp   (+ mapa-fotos.json)

import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";
import { slugify } from "./lib-nombres.mjs";

const ORIGEN = "Fotos HorsePower";
const DESTINO = join("public", "productos");
const ANCHO_MAX = 1600;
const CALIDAD = 78;

const archivos = (await readdir(ORIGEN)).filter((f) =>
  [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase()),
);

await mkdir(DESTINO, { recursive: true });

const mapa = {}; // slugArchivo -> { original, webp, bytes }
let pesoTotal = 0;
let i = 0;

for (const archivo of archivos) {
  i++;
  const slug = slugify(basename(archivo, extname(archivo)));
  const salida = join(DESTINO, `${slug}.webp`);
  try {
    await sharp(join(ORIGEN, archivo))
      .rotate()
      .resize({ width: ANCHO_MAX, withoutEnlargement: true })
      .webp({ quality: CALIDAD })
      .toFile(salida);
    const { size } = await stat(salida);
    pesoTotal += size;
    mapa[slug] = { original: archivo, webp: `productos/${slug}.webp`, bytes: size };
    process.stdout.write(`\r[${i}/${archivos.length}] ${slug}            `);
  } catch (err) {
    console.error(`\n  ✗ ${archivo}: ${err.message}`);
  }
}

await writeFile(
  join("scripts", "mapa-fotos.json"),
  JSON.stringify(mapa, null, 2),
);

console.log(
  `\n\n${Object.keys(mapa).length} fotos -> ${(pesoTotal / 1024 / 1024).toFixed(1)} MB total` +
    ` (promedio ${(pesoTotal / Object.keys(mapa).length / 1024).toFixed(0)} KB)`,
);
console.log(`Mapa escrito en scripts/mapa-fotos.json`);
