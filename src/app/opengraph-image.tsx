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
          justifyContent: "flex-end",
          background: "#F2EADF",
          color: "#211B16",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 68, lineHeight: 1.05, fontFamily: "Georgia" }}>Sezer Usta Mobilya</div>
        <div style={{ marginTop: 18, fontSize: 28, color: "#4A3426" }}>El oyma sanatı ve mobilya ustası</div>
        <div style={{ marginTop: 28, fontSize: 20, letterSpacing: 2 }}>GAZİMAĞUSA · KUZEY KIBRIS</div>
      </div>
    ),
    size,
  );
}
