"use client";

import Script from "next/script";
import { useCallback, useSyncExternalStore } from "react";
import { GA_ID } from "@/lib/analitica";

const CLAVE = "horsepower.cookies.v1";
type Estado = "desconocido" | "aceptado" | "rechazado";

const oyentes = new Set<() => void>();
let cache: Estado | null = null;

function leer(): Estado {
  if (cache) return cache;
  try {
    const v = localStorage.getItem(CLAVE);
    cache = v === "aceptado" || v === "rechazado" ? v : "desconocido";
  } catch {
    cache = "desconocido";
  }
  return cache;
}

function suscribir(fn: () => void) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

export function BannerCookies() {
  const estado = useSyncExternalStore(
    suscribir,
    leer,
    () => "desconocido" as Estado,
  );

  const decidir = useCallback((v: "aceptado" | "rechazado") => {
    try {
      localStorage.setItem(CLAVE, v);
    } catch {
      /* noop */
    }
    cache = v;
    oyentes.forEach((f) => f());
  }, []);

  return (
    <>
      {estado === "aceptado" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {estado === "desconocido" && (
        <div
          role="dialog"
          aria-label="Preferencias de cookies"
          aria-describedby="cookies-descripcion"
          className="fixed inset-x-0 bottom-0 z-50 border-t bg-fondo p-4 text-sm shadow-[0_-16px_40px_-32px_rgb(21_22_25/0.8)]"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:px-2 lg:flex-row lg:items-center lg:px-6">
            <p id="cookies-descripcion" className="max-w-2xl leading-relaxed text-tenue">
              Usamos cookies para medir el uso del sitio y mejorar el catálogo.
            </p>
            <div className="flex gap-2 lg:ml-auto">
              <button
                type="button"
                onClick={() => decidir("rechazado")}
                className="min-h-11 rounded-lg border px-4 py-2 font-semibold hover:border-texto hover:bg-superficie"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => decidir("aceptado")}
                className="boton-oscuro min-h-11 px-4 py-2"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
