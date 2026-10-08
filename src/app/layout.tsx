import type { Metadata } from "next";
import { dentist } from "@/content/dentist";
import "./globals.css";

export const metadata: Metadata = {
  title: `${dentist.title} ${dentist.name} · ${dentist.specialty}`,
  description: dentist.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
