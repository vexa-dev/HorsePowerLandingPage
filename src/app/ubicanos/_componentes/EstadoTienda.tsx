"use client";

import { useEffect, useMemo, useState } from "react";
import { estadoApertura, parsearHorario } from "./horario";

/** Hora actual en Lima como Date con campos locales equivalentes. */
function ahoraEnLima(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Lima" }),
  );
}

/**
 * Píldora "Abierto ahora / Cerrado" calculada en el cliente (tras montar, para
 * evitar desajustes de hidratación y usar la zona horaria de Lima).
 */
export function EstadoTienda({ horario }: { horario: string }) {
  const parseado = useMemo(() => parsearHorario(horario), [horario]);
  const [estado, setEstado] = useState<{
    abierto: boolean;
    cierraPronto: boolean;
  } | null>(null);

  useEffect(() => {
    if (!parseado) return;
    const actualizar = () => setEstado(estadoApertura(parseado, ahoraEnLima()));
    actualizar();
    const id = window.setInterval(actualizar, 60_000);
    return () => window.clearInterval(id);
  }, [parseado]);

  if (!parseado || !estado) return null;

  const { abierto, cierraPronto } = estado;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
        abierto ? "bg-acento/12 text-acento" : "bg-superficie-fuerte text-tenue"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${abierto ? "bg-acento" : "bg-tenue"}`}
        aria-hidden
      />
      {abierto
        ? cierraPronto
          ? "Abierto · cierra pronto"
          : "Abierto ahora"
        : "Cerrado ahora"}
    </span>
  );
}
