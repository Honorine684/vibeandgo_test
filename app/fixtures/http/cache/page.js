import CacheClient from "./CacheClient";

export const metadata = {
  title: "Preuve API_CACHE_PUBLIC",
};

export default function FixturesHttpCachePage() {
  return (
    <main className="container">
      <h1>Preuve : cache public sur donnees personnelles (API_CACHE_PUBLIC)</h1>
      <p>
        Cette page appelle deux routes au chargement : l&apos;une renvoie des donnees
        personnelles fictives (email, telephone) avec <code>Cache-Control: public</code>{" "}
        (VRAI probleme), l&apos;autre des donnees generiques avec le meme en-tete (piege).
      </p>
      <p>
        Routes : <code>/fixtures/http/cache-public-personal</code> (vrai) et{" "}
        <code>/fixtures/http/cache-public-generic</code> (piege).
      </p>
      <CacheClient />
    </main>
  );
}
