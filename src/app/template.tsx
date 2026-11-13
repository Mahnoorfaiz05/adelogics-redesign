import type { ReactNode } from "react";

// Keep route content immediate. Decorative page-transition curtains previously
// delayed interaction and added animation runtime to every route.
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
