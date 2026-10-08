// 10 dígitos de México en grupos 3-3-2-2, como en la tarjeta: «771 143 78 89».
export function formatMxPhone(number: string): string {
  if (!/^\d{10}$/.test(number)) throw new Error("El teléfono debe tener 10 dígitos.");
  return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8)}`;
}

export function buildTelUrl(countryCode: string, number: string): string {
  if (!/^\d+$/.test(countryCode) || !/^\d+$/.test(number)) {
    throw new Error("El código de país y el número deben ser solo dígitos.");
  }
  return `tel:+${countryCode}${number}`;
}
