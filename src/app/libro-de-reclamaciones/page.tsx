import type { Metadata } from "next";
import { PaginaLegalBorrador } from "@/components/PaginaLegalBorrador";

export const metadata: Metadata = {
  title: "Libro de reclamaciones",
  robots: { index: false, follow: false },
};

export default function LibroReclamacionesPage() {
  return (
    <PaginaLegalBorrador
      titulo="Libro de reclamaciones"
      descripcion="Espacio preparado para habilitar el canal oficial de reclamos y quejas de HorsePower."
    >
      <section className="rounded-2xl bg-superficie p-5">
        <h2 className="text-xl font-bold">Formulario pendiente de habilitar</h2>
        <p className="mt-3 text-tenue">
          El formulario se activará cuando la dueña confirme la razón social,
          RUC, domicilio, correo de recepción y mecanismo de atención. No se
          enviará información desde esta pantalla mientras esos datos no estén
          definidos.
        </p>
      </section>
      <form className="space-y-5" aria-describedby="reclamos-ayuda">
        <p id="reclamos-ayuda" className="text-sm text-tenue">
          Los campos se muestran como referencia de la estructura que deberá
          revisar la dueña.
        </p>
        <fieldset disabled className="space-y-5 opacity-60">
          <div>
            <label className="block text-sm font-semibold" htmlFor="nombre">
              Nombre completo
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="mt-2 min-h-12 w-full rounded-xl border bg-tarjeta px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold" htmlFor="contacto">
              Correo o teléfono
            </label>
            <input
              id="contacto"
              name="contacto"
              type="text"
              className="mt-2 min-h-12 w-full rounded-xl border bg-tarjeta px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold" htmlFor="detalle">
              Detalle del reclamo o queja
            </label>
            <textarea
              id="detalle"
              name="detalle"
              rows={5}
              className="mt-2 w-full rounded-xl border bg-tarjeta px-4 py-3"
            />
          </div>
          <button type="submit" className="boton-oscuro min-h-12 px-5 py-3">
            Enviar reclamo
          </button>
        </fieldset>
      </form>
    </PaginaLegalBorrador>
  );
}
