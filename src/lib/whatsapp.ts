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

export interface OpcionesCarritoWhatsApp {
  modalidad?: "envio" | "tienda";
  nota?: string;
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

/** Pedido directo de un producto específico con variantes elegidas. */
export function linkCompraDirectaProducto({
  producto,
  color,
  talla,
  cantidad = 1,
}: {
  producto: Pick<Producto, "nombre" | "precio" | "precioOferta">;
  color?: string;
  talla?: string;
  cantidad?: number;
}): string {
  const detalle = [color, talla].filter(Boolean).join(" / ");
  const precio = producto.precioOferta ?? producto.precio;
  const subtotal = precio ? precio * cantidad : undefined;

  const lineas = [
    `Hola HorsePower, quiero pedir este modelo:`,
    `• ${cantidad}x ${producto.nombre}` +
      (detalle ? ` (${detalle})` : "") +
      (subtotal ? ` — ${formatearSoles(subtotal)}` : ""),
    ``,
    `¿Tienen stock disponible para entrega o recojo en tienda?`,
  ];

  return linkBase(lineas.join("\n"));
}

/** Mensaje del carrito completo. */
export function construirMensajeCarrito(
  items: ItemCarrito[],
  opciones?: OpcionesCarritoWhatsApp,
): string {
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

  if (opciones?.modalidad === "tienda") {
    lineas.push("📍 Modalidad preferida: Recojo en tienda (Pago contraentrega)");
  } else if (opciones?.modalidad === "envio") {
    lineas.push("🚚 Modalidad preferida: Envío a domicilio / provincia");
  }

  if (opciones?.nota && opciones.nota.trim()) {
    lineas.push(`📝 Nota del cliente: "${opciones.nota.trim()}"`);
  }

  lineas.push("");
  lineas.push(
    "El precio final y la disponibilidad se confirman por este chat.",
  );
  return lineas.join("\n");
}

export function linkCarrito(
  items: ItemCarrito[],
  opciones?: OpcionesCarritoWhatsApp,
): string {
  return linkBase(construirMensajeCarrito(items, opciones));
}

export { precioMostrado };
