import { ImageResponse } from "next/og";
import { BRAND_COLORS, LOGO_BODY_PATH, LOGO_BYTE_PATH, LOGO_VIEWBOX } from "@/shared/ui/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#002329",
        }}
      >
        <svg width="96" height="96" viewBox={LOGO_VIEWBOX}>
          <path d={LOGO_BODY_PATH} fill={BRAND_COLORS.primary} />
          <path d={LOGO_BYTE_PATH} fill={BRAND_COLORS.accent} />
        </svg>
      </div>
    ),
    size,
  );
}
