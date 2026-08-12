"use client";

import { useEffect, useState } from "react";
// BUG (PERFORMANCE): import complet de lodash pour une seule fonction utilitaire
// (aucun tree-shaking possible avec cet import par defaut -> bundle JS gonfle inutilement).
import _ from "lodash";

export default function HomePage() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // BUG (FIABILITE): erreur JS declenchee automatiquement au chargement de la page
    // (reference a une variable non definie -> TypeError visible dans la console).
    // Le setTimeout est volontaire : il sort le throw du cycle de rendu React pour que
    // ce soit une simple erreur non interceptee (window.onerror) au lieu de faire planter
    // toute la page via l'error boundary par defaut de Next.js.
    setTimeout(() => {
      console.log("Utilisateur courant:", currentUser.name);
    }, 0);
  }, []);

  useEffect(() => {
    // BUG (PERFORMANCE): layout shift volontaire. Cette bannière apparait apres 2s
    // et pousse tout le contenu vers le bas car aucun espace n'est reserve pour elle
    // (pas de min-height sur son conteneur avant apparition).
    const timer = setTimeout(() => setShowBanner(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const chunks = _.chunk(["a", "b", "c", "d"], 2);

  return (
    <main className="container">
      {showBanner && (
        <div
          style={{
            background: "#fde68a",
            padding: "12px 16px",
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          🎉 Offre speciale : -20% avec le code TEST20 ! ({chunks.length} lots)
        </div>
      )}

      {/* BUG (SEO): deux balises H1 sur la meme page */}
      <h1>Bienvenue chez VibeAndGo</h1>
      <h1>La plateforme de test QA nouvelle generation</h1>

      {/*
        BUG (PERFORMANCE): image "above the fold" enorme (plusieurs Mo, 4000x3000),
        chargee via une balise <img> classique (pas de next/image, pas de redimensionnement),
        ET avec loading="lazy" alors qu'elle est visible immediatement a l'ecran
        (mauvaise gestion du lazy-loading : devrait etre eager puisqu'elle est au-dessus de la ligne de flottaison).
      */}
      <img
        src="https://picsum.photos/id/1015/4000/3000"
        alt="Photo de bandeau"
        loading="lazy"
        style={{ width: "100%", height: "auto", borderRadius: 8 }}
      />

      <section className="card">
        <h2>Nos partenaires</h2>
        {/* BUG (ACCESSIBILITE): image sans attribut alt */}
        <img src="https://picsum.photos/id/20/80/40" />
        {/* BUG (SECURITE): mixed content - ressource chargee en http:// sur une page https */}
        <img src="http://www.w3.org/Icons/w3c_home" style={{ marginLeft: 12 }} alt="Partenaire W3C" />
      </section>

      <section className="card">
        <h2>En savoir plus</h2>
        {/* BUG (FIABILITE): lien interne casse, la page /a-propos n'existe pas */}
        <p>
          Consultez notre <a href="/a-propos">page a propos</a> pour en savoir plus sur nous.
        </p>
        {/* BUG (FIABILITE): image cassee, le fichier n'existe pas */}
        <img src="/img/does-not-exist.png" alt="Logo equipe" width={120} height={60} />
      </section>

      <section className="card">
        <h2>Espace partenaires securise</h2>
        <p>Redirection vers nos partenaires : <a href="/redirect?to=https://example.com">acceder a l'offre</a></p>
      </section>

      {/*
        BUG (SECURITE): donnee sensible visible dans le code source HTML (commentaire).
        Une fausse cle API est laissee en clair dans un commentaire HTML.
      */}
      <div
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{
          __html: "<!-- DEBUG API_SECRET_KEY=FAKE-DO-NOT-USE-51H8TestOnlyPlaceholder00000000 -->",
        }}
      />
    </main>
  );
}
