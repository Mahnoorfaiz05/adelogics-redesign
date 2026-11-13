import { Fragment } from "react";

/**
 * Turns the existing *accented phrase* convention into lightweight semantic
 * markup. It intentionally has no client-side animation dependency, so titles
 * remain complete in the first HTML response.
 */
export default function AccentText({ text, className = "serif-i text-gradient" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, index) => {
        const accented = part.startsWith("*") && part.endsWith("*");
        const content = accented ? part.slice(1, -1) : part;
        return accented
          ? <em key={index} className={className}>{content}</em>
          : <Fragment key={index}>{content}</Fragment>;
      })}
    </>
  );
}
