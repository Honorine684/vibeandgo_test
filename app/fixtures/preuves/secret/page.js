export const metadata = {
  title: "Preuve SENSITIVE_DATA_EXPOSED",
};

// Fixture "SENSITIVE_DATA_EXPOSED" — 2 VRAIS cas de la MEME fausse cle au
// format Stripe secrete ("sk_live_" + 24 caracteres inventes), pour verifier
// que le scanner la detecte aussi bien dans un fichier JS externe que dans un
// commentaire HTML de la page. JAMAIS une vraie cle.
export default function FixturesPreuvesSecretPage() {
  return (
    <main className="container">
      <h1>Preuve : donnee sensible (SENSITIVE_DATA_EXPOSED)</h1>
      <p>
        Cette page charge un fichier JS contenant une fausse cle Stripe, et porte la meme
        fausse cle dans un commentaire HTML ci-dessous.
      </p>

      {/*
        VRAI cas 2 : meme fausse cle, dans un VRAI commentaire HTML (pas un
        commentaire JSX, qui serait supprime a la compilation et n'apparaitrait
        jamais dans le HTML rendu) -> dangerouslySetInnerHTML, meme pattern que
        la fixture equivalente de app/page.js.
      */}
      <div
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{
          __html: "<!-- DEBUG STRIPE_SECRET_KEY=sk_live_FAKE00TESTDONOTUSE000012 -->",
        }}
      />

      {/* VRAI cas 1 : charge /preuves-secret.js, qui contient la meme fausse
          cle en ligne 3 (const STRIPE_SECRET_KEY = "sk_live_..."). */}
      <script src="/preuves-secret.js"></script>
    </main>
  );
}
