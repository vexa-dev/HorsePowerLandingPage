"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

/** Botón discreto que copia un valor (teléfono, correo, dirección) al portapapeles. */
export function BotonCopiar({
  valor,
  etiqueta,
}: {
  valor: string;
  etiqueta: string;
}) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* el navegador puede bloquear el portapapeles: no hacemos nada */
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={copiado ? `${etiqueta} copiado` : `Copiar ${etiqueta}`}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border text-tenue transition hover:border-texto hover:bg-superficie hover:text-texto"
    >
      {copiado ? (
        <IconCheck size={15} className="text-acento" />
      ) : (
        <IconCopy size={15} />
      )}
    </button>
  );
}
