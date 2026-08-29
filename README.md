# HorsePower — catálogo web

Catálogo de productos (casacas, chompas, mochilas, etc.) con carrito que finaliza
la compra por **WhatsApp**. Sin pasarela de pago y sin stock en línea: el precio y
la disponibilidad se confirman por el chat.

- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, generación estática.
- **Deploy:** Vercel.
- **Datos:** una Google Sheet publicada como CSV. Sin backend ni base de datos.
- **Fotos:** WebP versionadas en `public/productos/`.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completa NEXT_PUBLIC_WHATSAPP al menos
npm run dev
```

## Fuente de datos: la Google Sheet

El catálogo sale de un CSV con estas columnas (una fila = un modelo):

| columna | uso |
|---|---|
| `slug` | id único en la URL (`/producto/<slug>`) |
| `activo` | `si` / `no` — solo se publican los `si` |
| `categoria` | `casacas-y-chompas`, `mochilas-y-morrales`, `maletas-y-viaje`, `loncheras-y-accesorios`, `ropa` |
| `subcategoria` | libre (Casaca, Morral, Camisa…) |
| `genero` | Hombre / Mujer / Unisex |
| `nombre` | nombre visible |
| `nombre_original` | referencia interna (no se muestra) |
| `precio` | soles, entero. Vacío ⇒ "consultar por WhatsApp" |
| `precio_oferta` | opcional, menor que `precio`, muestra el tachado |
| `colores` | lista separada por comas |
| `tallas` | lista separada por comas |
| `foto` | nombre del archivo en `public/productos/` (`xxx.webp`). Vacío ⇒ va solo al "Catálogo completo" |
| `destacado_hp` | `si` para mostrarlo en la home |

**Producción:** publica la Sheet (Archivo → Compartir → Publicar en la web → CSV) y
pon la URL en `GOOGLE_SHEET_CSV_URL`. La web se revalida sola cada 30 min; para
forzar la actualización inmediata, dispara el **Deploy Hook** de Vercel.

**Sin `GOOGLE_SHEET_CSV_URL`:** se usa `src/data/catalogo.csv` del repo (borrador
generado por los scripts).

## Scripts de preparación de datos (una sola vez / al agregar fotos)

Requieren la carpeta `Fotos HorsePower/` (originales) en la raíz y, opcionalmente,
la ruta al Excel de inventario en `EXCEL_STOCK`.

```bash
node scripts/optimizar-fotos.mjs      # PNG -> public/productos/*.webp
node scripts/emparejar-catalogo.mjs   # -> scripts/catalogo-borrador.csv (subir a la Sheet)
node scripts/tabla-colores.mjs        # -> tablas de código -> color para validar
```

`catalogo-borrador.csv` trae foto, nombre limpio y precio (cuando el Excel lo tiene).
La dueña completa **precio, colores y tallas** en la Sheet.

## Deploy en Vercel

1. Importar el repo en Vercel (framework detectado: Next.js).
2. Variables de entorno: `NEXT_PUBLIC_WHATSAPP`, `GOOGLE_SHEET_CSV_URL`,
   `NEXT_PUBLIC_SITIO_URL`, `NEXT_PUBLIC_GA_ID` y las de contacto (ver `.env.example`).
3. Conectar el dominio `horsepower.pe` (DNS a Vercel).
4. Crear un **Deploy Hook** y compartir la URL con quien edite la Sheet.
