"use client";

import Link from "next/link";
import { useCarrito } from "@/lib/carrito";
import { linkCarrito } from "@/lib/whatsapp";
import { formatearSoles } from "@/lib/tipos";
import { BotonWhatsApp } from "./BotonWhatsApp";

export function VistaCarrito() {
  const { items, cambiarCantidad, quitar, vaciar, listo } = useCarrito();

  if (!listo) return <p className="text-tenue">Cargando…</p>;

  if (items.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-tenue">Tu carrito está vacío.</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-md bg-texto px-4 py-2 font-semibold text-fondo"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const total = items.reduce(
    (s, x) => s + (x.precio ? x.precio * x.cantidad : 0),
    0,
  );
  const todosConPrecio = items.every((x) => x.precio);

  return (
    <div className="space-y-4">
      <ul className="divide-y rounded-lg border">
        {items.map((it, i) => (
          <li key={i} className="flex flex-wrap items-center gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="font-medium">{it.nombre}</p>
              <p className="text-xs text-tenue">
                {[it.color, it.talla].filter(Boolean).join(" / ") || "—"}
                {it.precio
                  ? ` · ${formatearSoles(it.precio)} c/u`
                  : " · precio a confirmar"}
              </p>
            </div>
            <div className="flex items-center rounded-md border">
              <button
                onClick={() => cambiarCantidad(i, it.cantidad - 1)}
                className="px-2.5 py-1 text-lg"
                aria-label="Menos"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{it.cantidad}</span>
              <button
                onClick={() => cambiarCantidad(i, it.cantidad + 1)}
                className="px-2.5 py-1 text-lg"
                aria-label="Más"
              >
                +
              </button>
            </div>
            <button
              onClick={() => quitar(i)}
              className="text-xs text-tenue hover:text-acento"
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <button onClick={vaciar} className="text-sm text-tenue hover:text-acento">
          Vaciar carrito
        </button>
        {todosConPrecio && (
          <p className="text-lg font-bold">
            Total estimado: {formatearSoles(total)}
          </p>
        )}
      </div>

      <BotonWhatsApp
        href={linkCarrito(items)}
        origen="carrito"
        detalle={{ items: items.length }}
        className="w-full text-base"
      >
        Finalizar compra por WhatsApp
      </BotonWhatsApp>
      <p className="text-center text-xs text-tenue">
        Se abrirá WhatsApp con tu pedido listo. El precio final y la
        disponibilidad se confirman por el chat.
      </p>
    </div>
  );
}
