import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Agent Globe — Light Up the World with AI Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ background: "linear-gradient(135deg, #0a0e27 0%, #111535 50%, #1a1f45 100%)", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 96, marginBottom: 16 }}>🌍</div>
        <div style={{ fontSize: 64, fontWeight: 800, color: "#22d3ee", marginBottom: 16, letterSpacing: "-1px" }}>Agent Globe</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>Light Up the World with AI Agents</div>
        <div style={{ marginTop: 40, background: "rgba(34,211,238,0.15)", borderRadius: 12, padding: "10px 28px", fontSize: 22, color: "rgba(34,211,238,0.9)" }}>globe.toolboxlite.com</div>
      </div>
    ),
    { ...size }
  );
}
