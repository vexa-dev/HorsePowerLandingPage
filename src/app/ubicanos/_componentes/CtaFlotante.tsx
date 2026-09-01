"use client";

import { IconBrandWhatsapp, IconRoute } from "@tabler/icons-react";
import { useEffect, useState } from "react";

/**
 * Barra de acción fija en móvil. Aparece cuando el usuario ha pasado el
 * elemento #cta-ancla y se oculta al llegar a #cta-fin (para no tapar el
 * cierre de la página ni el pie).
 */
export function CtaFlotante({
  whatsappHref,
  comoLlegarHref,
}: {
  whatsappHref: string;
  comoLlegarHref: string;
}) {
  const [pasoAncla, setPasoAncla] = useState(false);
  const [enFin, setEnFin] = useState(false);

  useEffect(() => {
    const ancla = document.getElementById("cta-ancla");
    const fin = document.getElementById("cta-fin");
    if (!ancla || !fin) return;

    const obsAncla = new IntersectionObserver(
      ([e]) => setPasoAncla(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    const obsFin = new IntersectionObserver(([e]) => setEnFin(e.isIntersecting), {
      threshold: 0,
    });
    obsAncla.observe(ancla);
    obsFin.observe(fin);
    return () => {
      obsAncla.disconnect();
      obsFin.disconnect();
    };
  }, []);

  const visible = pasoAncla && !enFin;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-tarjeta/95 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl gap-2 p-3">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="boton-acento inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-4 text-xs font-bold"
          >
            <IconBrandWhatsapp size={17} stroke={2} />
            WhatsApp
          </a>
        )}
        <a
          href={comoLlegarHref}
          target="_blank"
          rel="noreferrer"
          className="boton-oscuro inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-4 text-xs font-bold"
        >
          <IconRoute size={17} stroke={2} />
          Cómo llegar
        </a>
      </div>
    </div>
  );
}
