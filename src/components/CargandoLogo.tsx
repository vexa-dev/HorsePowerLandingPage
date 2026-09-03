import Image from "next/image";

interface CargandoLogoProps {
  mensaje?: string;
  subtitulo?: string;
}

export function CargandoLogo({
  mensaje = "Cargando catálogo...",
  subtitulo,
}: CargandoLogoProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={mensaje}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/65 px-4 py-8 text-center backdrop-blur-md transition-opacity duration-300"
    >
      {/* Resplandor ambiental de marca en el fondo oscuro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-80 rounded-full bg-acento/30 blur-3xl sm:size-[400px]"
      />

      {/* Contenedor del isotipo con efecto de cristal y pulso de luz */}
      <div className="relative mb-6 flex size-24 items-center justify-center sm:size-28">
        {/* Anillo exterior de pulso luminoso */}
        <div
          aria-hidden="true"
          className="hp-loader-ring absolute -inset-2 rounded-full border border-[#5ed2e3]/40 bg-[#0f5b66]/25"
        />

        {/* Disco de cristal oscuro central */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm"
        />

        {/* Logo oficial de HorsePower en blanco con resplandor */}
        <div className="hp-loader-logo-dark relative z-10 flex size-14 items-center justify-center sm:size-16">
          <Image
            src="/logo/LogoHorsePower.svg"
            alt="HorsePower"
            width={64}
            height={64}
            priority
            className="size-full object-contain brightness-0 invert"
          />
        </div>
      </div>

      {/* Nombre de la marca */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="texto-display text-2xl tracking-[0.16em] text-white sm:text-3xl drop-shadow-md">
          HORSE<span className="text-[#5ed2e3]">POWER</span>
        </span>

        {/* Barra de progreso técnica en gradiente luminoso */}
        <div
          aria-hidden="true"
          className="relative mt-6 h-1.5 w-52 overflow-hidden rounded-full border border-white/20 bg-white/15 backdrop-blur-sm sm:w-64"
        >
          <div className="hp-progress-indeterminate-dark" />
        </div>

        {/* Mensaje sutil */}
        {mensaje && (
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/90 sm:text-sm drop-shadow-xs">
            {mensaje}
          </p>
        )}

        {subtitulo && (
          <p className="mt-1 text-[11px] text-white/60 sm:text-xs">
            {subtitulo}
          </p>
        )}
      </div>

      <span className="sr-only">Cargando HorsePower, por favor espere...</span>
    </div>
  );
}
