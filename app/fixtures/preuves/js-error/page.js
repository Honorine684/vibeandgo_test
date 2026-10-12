export const metadata = {
  title: "Preuve JS_ERROR",
};

// Fixture "JS_ERROR" — 1 VRAI cas (script du site, fichier separe, erreur au
// chargement) + 1 PIEGE (erreur venant d'un script tiers, autre domaine, qui
// ne doit PAS etre signalee).
export default function FixturesPreuvesJsErrorPage() {
  return (
    <main className="container">
      <h1>Preuve : erreur JavaScript (JS_ERROR)</h1>
      <p>
        Cette page charge un script du site (fichier separe, pas inline) qui leve une erreur
        au chargement, et un script tiers (autre domaine) qui leve aussi une erreur mais ne
        doit pas etre attribue au site teste.
      </p>

      {/* VRAI : /public/preuves-error.js, ligne 4 : "const e = 1; e();" */}
      <script src="/preuves-error.js"></script>

      {/*
        PIEGE : script charge depuis jsdelivr.net (domaine different de
        vibeandgotest.vercel.app), epingle a un commit precis de ce meme
        depot pour rester stable/deterministe. Ajoute apres coup, une fois le
        SHA du commit contenant public/preuves-trap-external.js connu.
      */}
    </main>
  );
}
