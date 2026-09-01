export function EstadoVacio({
  titulo,
  descripcion,
  accion,
}: {
  titulo: string;
  descripcion: string;
  accion?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-superficie px-6 py-14 text-center">
      <p className="text-lg font-semibold">{titulo}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-tenue">
        {descripcion}
      </p>
      {accion && <div className="mt-5">{accion}</div>}
    </div>
  );
}
