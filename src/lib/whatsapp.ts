import { formatearSoles, precioMostrado, type Producto } from "./tipos";

/** Número de la empresa, solo dígitos, con código de país. Ej: 51987654321 */
export const NUMERO_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "";

export interface ItemCarrito {
  slug: string;
  nombre: string;
  foto?: string;
  precio?: number;
  color?: string;
  talla?: string;
  cantidad: number;
}

function linkBase(texto: string): string {
  const q = `text=${encodeURIComponent(texto)}`;
  return NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?${q}`
    : `https://wa.me/?${q}`;
}

/** Consulta de un solo producto (usado en "Catálogo completo" y ficha sin stock). */
export function linkConsultaProducto(p: Pick<Producto, "nombre" | "slug">): string {
  return linkBase(
    `Hola HorsePower, quiero consultar por el producto: ${p.nombre}. ¿Tienen disponible?`,
  );
}

/** Mensaje del carrito completo. */
export function construirMensajeCarrito(items: ItemCarrito[]): string {
  const lineas: string[] = ["Hola HorsePower, quiero hacer este pedido:", ""];
  let total = 0;
  let hayPrecios = true;

  for (const it of items) {
    const detalle = [it.color, it.talla].filter(Boolean).join(" / ");
    const sub = it.precio ? it.precio * it.cantidad : undefined;
    if (sub) total += sub;
    else hayPrecios = false;

    lineas.push(
      `• ${it.cantidad}x ${it.nombre}` +
        (detalle ? ` (${detalle})` : "") +
        (it.precio ? ` — ${formatearSoles(it.precio)} c/u` : " — precio a confirmar"),
    );
  }

  lineas.push("");
  if (hayPrecios) lineas.push(`Total estimado: ${formatearSoles(total)}`);
  lineas.push(
    "El precio final y la disponibilidad se confirman por este chat.",
  );
  return lineas.join("\n");
}

export function linkCarrito(items: ItemCarrito[]): string {
  return linkBase(construirMensajeCarrito(items));
}

export { precioMostrado };
