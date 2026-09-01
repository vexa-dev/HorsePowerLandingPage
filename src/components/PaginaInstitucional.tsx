import Link from "next/link";

export function PaginaInstitucional({
  eyebrow,
  titulo,
  descripcion,
  children,
}: {
  eyebrow: string;
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
          {eyebrow}
        </p>
        <h1 className="texto-display mt-5 text-balance text-4xl leading-[0.98] sm:text-6xl">
          {titulo}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-tenue">
          {descripcion}
        </p>
      </header>

      <div className="mt-12">{children}</div>

      <Link
        href="/catalogo-completo"
        className="boton-oscuro mt-12 inline-flex min-h-12 items-center px-5 py-3"
      >
        Explorar productos
      </Link>
    </article>
  );
}
