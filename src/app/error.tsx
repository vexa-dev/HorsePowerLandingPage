"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
        HorsePower
      </p>
      <h1 className="texto-display mt-5 text-4xl sm:text-6xl">
        No pudimos cargar el catálogo.
      </h1>
      <p className="mt-4 max-w-lg leading-relaxed text-tenue">
        Intenta nuevamente. Si el problema continúa, vuelve al inicio y prueba
        más tarde.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="boton-oscuro inline-flex min-h-12 items-center px-5 py-3"
        >
          Intentar nuevamente
        </button>
        <Link
          href="/"
          className="boton-secundario inline-flex min-h-12 items-center px-5 py-3"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
