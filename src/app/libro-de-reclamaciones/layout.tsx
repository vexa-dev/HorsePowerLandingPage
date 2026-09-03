import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual",
  description:
    "Libro de Reclamaciones Virtual de HorsePower conforme a las normas de INDECOPI en Perú. Registra tu reclamo o queja formalmente.",
  alternates: {
    canonical: "/libro-de-reclamaciones",
  },
};

export default function LibroReclamacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
