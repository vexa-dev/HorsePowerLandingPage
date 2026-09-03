import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TAG = "catalogo";

/**
 * Endpoint de revalidación bajo demanda del catálogo de Google Sheets.
 *
 * Lo llama el Google Apps Script de la hoja al detectar una edición: purga la
 * caché etiquetada como `catalogo` y la web sirve los datos nuevos en segundos.
 *
 * Requiere un token (`?secret=` o header `x-revalidar-token`) que debe coincidir
 * con la variable de entorno `REVALIDAR_TOKEN`.
 *
 *   GET|POST /api/revalidar?secret=TOKEN
 */
function tokenValido(req: NextRequest): boolean {
  const esperado = process.env.REVALIDAR_TOKEN;
  if (!esperado) return false;
  const recibido =
    req.nextUrl.searchParams.get("secret") ??
    req.headers.get("x-revalidar-token");
  return recibido === esperado;
}

function handler(req: NextRequest) {
  if (!tokenValido(req)) {
    return NextResponse.json(
      { revalidated: false, error: "Token inválido o ausente" },
      { status: 401 },
    );
  }

  try {
    // expire: 0 => la próxima visita recarga datos frescos sin servir stale.
    revalidateTag(TAG, { expire: 0 });
    return NextResponse.json({
      revalidated: true,
      tag: TAG,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    );
  }
}

export const GET = handler;
export const POST = handler;
