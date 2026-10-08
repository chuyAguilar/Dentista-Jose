export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function groupDigits(digits: string, size = 4): string {
  if (!Number.isInteger(size) || size < 1) throw new Error("El tamaño del grupo debe ser un entero ≥ 1.");
  const groups: string[] = [];
  for (let i = 0; i < digits.length; i += size) groups.push(digits.slice(i, i + size));
  return groups.join(" ");
}
