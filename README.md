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
pon la URL en `GOOGLE_SHEET_CSV_URL`. La web se revalida sola cada 60 s; además,
con el Apps Script de abajo la actualización es casi instantánea al editar la hoja.

**Sin `GOOGLE_SHEET_CSV_URL`:** se usa `src/data/catalogo.csv` del repo (borrador
generado por los scripts).

## Actualización automática del catálogo al editar la Sheet

Al editar la Google Sheet, un Google Apps Script llama al endpoint
`/api/revalidar`, que purga la caché etiquetada `catalogo`. En segundos la web
sirve los datos nuevos, sin rebuild ni tocar Vercel. El ISR de 60 s queda como
red de seguridad.

**1. Token.** Genera una cadena larga aleatoria y ponla como variable de entorno
`REVALIDAR_TOKEN` en Vercel (Project → Settings → Environment Variables, todos
los entornos) y en `.env.local` para desarrollo.

**2. Apps Script.** En la hoja: **Extensiones → Apps Script**, pega esto y guarda
(sustituye la URL y el token):

```js
const REVALIDAR_URL = "https://horsepower.pe/api/revalidar";
const TOKEN = "EL_MISMO_VALOR_QUE_REVALIDAR_TOKEN";
const RETARDO_MS = 15000; // espera a que Google republique el CSV

function onCambio() {
  // debounce: agenda una sola llamada aunque haya varias ediciones seguidas
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "revalidarWeb")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("revalidarWeb").timeBased().after(RETARDO_MS).create();
}

function revalidarWeb() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "revalidarWeb")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  UrlFetchApp.fetch(REVALIDAR_URL + "?secret=" + encodeURIComponent(TOKEN), {
    muteHttpExceptions: true,
  });
}
```

**3. Activador.** En Apps Script → **Activadores → Añadir activador**:
función `onCambio`, origen *Desde una hoja de cálculo*, evento *Al editar* (o
*Al cambiar*). Es un activador instalable (no el `onEdit` simple), por eso sí
puede hacer llamadas externas; la primera ejecución pide autorizar la cuenta.

Prueba manual: `curl "https://horsepower.pe/api/revalidar?secret=TOKEN"` debe
devolver `{ "revalidated": true, ... }` (y `401` sin token).

## Scripts de preparación de datos (una sola vez / al agregar fotos)

Requieren la carpeta `Fotos HorsePower/` (originales) en la raíz y, opcionalmente,
la ruta al Excel de inventario en `EXCEL_STOCK`.

```bash
node scripts/optimizar-fotos.mjs      # PNG -> public/productos/*.webp
node scripts/construir-catalogo.mjs   # Excel + fotos -> scripts/catalogo-borrador.csv
node scripts/tabla-colores.mjs        # -> tablas de código -> color para validar
```

`construir-catalogo.mjs` toma **todos los modelos del Excel de inventario** (una fila
por modelo, con colores y tallas agregados de sus unidades) y les pega la foto cuando
existe. Los modelos sin foto se muestran solo en el "Catálogo completo".
La dueña completa **precio, colores y tallas** en la Sheet.

## Deploy en Vercel

1. Importar el repo en Vercel (framework detectado: Next.js).
2. Variables de entorno: `NEXT_PUBLIC_WHATSAPP`, `GOOGLE_SHEET_CSV_URL`,
   `NEXT_PUBLIC_SITIO_URL`, `NEXT_PUBLIC_GA_ID` y las de contacto, teléfono y
   redes sociales (ver `.env.example`).
3. Conectar el dominio `horsepower.pe` (DNS a Vercel).
4. Crear un **Deploy Hook** y compartir la URL con quien edite la Sheet.
