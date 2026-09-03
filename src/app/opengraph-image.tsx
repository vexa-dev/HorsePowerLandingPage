import { ImageResponse } from "next/og";

export const alt = "HorsePower - Casacas, chompas y mochilas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a262c 0%, #0d363f 60%, #06191d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Tag & Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "rgba(94, 210, 227, 0.15)",
              border: "1px solid rgba(94, 210, 227, 0.4)",
              color: "#5ed2e3",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Confección Peruana
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Tienda Física en Lima Centro
          </div>
        </div>

        {/* Center Title & Slogan */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: "1.05",
              color: "#ffffff",
            }}
          >
            HORSEPOWER
          </div>
          <div
            style={{
              fontSize: "34px",
              fontWeight: 600,
              color: "#5ed2e3",
              lineHeight: "1.2",
            }}
          >
            Casacas, chompas y mochilas de alta duración.
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "850px",
              lineHeight: "1.4",
            }}
          >
            Catálogo completo con atención personalizada y compras cerradas por WhatsApp. Envíos a todo el Perú.
          </div>
        </div>

        {/* Bottom Footer Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "30px", fontSize: "20px", color: "rgba(255, 255, 255, 0.75)" }}>
            <span>📍 Jr. Andahuaylas 198, Lima</span>
            <span>💬 Asesoría humana 100%</span>
            <span>🚚 Envíos a todo el país</span>
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#5ed2e3",
            }}
          >
            horsepower.pe
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
