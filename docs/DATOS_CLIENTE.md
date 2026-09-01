# Ficha de Recopilación de Datos del Cliente — HorsePower

Esta plantilla resume todos los datos reales requeridos para la puesta en producción y configuración de variables de entorno del catálogo web **HorsePower**.

---

## 1. Identificación de la Empresa y Datos Legales

| Campo | Valor / Respuesta del Cliente | Variable de Entorno (.env) |
| :--- | :--- | :--- |
| **Nombre Comercial** | HorsePower | `NEXT_PUBLIC_SITIO_NOMBRE` |
| **Razón Social / Titular** | *(Ej: HorsePower S.A.C. o Nombre de la dueña)* | Legal |
| **Número de RUC** | *(11 dígitos)* | Legal |
| **Dirección de la Tienda** | Jr. Andahuaylas Nº 198 Tda. 101, Lima, Perú | `NEXT_PUBLIC_DIRECCION` |
| **Horario de Atención** | Lunes a Sábado: 9:00 am – 8:00 pm | `NEXT_PUBLIC_HORARIO` |

---

## 2. Canales de Contacto y Ventas

| Canal | Valor | Variable de Entorno (.env) |
| :--- | :--- | :--- |
| **Número de WhatsApp de Ventas** | *(Ej: 51987654321 - Solo dígitos con código 51)* | `NEXT_PUBLIC_WHATSAPP` |
| **Teléfono de Llamadas / Contacto** | *(Ej: +51 908 843 695)* | `NEXT_PUBLIC_TELEFONO_CONTACTO` |
| **Correo Electrónico Oficial** | ventashorsepower@gmail.com | `NEXT_PUBLIC_EMAIL_CONTACTO` |

---

## 3. Redes Sociales Oficiales

| Red Social | Enlace URL | Variable de Entorno (.env) |
| :--- | :--- | :--- |
| **Instagram** | `https://instagram.com/...` | `NEXT_PUBLIC_INSTAGRAM` |
| **TikTok** | `https://tiktok.com/@...` | `NEXT_PUBLIC_TIKTOK` |
| **Facebook** | `https://facebook.com/...` | `NEXT_PUBLIC_FACEBOOK` |

---

## 4. Fuente de Datos (Google Sheet) y Analítica

| Recurso | Enlace / Código | Variable de Entorno (.env) |
| :--- | :--- | :--- |
| **Google Sheet (Publicada como CSV)** | `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv` | `GOOGLE_SHEET_CSV_URL` |
| **Google Analytics 4 (Opcional)** | `G-XXXXXXXXXX` | `NEXT_PUBLIC_GA_ID` |
| **Dominio de Producción** | `https://horsepower.pe` | `NEXT_PUBLIC_SITIO_URL` |
| **Libro de Reclamaciones (URL externa si aplica)** | *(Opcional, si usa proveedor externo)* | `NEXT_PUBLIC_LIBRO_RECLAMACIONES` |

---

## 5. Medios de Pago Aceptados

- [x] **Yape / Plin** (Número y titular a coordinar por WhatsApp)
- [x] **Transferencias Bancarias** (BCP, BBVA, Interbank, Banco de la Nación)
- [x] **Pago Contraentrega en Lima**
- [x] **Pago en Tienda Física (Efectivo / POS)**
