import Link from "next/link";

const TIENDA = {
  direccion: process.env.NEXT_PUBLIC_DIRECCION || "Dirección de la tienda (por definir)",
  horario: process.env.NEXT_PUBLIC_HORARIO || "Lun a Sáb, 10:00 – 20:00",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
  libroReclamaciones: process.env.NEXT_PUBLIC_LIBRO_RECLAMACIONES || "",
};

export function PieDePagina() {
  return (
    <footer className="border-t text-sm">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-black">
            HORSE<span className="text-acento">POWER</span>
          </p>
          <p className="mt-2 text-tenue">
            Casacas, chompas, mochilas y más. Compra coordinada por WhatsApp.
          </p>
        </div>
        <div>
          <p className="font-semibold">Tienda física</p>
          <p className="mt-2 text-tenue">{TIENDA.direccion}</p>
          <p className="text-tenue">{TIENDA.horario}</p>
        </div>
        <div>
          <p className="font-semibold">Enlaces</p>
          <ul className="mt-2 space-y-1 text-tenue">
            <li>
              <Link href="/catalogo-completo">Catálogo completo</Link>
            </li>
            <li>
              <Link href="/cambios-y-devoluciones">Cambios y devoluciones</Link>
            </li>
            {TIENDA.instagram && (
              <li>
                <a href={TIENDA.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {TIENDA.libroReclamaciones && (
              <li>
                <a
                  href={TIENDA.libroReclamaciones}
                  target="_blank"
                  rel="noreferrer"
                >
                  Libro de Reclamaciones
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-tenue">
        © {new Date().getFullYear()} HorsePower. Los precios y la disponibilidad
        se confirman por WhatsApp.
      </div>
    </footer>
  );
}
