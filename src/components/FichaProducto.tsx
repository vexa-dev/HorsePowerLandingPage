"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/lib/carrito";
import {
  linkCompraDirectaProducto,
} from "@/lib/whatsapp";
import { precioMostrado, type Producto } from "@/lib/tipos";
import { claseMuestraColor } from "@/lib/catalogo-filtros";
import { BotonWhatsApp } from "./BotonWhatsApp";
import { GuiaTallasModal } from "./GuiaTallasModal";
import {
  IconBuildingStore,
  IconCheck,
  IconHeartHandshake,
  IconRulerMeasure,
  IconShieldCheck,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";

export function FichaProducto({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregar, cantidadTotal } = useCarrito();

  const tienePrecio = precioMostrado(producto) != null;

  const [color, setColor] = useState(
    producto.colores.length === 1 ? producto.colores[0] : "",
  );
  const [talla, setTalla] = useState(
    producto.tallas.length === 1 ? producto.tallas[0] : "",
  );
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const [modalTallasAbierto, setModalTallasAbierto] = useState(false);

  const faltaElegir =
    (producto.colores.length > 0 && !color) ||
    (producto.tallas.length > 0 && !talla);

  const faltantes = [
    producto.colores.length > 0 && !color ? "color" : "",
    producto.tallas.length > 0 && !talla ? "talla" : "",
  ].filter(Boolean);

  function alAgregar() {
    agregar({
      slug: producto.slug,
      nombre: producto.nombre,
      precio: precioMostrado(producto),
      foto: producto.foto,
      color: color || undefined,
      talla: talla || undefined,
      cantidad,
    });
    setAgregado(true);
  }

  const linkDirectoWhatsApp = linkCompraDirectaProducto({
    producto,
    color: color || undefined,
    talla: talla || undefined,
    cantidad,
  });

  return (
    <div className="space-y-6">
      {/* Aviso para productos con precio a confirmar */}
      {!tienePrecio && (
        <div className="rounded-2xl border border-linea bg-superficie/50 p-3.5 text-xs text-tenue leading-relaxed">
          ℹ️ Puedes agregar este modelo a tu carrito junto a otros productos o pedirlo directamente. El precio final y stock se coordinan por WhatsApp.
        </div>
      )}

      {/* Selector de Color */}
      {producto.colores.length > 0 && (
        <fieldset>
          <div className="mb-2.5 flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-texto">
              Color: {color ? <span className="text-acento font-black">{color}</span> : <span className="text-tenue">Selecciona uno</span>}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {producto.colores.map((c) => {
              const seleccionado = color === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-pressed={seleccionado}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                    seleccionado
                      ? "border-acento bg-acento/10 text-acento ring-1 ring-acento"
                      : "border-linea bg-tarjeta text-texto hover:border-texto hover:bg-superficie"
                  }`}
                >
                  <span
                    className={`size-2.5 rounded-full border border-black/10 ${claseMuestraColor(c)}`}
                  />
                  <span>{c}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Selector de Talla con Enlace a Guía de Medidas */}
      {producto.tallas.length > 0 && (
        <fieldset>
          <div className="mb-2.5 flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-texto">
              Talla: {talla ? <span className="text-acento font-black">{talla}</span> : <span className="text-tenue">Selecciona una</span>}
            </span>
            <button
              type="button"
              onClick={() => setModalTallasAbierto(true)}
              className="inline-flex items-center gap-1 font-bold text-acento hover:underline"
            >
              <IconRulerMeasure size={14} />
              Guía de medidas
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {producto.tallas.map((t) => {
              const seleccionado = talla === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTalla(t)}
                  aria-pressed={seleccionado}
                  className={`min-h-11 min-w-12 rounded-xl border px-3.5 py-2 text-xs font-black transition-all ${
                    seleccionado
                      ? "border-acento bg-acento text-texto-inverso shadow-2xs"
                      : "border-linea bg-tarjeta text-texto hover:border-texto hover:bg-superficie"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Selector de Cantidad */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-wider text-texto">
          Cantidad
        </span>
        <div
          role="group"
          aria-label="Cantidad"
          className="flex items-center rounded-xl border border-linea bg-superficie/60"
        >
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="flex size-9 items-center justify-center rounded-l-xl text-base font-bold text-texto transition hover:bg-superficie active:scale-95"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="w-9 text-center text-xs font-black tabular-nums text-texto">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            className="flex size-9 items-center justify-center rounded-r-xl text-base font-bold text-texto transition hover:bg-superficie active:scale-95"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      {/* ─── Botones de Acción (Carrito y Compra Directa WhatsApp) ──────────── */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Botón 1: Agregar al carrito */}
        <button
          type="button"
          onClick={() => {
            if (agregado) {
              router.push("/carrito");
            } else {
              alAgregar();
            }
          }}
          disabled={faltaElegir}
          className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${
            agregado
              ? "bg-emerald-700 !text-white shadow-md hover:bg-emerald-800"
              : "boton-oscuro"
          }`}
        >
          {agregado ? (
            <>
              <IconCheck size={18} stroke={2.5} />
              <span>¡Agregado! Ver mi carrito ({cantidadTotal + (agregado ? 0 : cantidad)}) →</span>
            </>
          ) : (
            <>
              <IconShoppingBag size={18} stroke={2} />
              <span>
                {faltaElegir
                  ? `Elige ${faltantes.join(" y ")} para agregar`
                  : "Agregar al carrito"}
              </span>
            </>
          )}
        </button>

        {/* Enlace sutil al carrito cuando ya se agregó */}
        {agregado && (
          <p className="text-center text-xs text-tenue animate-in fade-in duration-150">
            Prenda guardada en tu pedido.{" "}
            <button
              type="button"
              onClick={() => setAgregado(false)}
              className="font-bold text-acento hover:underline"
            >
              Agregar otra unidad
            </button>
          </p>
        )}

        {/* Botón 2: Pedir directamente por WhatsApp (Un solo icono incorporado por BotonWhatsApp) */}
        <BotonWhatsApp
          href={linkDirectoWhatsApp}
          origen="ficha"
          detalle={{ producto: producto.slug }}
          tamano="lg"
          ancho="completo"
          conIcono={true}
          className="w-full justify-center gap-2 font-black !text-white shadow-md hover:shadow-lg transition-all"
        >
          <span>
            {tienePrecio
              ? "Pedir directamente por WhatsApp"
              : "Consultar precio y stock por WhatsApp"}
          </span>
        </BotonWhatsApp>
      </div>

      <GuiaTallasModal
        abierto={modalTallasAbierto}
        alCerrar={() => setModalTallasAbierto(false)}
      />

      {/* ─── Caja de Beneficios y Garantías (Trust Box) ───────────────────── */}
      <CajaBeneficios />

      {/* Toast Flotante Elegante */}
      {agregado && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-texto px-4 py-2.5 text-texto-inverso shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-200 border border-white/10 max-w-[92vw]"
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
            ✓
          </span>
          <span className="text-xs font-semibold text-white truncate max-w-[150px] sm:max-w-[220px]">
            {producto.nombre} agregado
          </span>
          <Link
            href="/carrito"
            className="rounded-full bg-acento px-3.5 py-1 text-xs font-black !text-white hover:bg-acento-hover transition shrink-0"
          >
            Ver carrito →
          </Link>
          <button
            type="button"
            onClick={() => setAgregado(false)}
            className="text-white/60 hover:text-white text-xs p-1 ml-0.5"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </aside>
      )}
    </div>
  );
}

/** Caja de Beneficios y Garantías para Ficha de Producto */
function CajaBeneficios() {
  return (
    <div className="mt-6 rounded-2xl border border-linea bg-tarjeta p-5 shadow-2xs space-y-3.5">
      <p className="text-[11px] font-black uppercase tracking-wider text-acento">
        Garantías y beneficios de compra
      </p>

      <ul className="space-y-3 text-xs text-tenue">
        <li className="flex items-start gap-2.5">
          <IconTruckDelivery size={18} className="text-acento shrink-0 mt-0.5" />
          <span>
            <strong className="text-texto font-bold">Envíos a todo el Perú:</strong>{" "}
            Delivery en Lima y agencias seguras a provincias (Shalom, Olva Courier).
          </span>
        </li>

        <li className="flex items-start gap-2.5">
          <IconBuildingStore size={18} className="text-acento shrink-0 mt-0.5" />
          <span>
            <strong className="text-texto font-bold">Tienda Física en Lima:</strong>{" "}
            Jr. Andahuaylas 198, Lima. Pruébate el modelo o paga contraentrega al retirar.
          </span>
        </li>

        <li className="flex items-start gap-2.5">
          <IconHeartHandshake size={18} className="text-acento shrink-0 mt-0.5" />
          <span>
            <strong className="text-texto font-bold">Asesoría humana por WhatsApp:</strong>{" "}
            Confirmamos medidas en cm y fotos reales antes del despacho.
          </span>
        </li>

        <li className="flex items-start gap-2.5">
          <IconShieldCheck size={18} className="text-acento shrink-0 mt-0.5" />
          <span>
            <strong className="text-texto font-bold">Garantía HorsePower:</strong>{" "}
            Cambios de talla rápidos en tienda física o por encomienda.
          </span>
        </li>
      </ul>
    </div>
  );
}
