/**
 * Interpreta la cadena libre de NEXT_PUBLIC_HORARIO (p. ej.
 * "Lunes a Sábado: 9:00 am - 8:00 pm") para poder mostrar un estado
 * "Abierto ahora / Cerrado". Si no logra entenderla, devuelve null y la UI
 * simplemente no muestra el estado.
 */

const DIAS = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
] as const;

export interface HorarioParseado {
  /** Índices de día (0 = domingo … 6 = sábado). */
  dias: number[];
  /** Minutos desde medianoche en que abre. */
  abreMin: number;
  /** Minutos desde medianoche en que cierra. */
  cierraMin: number;
}

function sinTildes(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function indiceDia(nombre: string): number {
  const n = sinTildes(nombre).toLowerCase().slice(0, 3);
  return DIAS.findIndex((d) => d.startsWith(n));
}

function aMinutos(hora: number, minuto: number, ampm?: string): number {
  let h = hora;
  if (ampm === "pm" && h < 12) h += 12;
  if (ampm === "am" && h === 12) h = 0;
  return h * 60 + minuto;
}

export function parsearHorario(horario: string): HorarioParseado | null {
  const txt = sinTildes(horario).toLowerCase();

  const rango = txt.match(
    /(domingo|lunes|martes|miercoles|jueves|viernes|sabado)\s+a\s+(domingo|lunes|martes|miercoles|jueves|viernes|sabado)/,
  );
  const horas = txt.match(
    /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(?:-|–|a)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/,
  );
  if (!rango || !horas) return null;

  const d1 = indiceDia(rango[1]);
  const d2 = indiceDia(rango[2]);
  if (d1 < 0 || d2 < 0) return null;

  const dias: number[] = [];
  for (let d = d1; ; d = (d + 1) % 7) {
    dias.push(d);
    if (d === d2 || dias.length > 7) break;
  }

  const abreMin = aMinutos(Number(horas[1]), Number(horas[2] ?? 0), horas[3]);
  const cierraMin = aMinutos(Number(horas[4]), Number(horas[5] ?? 0), horas[6]);
  if (cierraMin <= abreMin) return null;

  return { dias, abreMin, cierraMin };
}

/** Estado de apertura para un instante dado (hora local de Lima). */
export function estadoApertura(
  h: HorarioParseado,
  ahora: Date,
): { abierto: boolean; cierraPronto: boolean } {
  const dia = ahora.getDay();
  const min = ahora.getHours() * 60 + ahora.getMinutes();
  const abierto = h.dias.includes(dia) && min >= h.abreMin && min < h.cierraMin;
  const cierraPronto = abierto && h.cierraMin - min <= 60;
  return { abierto, cierraPronto };
}
