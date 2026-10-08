"use client";

import { useEffect, useRef, useState } from "react";
import { copyDigits, type CopyOutcome } from "@/lib/copy";
import { onlyDigits } from "@/lib/digits";

type CopyButtonProps = {
  digits: string;
  label: string;
  copiedLabel: string;
  fallbackLabel: string;
};

export default function CopyButton({ digits, label, copiedLabel, fallbackLabel }: CopyButtonProps): React.JSX.Element {
  const [outcome, setOutcome] = useState<CopyOutcome | null>(null);
  const fallbackRef = useRef<HTMLInputElement>(null);

  // En el respaldo, el campo aparece ya seleccionado para que el paciente solo mantenga presionado.
  useEffect(() => {
    if (outcome === "fallback") fallbackRef.current?.select();
  }, [outcome]);

  async function handleClick() {
    // Sin HTTPS, navigator.clipboard no existe: copyDigits lo trata como respaldo.
    const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : undefined;
    setOutcome(await copyDigits(digits, clipboard));
  }

  return (
    <div className="copy">
      <button type="button" className="button" onClick={handleClick}>
        {label}
      </button>
      {outcome === "fallback" && (
        <input
          ref={fallbackRef}
          className="fallback"
          type="text"
          inputMode="numeric"
          readOnly
          value={onlyDigits(digits)}
          aria-label={fallbackLabel}
          onFocus={(event) => event.currentTarget.select()}
        />
      )}
      <p className="status" aria-live="polite">
        {outcome === "copied" ? copiedLabel : outcome === "fallback" ? fallbackLabel : ""}
      </p>
    </div>
  );
}
