import { ImageResponse } from "next/og";
import { BRAND_COLORS, LOGO_BODY_PATH, LOGO_BYTE_PATH, LOGO_VIEWBOX } from "@/shared/ui/Logo";

export const alt = "ByteFlow — Software sob medida, do design ao deploy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STACK = ["Next.js", "React", "TypeScript", "Node.js", "Docker", "AWS"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(160deg, #013a3f 0%, #002329 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox={LOGO_VIEWBOX}>
            <path d={LOGO_BODY_PATH} fill={BRAND_COLORS.primary} />
            <path d={LOGO_BYTE_PATH} fill={BRAND_COLORS.accent} />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>ByteFlow</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 26, color: "#50C878", letterSpacing: 4 }}>{"// ESTÚDIO DE SOFTWARE"}</span>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Software sob medida, do design ao deploy.
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {STACK.map((tech) => (
            <span
              key={tech}
              style={{
                display: "flex",
                fontSize: 24,
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
