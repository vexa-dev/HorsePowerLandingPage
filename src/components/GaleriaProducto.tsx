"use client";

import Image from "next/image";
import { IconPhotoOff } from "@tabler/icons-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useRef, useState } from "react";

const UMBRAL_SWIPE_PX = 40;

// Mismo easing que hero-copy/hero-stage/premium-card en globals.css, para
// que la transición del carrusel se sienta parte del mismo sistema visual.
const TRANSICION = { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

const VARIANTES_DESLIZAR = {
  entra: (direccion: 1 | -1) => ({ x: direccion > 0 ? "100%" : "-100%", opacity: 0 }),
  centro: { x: 0, opacity: 1 },
  sale: (direccion: 1 | -1) => ({ x: direccion > 0 ? "-100%" : "100%", opacity: 0 }),
};

export function GaleriaProducto({
  fotos,
  alt,
}: {
  fotos: string[];
  alt: string;
}) {
  const [i, setI] = useState(0);
  const [direccion, setDireccion] = useState<1 | -1>(1);
  const total = fotos.length;
  const miniaturasRef = useRef<HTMLDivElement>(null);
  const tocandoDesde = useRef<number | null>(null);

  if (total === 0) {
    return (
      <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-md border bg-superficie text-tenue">
        <IconPhotoOff aria-hidden="true" size={32} stroke={1.5} />
        <p className="text-xs">Sin foto</p>
      </div>
    );
  }

  function ir(n: number, dir: 1 | -1) {
    setDireccion(dir);
    const nuevo = (n + total) % total;
    setI(nuevo);
    miniaturasRef.current
      ?.querySelector<HTMLElement>(`[data-indice="${nuevo}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  function alTocarInicio(e: React.TouchEvent) {
    tocandoDesde.current = e.touches[0].clientX;
  }

  function alTocarFin(e: React.TouchEvent) {
    if (tocandoDesde.current == null) return;
    const delta = e.changedTouches[0].clientX - tocandoDesde.current;
    tocandoDesde.current = null;
    if (delta > UMBRAL_SWIPE_PX) ir(i - 1, -1);
    else if (delta < -UMBRAL_SWIPE_PX) ir(i + 1, 1);
  }

  function alPresionarTecla(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      ir(i - 1, -1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      ir(i + 1, 1);
    }
  }

  return (
    // min-w-0: sin esto, la fila de miniaturas con overflow-x-auto no
    // scrollea — su ancho intrínseco (todas las miniaturas en una fila)
    // fuerza el ancho de esta celda del grid, y con eso el de toda la
    // página en mobile cuando hay varias fotos (min-width: auto es el
    // default de los hijos de grid/flex).
    <div className="min-w-0">
      <div
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Fotos de ${alt}`}
        tabIndex={total > 1 ? 0 : -1}
        onKeyDown={total > 1 ? alPresionarTecla : undefined}
        onTouchStart={total > 1 ? alTocarInicio : undefined}
        onTouchEnd={total > 1 ? alTocarFin : undefined}
        className="relative aspect-square touch-pan-y overflow-hidden rounded-3xl border border-linea bg-tarjeta shadow-2xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-acento focus-visible:outline-offset-2"
      >
        <MotionConfig reducedMotion="user">
          <AnimatePresence initial={false} custom={direccion}>
            <motion.div
              key={fotos[i]}
              custom={direccion}
              variants={VARIANTES_DESLIZAR}
              initial="entra"
              animate="centro"
              exit="sale"
              transition={TRANSICION}
              className="absolute inset-0"
            >
              <Image
                src={`/${fotos[i]}`}
                alt={total > 1 ? `${alt} (${i + 1} de ${total})` : alt}
                fill
                preload
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 45vw, 520px"
                className="object-contain p-4 sm:p-6"
              />
            </motion.div>
          </AnimatePresence>
        </MotionConfig>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => ir(i - 1, -1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border border-linea bg-tarjeta/90 text-sm font-bold text-texto shadow-xs backdrop-blur-xs transition hover:bg-superficie active:scale-95"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => ir(i + 1, 1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border border-linea bg-tarjeta/90 text-sm font-bold text-texto shadow-xs backdrop-blur-xs transition hover:bg-superficie active:scale-95"
            >
              ›
            </button>
            <span
              aria-live="polite"
              aria-atomic="true"
              className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-texto/75 px-3 py-1 text-[11px] font-bold text-texto-inverso backdrop-blur-md shadow-2xs tabular-nums"
            >
              {i + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          ref={miniaturasRef}
          className="mt-3.5 flex gap-2.5 overflow-x-auto pb-1"
        >
          {fotos.map((f, n) => (
            <button
              key={f}
              type="button"
              data-indice={n}
              onClick={() => ir(n, n >= i ? 1 : -1)}
              aria-label={`Ver foto ${n + 1} de ${total}`}
              aria-current={n === i ? "true" : undefined}
              className={
                "relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-2xl border transition-all " +
                (n === i
                  ? "border-acento ring-2 ring-acento/20 shadow-xs"
                  : "border-linea/70 bg-superficie/40 opacity-70 hover:opacity-100")
              }
            >
              <Image
                src={`/${f}`}
                alt=""
                fill
                loading="lazy"
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
