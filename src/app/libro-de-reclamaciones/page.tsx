"use client";

import { useState } from "react";
import {
  IconBook2,
  IconCheck,
  IconBrandWhatsapp,
  IconMail,
  IconShieldCheck,
} from "@tabler/icons-react";
import { PaginaInstitucional } from "@/components/PaginaInstitucional";
import { NUMERO_WHATSAPP } from "@/lib/whatsapp";

const EMAIL_CONTACTO =
  process.env.NEXT_PUBLIC_EMAIL_CONTACTO?.trim() || "ventashorsepower@gmail.com";
const DIRECCION =
  process.env.NEXT_PUBLIC_DIRECCION?.trim() ||
  "Jr. Andahuaylas Nº 198 Tda. 101, Lima, Perú, 01";

export default function LibroReclamacionesPage() {
  const [enviado, setEnviado] = useState(false);
  const [tipo, setTipo] = useState<"reclamo" | "queja">("reclamo");
  const [form, setForm] = useState({
    nombre: "",
    documentoTipo: "DNI",
    documentoNumero: "",
    telefono: "",
    email: "",
    direccion: "",
    monto: "",
    producto: "",
    detalle: "",
    pedido: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
  }

  const textoWhatsApp = encodeURIComponent(
    `*LIBRO DE RECLAMACIONES VIRTUAL — HORSEPOWER*\n\n` +
      `• *Tipo:* ${tipo.toUpperCase()}\n` +
      `• *Consumidor:* ${form.nombre} (${form.documentoTipo}: ${form.documentoNumero})\n` +
      `• *Teléfono:* ${form.telefono}\n` +
      `• *Correo:* ${form.email}\n` +
      `• *Dirección:* ${form.direccion}\n` +
      `• *Producto / Monto:* ${form.producto || "N/A"} - S/ ${form.monto || "0"}\n\n` +
      `• *Detalle del ${tipo}:*\n${form.detalle}\n\n` +
      `• *Pedido concreto:* ${form.pedido || "Conforme a ley"}`,
  );

  const whatsappHref = NUMERO_WHATSAPP
    ? `https://wa.me/${NUMERO_WHATSAPP}?text=${textoWhatsApp}`
    : `https://wa.me/?text=${textoWhatsApp}`;

  return (
    <PaginaInstitucional
      eyebrow="Atención al Consumidor"
      titulo="Libro de Reclamaciones Virtual"
      descripcion="Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley Nº 29571) y el Reglamento del Libro de Reclamaciones (D.S. 011-2011-PCM)."
    >
      <div className="rounded-3xl border bg-tarjeta p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-linea/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <IconBook2 className="text-acento size-6" />
              <h2 className="text-xl font-black text-texto">Hoja de Reclamación</h2>
            </div>
            <p className="mt-1 text-xs text-tenue">
              Establecimiento: HorsePower · {DIRECCION}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-tenue bg-superficie px-3 py-1 rounded-full w-fit">
            <IconShieldCheck size={14} className="text-acento" />
            Conforme a normativa Indecopi
          </span>
        </div>

        {enviado ? (
          <div className="py-12 text-center space-y-4">
            <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <IconCheck size={32} stroke={2.5} />
            </div>
            <h3 className="text-2xl font-bold text-texto">
              Hoja de Reclamación Registrada
            </h3>
            <p className="text-sm text-tenue max-w-md mx-auto leading-relaxed">
              Hemos preparado tu registro. Puedes enviar la copia formal directamente por WhatsApp a nuestro equipo de atención o remitirla a nuestro correo oficial.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="boton-acento inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-bold shadow-md"
              >
                <IconBrandWhatsapp size={20} />
                Enviar copia por WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL_CONTACTO}?subject=Libro%20de%20Reclamaciones%20-%20${encodeURIComponent(form.nombre)}&body=${textoWhatsApp}`}
                className="boton-secundario inline-flex min-h-12 items-center gap-2 px-5 py-3 text-sm font-bold"
              >
                <IconMail size={18} />
                Enviar por Correo
              </a>
            </div>
            <p className="text-[11px] text-tenue pt-4">
              Plazo de respuesta legal: Máximo 15 días hábiles conforme a la normativa vigente.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Tipo: Reclamo o Queja */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-tenue">
                Tipo de Disconformidad
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTipo("reclamo")}
                  className={`p-3 rounded-xl border text-left transition ${
                    tipo === "reclamo"
                      ? "border-texto bg-superficie font-bold"
                      : "border-linea text-tenue hover:border-texto"
                  }`}
                >
                  <p className="text-sm font-bold text-texto">Reclamo</p>
                  <p className="text-[11px] text-tenue mt-0.5">
                    Disconformidad sobre el producto entregado.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setTipo("queja")}
                  className={`p-3 rounded-xl border text-left transition ${
                    tipo === "queja"
                      ? "border-texto bg-superficie font-bold"
                      : "border-linea text-tenue hover:border-texto"
                  }`}
                >
                  <p className="text-sm font-bold text-texto">Queja</p>
                  <p className="text-[11px] text-tenue mt-0.5">
                    Malestar respecto a la atención recibida.
                  </p>
                </button>
              </div>
            </div>

            {/* Datos del Consumidor */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-texto border-b pb-2">
                1. Identificación del Consumidor
              </h3>

              <div>
                <label className="block text-xs font-bold text-texto mb-1" htmlFor="nombre">
                  Nombres y Apellidos *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Carlos Ramírez Gómez"
                  className="min-h-11 w-full rounded-xl border bg-tarjeta px-3.5 text-sm outline-none focus:border-texto"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-texto mb-1" htmlFor="documentoTipo">
                    Documento *
                  </label>
                  <select
                    id="documentoTipo"
                    name="documentoTipo"
                    value={form.documentoTipo}
                    onChange={handleChange}
                    className="min-h-11 w-full rounded-xl border bg-tarjeta px-3 text-sm outline-none focus:border-texto"
                  >
                    <option value="DNI">DNI</option>
                    <option value="CE">Carné de Extranjería</option>
                    <option value="RUC">RUC</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-texto mb-1" htmlFor="documentoNumero">
                    Número de Documento *
                  </label>
                  <input
                    id="documentoNumero"
                    name="documentoNumero"
                    required
                    value={form.documentoNumero}
                    onChange={handleChange}
                    placeholder="Ej: 72819382"
                    className="min-h-11 w-full rounded-xl border bg-tarjeta px-3.5 text-sm outline-none focus:border-texto"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-texto mb-1" htmlFor="telefono">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    required
                    type="tel"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 987654321"
                    className="min-h-11 w-full rounded-xl border bg-tarjeta px-3.5 text-sm outline-none focus:border-texto"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-texto mb-1" htmlFor="email">
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Ej: cliente@correo.com"
                    className="min-h-11 w-full rounded-xl border bg-tarjeta px-3.5 text-sm outline-none focus:border-texto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-texto mb-1" htmlFor="direccion">
                  Dirección o Domicilio
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Ej: Av. Principal 123, Distrito, Lima"
                  className="min-h-11 w-full rounded-xl border bg-tarjeta px-3.5 text-sm outline-none focus:border-texto"
                />
              </div>
            </div>

            {/* Detalle del Producto y Reclamo */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-texto border-b pb-2">
                2. Detalle de la Contratación y del {tipo === "reclamo" ? "Reclamo" : "Queja"}
              </h3>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-texto mb-1" htmlFor="producto">
                    Producto / Modelo Contratado
                  </label>
                  <input
                    id="producto"
                    name="producto"
                    value={form.producto}
                    onChange={handleChange}
                    placeholder="Ej: Casaca Térmica HorsePower Negra Talla L"
                    className="min-h-11 w-full rounded-xl border bg-tarjeta px-3.5 text-sm outline-none focus:border-texto"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-texto mb-1" htmlFor="monto">
                    Monto (S/)
                  </label>
                  <input
                    id="monto"
                    name="monto"
                    value={form.monto}
                    onChange={handleChange}
                    placeholder="Ej: 140.00"
                    className="min-h-11 w-full rounded-xl border bg-tarjeta px-3.5 text-sm outline-none focus:border-texto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-texto mb-1" htmlFor="detalle">
                  Detalle de los Hechos *
                </label>
                <textarea
                  id="detalle"
                  name="detalle"
                  required
                  rows={4}
                  value={form.detalle}
                  onChange={handleChange}
                  placeholder="Describe con claridad lo sucedido..."
                  className="w-full rounded-xl border bg-tarjeta px-3.5 py-2.5 text-sm outline-none focus:border-texto"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-texto mb-1" htmlFor="pedido">
                  Pedido Concreto del Consumidor
                </label>
                <textarea
                  id="pedido"
                  name="pedido"
                  rows={2}
                  value={form.pedido}
                  onChange={handleChange}
                  placeholder="Ej: Solicito el cambio de prenda por talla correcta o nota de crédito..."
                  className="w-full rounded-xl border bg-tarjeta px-3.5 py-2.5 text-sm outline-none focus:border-texto"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="boton-oscuro min-h-12 w-full px-6 py-3.5 text-sm font-bold shadow-md"
              >
                Registrar Hoja de Reclamación
              </button>
              <p className="mt-2 text-center text-[11px] text-tenue">
                La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante INDECOPI.
              </p>
            </div>
          </form>
        )}
      </div>
    </PaginaInstitucional>
  );
}
