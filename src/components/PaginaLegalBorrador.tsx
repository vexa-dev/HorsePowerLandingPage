import Link from "next/link";

export function PaginaLegalBorrador({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
          Documento en revisión
        </p>
        <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-balance sm:text-5xl">
          {titulo}
        </h1>
        <p className="mt-5 leading-relaxed text-tenue">{descripcion}</p>
      </header>

      <aside className="mt-8 rounded-2xl border-l-4 border-acento bg-superficie px-5 py-4 text-sm leading-relaxed text-tenue">
        Este contenido es un borrador para revisión de la dueña. Completa los
        datos legales y confirma las condiciones antes de publicarlo como
        documento oficial.
      </aside>

      <div className="mt-10 space-y-8 text-base leading-relaxed">{children}</div>

      <Link
        href="/"
        className="boton-secundario mt-10 inline-flex min-h-11 items-center px-4 py-2.5"
      >
        Volver al inicio
      </Link>
    </article>
  );
}
