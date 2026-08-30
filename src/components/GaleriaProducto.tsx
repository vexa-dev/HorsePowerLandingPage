"use client";

import Image from "next/image";
import { useState } from "react";

export function GaleriaProducto({
  fotos,
  alt,
}: {
  fotos: string[];
  alt: string;
}) {
  const [i, setI] = useState(0);
  const total = fotos.length;

  if (total === 0) {
    return <div className="aspect-square rounded-lg border bg-linea/40" />;
  }

  const ir = (n: number) => setI((n + total) % total);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-linea/40">
        <Image
          key={fotos[i]}
          src={`/${fotos[i]}`}
          alt={total > 1 ? `${alt} (${i + 1}/${total})` : alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover"
        />

        {total > 1 && (
          <>
            <button
              onClick={() => ir(i - 1)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-fondo/80 px-3 py-2 text-lg leading-none hover:bg-fondo"
            >
              ‹
            </button>
            <button
              onClick={() => ir(i + 1)}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-fondo/80 px-3 py-2 text-lg leading-none hover:bg-fondo"
            >
              ›
            </button>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-fondo/80 px-2 py-0.5 text-xs">
              {i + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {fotos.map((f, n) => (
            <button
              key={f}
              onClick={() => setI(n)}
              aria-label={`Ver foto ${n + 1}`}
              className={
                "relative h-16 w-16 shrink-0 overflow-hidden rounded border " +
                (n === i ? "border-texto" : "border-linea opacity-70")
              }
            >
              <Image
                src={`/${f}`}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
