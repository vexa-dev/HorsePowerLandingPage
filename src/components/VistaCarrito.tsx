"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "@/lib/carrito";
import { linkCarrito, construirMensajeCarrito } from "@/lib/whatsapp";
import { CATEGORIAS, formatearSoles, textoVisible } from "@/lib/tipos";
import { claseMuestraColor } from "@/lib/catalogo-filtros";
import { BotonWhatsApp } from "./BotonWhatsApp";
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconBuildingStore,
  IconCheck,
  IconCreditCard,
  IconEye,
  IconMessageDots,
  IconShieldCheck,
  IconShoppingBag,
  IconTrash,
  IconTruckDelivery,
} from "@tabler/icons-react";

export function VistaCarrito() {
  const { items, cambiarCantidad, quitar, vaciar, listo, cantidadTotal } = useCarrito();
  const [modalidad, setModalidad] = useState<"envio" | "tienda">("envio");
  const [nota, setNota] = useState("");
  const [verMensaje, setVerMensaje] = useState(false);

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
        <p className="mx-auto mt-2.5 max-w-md leading-relaxed text-sm text-tenue sm:text-base">
          Aún no has agregado ningún modelo. Explora nuestras colecciones y arma tu pedido para coordinar por WhatsApp.
        </p>

        {/* Accesos rápidos a categorías */}
        <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="rounded-xl border border-linea bg-tarjeta px-4 py-2.5 text-xs font-bold text-texto transition-all hover:border-acento hover:bg-superficie hover:text-acento"
            >
              {cat.nombre}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/catalogo-completo"
            className="boton-oscuro inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-bold"
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

  const opcionesWhatsapp = { modalidad, nota };
  const hrefWhatsapp = linkCarrito(items, opcionesWhatsapp);
  const mensajePreview = construirMensajeCarrito(items, opcionesWhatsapp);

  return (
    <div className="space-y-8 pb-24 lg:pb-0">
      {/* ─── Indicador de Pasos de Compra (Stepper) ────────────────────────── */}
      <nav aria-label="Progreso del pedido" className="rounded-2xl border border-linea/80 bg-tarjeta p-4 sm:p-5 shadow-2xs">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {/* Paso 1: Carrito */}
          <li className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-acento font-black text-xs text-texto-inverso shadow-xs">
              1
            </span>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wider text-acento">Paso 1</p>
              <p className="truncate text-xs font-bold text-texto">Revisa tu pedido</p>
            </div>
          </li>

          {/* Paso 2: WhatsApp */}
          <li className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-linea/60 pt-3 sm:pt-0 sm:pl-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-superficie font-bold text-xs text-tenue">
              2
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-tenue">Paso 2</p>
              <p className="truncate text-xs font-bold text-texto">Coordinación por WhatsApp</p>
            </div>
          </li>

          {/* Paso 3: Entrega o Recojo */}
          <li className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-linea/60 pt-3 sm:pt-0 sm:pl-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-superficie font-bold text-xs text-tenue">
              3
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-tenue">Paso 3</p>
              <p className="truncate text-xs font-bold text-texto">Pago y Entrega / Recojo</p>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        {/* ─── Columna Izquierda: Lista de Productos y Opciones ───────────────── */}
        <div className="space-y-6">
          {/* Cabecera de lista */}
          <div className="flex items-center justify-between border-b border-linea/80 pb-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-texto">
              Artículos en el pedido ({cantidadTotal})
            </h2>
            <button
              type="button"
              onClick={vaciar}
              className="text-xs font-bold text-tenue transition-colors hover:text-red-600"
            >
              Vaciar todo
            </button>
          </div>

          {/* Lista de Items */}
          <ul className="space-y-3.5">
            {items.map((it, i) => {
              const subtotalItem = it.precio ? it.precio * it.cantidad : null;
              return (
                <li
                  key={`${it.slug}-${it.color ?? ""}-${it.talla ?? ""}-${i}`}
                  className="group relative flex flex-col gap-4 rounded-2xl border border-linea/70 bg-tarjeta p-4 shadow-2xs transition-all hover:border-linea hover:shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="flex flex-1 items-center gap-4 min-w-0">
                    {/* Foto */}
                    <Link
                      href={`/producto/${it.slug}`}
                      className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-linea/50 bg-superficie/50 transition group-hover:opacity-90 sm:size-24"
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

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/producto/${it.slug}`}
                        className="line-clamp-1 block text-sm font-bold text-texto transition-colors hover:text-acento sm:text-base"
                      >
                        {textoVisible(it.nombre)}
                      </Link>

                      {/* Chips de variantes */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                        {it.color && (
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-superficie px-2 py-0.5 font-medium text-texto">
                            <span
                              className={`size-2 rounded-full ${claseMuestraColor(it.color)}`}
                            />
                            {it.color}
                          </span>
                        )}
                        {it.talla && (
                          <span className="rounded-md bg-superficie px-2 py-0.5 font-bold text-texto">
                            Talla: {it.talla}
                          </span>
                        )}
                        {!it.color && !it.talla && (
                          <span className="text-[11px] text-tenue">Sin variante</span>
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

                  {/* Controles y Total Fila */}
                  <div className="flex items-center justify-between gap-5 border-t border-linea/40 pt-3 sm:border-t-0 sm:pt-0 sm:justify-end">
                    {/* Stepper Cantidad */}
                    <div
                      role="group"
                      aria-label={`Cantidad de ${textoVisible(it.nombre)}`}
                      className="flex items-center rounded-xl border border-linea bg-superficie/60"
                    >
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(i, it.cantidad - 1)}
                        className="flex size-9 items-center justify-center rounded-l-xl text-base font-bold text-texto transition hover:bg-superficie active:scale-95"
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-black tabular-nums text-texto">
                        {it.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(i, it.cantidad + 1)}
                        className="flex size-9 items-center justify-center rounded-r-xl text-base font-bold text-texto transition hover:bg-superficie active:scale-95"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal del item */}
                    <div className="min-w-[5.5rem] text-right">
                      {subtotalItem ? (
                        <p className="text-sm font-black tabular-nums text-texto sm:text-base">
                          {formatearSoles(subtotalItem)}
                        </p>
                      ) : (
                        <span className="text-xs italic text-tenue">Por confirmar</span>
                      )}
                    </div>

                    {/* Botón Eliminar */}
                    <button
                      type="button"
                      onClick={() => quitar(i)}
                      className="rounded-lg p-2 text-tenue transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Eliminar ${it.nombre} del carrito`}
                      title="Eliminar producto"
                    >
                      <IconTrash size={18} stroke={1.8} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ─── Modalidad de Entrega (Envío vs Recojo en tienda) ─────────────── */}
          <div className="rounded-2xl border border-linea bg-tarjeta p-5 shadow-2xs space-y-3.5">
            <p className="text-xs font-black uppercase tracking-wider text-texto">
              Elige tu modalidad preferida
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Opción 1: Envío a Domicilio / Provincia */}
              <label
                className={`relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
                  modalidad === "envio"
                    ? "border-acento bg-acento/5 ring-1 ring-acento"
                    : "border-linea hover:bg-superficie"
                }`}
              >
                <input
                  type="radio"
                  name="modalidad"
                  value="envio"
                  checked={modalidad === "envio"}
                  onChange={() => setModalidad("envio")}
                  className="mt-0.5 text-acento focus:ring-acento"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <IconTruckDelivery size={17} className="text-acento" />
                    <span className="text-xs font-bold text-texto">
                      Envío a domicilio o provincia
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-tenue">
                    Lima metropolitana por delivery y provincias por agencias de transporte seguras.
                  </p>
                </div>
              </label>

              {/* Opción 2: Recojo en Tienda (Contraentrega) */}
              <label
                className={`relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
                  modalidad === "tienda"
                    ? "border-acento bg-acento/5 ring-1 ring-acento"
                    : "border-linea hover:bg-superficie"
                }`}
              >
                <input
                  type="radio"
                  name="modalidad"
                  value="tienda"
                  checked={modalidad === "tienda"}
                  onChange={() => setModalidad("tienda")}
                  className="mt-0.5 text-acento focus:ring-acento"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <IconBuildingStore size={17} className="text-acento" />
                    <span className="text-xs font-bold text-texto">
                      Recojo en tienda (Pago contraentrega)
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-tenue">
                    Jr. Andahuaylas 198, Lima. Pagas en efectivo, Yape, Plin o tarjeta al retirar.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* ─── Nota Opcional para el Asesor ─────────────────────────────────── */}
          <div className="rounded-2xl border border-linea bg-tarjeta p-5 shadow-2xs space-y-2">
            <label
              htmlFor="nota-pedido"
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-texto"
            >
              <IconMessageDots size={16} className="text-acento" />
              <span>Nota o consulta para tu pedido (Opcional)</span>
            </label>
            <input
              id="nota-pedido"
              type="text"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Ej: ¿Tienen stock en color negro? o ¿Hacen envíos hoy?"
              className="w-full rounded-xl border border-linea bg-superficie/50 px-3.5 py-2.5 text-xs text-texto placeholder:text-tenue/70 transition focus:border-acento focus:bg-tarjeta focus:outline-hidden"
            />
            <p className="text-[11px] text-tenue">
              Esta indicación se añadirá automáticamente a tu mensaje de WhatsApp.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/catalogo-completo"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-tenue transition-colors hover:text-texto"
            >
              ← Seguir agregando productos
            </Link>
          </div>
        </div>

        {/* ─── Columna Derecha: Sidebar de Resumen ────────────────────────────── */}
        <aside className="rounded-3xl border border-linea bg-tarjeta p-6 sm:p-7 shadow-[0_16px_40px_-20px_rgb(var(--sombra-rgb)/0.1)] lg:sticky lg:top-24 space-y-6">
          <h2 className="text-lg font-black tracking-tight text-texto">
            Resumen del pedido
          </h2>

          <div className="space-y-3.5 border-b border-linea/80 pb-5 text-sm">
            <div className="flex justify-between text-tenue">
              <span>Prendas seleccionadas</span>
              <span className="font-bold tabular-nums text-texto">{cantidadTotal} unid.</span>
            </div>

            <div className="flex justify-between text-tenue">
              <span>Modalidad</span>
              <span className="font-bold text-texto text-right text-xs">
                {modalidad === "tienda"
                  ? "Recojo en tienda (Contraentrega)"
                  : "Envío a domicilio / provincia"}
              </span>
            </div>

            <div className="flex justify-between text-tenue">
              <span>Coordinación y pago</span>
              <span className="font-bold text-acento text-xs">Vía WhatsApp</span>
            </div>

            {todosConPrecio ? (
              <div className="flex items-baseline justify-between pt-2 border-t border-linea/60">
                <span className="text-base font-bold text-texto">Total estimado</span>
                <span className="text-2xl font-black tracking-tight tabular-nums text-texto">
                  {formatearSoles(total)}
                </span>
              </div>
            ) : (
              <div className="rounded-xl bg-superficie p-3 text-xs leading-relaxed text-tenue">
                ℹ️ Algunos artículos tienen precio a confirmar directamente por el chat.
              </div>
            )}
          </div>

          {/* Botón Principal WhatsApp - Con UN SOLO ICONO (conIcono={false} para evitar duplicados) */}
          <div>
            <BotonWhatsApp
              href={hrefWhatsapp}
              origen="carrito"
              conIcono={false}
              detalle={{ items: items.length, modalidad }}
              className="w-full justify-center gap-2.5 py-3.5 text-sm sm:text-base font-black shadow-md hover:shadow-lg transition-all"
            >
              <IconBrandWhatsapp size={22} className="shrink-0" stroke={2} />
              <span>Finalizar compra por WhatsApp</span>
            </BotonWhatsApp>
          </div>

          <p className="text-center text-xs leading-relaxed text-tenue">
            Se abrirá WhatsApp con el resumen de tu pedido. Confirmarás medios de pago (Yape, Plin o Transferencia) y detalles de entrega con tu asesora.
          </p>

          {/* Acordeón para ver mensaje que se enviará */}
          <div className="border-t border-linea/60 pt-4">
            <button
              type="button"
              onClick={() => setVerMensaje((prev) => !prev)}
              className="flex w-full items-center justify-between text-xs font-bold text-acento hover:underline"
            >
              <span className="inline-flex items-center gap-1.5">
                <IconEye size={15} stroke={2} />
                {verMensaje ? "Ocultar mensaje preparado" : "Ver mensaje que se enviará"}
              </span>
              <span>{verMensaje ? "▲" : "▼"}</span>
            </button>

            {verMensaje && (
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-superficie p-3 text-[11px] leading-relaxed text-tenue font-mono border border-linea">
                {mensajePreview}
              </pre>
            )}
          </div>

          {/* Medios de Pago y Garantías */}
          <div className="border-t border-linea/60 pt-5 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-tenue">
              Métodos de pago aceptados
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-texto">
              <span className="rounded-md border border-linea bg-superficie px-2 py-0.5">Yape</span>
              <span className="rounded-md border border-linea bg-superficie px-2 py-0.5">Plin</span>
              <span className="rounded-md border border-linea bg-superficie px-2 py-0.5">BCP / BBVA</span>
              <span className="rounded-md border border-linea bg-superficie px-2 py-0.5">Pago en tienda</span>
            </div>

            <div className="space-y-2 pt-2 text-xs text-tenue">
              <div className="flex items-center gap-2">
                <IconShieldCheck size={16} className="text-acento shrink-0" />
                <span>Atención personalizada y trato directo</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck size={16} className="text-acento shrink-0" />
                <span>Garantía de calidad y cambios en tienda</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ─── Barra Inferior Fija en Móvil (Sticky Bottom Bar) ──────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-tarjeta/95 p-3.5 shadow-lg backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium text-tenue">
              {cantidadTotal} {cantidadTotal === 1 ? "prenda" : "prendas"} ·{" "}
              {modalidad === "tienda" ? "En tienda" : "Envío"}
            </p>
            <p className="text-base font-black text-texto tabular-nums">
              {todosConPrecio ? formatearSoles(total) : "Por confirmar"}
            </p>
          </div>

          <a
            href={hrefWhatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-acento px-4 py-2.5 text-xs font-black uppercase tracking-wider text-texto-inverso shadow-sm transition hover:bg-acento-hover active:scale-95"
          >
            <IconBrandWhatsapp size={18} stroke={2} />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
