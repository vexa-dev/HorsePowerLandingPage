import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Endpoint de revalidación inmediata del catálogo de Google Sheets.
 * Permite purgar la caché y cargar los precios y productos nuevos al instante:
 * GET /api/revalidar
 */
export async function GET() {
  try {
    revalidatePath("/", "layout");
    return NextResponse.json({
      success: true,
      mensaje: "Catálogo y caché revalidados con éxito desde Google Sheets",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    );
  }
}
