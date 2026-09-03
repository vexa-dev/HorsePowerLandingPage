"use client";

import { IconRulerMeasure, IconX, IconBrandWhatsapp } from "@tabler/icons-react";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

export function GuiaTallasModal({
  abierto,
  alCerrar,
}: {
  abierto: boolean;
  alCerrar: () => void;
}) {
  if (!abierto) return null;

  const whatsappTallasHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
        "Hola HorsePower, tengo dudas sobre qué talla elegir. ¿Me pueden asesorar con mis medidas?",
      )}`
    : "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-guia-tallas"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-linea bg-tarjeta p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-7">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={alCerrar}
          className="absolute right-4 top-4 rounded-full p-2 text-tenue transition hover:bg-superficie hover:text-texto"
          aria-label="Cerrar guía de tallas"
        >
          <IconX size={20} />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-acento/10 text-acento">
            <IconRulerMeasure size={22} />
          </span>
          <div>
            <h3 id="titulo-guia-tallas" className="text-lg font-black tracking-tight text-texto">
              Guía de Tallas y Medidas
            </h3>
            <p className="text-xs text-tenue">Medidas referenciales en centímetros (cm)</p>
          </div>
        </div>

        {/* Tabla de tallas */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-linea bg-superficie/30">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-linea bg-superficie text-tenue">
              <tr>
                <th className="px-3.5 py-2.5 font-bold">Talla</th>
                <th className="px-3.5 py-2.5 font-bold">Pecho (contorno)</th>
                <th className="px-3.5 py-2.5 font-bold">Largo</th>
                <th className="px-3.5 py-2.5 font-bold">Manga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linea/60 text-texto">
              <tr className="hover:bg-superficie/40">
                <td className="px-3.5 py-2.5 font-black text-acento">S</td>
                <td className="px-3.5 py-2.5">102 – 106 cm</td>
                <td className="px-3.5 py-2.5">67 cm</td>
                <td className="px-3.5 py-2.5">62 cm</td>
              </tr>
              <tr className="hover:bg-superficie/40">
                <td className="px-3.5 py-2.5 font-black text-acento">M</td>
                <td className="px-3.5 py-2.5">106 – 110 cm</td>
                <td className="px-3.5 py-2.5">69 cm</td>
                <td className="px-3.5 py-2.5">64 cm</td>
              </tr>
              <tr className="hover:bg-superficie/40">
                <td className="px-3.5 py-2.5 font-black text-acento">L</td>
                <td className="px-3.5 py-2.5">110 – 115 cm</td>
                <td className="px-3.5 py-2.5">71 cm</td>
                <td className="px-3.5 py-2.5">65 cm</td>
              </tr>
              <tr className="hover:bg-superficie/40">
                <td className="px-3.5 py-2.5 font-black text-acento">XL</td>
                <td className="px-3.5 py-2.5">115 – 120 cm</td>
                <td className="px-3.5 py-2.5">73 cm</td>
                <td className="px-3.5 py-2.5">66 cm</td>
              </tr>
              <tr className="hover:bg-superficie/40">
                <td className="px-3.5 py-2.5 font-black text-acento">XXL</td>
                <td className="px-3.5 py-2.5">120 – 126 cm</td>
                <td className="px-3.5 py-2.5">75 cm</td>
                <td className="px-3.5 py-2.5">67 cm</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Consejos de medición */}
        <div className="mt-5 rounded-2xl border border-linea/80 bg-superficie/50 p-4 space-y-2">
          <p className="text-xs font-bold text-texto">
            💡 ¿Cómo medir tu prenda favorita?
          </p>
          <p className="text-[11px] leading-relaxed text-tenue">
            Coloca una casaca que te quede cómoda sobre una mesa o cama. Mide de axila a axila para el ancho del pecho y desde el hombro hasta la parte baja para el largo.
          </p>
        </div>

        {/* Botón WhatsApp para asesoría */}
        {whatsappTallasHref && (
          <div className="mt-5 pt-4 border-t border-linea/60 text-center">
            <a
              href={whatsappTallasHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-acento px-4 py-2.5 text-xs font-black text-texto-inverso shadow-sm transition hover:bg-acento-hover"
            >
              <IconBrandWhatsapp size={16} stroke={2} />
              Asesoría personalizada de tallas por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
