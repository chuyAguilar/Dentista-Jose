import { onlyDigits } from "./digits";

export type ClipboardLike = { writeText(text: string): Promise<void> };
export type CopyOutcome = "copied" | "fallback";

// El portapapeles llega como parámetro: así se prueba sin navegador (P7).
export async function copyDigits(value: string, clipboard: ClipboardLike | undefined): Promise<CopyOutcome> {
  if (!clipboard || typeof clipboard.writeText !== "function") return "fallback";
  try {
    await clipboard.writeText(onlyDigits(value));
    return "copied";
  } catch {
    return "fallback";
  }
}
