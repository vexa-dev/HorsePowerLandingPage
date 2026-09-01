"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/lib/carrito";
import { linkCarrito } from "@/lib/whatsapp";
import { formatearSoles, textoVisible } from "@/lib/tipos";
import { BotonWhatsApp } from "./BotonWhatsApp";
import { EstadoVacio } from "./EstadoVacio";

export function VistaCarrito() {
  const { items, cambiarCantidad, quitar, vaciar, listo } = useCarrito();

  if (!listo) {
    return (
      <div
        role="status"
        aria-label="Cargando carrito"
        className="space-y-3 motion-safe:animate-pulse"
      >
        <div className="h-24 rounded-2xl bg-superficie" />
        <div className="h-24 rounded-2xl bg-superficie" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EstadoVacio
        titulo="Tu carrito está vacío"
        descripcion="Revisa el catálogo y agrega los modelos que quieras consultar."
        accion={
          <Link href="/" className="boton-oscuro inline-flex min-h-12 items-center px-5 py-3">
            Ver catálogo
          </Link>
        }
      />
    );
  }

  const total = items.reduce(
    (s, x) => s + (x.precio ? x.precio * x.cantidad : 0),
    0,
  );
  const todosConPrecio = items.every((x) => x.precio);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="space-y-3">
        <ul className="space-y-3">
          {items.map((it, i) => (
            <li
              key={`${it.slug}-${it.color ?? ""}-${it.talla ?? ""}-${i}`}
              className="flex flex-wrap items-center gap-4 rounded-2xl bg-tarjeta p-4 shadow-[0_18px_40px_-32px_rgb(21_22_25/0.55)]"
            >
              {it.foto ? (
                <div className="product-stage relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={`/${it.foto}`}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="size-20 shrink-0 rounded-xl bg-superficie" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{textoVisible(it.nombre)}</p>
                <p className="mt-1 text-sm text-tenue">
                  {[it.color, it.talla].filter(Boolean).join(" / ") ||
                    "Sin variante"}
                  {it.precio
                    ? ` · ${formatearSoles(it.precio)} c/u`
                    : " · precio a confirmar"}
                </p>
              </div>
              <div
                role="group"
                aria-label={`Cantidad de ${textoVisible(it.nombre)}`}
                className="flex items-center rounded-xl border bg-tarjeta"
              >
                <button
                  type="button"
                  onClick={() => cambiarCantidad(i, it.cantidad - 1)}
                  className="min-h-11 min-w-11 text-lg hover:bg-superficie"
                  aria-label="Menos"
                >
                  −
                </button>
                <span className="w-9 text-center text-sm font-semibold tabular-nums">
                  {it.cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => cambiarCantidad(i, it.cantidad + 1)}
                  className="min-h-11 min-w-11 text-lg hover:bg-superficie"
                  aria-label="Más"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => quitar(i)}
                className="min-h-11 px-2 text-sm font-semibold text-tenue hover:text-acento"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={vaciar}
          className="min-h-11 text-sm font-semibold text-tenue hover:text-acento"
        >
          Vaciar carrito
        </button>
      </div>

      <aside className="rounded-2xl bg-superficie p-5 lg:sticky lg:top-28">
        {todosConPrecio && (
          <p className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-tenue">Total estimado</span>
            <span className="text-xl font-bold tabular-nums">
              {formatearSoles(total)}
            </span>
          </p>
        )}
        {!todosConPrecio && (
          <p className="text-sm leading-relaxed text-tenue">
            El precio de algunos modelos se confirma por WhatsApp.
          </p>
        )}
        <BotonWhatsApp
          href={linkCarrito(items)}
          origen="carrito"
          detalle={{ items: items.length }}
          tamano="lg"
          ancho="completo"
          className="mt-5"
        >
          Finalizar compra por WhatsApp
        </BotonWhatsApp>
        <p className="mt-3 text-center text-xs leading-relaxed text-tenue">
          Se abrirá WhatsApp con tu pedido listo. El precio final y la
          disponibilidad se confirman por el chat.
        </p>
      </aside>
    </div>
  );
}
