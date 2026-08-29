// Lectura del Excel de inventario físico de la dueña.
// OJO: no es un catálogo, solo se usa para jalar precios y códigos.

import ExcelJS from "exceljs";

const RUTA_DEFECTO =
  "C:/Users/ShiroVs/Downloads/STOCK - ASOTEA SEPTIEMBRE 2023.xlsx";

function norm(s) {
  return (s ?? "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}

export async function leerExcel(ruta = process.env.EXCEL_STOCK || RUTA_DEFECTO) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ruta);

  const modelos = new Set(); // nombres de modelo normalizados
  const precios = new Map(); // modeloNorm -> precio (number)
  const codigos = new Map(); // codigo -> Set(sheet::modeloNorm)

  wb.eachSheet((ws) => {
    const hoja = ws.name.trim();
    ws.eachRow((row, n) => {
      if (n === 1) return;
      const vals = row.values; // 1-indexed
      const nombre = norm(vals[1]);
      if (nombre) modelos.add(nombre);

      // Códigos: columnas B..D suelen tener el código de lote/color.
      for (const c of [vals[2], vals[3], vals[4]]) {
        const code = norm(c).replace(/\s+/g, "");
        if (/^[A-Z0-9]{2,4}$/.test(code) && !/^\d+$/.test(code)) {
          if (!codigos.has(code)) codigos.set(code, new Set());
          codigos.get(code).add(`${hoja}::${nombre || norm(vals[1])}`);
        }
      }

      // Tabla de precios embebida en la hoja CABALLEROS: col H = modelo, col J = precio.
      if (/CABALLERO/i.test(hoja)) {
        const modeloPrecio = norm(vals[8]);
        const precio = Number(vals[10]);
        if (modeloPrecio && Number.isFinite(precio) && precio > 0) {
          precios.set(modeloPrecio, Math.round(precio));
          modelos.add(modeloPrecio);
        }
      }
    });
  });

  return { modelos, precios, codigos };
}

// Distancia de edición acotada (para tolerar typos: COLORMEN / COLOR MEN / COLORMENN).
export function parecido(a, b) {
  a = norm(a);
  b = norm(b);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  const m = a.length,
    n = b.length;
  if (Math.abs(m - n) > 2) return false;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return d[m][n] <= 2;
}
