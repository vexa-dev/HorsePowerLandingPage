// Utilidades compartidas por los scripts de preparación de datos.
// Parsea los nombres de archivo de foto de HorsePower y genera slugs.

// Palabras del nombre de archivo que NO forman parte del modelo.
const RUIDO = new Set([
  "CAMISA", "CHAQUETA", "CHOMPA", "CASACA", "MORRAL", "MORRALRUE", "LONCHERA", "MALETA",
  "VIAJE", "CHALECO", "TOP", "POLO", "BUZO", "SACON", "TSHIRT", "SHIRT", "T",
  "H", "M", "MC", "ML", "MS", "PE", "P", "RUE", "Y", "PC", "TABLET", "NEW", "SISA",
  "360", "40", "45", "A", "B", "SLIM", "FIT", "TALLA", "DE", "DEL", "LA", "EL",
  "BOMPER", "BOMBER", "SDE", "REPITIO", "REPITIÓ",
]);

// Tipo de prenda/artículo a partir de las primeras palabras del archivo.
export function detectarTipo(nombre) {
  const n = nombre.toUpperCase();
  if (n.startsWith("CHAQUETA") || n.startsWith("CASACA")) return "Casaca";
  if (n.startsWith("CHOMPA")) return "Chompa";
  if (n.startsWith("BUZO")) return "Buzo";
  if (n.startsWith("CHALECO")) return "Chaleco";
  if (n.startsWith("CAMISA")) return "Camisa";
  if (n.startsWith("POLO")) return "Polo";
  if (n.startsWith("T-SHIRT") || n.startsWith("T SHIRT") || n.startsWith("TSHIRT")) return "Polo box";
  if (n.startsWith("TOP")) return "Top";
  if (n.startsWith("SACON") || n.startsWith("SACÓN")) return "Sacón";
  if (n.startsWith("MORRAL RUE") || n.startsWith("MORRALRUE")) return "Morral con ruedas";
  if (n.startsWith("MORRAL")) return "Morral";
  if (n.startsWith("MALETA")) return "Maleta";
  if (n.startsWith("LONCHERA")) return "Lonchera";
  return "Otro";
}

// Categoría de cara al cliente (4 grandes grupos + Ropa).
export function detectarCategoria(tipo) {
  switch (tipo) {
    case "Casaca":
    case "Chompa":
    case "Buzo":
    case "Chaleco":
      return "casacas-y-chompas";
    case "Morral":
    case "Morral con ruedas":
      return "mochilas-y-morrales";
    case "Maleta":
      return "maletas-y-viaje";
    case "Lonchera":
      return "loncheras-y-accesorios";
    case "Camisa":
    case "Polo":
    case "Polo box":
    case "Top":
    case "Sacón":
      return "ropa";
    default:
      return "ropa";
  }
}

// Género: H -> Hombre, M -> Mujer, si no aparece -> Unisex.
export function detectarGenero(nombre) {
  const toks = nombre.toUpperCase().split(/\s+/);
  // El género aparece justo después del tipo (p. ej. "CHAQUETA H PE ...").
  for (let i = 1; i < Math.min(toks.length, 4); i++) {
    if (toks[i] === "H") return "Hombre";
    if (toks[i] === "M") return "Mujer";
  }
  return "Unisex";
}

// Código de lote/color: token de 2-4 chars alfanuméricos que suele ir al final,
// a veces pegado a la talla (p. ej. "Z06M", "9GAS", "T3KXL").
const TALLAS = ["XXS", "XXL", "XL", "XS", "S", "M", "L"];
export function extraerCodigoYTalla(nombre) {
  const toks = nombre.toUpperCase().replace(/\.(JPG|PNG)$/i, "").split(/\s+/).filter(Boolean);
  for (let i = toks.length - 1; i >= 0; i--) {
    const t = toks[i].replace(/[^A-Z0-9-]/g, "");
    if (!t) continue;
    // ¿token = código(2-4) + talla?
    for (const talla of TALLAS) {
      if (t.length > talla.length && t.endsWith(talla)) {
        const code = t.slice(0, -talla.length);
        if (/^[A-Z0-9]{2,4}$/.test(code)) return { codigo: code, talla };
      }
    }
    if (/^[A-Z0-9]{2,4}$/.test(t) && !TALLAS.includes(t)) return { codigo: t, talla: "" };
    if (TALLAS.includes(t)) return { codigo: "", talla: t };
  }
  return { codigo: "", talla: "" };
}

// Nombre del modelo: palabras que no son ruido, tipo, género, código ni talla.
export function extraerModelo(nombre) {
  const { codigo, talla } = extraerCodigoYTalla(nombre);
  const toks = nombre
    .toUpperCase()
    .replace(/\.(JPG|PNG)$/i, "")
    .replace(/[.\-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const combo = codigo && talla ? codigo + talla : "";
  const modelo = toks.filter((t) => {
    const clean = t.replace(/[^A-Z0-9]/g, "");
    if (!clean) return false;
    if (RUIDO.has(clean)) return false;
    if (clean === codigo || clean === talla || clean === combo) return false;
    if (codigo && clean.startsWith(codigo) && clean.length <= codigo.length + 3)
      return false;
    if (/^\d+$/.test(clean)) return false;
    // token tipo código: empieza con dígito o mezcla letras+dígitos, corto
    if (clean.length <= 6 && /\d/.test(clean) && /^[A-Z0-9]+$/.test(clean))
      return false;
    return true;
  });
  return modelo.join(" ").trim();
}

// Primera letra del código -> color tentativo (heurística, la dueña confirma).
export const LETRA_COLOR = {
  N: "Negro",
  Z: "Azul",
  V: "Verde",
  G: "Gris",
  R: "Rojo",
  T: "Terracota / Camello",
  B: "Beige / Arena",
  P: "Plomo / Perla",
  M: "Marrón",
  C: "Celeste",
  A: "Arena",
};

export function slugify(texto) {
  return texto
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Título presentable: "CHAQUETA H PE COLORMEN Z06M" -> "Casaca Colormen — Hombre"
export function nombrePresentable(archivo) {
  const base = archivo.replace(/\.(jpg|png|webp)$/i, "");
  const tipo = detectarTipo(base);
  const genero = detectarGenero(base);
  const modelo = extraerModelo(base)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const sufijo = genero === "Unisex" ? "" : ` — ${genero}`;
  return `${tipo} ${modelo}${sufijo}`.replace(/\s+/g, " ").trim();
}
