import { Suspense } from "react";
import RedirectClient from "./RedirectClient";

export const metadata = {
  title: "Redirection",
};

export default function RedirectPage() {
  return (
    <main className="container">
      <h1>Redirection</h1>
      <Suspense fallback={null}>
        <RedirectClient />
      </Suspense>
    </main>
  );
}
