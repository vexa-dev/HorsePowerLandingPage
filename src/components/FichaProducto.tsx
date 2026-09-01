"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/lib/carrito";
import { linkConsultaProducto } from "@/lib/whatsapp";
import { precioMostrado, type Producto } from "@/lib/tipos";
import { BotonWhatsApp } from "./BotonWhatsApp";

export function FichaProducto({ producto }: { producto: Producto }) {
  // Sin precio (75% del catálogo con foto) no hay nada que "agregar al
  // carrito": el pedido no puede armarse con un total. Se simplifica a un
  // solo CTA en vez de mostrar color/talla/cantidad para un flujo que no
  // puede completarse.
  if (precioMostrado(producto) == null) {
    return (
      <BotonWhatsApp
        href={linkConsultaProducto(producto)}
        origen="ficha"
        detalle={{ producto: producto.slug }}
        tamano="lg"
        ancho="completo"
      >
        Consultar por WhatsApp
      </BotonWhatsApp>
    );
  }

  return <SelectorYCompra producto={producto} />;
}

function SelectorYCompra({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregar } = useCarrito();
  // Sin preseleccionar cuando hay más de una opción: si "Agregar al carrito"
  // ya viniera habilitado con un color/talla elegido por defecto, un
  // cliente podría pedir sin darse cuenta la variante equivocada. Con una
  // sola opción no hay ambigüedad que forzar a elegir.
  const [color, setColor] = useState(
    producto.colores.length === 1 ? producto.colores[0] : "",
  );
  const [talla, setTalla] = useState(
    producto.tallas.length === 1 ? producto.tallas[0] : "",
  );
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

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

  return (
    <div className="space-y-6">
      {producto.colores.length > 0 && (
        <Opciones
          etiqueta="Color"
          valores={producto.colores}
          activo={color}
          onChange={setColor}
        />
      )}
      {producto.tallas.length > 0 && (
        <Opciones
          etiqueta="Talla"
          valores={producto.tallas}
          activo={talla}
          onChange={setTalla}
        />
      )}

      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Cantidad</span>
        <div
          role="group"
          aria-label="Cantidad"
          className="flex items-center rounded-xl border bg-tarjeta"
        >
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="min-h-11 min-w-11 text-lg hover:bg-superficie"
            aria-label="Menos"
          >
            −
          </button>
          <span className="w-10 text-center font-semibold tabular-nums">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            className="min-h-11 min-w-11 text-lg hover:bg-superficie"
            aria-label="Más"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={alAgregar}
          disabled={faltaElegir}
          className="boton-oscuro min-h-12 px-4 py-3 transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {faltaElegir
            ? `Elige ${faltantes.join(" y ")}`
            : "Agregar al carrito"}
        </button>

        {agregado && (
          <div
            role="status"
            className="flex flex-col gap-2 rounded-xl bg-superficie p-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => router.push("/carrito")}
              className="boton-oscuro min-h-11 flex-1 px-4 py-2.5"
            >
              Ir al carrito
            </button>
            <button
              type="button"
              onClick={() => setAgregado(false)}
              className="min-h-11 rounded-lg border px-4 py-2.5 font-semibold hover:border-texto"
            >
              Seguir viendo
            </button>
          </div>
        )}

        <BotonWhatsApp
          href={linkConsultaProducto(producto)}
          origen="ficha"
          detalle={{ producto: producto.slug }}
          ancho="completo"
        >
          Consultar por WhatsApp
        </BotonWhatsApp>
      </div>
    </div>
  );
}

function Opciones({
  etiqueta,
  valores,
  activo,
  onChange,
}: {
  etiqueta: string;
  valores: string[];
  activo: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">{etiqueta}</legend>
      <div className="flex flex-wrap gap-2">
        {valores.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={activo === v}
            className={
              "min-h-11 rounded-lg border px-4 py-2 text-sm font-medium " +
              (activo === v
                ? "boton-oscuro border-transparent"
                : "bg-tarjeta hover:border-texto hover:bg-superficie")
            }
          >
            {v}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
