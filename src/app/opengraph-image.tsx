import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
          padding: 48,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 96, marginBottom: 24 }}>🎭</div>
        <div>How to Play Charades</div>
        <div style={{ fontSize: 32, marginTop: 24, fontWeight: 400 }}>
          Rules, Tips & Free Online Game
        </div>
      </div>
    ),
    { ...size },
  );
}
