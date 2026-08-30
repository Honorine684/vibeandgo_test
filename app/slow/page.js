import StallFetch from "./StallFetch";

// Fixture de test scanner (pas un bug du site) : voir StallFetch.js et
// backend/server.js (/api/slow/stall) pour le mecanisme. Volontairement isole
// du reste du site — aucune page hors de /slow/* ne pointe ici, pour ne pas
// perturber les scans normaux de vibeandgotest.vercel.app.
export const metadata = {
  title: "Zone lente (fixture scanner)",
};

export default function SlowIndexPage() {
  return (
    <main className="container">
      <h1>Zone /slow/</h1>
      <p>
        Cette page repond vite en HTTP brut, mais un vrai chargement navigateur reste
        instable 90 a 180 secondes (voir StallFetch ci-dessous).
      </p>
      <StallFetch />
      <ul>
        <li>
          <a href="/slow/a">/slow/a</a>
        </li>
        <li>
          <a href="/slow/b">/slow/b</a>
        </li>
        <li>
          <a href="/slow/c">/slow/c</a>
        </li>
      </ul>
    </main>
  );
}
