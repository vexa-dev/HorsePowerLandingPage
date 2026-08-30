import type { MetadataRoute } from "next";
import { CATEGORIAS } from "@/lib/tipos";
import { slugsConFoto } from "@/lib/catalogo";

const BASE = process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await slugsConFoto();
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/catalogo-completo`, priority: 0.6 },
    { url: `${BASE}/cambios-y-devoluciones`, priority: 0.4 },
    ...CATEGORIAS.map((c) => ({
      url: `${BASE}/categoria/${c.slug}`,
      priority: 0.8,
    })),
    ...slugs.map((s) => ({ url: `${BASE}/producto/${s}`, priority: 0.7 })),
  ];
}
