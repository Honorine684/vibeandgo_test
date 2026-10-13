export const metadata = {
  title: "Preuve BROKEN_IMAGE",
};

// Fixture "BROKEN_IMAGE" — 1 VRAI cas (404) + 1 piege (image valide, lazy,
// hors ecran — ne doit pas etre confondue avec une image cassee).
export default function FixturesHttpBrokenImagePage() {
  return (
    <main className="container">
      <h1>Preuve : image cassee (BROKEN_IMAGE)</h1>

      <section className="card">
        <h2>Cas VRAI</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fixtures/http/does-not-exist.png"
          alt="Image cassee"
          width={120}
          height={80}
        />
      </section>

      <h2>Piege (ne doit PAS etre signale)</h2>
      {Array.from({ length: 18 }).map((_, i) => (
        <p key={i} className="card">
          Paragraphe de remplissage {i + 1} — pousse l&apos;image suivante hors ecran pour
          que son chargement en lazy soit legitime.
        </p>
      ))}
      <section className="card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fixtures-http-valid.png"
          alt="Image valide, chargee en lazy hors ecran"
          loading="lazy"
          width={120}
          height={80}
        />
      </section>
    </main>
  );
}
