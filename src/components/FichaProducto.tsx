"use client";

import { useState } from "react";
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
  const { agregar } = useCarrito();

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
          onClick={alAgregar}
          disabled={faltaElegir}
          className="boton-oscuro inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconShoppingBag size={18} stroke={2} />
          <span>
            {faltaElegir
              ? `Elige ${faltantes.join(" y ")} para agregar`
              : "Agregar al carrito"}
          </span>
        </button>

        {/* Notificación tras agregar al carrito */}
        {agregado && (
          <div
            role="status"
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
              <IconCheck size={16} stroke={2.5} />
              <span>¡Producto agregado a tu carrito!</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => router.push("/carrito")}
                className="boton-oscuro flex-1 rounded-xl py-2.5 text-xs font-black !text-white"
              >
                Ir a pagar al carrito
              </button>
              <button
                type="button"
                onClick={() => setAgregado(false)}
                className="rounded-xl border border-linea bg-tarjeta px-4 py-2.5 text-xs font-bold text-tenue hover:bg-superficie"
              >
                Seguir viendo
              </button>
            </div>
          </div>
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
