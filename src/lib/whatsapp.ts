// wa.me solo acepta dígitos: código de país + número, sin «+» ni espacios.
export function buildWhatsAppUrl(countryCode: string, number: string, message: string): string {
  if (!/^\d+$/.test(countryCode) || !/^\d+$/.test(number)) {
    throw new Error("El código de país y el número deben ser solo dígitos.");
  }
  return `https://wa.me/${countryCode}${number}?text=${encodeURIComponent(message)}`;
}
