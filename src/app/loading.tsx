export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Cargando HorsePower"
      className="mx-auto min-h-[60dvh] max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="motion-safe:animate-pulse space-y-4">
        <div className="h-10 max-w-md rounded-xl bg-superficie" />
        <div className="h-5 max-w-xl rounded-lg bg-superficie" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="motion-safe:animate-pulse overflow-hidden rounded-2xl bg-superficie"
          >
            <div className="aspect-[4/5]" />
            <div className="space-y-2 p-4">
              <div className="h-4 rounded bg-superficie-fuerte" />
              <div className="h-4 w-1/2 rounded bg-superficie-fuerte" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Cargando contenido</span>
    </div>
  );
}
