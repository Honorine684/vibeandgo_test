import CorsClient from "./CorsClient";

export const metadata = {
  title: "Preuve CORS_MISCONFIGURED",
};

export default function FixturesHttpCorsPage() {
  return (
    <main className="container">
      <h1>Preuve : CORS mal configure (CORS_MISCONFIGURED)</h1>
      <p>
        Cette page appelle deux routes au chargement : l&apos;une renvoie{" "}
        <code>Access-Control-Allow-Origin: *</code> combine a{" "}
        <code>Access-Control-Allow-Credentials: true</code> (VRAI probleme), l&apos;autre
        renvoie <code>*</code> seul, sans credentials (piege, combinaison valide pour des
        donnees publiques).
      </p>
      <p>
        Routes : <code>/fixtures/http/cors-bad</code> (vrai) et{" "}
        <code>/fixtures/http/cors-ok</code> (piege).
      </p>
      <CorsClient />
    </main>
  );
}
