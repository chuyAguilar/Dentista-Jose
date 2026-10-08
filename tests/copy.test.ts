import { describe, expect, it } from "vitest";
import { dentist } from "../src/content/dentist";
import { groupDigits } from "../src/lib/digits";
import { copyDigits, type ClipboardLike } from "../src/lib/copy";

// Portapapeles falso: guarda lo último que se escribió.
function fakeClipboard() {
  const clip = { written: [] as string[], async writeText(text: string) { clip.written.push(text); } };
  return clip;
}

describe("copyDigits", () => {
  it("C4: copia 16 dígitos sin espacios, iguales a la tarjeta", async () => {
    const clip = fakeClipboard();
    const outcome = await copyDigits(groupDigits(dentist.bank.cardNumber), clip);
    expect(outcome).toBe("copied");
    expect(clip.written).toHaveLength(1);
    expect(clip.written[0]).toHaveLength(16);
    expect(clip.written[0]).toMatch(/^\d{16}$/);
    expect(clip.written[0]).toBe(dentist.bank.cardNumber);
  });

  it("respaldo: sin portapapeles → fallback", async () => {
    expect(await copyDigits(dentist.bank.cardNumber, undefined)).toBe("fallback");
  });

  it("respaldo: el portapapeles rechaza → fallback", async () => {
    const rejecting: ClipboardLike = { writeText: () => Promise.reject(new Error("NotAllowedError")) };
    expect(await copyDigits(dentist.bank.cardNumber, rejecting)).toBe("fallback");
  });

  it("respaldo: el portapapeles lanza de forma síncrona → fallback", async () => {
    const throwing: ClipboardLike = {
      writeText: () => {
        throw new Error("boom");
      },
    };
    expect(await copyDigits(dentist.bank.cardNumber, throwing)).toBe("fallback");
  });
});
