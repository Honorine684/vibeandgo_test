export const metadata = {
  title: "Preuves HTTP (reseau)",
};

// Hub de la famille "reponses HTTP" (preuves reseau) — meme principe que
// /fixtures/preuves : 1 VRAI cas + des pieges par type, cette fois centres sur
// les en-tetes/reponses reseau plutot que le DOM. Ne touche a aucune fixture
// existante.
export default function FixturesHttpPage() {
  return (
    <main className="container">
      <h1>Fixtures : preuves reseau (reponses HTTP)</h1>
      <p>
        Chaque page ci-dessous contient un cas VRAI (a detecter) et, quand c&apos;est
        pertinent, un piege (a ne PAS signaler).
      </p>
      <ul>
        <li>
          <a href="/fixtures/http/cors">CORS mal configure (CORS_MISCONFIGURED)</a>
        </li>
        <li>
          <a href="/fixtures/http/cache">
            Cache public sur donnees personnelles (API_CACHE_PUBLIC)
          </a>
        </li>
        <li>
          <a href="/fixtures/http/insecure-endpoint">
            Endpoint non authentifie (INSECURE_ENDPOINT)
          </a>
        </li>
        <li>
          <a href="/fixtures/http/mixed-content-script">
            Contenu mixte actif — script (MIXED_CONTENT, majeur)
          </a>
        </li>
        <li>
          <a href="/fixtures/http/mixed-content-image">
            Contenu mixte passif — image (MIXED_CONTENT, mineur)
          </a>
        </li>
        <li>
          <a href="/fixtures/http/cookies">
            Cookie sans HttpOnly/Secure (INSECURE_COOKIE)
          </a>
        </li>
        <li>
          <a href="/fixtures/http/broken-image">Image cassee (BROKEN_IMAGE)</a>
        </li>
      </ul>
    </main>
  );
}
