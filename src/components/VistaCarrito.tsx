"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/lib/carrito";
import { linkCarrito } from "@/lib/whatsapp";
import { CATEGORIAS, formatearSoles, textoVisible } from "@/lib/tipos";
import { claseMuestraColor } from "@/lib/catalogo-filtros";
import { BotonWhatsApp } from "./BotonWhatsApp";
import {
  IconTrash,
  IconShoppingBag,
  IconShieldCheck,
  IconTruckDelivery,
  IconBrandWhatsapp,
  IconArrowRight,
} from "@tabler/icons-react";

export function VistaCarrito() {
  const { items, cambiarCantidad, quitar, vaciar, listo, cantidadTotal } = useCarrito();

  if (!listo) {
    return (
      <div
        role="status"
        aria-label="Cargando carrito"
        className="space-y-4 motion-safe:animate-pulse"
      >
        <div className="h-28 rounded-2xl bg-superficie" />
        <div className="h-28 rounded-2xl bg-superficie" />
        <div className="h-28 rounded-2xl bg-superficie" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-linea bg-superficie/40 px-6 py-16 text-center sm:py-20">
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-superficie text-tenue shadow-inner">
          <IconShoppingBag size={36} stroke={1.5} />
        </div>
        <h2 className="texto-display mt-6 text-2xl font-black tracking-tight text-texto sm:text-3xl">
          Tu carrito está vacío
        </h2>
        <p className="mx-auto mt-2.5 max-w-md leading-relaxed text-tenue text-sm sm:text-base">
          Aún no has agregado ningún modelo. Explora nuestras colecciones y arma tu pedido para coordinar por WhatsApp.
        </p>

        {/* Accesos rápidos a categorías */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="rounded-xl border bg-tarjeta px-4 py-2.5 text-xs font-bold text-texto hover:border-texto hover:bg-superficie transition-all"
            >
              {cat.nombre}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/catalogo-completo"
            className="boton-oscuro inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm"
          >
            Ver todo el catálogo
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const total = items.reduce(
    (s, x) => s + (x.precio ? x.precio * x.cantidad : 0),
    0,
  );
  const todosConPrecio = items.every((x) => x.precio);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      {/* Lista de productos en el carrito */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-linea/60">
          <p className="text-xs font-bold uppercase tracking-wider text-tenue">
            Artículos ({cantidadTotal})
          </p>
          <button
            type="button"
            onClick={vaciar}
            className="text-xs font-semibold text-tenue hover:text-acento transition-colors"
          >
            Vaciar todo
          </button>
        </div>

        <ul className="space-y-3.5">
          {items.map((it, i) => {
            const subtotalItem = it.precio ? it.precio * it.cantidad : null;
            return (
              <li
                key={`${it.slug}-${it.color ?? ""}-${it.talla ?? ""}-${i}`}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border bg-tarjeta p-4 sm:p-5 transition-all hover:border-linea/80 hover:shadow-sm"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Foto del producto */}
                  <Link
                    href={`/producto/${it.slug}`}
                    className="product-stage relative size-20 sm:size-24 shrink-0 overflow-hidden rounded-xl border border-linea/50 transition group-hover:opacity-90"
                  >
                    {it.foto ? (
                      <Image
                        src={`/${it.foto}`}
                        alt={it.nombre}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[11px] text-tenue">
                        Sin foto
                      </div>
                    )}
                  </Link>

                  {/* Detalles */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/producto/${it.slug}`}
                      className="block font-bold text-texto hover:text-acento transition-colors text-sm sm:text-base line-clamp-1"
                    >
                      {textoVisible(it.nombre)}
                    </Link>

                    {/* Chips de variantes */}
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                      {it.color && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-superficie px-2 py-0.5 font-medium text-texto">
                          <span
                            className={`size-2 rounded-full ${claseMuestraColor(it.color)}`}
                          />
                          {it.color}
                        </span>
                      )}
                      {it.talla && (
                        <span className="rounded-md bg-superficie px-2 py-0.5 font-semibold text-texto">
                          Talla: {it.talla}
                        </span>
                      )}
                      {!it.color && !it.talla && (
                        <span className="text-tenue text-[11px]">Sin variante</span>
                      )}
                    </div>

                    {/* Precio unitario */}
                    <p className="mt-2 text-xs font-semibold text-tenue">
                      {it.precio
                        ? `${formatearSoles(it.precio)} c/u`
                        : "Precio a confirmar por WhatsApp"}
                    </p>
                  </div>
                </div>

                {/* Controles de cantidad y precio total de la fila */}
                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-linea/40">
                  {/* Selector de cantidad */}
                  <div
                    role="group"
                    aria-label={`Cantidad de ${textoVisible(it.nombre)}`}
                    className="flex items-center rounded-xl border bg-superficie/60"
                  >
                    <button
                      type="button"
                      onClick={() => cambiarCantidad(i, it.cantidad - 1)}
                      className="flex size-9 items-center justify-center text-base font-bold text-texto hover:bg-superficie active:scale-95 rounded-l-xl transition"
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs font-bold tabular-nums">
                      {it.cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => cambiarCantidad(i, it.cantidad + 1)}
                      className="flex size-9 items-center justify-center text-base font-bold text-texto hover:bg-superficie active:scale-95 rounded-r-xl transition"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal del item */}
                  <div className="text-right min-w-[5rem]">
                    {subtotalItem ? (
                      <p className="font-black text-texto text-sm sm:text-base tabular-nums">
                        {formatearSoles(subtotalItem)}
                      </p>
                    ) : (
                      <span className="text-xs text-tenue italic">Por confirmar</span>
                    )}
                  </div>

                  {/* Botón eliminar */}
                  <button
                    type="button"
                    onClick={() => quitar(i)}
                    className="p-2 text-tenue hover:text-acento rounded-lg hover:bg-superficie transition"
                    aria-label={`Eliminar ${it.nombre} del carrito`}
                    title="Eliminar producto"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="pt-3">
          <Link
            href="/catalogo-completo"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-tenue hover:text-texto transition-colors"
          >
            ← Seguir agregando productos
          </Link>
        </div>
      </div>

      {/* Sidebar: Resumen del Pedido */}
      <aside className="rounded-3xl border bg-tarjeta p-6 sm:p-7 shadow-[0_20px_50px_-25px_rgba(21,22,25,0.1)] lg:sticky lg:top-28">
        <h2 className="text-lg font-black tracking-tight text-texto">
          Resumen del pedido
        </h2>

        <div className="mt-6 space-y-3.5 border-b border-linea/80 pb-6 text-sm">
          <div className="flex justify-between text-tenue">
            <span>Prendas seleccionadas</span>
            <span className="font-semibold text-texto tabular-nums">{cantidadTotal} unid.</span>
          </div>

          <div className="flex justify-between text-tenue">
            <span>Coordinación y envío</span>
            <span className="font-semibold text-texto">Vía WhatsApp</span>
          </div>

          {todosConPrecio ? (
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-base font-bold text-texto">Total estimado</span>
              <span className="text-2xl font-black text-texto tracking-tight tabular-nums">
                {formatearSoles(total)}
              </span>
            </div>
          ) : (
            <div className="rounded-xl bg-superficie p-3 text-xs leading-relaxed text-tenue">
              ℹ️ Algunos artículos seleccionados tienen precio a consultar directamente por el chat.
            </div>
          )}
        </div>

        {/* Botón Principal WhatsApp */}
        <div className="mt-6">
          <BotonWhatsApp
            href={linkCarrito(items)}
            origen="carrito"
            detalle={{ items: items.length }}
            className="w-full justify-center text-sm sm:text-base font-black py-4 shadow-lg hover:shadow-xl transition-all"
          >
            <IconBrandWhatsapp size={22} className="shrink-0" />
            Finalizar compra por WhatsApp
          </BotonWhatsApp>
        </div>

        <p className="mt-3 text-center text-xs leading-relaxed text-tenue">
          Se abrirá WhatsApp con el resumen de tu pedido. Confirmarás medios de pago (Yape, Plin o Transferencia) y datos de envío con la asesora.
        </p>

        {/* Garantías / Beneficios */}
        <div className="mt-6 pt-6 border-t border-linea/60 space-y-3">
          <div className="flex items-center gap-2.5 text-xs text-tenue">
            <IconShieldCheck size={18} className="text-acento shrink-0" />
            <span>Atención personalizada y trato directo</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-tenue">
            <IconTruckDelivery size={18} className="text-acento shrink-0" />
            <span>Envíos rápidos a Lima y provincias</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
