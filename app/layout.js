import "./globals.css";
import EngineTrap from "./EngineTrap";

// BUG (SEO): pas de balises Open Graph (og:title, og:image, etc.) definies nulle part dans le site.
export const metadata = {
  title: {
    default: "VibeAndGo - Test QA",
    template: "%s | VibeAndGo",
  },
  description: "Site de demo VibeAndGo pour tester un scanner QA/securite.",
};

// FIX (SEO/PERFORMANCE): viewport responsive standard (anciennement surcharge en
// largeur fixe 1024px, ce qui cassait l'affichage mobile).
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    // BUG (SEO): balise <html> sans attribut lang.
    <html>
      <body>
        <EngineTrap />
        <header className="site-header">
          <a href="/" style={{ fontWeight: 700, textDecoration: "none", color: "#111827" }}>
            VibeAndGo
          </a>
          <nav className="site-nav">
            <a href="/">Accueil</a>
            <a href="/recherche">Recherche</a>
            <a href="/checkout">Commander</a>
            <a href="/connexion">Connexion</a>
            <a href="/inscription">Inscription</a>
          </nav>
        </header>

        {children}

        <footer className="site-footer">
          <p className="fine-print">
            © 2026 VibeAndGo. Tous droits reserves. Site de demonstration a des fins de test QA uniquement.
          </p>
          <p>
            {/*
              BUG (SEO + ACCESSIBILITE): lien constitue uniquement d'une icone, sans texte visible
              ni aria-label, et target="_blank" sans rel="noopener" (reverse tabnabbing).
            */}
            <a href="https://example.com" target="_blank">
              🔗
            </a>
          </p>
          {/*
            Fixture P2.1 (pas un bug) : lien mort vers une page qui n'existe pas
            (/promo-2024 -> 404 reel, voir app/not-found.js) pour tester que le
            scanner ne remonte plus de findings "contenu" (h1, lang...) sur une
            page qui n'existe pas, tout en gardant le finding "lien casse" lui-meme.
          */}
          <p>
            <a href="/promo-2024">Promo</a>
          </p>
          {/*
            Fixture P3/C1 (checkHreflang) : selecteur de langue site-wide vers une vraie
            version anglaise (/en) sans aucune balise hreflang nulle part (ni ici ni sur /en)
            - sert a declencher le check hreflang, qui ne tourne aujourd'hui jamais sur le
            chemin MPA. Voir BUGS.md, section fixtures P3.
          */}
          <p style={{ fontSize: 13 }}>
            <a href="/">FR</a> · <a href="/en">EN</a>
          </p>
          {/*
            Fixture P3 (pas un bug) : lien site-wide vers /spa pour que le crawl decouvre
            cette sous-page (en-tetes de securite + XSS par page, voir app/spa/).
          */}
          <p style={{ fontSize: 13 }}>
            <a href="/spa">Espace SPA (test)</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
