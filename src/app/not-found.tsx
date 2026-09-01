import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-acento">
        HorsePower
      </p>
      <h1 className="texto-display mt-5 text-4xl sm:text-6xl">
        No encontramos esa página.
      </h1>
      <p className="mt-4 max-w-lg leading-relaxed text-tenue">
        Puede que el enlace haya cambiado. Regresa al catálogo para seguir
        explorando.
      </p>
      <Link
        href="/"
        className="boton-oscuro mt-8 inline-flex min-h-12 items-center px-5 py-3"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
