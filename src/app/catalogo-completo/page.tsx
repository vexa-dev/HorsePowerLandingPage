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
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-black">Catálogo completo</h1>
      <p className="mt-2 text-sm text-tenue">
        {filas.length} modelos. Los que tienen foto abren su ficha; el resto se
        consulta directo por WhatsApp.
      </p>
      <div className="mt-6">
        <ListaCatalogoCompleto filas={filas} />
      </div>
    </div>
  );
}
