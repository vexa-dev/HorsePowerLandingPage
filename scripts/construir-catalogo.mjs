// Construye el catálogo COMPLETO: todos los modelos del Excel de inventario
// + las fotos, una fila por modelo, con colores y tallas agregados como variantes.
//
// Uso: node scripts/construir-catalogo.mjs
// Salida: scripts/catalogo-borrador.csv  (subir a la Google Sheet)

import { readdir, writeFile } from "node:fs/promises";
import { extname, basename } from "node:path";
import ExcelJS from "exceljs";
import Papa from "papaparse";
import {
  detectarTipo,
  detectarGenero,
  detectarCategoria,
  extraerModelo,
  extraerCodigoYTalla,
  slugify,
  LETRA_COLOR,
} from "./lib-nombres.mjs";

const RUTA_EXCEL =
  process.env.EXCEL_STOCK ||
  "C:/Users/ShiroVs/Downloads/STOCK - ASOTEA SEPTIEMBRE 2023.xlsx";
const ORIGEN_FOTOS = "Fotos HorsePower";

// --- utilidades ---
const norm = (s) =>
  (s ?? "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();

const TALLAS_VALIDAS = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const ORDEN_TALLA = (t) => TALLAS_VALIDAS.indexOf(t);

const COLORES = [
  ["NEGRA", "Negro"], ["NEGRO", "Negro"], ["BLANCA", "Blanco"], ["BLANCO", "Blanco"],
  ["AZUL", "Azul"], ["MARINO", "Azul marino"], ["ROJA", "Rojo"], ["ROJO", "Rojo"],
  ["VERDE", "Verde"], ["GRIS", "Gris"], ["PLOMA", "Plomo"], ["PLOMO", "Plomo"],
  ["BEIGE", "Beige"], ["ARENA", "Arena"], ["CAMELLO", "Camello"], ["MARRON", "Marrón"],
  ["MOSTAZA", "Mostaza"], ["MORADA", "Morado"], ["MORADO", "Morado"], ["LILA", "Lila"],
  ["VINO", "Vino"], ["GUINDA", "Guinda"], ["CELESTE", "Celeste"], ["TURQUESA", "Turquesa"],
  ["FUCSIA", "Fucsia"], ["ROSADA", "Rosado"], ["ROSADO", "Rosado"], ["ROSA", "Rosado"],
  ["AMARILLA", "Amarillo"], ["AMARILLO", "Amarillo"], ["NARANJA", "Naranja"],
  ["PETROLEO", "Petróleo"], ["PERLA", "Perla"], ["CREMA", "Crema"], ["CORAL", "Coral"],
  ["ACERO", "Acero"], ["JADE", "Jade"], ["OLIVO", "Olivo"],
];
const PALABRA_COLOR = new Map(COLORES);

// separa "MORRAL URDANETA MORADA" -> base "MORRAL URDANETA", color "Morado"
function separarColorDelNombre(nombreNorm) {
  const toks = nombreNorm.split(" ");
  const colores = [];
  while (toks.length > 1 && PALABRA_COLOR.has(toks[toks.length - 1])) {
    colores.unshift(PALABRA_COLOR.get(toks.pop()));
  }
  return { base: toks.join(" "), colores };
}

// palabra -> tipo/prenda para la subcategoría
function subcategoriaDe(baseNorm, hoja) {
  const w = baseNorm.split(" ")[0];
  const map = {
    CHAQUETA: "Casaca", CASACA: "Casaca", CHOMPA: "Chompa", BUZO: "Buzo",
    CHALECO: "Chaleco", BLAZER: "Blazer", SACO: "Saco", ABRIGO: "Abrigo",
    CAMISA: "Camisa", POLO: "Polo", POLERA: "Polera", MORRAL: "Morral",
    MOCHILA: "Mochila", MALETA: "Maleta", LONCHERA: "Lonchera",
    CARTUCHERA: "Cartuchera", SOBRE: "Cartuchera", ESTUCHE: "Cartuchera",
  };
  if (map[w]) return map[w];
  return HOJAS[hoja]?.sub ?? "Otro";
}

// pestaña del Excel -> categoría de la web + subcategoría por defecto + género
const HOJAS = {
  DAMAS: { cat: "casacas-y-chompas", sub: "Casaca", genero: "Mujer" },
  CABALLEROS: { cat: "casacas-y-chompas", sub: "Casaca", genero: "Hombre" },
  LONCHERAS: { cat: "loncheras-y-accesorios", sub: "Lonchera", genero: "Unisex" },
  "CARTUCHERAS Y LONCHERAS": { cat: "loncheras-y-accesorios", sub: "Cartuchera", genero: "Unisex" },
  MULTIUSOS: { cat: "loncheras-y-accesorios", sub: "Multiusos", genero: "Unisex" },
  MOCHILAS: { cat: "mochilas-y-morrales", sub: "Morral", genero: "Unisex" },
  "MOCHILA - RUEDAS": { cat: "mochilas-y-morrales", sub: "Morral con ruedas", genero: "Unisex" },
  OCEANO: { cat: "mochilas-y-morrales", sub: "Mochila", genero: "Unisex" },
  "MOCHI- VIAJERO": { cat: "maletas-y-viaje", sub: "Mochila de viaje", genero: "Unisex" },
  MALETAS: { cat: "maletas-y-viaje", sub: "Maleta", genero: "Unisex" },
};

const IGNORAR_MODELO = [
  /^TOTAL/, /^SUB ?TOTAL/, /^SALDO/, /^STOCK/, /^VENDIDO/, /^FARDO/, /^CAJA/,
  /^BOLSA/, /^NOMBRE$/, /^MODELO$/, /^COD/, /^S\/E$/, /^-+$/, /^\d+$/,
];

function tituloModelo(baseNorm) {
  return baseNorm
    .replace(/\bNINA\b/g, "Niña")
    .replace(/\s*-\s*[A-Z0-9]{1,3}\s*$/g, "") // quita " - ZM0", " - M" al final
    .replace(/\bS\/E\b/g, "")
    .toLowerCase()
    .replace(/\bchaqueta\b/g, "casaca")
    .replace(/\bniña\b/g, "Niña")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bHp\b/g, "HP")
    .replace(/\s+/g, " ")
    .trim();
}

