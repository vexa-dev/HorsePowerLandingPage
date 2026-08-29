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
        <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-fondo p-4 text-sm shadow-lg">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row">
            <p className="text-tenue">
              Usamos cookies para medir el uso del sitio y mejorar el catálogo.
            </p>
            <div className="flex gap-2 sm:ml-auto">
              <button
                onClick={() => decidir("rechazado")}
                className="rounded border px-3 py-1.5 hover:border-texto"
              >
                Rechazar
              </button>
              <button
                onClick={() => decidir("aceptado")}
                className="rounded bg-texto px-3 py-1.5 font-medium text-fondo"
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
