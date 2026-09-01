# Ficha de Recopilación de Datos del Cliente — HorsePower (Issue #18)

Este documento contiene el cuestionario y la lista de verificación con los **5 puntos clave requeridos del cliente** para la configuración final y puesta en producción del catálogo web.

---

## Checklist de Recopilación del Cliente

- [ ] **1. Texto de Nosotros (Historia y Propuesta de Marca)**
- [ ] **2. Datos de Contacto y Tienda (Dirección, Horario, Teléfono, Correo)**
- [ ] **3. Redes Sociales Oficiales (Instagram, Facebook, TikTok)**
- [ ] **4. Datos Fiscales (RUC, Razón Social y Emisión de Comprobantes)**
- [ ] **5. Número Oficial de WhatsApp Business (+51)**

---

### 1. Texto de Nosotros (Historia y Propuesta de Marca)
*Revisión y personalización del texto de presentación institucional de HorsePower:*

* **Pregunta para la dueña:** ¿Deseas mantener la propuesta actual ("Casacas, chompas y mochilas resistentes para el día a día") o agregar detalles sobre el año de fundación, confección nacional y propósito de la marca?
* **Texto base configurado en `/nosotros`:**
  > *"En HorsePower combinamos diseño funcional, abrigo y durabilidad en cada casaca, chompa y accesorio, brindando una experiencia de compra personalizada y transparente."*
* **Respuesta / Ajuste del cliente:** `[Completar aquí si la dueña desea cambiarlo]`

---

### 2. Dirección Exacta, Horario, Teléfono y Correo
*Datos mostrados en el pie de página, en la página `/ubicanos` y en el mapa de Google Maps:*

| Campo | Valor Actual / Referencia | Confirmación del Cliente | Variable en `.env.local` |
| :--- | :--- | :--- | :--- |
| **Dirección exacta** | Jr. Andahuaylas Nº 198 Tda. 101, Lima, Perú, 01 | `[Confirmar]` | `NEXT_PUBLIC_DIRECCION` |
| **Horario de atención** | Lunes a Sábado: 9:00 am – 8:00 pm | `[Confirmar]` | `NEXT_PUBLIC_HORARIO` |
| **Teléfono de llamadas** | +51 908 843 695 | `[Confirmar]` | `NEXT_PUBLIC_TELEFONO_CONTACTO` |
| **Correo electrónico** | ventashorsepower@gmail.com | `[Confirmar]` | `NEXT_PUBLIC_EMAIL_CONTACTO` |

---

### 3. Redes Sociales Oficiales (Instagram / Facebook / TikTok)
*Enlaces directos para los botones de redes sociales en el pie de página y la página de contacto:*

| Red Social | Enlace URL Oficial | Variable en `.env.local` |
| :--- | :--- | :--- |
| **Instagram** | `https://instagram.com/[usuario]` | `NEXT_PUBLIC_INSTAGRAM` |
| **Facebook** | `https://facebook.com/[pagina]` | `NEXT_PUBLIC_FACEBOOK` |
| **TikTok** | `https://tiktok.com/@[usuario]` | `NEXT_PUBLIC_TIKTOK` |

---

### 4. RUC y Comprobantes de Pago (Aplica Libro de Reclamaciones)
*Conforme a la normativa de INDECOPI (D.S. 011-2011-PCM), los comercios con RUC y emisión de comprobantes deben contar con Libro de Reclamaciones activo:*

* **Razón Social o Nombre del Titular:** `[Completar]`
* **Número de RUC (11 dígitos):** `[Completar]`
* **¿Emite comprobante de pago?** (Boleta / Factura): `[Sí / No]`
* **¿Utilizará el Libro de Reclamaciones integrado en la web (`/libro-de-reclamaciones`) o un enlace externo?**
  * Si es integrado: Ya está activo y configurado.
  * Si es externo: Asignar la URL en `NEXT_PUBLIC_LIBRO_RECLAMACIONES`.

---

### 5. Confirmar Número de WhatsApp Business (+51)
*El número de WhatsApp es el canal principal donde se reciben y cierran todos los pedidos del carrito y las consultas:*

* **Número con código de país:** `51XXXXXXXXX` (Ej: `51987654321` — solo 11 dígitos numéricos, sin espacios ni signos `+`).
* **Variable en `.env.local`:** `NEXT_PUBLIC_WHATSAPP=51XXXXXXXXX`
* **Confirmación de WhatsApp Business:** `[ ] Verificado y probado con mensaje de prueba del carrito.`