// --- 1) Leer el Excel ---
async function leerExcel() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(RUTA_EXCEL);
  const modelos = new Map(); // baseSlug -> acumulador

  const precioCaballeros = new Map();

  wb.eachSheet((ws) => {
    const hoja = norm(ws.name);
    if (hoja === "VENTAS CA") return;

    // --- líneas HP: cada pestaña es UN solo producto ---
    if (hoja === "HP - CASACAS" || hoja === "HP - POLERA") {
      const esCasaca = hoja.includes("CASACA");
      const nombre = esCasaca ? "Casaca HorsePower" : "Polera HorsePower";
      const acc = crearAcc(nombre, "casacas-y-chompas", esCasaca ? "Casaca" : "Polera", "Unisex");
      acc.destacadoHP = true;
      ws.eachRow((row) => {
        const v = row.values;
        const color = norm(esCasaca ? v[2] : v[3]);
        const talla = norm(esCasaca ? v[3] : v[4]);
        if (PALABRA_COLOR.has(color)) acc.colores.add(PALABRA_COLOR.get(color));
        else if (color && color.length > 2 && !color.includes("CASACA") && !color.includes("POLERA"))
          acc.colores.add(tituloModelo(color));
        if (TALLAS_VALIDAS.includes(talla)) acc.tallas.add(talla);
      });
      modelos.set(slugify(nombre), acc);
      return;
    }

    const meta = HOJAS[hoja];
    if (!meta) return;

    ws.eachRow((row, n) => {
      const v = row.values;
      if (n === 1) return;

      // tabla de precios embebida en CABALLEROS (col H nombre, col J precio)
      if (hoja === "CABALLEROS") {
        const m = norm(v[8]);
        const p = Number(v[10]);
        if (m && Number.isFinite(p) && p > 0) precioCaballeros.set(m, Math.round(p));
      }

      let nombreCrudo = norm(v[1]);
      if (!nombreCrudo || IGNORAR_MODELO.some((re) => re.test(nombreCrudo))) return;
      if (nombreCrudo.length < 2) return;

      const { base, colores } = separarColorDelNombre(nombreCrudo);
      if (!base || base.length < 2) return;

      const sub = subcategoriaDe(base, hoja);
      const nombre = `${sub === meta.sub ? "" : ""}${tituloModelo(base)}`.trim();
      const key = slugify(`${base} ${meta.genero}`);

      let acc = modelos.get(key);
      if (!acc) {
        acc = crearAcc(tituloModelo(base), meta.cat, sub, meta.genero);
        acc.baseNorm = base;
        modelos.set(key, acc);
      }
      acc.enExcel = true;
      for (const c of colores) acc.colores.add(c);

      const cod = norm(v[2]).replace(/\s+/g, "");
      if (/^[A-Z0-9]{2,4}$/.test(cod) && !/^\d+$/.test(cod)) {
        acc.codigos.add(cod);
        if (!colores.length && LETRA_COLOR[cod[0]]) acc.coloresTentativos.add(LETRA_COLOR[cod[0]]);
      }

      const talla = norm(v[3]);
      if (TALLAS_VALIDAS.includes(talla)) acc.tallas.add(talla);
    });
  });

  // aplicar precios de CABALLEROS
  for (const acc of modelos.values()) {
    if (acc.precio) continue;
    for (const [m, p] of precioCaballeros) {
      if (acc.baseNorm && (acc.baseNorm.includes(m) || m.includes(acc.baseNorm.replace(/^CHAQUETA /, "")))) {
        acc.precio = p;
        break;
      }
    }
  }

  return modelos;
}

