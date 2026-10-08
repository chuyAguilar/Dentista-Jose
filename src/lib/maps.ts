// Enlace de búsqueda de Google Maps (API de URLs): abre la app en Android y el sitio en la PC, sin llave ni iframe.
export function buildMapsUrl(parts: string[]): string {
  const query = parts.map((part) => part.trim()).filter(Boolean).join(", ");
  if (!query) throw new Error("La dirección no puede estar vacía.");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
