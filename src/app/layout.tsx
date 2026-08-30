import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CarritoProvider } from "@/lib/carrito";
import { Encabezado } from "@/components/Encabezado";
import { PieDePagina } from "@/components/PieDePagina";
import { BannerCookies } from "@/components/BannerCookies";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const SITIO =
  process.env.NEXT_PUBLIC_SITIO_URL || "https://horsepower.pe";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "HorsePower - Casacas, chompas y mochilas",
    template: "%s | HorsePower",
  },
  description:
    "Catálogo HorsePower: casacas, chompas, mochilas, maletas y más. Elige tus productos y coordina tu compra por WhatsApp.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "HorsePower",
    url: SITIO,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
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
