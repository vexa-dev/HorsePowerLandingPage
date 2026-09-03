import type { MetadataRoute } from "next";
import { CATEGORIAS } from "@/lib/tipos";
import { slugsConFoto } from "@/lib/catalogo";

const BASE = process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await slugsConFoto();
  const ahora = new Date();

  return [
    {
      url: BASE,
      lastModified: ahora,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE}/catalogo-completo`,
      lastModified: ahora,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/nosotros`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/ubicanos`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...CATEGORIAS.map((c) => ({
      url: `${BASE}/categoria/${c.slug}`,
      lastModified: ahora,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...slugs.map((s) => ({
      url: `${BASE}/producto/${s}`,
      lastModified: ahora,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE}/cambios-y-devoluciones`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/terminos-y-condiciones`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE}/politica-de-privacidad`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE}/libro-de-reclamaciones`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
