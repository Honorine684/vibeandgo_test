import "./globals.css";

// BUG (SEO): pas de balises Open Graph (og:title, og:image, etc.) definies nulle part dans le site.
export const metadata = {
  title: {
    default: "VibeAndGo - Test QA",
    template: "%s | VibeAndGo",
  },
  description: "Site de demo VibeAndGo pour tester un scanner QA/securite.",
};

// BUG (SEO/PERFORMANCE): viewport non responsive. Next.js injecte par defaut un viewport
// "width=device-width, initial-scale=1" ; il est ici volontairement surcharge avec une
// largeur fixe de 1024px, ce qui casse l'affichage mobile (pas d'adaptation a l'ecran).
export const viewport = {
  width: 1024,
};

export default function RootLayout({ children }) {
  return (
    // BUG (SEO): balise <html> sans attribut lang.
    <html>
      <body>
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
        </footer>
      </body>
    </html>
  );
}
