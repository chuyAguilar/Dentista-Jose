import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { dentist } from "@/content/dentist";
import { site } from "@/content/site";
import "./globals.css";

// next/font la descarga en el build y la sirve desde el propio sitio: sin peticiones a Google en el navegador.
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

const title = `${dentist.title} ${dentist.name} · ${dentist.specialty}`;

export const metadata: Metadata = {
  // Base para que la imagen de Open Graph tenga URL absoluta. Cambia con el dominio propio (M1).
  metadataBase: new URL(site.url),
  title,
  description: dentist.tagline,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: dentist.clinic,
    title,
    description: dentist.tagline,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, type: "image/png", alt: `${dentist.clinic} · ${dentist.title} ${dentist.name}` }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2d5b",
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="es-MX" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
