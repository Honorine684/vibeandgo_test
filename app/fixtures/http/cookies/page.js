import CookiesClient from "./CookiesClient";

export const metadata = {
  title: "Preuve INSECURE_COOKIE",
};

export default function FixturesHttpCookiesPage() {
  return (
    <main className="container">
      <h1>Preuve : cookie sans HttpOnly/Secure (INSECURE_COOKIE)</h1>
      <p>
        Cette page declenche la pose de 2 cookies au chargement : un cookie de{" "}
        <strong>session</strong> <code>fx_session_id</code> (VRAI probleme), et un cookie{" "}
        <strong>analytics</strong> <code>fx_analytics_id</code> (piege — meme absence
        d&apos;attributs, mais ce n&apos;est pas un cookie de session).
      </p>
      <CookiesClient />
    </main>
  );
}
