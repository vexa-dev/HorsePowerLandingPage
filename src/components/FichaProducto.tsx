"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/lib/carrito";
import { linkConsultaProducto } from "@/lib/whatsapp";
import { precioMostrado, type Producto } from "@/lib/tipos";
import { BotonWhatsApp } from "./BotonWhatsApp";

export function FichaProducto({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregar } = useCarrito();
  const [color, setColor] = useState(producto.colores[0] ?? "");
  const [talla, setTalla] = useState(producto.tallas[0] ?? "");
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const faltaElegir =
    (producto.colores.length > 0 && !color) ||
    (producto.tallas.length > 0 && !talla);

  function alAgregar() {
    agregar({
      slug: producto.slug,
      nombre: producto.nombre,
      precio: precioMostrado(producto),
      color: color || undefined,
      talla: talla || undefined,
      cantidad,
    });
    setAgregado(true);
  }

  return (
    <div className="space-y-5">
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

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Cantidad</span>
        <div className="flex items-center rounded-md border">
          <button
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="px-3 py-1.5 text-lg"
            aria-label="Menos"
          >
            −
          </button>
          <span className="w-8 text-center">{cantidad}</span>
          <button
            onClick={() => setCantidad((c) => c + 1)}
            className="px-3 py-1.5 text-lg"
            aria-label="Más"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={alAgregar}
          disabled={faltaElegir}
          className="rounded-md border border-texto px-4 py-2.5 font-semibold transition enabled:hover:bg-texto enabled:hover:text-fondo disabled:opacity-40"
        >
          {faltaElegir ? "Elige color y talla" : "Agregar al carrito"}
        </button>

        {agregado && (
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/carrito")}
              className="flex-1 rounded-md bg-texto px-4 py-2.5 font-semibold text-fondo"
            >
              Ir al carrito
            </button>
            <button
              onClick={() => setAgregado(false)}
              className="rounded-md border px-4 py-2.5"
            >
              Seguir viendo
            </button>
          </div>
        )}

        <BotonWhatsApp
          href={linkConsultaProducto(producto)}
          origen="ficha"
          detalle={{ producto: producto.slug }}
          className="w-full"
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
    <div>
      <p className="mb-2 text-sm font-medium">{etiqueta}</p>
      <div className="flex flex-wrap gap-2">
        {valores.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={
              "rounded-md border px-3 py-1.5 text-sm " +
              (activo === v
                ? "border-texto bg-texto text-fondo"
                : "hover:border-texto")
            }
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