function crearAcc(nombre, categoria, subcategoria, genero) {
  return {
    nombre,
    categoria,
    subcategoria,
    genero,
    baseNorm: norm(nombre),
    precio: "",
    colores: new Set(),
    coloresTentativos: new Set(),
    codigos: new Set(),
    tallas: new Set(),
    fotos: [],
    enExcel: false,
    destacadoHP: false,
  };
}

// --- 2) Leer las fotos y agruparlas por modelo ---
async function leerFotos() {
  const archivos = (await readdir(ORIGEN_FOTOS)).filter((f) =>
    [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase()),
  );
  const grupos = new Map();
  for (const archivo of archivos) {
    const b = basename(archivo, extname(archivo)).trim();
    const tipo = detectarTipo(b);
    const genero = detectarGenero(b);
    const modelo = norm(extraerModelo(b));
    if (!modelo) continue;
    const { codigo, talla } = extraerCodigoYTalla(b);
    const key = slugify(`${modelo} ${genero}`);
    if (!grupos.has(key)) {
      grupos.set(key, {
        modeloNorm: modelo,
        tipo,
        genero,
        categoria: detectarCategoria(tipo),
        subcategoria: tipo,
        fotos: [],
        codigos: new Set(),
        tallas: new Set(),
      });
    }
    const g = grupos.get(key);
    g.fotos.push(slugify(b));
    if (codigo) g.codigos.add(codigo);
    if (TALLAS_VALIDAS.includes(talla)) g.tallas.add(talla);
  }
  return grupos;
}

