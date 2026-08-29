import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/carrito" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
