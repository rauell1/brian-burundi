import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0B1F33", color: "white", padding: 64, fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 56, width: "100%" }}>
          <div style={{ width: 340, height: 430, borderRadius: 36, overflow: "hidden", border: "10px solid white", background: "#174A7E", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ width: 160, height: 160, borderRadius: 999, background: "#0B1F33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 62, fontWeight: 800 }}>BB</div>
            <div style={{ marginTop: 34, width: 230, height: 96, borderRadius: 48, background: "#0B1F33" }} />
            <div style={{ marginTop: 34, color: "#DDE3E9", fontSize: 22, fontWeight: 700 }}>Professional Portrait</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ color: "#C9983C", fontSize: 24, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase" }}>Nairobi, Kenya</div>
            <div style={{ marginTop: 26, fontSize: 70, lineHeight: 1, fontWeight: 800 }}>Brian M. Burudi</div>
            <div style={{ marginTop: 24, fontSize: 34, color: "#DDE3E9", lineHeight: 1.25 }}>B2B Sales Lead</div>
            <div style={{ marginTop: 12, fontSize: 30, color: "#DDE3E9", lineHeight: 1.25 }}>Business Development & Strategic Partnerships</div>
            <div style={{ marginTop: 42, height: 8, width: 220, borderRadius: 999, background: "#C9983C" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
