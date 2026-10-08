import { ImageResponse } from "next/og";
import { dentist } from "@/content/dentist";

// Imagen que WhatsApp muestra al compartir el enlace (M5). Route handler estático y no opengraph-image:
// con output export, opengraph-image sale sin extensión y el hosting no sabría que es PNG.
export const dynamic = "force-static";

const OG_SIZE = { width: 1200, height: 630 };

export function GET(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#fff",
          background: "linear-gradient(160deg, #0b2d5b, #134a8e 70%, #2a6fc9)",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 4, color: "#cfe0f7", textTransform: "uppercase" }}>
          {dentist.clinic}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          {`${dentist.title} ${dentist.name}`}
        </div>
        <div style={{ fontSize: 40, marginTop: 20, color: "#e3edfb" }}>{dentist.specialty}</div>
        <div style={{ fontSize: 30, marginTop: 48, color: "#d6e4f7" }}>{dentist.tagline}</div>
      </div>
    ),
    OG_SIZE,
  );
}
