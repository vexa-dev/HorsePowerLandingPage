import type { Metadata } from "next";
import { catalogoCompleto } from "@/lib/catalogo";
import { nombreCategoria, formatearSoles, precioMostrado } from "@/lib/tipos";
import { ListaCatalogoCompleto } from "@/components/ListaCatalogoCompleto";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Catálogo completo",
  description:
    "Todos los modelos HorsePower, con y sin foto. Consulta cualquiera por WhatsApp.",
};

export default async function CatalogoCompletoPage() {
  const productos = await catalogoCompleto();

  const filas = productos.map((p) => {
    const precio = precioMostrado(p);
    return {
      slug: p.slug,
      nombre: p.nombre,
      categoria: nombreCategoria(p.categoria),
      subcategoria: p.subcategoria,
      precio: precio != null ? formatearSoles(precio) : "",
      tieneFoto: Boolean(p.foto),
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
          Catálogo completo
        </h1>
        <p className="mt-4 leading-relaxed text-tenue">
        {filas.length} modelos. Los que tienen foto abren su ficha; el resto se
        consulta directo por WhatsApp.
        </p>
      </header>
      <div className="mt-6">
        <ListaCatalogoCompleto filas={filas} />
      </div>
    </div>
  );
}
