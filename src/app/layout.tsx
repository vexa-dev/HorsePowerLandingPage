import type { Metadata } from "next";
import { Archivo_Black, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CarritoProvider } from "@/lib/carrito";
import { Encabezado } from "@/components/Encabezado";
import { PieDePagina } from "@/components/PieDePagina";
import { BannerCookies } from "@/components/BannerCookies";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const archivoBlack = Archivo_Black({
  variable: "--font-display-archivo",
  subsets: ["latin"],
  weight: "400",
});

const SITIO =
  process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "HorsePower | Casacas, chompas y mochilas de alta resistencia",
    template: "%s | HorsePower",
  },
  description:
    "Catálogo oficial HorsePower Perú: casacas térmicas, chompas, mochilas y complementos de confección duradera. Tienda física en Lima Centro y envíos a todo el Perú por WhatsApp.",
  keywords: [
    "casacas hombre lima",
    "casacas termicas peru",
    "chompas de invierno",
    "mochilas urbanas lima",
    "tienda de casacas lima",
    "confeccion peruana",
    "ropa exterior peru",
    "tienda horsepower jr andahuaylas 198",
    "compras por whatsapp lima",
  ],
  authors: [{ name: "HorsePower Perú" }],
  creator: "HorsePower",
  publisher: "HorsePower",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITIO,
    siteName: "HorsePower",
    title: "HorsePower | Casacas, chompas y mochilas de alta resistencia",
    description:
      "Catálogo oficial HorsePower Perú: casacas térmicas, chompas, mochilas y accesorios duraderos. Tienda física en Lima y envíos a todo el Perú.",
    images: [
      {
        url: "/hero/horsepower-portada.jpeg",
        width: 1200,
        height: 630,
        alt: "HorsePower Perú - Tienda física y catálogo de ropa exterior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HorsePower | Casacas, chompas y mochilas de alta resistencia",
    description:
      "Catálogo oficial HorsePower Perú. Tienda física en Lima y envíos diarios a todo el país vía WhatsApp.",
    images: ["/hero/horsepower-portada.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geist.variable} ${archivoBlack.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-fondo text-texto">
        <a
          href="#contenido"
          className="boton-oscuro sr-only z-50 px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <CarritoProvider>
          <Encabezado />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <PieDePagina />
          <BannerCookies />
        </CarritoProvider>
        <Analytics />
      </body>
    </html>
  );
}
