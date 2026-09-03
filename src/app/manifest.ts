import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HorsePower - Ropa Exterior y Accesorios",
    short_name: "HorsePower",
    description:
      "Catálogo oficial de casacas, chompas y mochilas de confección duradera. Tienda física en Lima, Perú.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a262c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
