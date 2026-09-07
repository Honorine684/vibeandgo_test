export const metadata = {
  title: "Fixture bundle JS",
};

export default function HeavyJsPage() {
  return (
    <main className="container">
      <h1>Fixture : script &gt; 1MB</h1>
      <p>Cette page charge un fichier .js de plus de 1MB decompresse.</p>
      {/* Fixture "JS_BUNDLE_TOO_LARGE" (checklist des 64 checks). public/heavy-fixture.js
          fait ~1.1MB decompresse, peu importe son contenu (padding inerte). */}
      <script src="/heavy-fixture.js" defer></script>
    </main>
  );
}