// --- 3) Fusionar Excel + fotos ---
function fusionar(excel, fotos) {
  const porNombre = new Map();
  for (const acc of excel.values()) {
    const k = acc.baseNorm.replace(/^(CHAQUETA|CASACA|MORRAL|MOCHILA|MALETA|LONCHERA|CAMISA) /, "");
    porNombre.set(k, acc);
  }

  for (const g of fotos.values()) {
    const clave = g.modeloNorm.replace(
      /^(CHAQUETA|CASACA|MORRAL|MOCHILA|MALETA|LONCHERA|CAMISA) /,
      "",
    );
    let acc = porNombre.get(clave);
    // match laxo: alguna palabra larga en común
    if (!acc) {
      for (const [k, a] of porNombre) {
        if (k === clave || k.includes(clave) || clave.includes(k)) {
          acc = a;
          break;
        }
      }
    }
    if (acc) {
      acc.fotos.push(...g.fotos);
      for (const c of g.codigos) {
        acc.codigos.add(c);
        if (LETRA_COLOR[c[0]]) acc.coloresTentativos.add(LETRA_COLOR[c[0]]);
      }
      for (const t of g.tallas) acc.tallas.add(t);
    } else {
      // modelo solo con foto (línea que no está en el Excel 2023)
      const acc2 = crearAcc(
        tituloModelo(g.modeloNorm),
        g.categoria,
        g.subcategoria,
        g.genero,
      );
      acc2.fotos = [...g.fotos];
      for (const c of g.codigos) {
        acc2.codigos.add(c);
        if (LETRA_COLOR[c[0]]) acc2.coloresTentativos.add(LETRA_COLOR[c[0]]);
      }
      for (const t of g.tallas) acc2.tallas.add(t);
      excel.set(slugify(`${g.modeloNorm} ${g.genero} foto`), acc2);
    }
  }
  return excel;
}

// --- 4) Escribir CSV ---
function aFilas(accs) {
  const usados = new Set();
  const filas = [];
  for (const acc of accs.values()) {
    let slug = slugify(`${acc.nombre} ${acc.genero === "Unisex" ? "" : acc.genero}`);
    let s = slug;
    let i = 2;
    while (usados.has(s)) s = `${slug}-${i++}`;
    usados.add(s);

    const colores = acc.colores.size
      ? [...acc.colores]
      : [...acc.coloresTentativos];
    const tallas = [...acc.tallas].sort((a, b) => ORDEN_TALLA(a) - ORDEN_TALLA(b));
    const fotos = [...new Set(acc.fotos)];

    filas.push({
      slug: s,
      activo: "si",
      categoria: acc.categoria,
      subcategoria: acc.subcategoria,
      genero: acc.genero,
      nombre:
        acc.nombre + (acc.genero === "Unisex" ? "" : ` — ${acc.genero}`),
      nombre_original: acc.baseNorm,
      codigos: [...acc.codigos].join(", "),
      precio: acc.precio || "",
      precio_oferta: "",
      colores: [...new Set(colores)].join(", "),
      tallas: tallas.join(", "),
      foto: fotos[0] ? `${fotos[0]}.webp` : "",
      fotos_disponibles: fotos.length,
      destacado_hp: acc.destacadoHP ? "si" : "",
      en_excel: acc.enExcel ? "si" : "no",
    });
  }
  filas.sort(
    (a, b) =>
      a.categoria.localeCompare(b.categoria) ||
      a.subcategoria.localeCompare(b.subcategoria) ||
      a.nombre.localeCompare(b.nombre, "es"),
  );
  return filas;
}

// --- run ---
const excel = await leerExcel();
console.log(`Excel: ${excel.size} modelos`);
const fotos = await leerFotos();
console.log(`Fotos: ${fotos.size} modelos fotografiados`);
const combinado = fusionar(excel, fotos);
const filas = aFilas(combinado);

const conFoto = filas.filter((f) => f.foto).length;
const conPrecio = filas.filter((f) => f.precio).length;

await writeFile("scripts/catalogo-borrador.csv", Papa.unparse(filas, { quotes: true }));

console.log(
  `\n${filas.length} modelos -> scripts/catalogo-borrador.csv\n` +
    `  ${conFoto} con foto (tarjeta)\n` +
    `  ${filas.length - conFoto} sin foto (van al "Catálogo completo")\n` +
    `  ${conPrecio} con precio (del Excel); el resto la dueña lo completa`,
);
