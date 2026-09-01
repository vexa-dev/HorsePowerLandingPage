import {
  IconMessageCircle,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { PaginaInstitucional } from "@/components/PaginaInstitucional";

export const metadata: Metadata = {
  title: "Nosotros",
  robots: { index: false, follow: false },
};

const PASOS = [
  {
    titulo: "Explora",
    descripcion: "Revisa el catálogo y encuentra prendas y accesorios para tu día a día.",
    icon: IconSearch,
  },
  {
    titulo: "Arma tu pedido",
    descripcion: "Elige tus modelos, variantes y cantidades desde cada ficha de producto.",
    icon: IconShoppingBag,
  },
  {
    titulo: "Coordina",
    descripcion: "Enviamos tu consulta por WhatsApp para confirmar precio y disponibilidad.",
    icon: IconMessageCircle,
  },
];

export default function NosotrosPage() {
  return (
    <PaginaInstitucional
      eyebrow="Sobre HorsePower"
      titulo="Ropa y accesorios para moverte a tu manera."
      descripcion="Esta página presenta una referencia inicial de la marca. La dueña podrá ajustar el relato, la historia y los valores antes de publicarla como versión definitiva."
    >
      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] bg-texto p-7 text-fondo sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
            La experiencia HorsePower
          </p>
          <h2 className="texto-display mt-5 max-w-xl text-3xl leading-tight sm:text-4xl">
            Un catálogo claro, una conversación directa.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-fondo/75">
            Reunimos casacas, chompas, mochilas, maletas y otros accesorios en
            un catálogo pensado para revisar con calma y consultar sin
            complicaciones.
          </p>
        </div>
        <aside className="rounded-[2rem] border bg-superficie p-7 sm:p-10">
          <p className="texto-display text-5xl text-acento">01</p>
          <h2 className="mt-8 text-2xl font-bold tracking-tight">
            Compra acompañada
          </h2>
          <p className="mt-3 leading-relaxed text-tenue">
            El carrito organiza tus opciones y WhatsApp permite confirmar los
            detalles antes de cerrar la compra.
          </p>
        </aside>
      </section>

      <section className="mt-16" aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Cómo funciona
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {PASOS.map(({ titulo, descripcion, icon: Icono }, index) => (
            <article key={titulo} className="rounded-2xl border bg-tarjeta p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-superficie text-acento">
                  <Icono aria-hidden="true" size={23} stroke={1.8} />
                </span>
                <span className="text-xs font-bold tabular-nums text-tenue">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold">{titulo}</h3>
              <p className="mt-2 leading-relaxed text-tenue">{descripcion}</p>
            </article>
          ))}
        </div>
      </section>
    </PaginaInstitucional>
  );
}
