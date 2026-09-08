export const metadata = {
  title: "Fixture design generique IA",
};

// Fixture "AI Visual Differentiation" (checklist des 64 checks). Reproduit au
// maximum les marqueurs d'un template SaaS "genere par IA" generique, en 2 volets :
//
// 8 signaux verifies en code (garantis) :
//  1. Icone Lucide brute non stylee (svg class="lucide lucide-sparkles")
//  2. Emoji ✨ visible dans le texte
//  3. background-color de <body>/<html> = rgb(255,255,255) (deja le cas
//     sitewide via globals.css, verifie, rien a surcharger ici)
//  4. Bouton bg exactement rgb(139,92,246)
//  5. Aucun lien CGU/terms/tos (le footer partage du site n'en a pas -> verifie)
//  6. Aucun lien confidentialite/privacy (idem)
//  7. >= 3 occurrences du caractere — (tiret cadratin)
//  8. La phrase "It's not a scanner, it's a co-pilot for your QA."
//
// + signaux visuels (non garantis, pour le jugement IA) : dégradé violet/bleu/rose
// dans le hero, 3 cartes features a liseré colore, coins tres arrondis partout,
// 3 formules de prix, aucune vraie demo produit, temoignages generiques,
// grille "bento", orbes flous decoratifs, fleches animees au survol.
export default function FixturesGenericAiLookPage() {
  return (
    <main className="gai-page">
      <style>{`
        .gai-page { position: relative; overflow: hidden; }
        .gai-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.55;
          z-index: 0;
          pointer-events: none;
        }
        .gai-hero {
          position: relative;
          z-index: 1;
          padding: 96px 24px 112px;
          text-align: center;
          background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 25%, #c7d2fe 50%, #fbcfe8 75%, #fae8ff 100%);
          border-radius: 0 0 48px 48px;
        }
        .gai-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.7);
          font-size: 14px;
          font-weight: 600;
          color: #6d28d9;
          margin-bottom: 28px;
        }
        .gai-hero h1 {
          font-size: 48px;
          line-height: 1.1;
          margin: 0 0 20px;
          background: linear-gradient(90deg, #7c3aed, #db2777);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .gai-hero p.gai-tagline {
          font-size: 20px;
          color: #44403c;
          max-width: 640px;
          margin: 0 auto 40px;
        }
        .gai-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 999px;
          border: none;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        .gai-cta .gai-arrow { transition: transform 0.2s ease; display: inline-block; }
        .gai-cta:hover .gai-arrow { transform: translateX(6px); }
        .gai-section { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 88px 24px; }
        .gai-section h2 { text-align: center; font-size: 32px; margin-bottom: 12px; }
        .gai-section p.gai-sub { text-align: center; color: #6b7280; max-width: 560px; margin: 0 auto 56px; }
        .gai-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .gai-card {
          background: #fff;
          border-radius: 28px;
          padding: 32px;
          border: 1px solid #f0eefc;
          border-left: 4px solid #8b5cf6;
          box-shadow: 0 12px 32px -12px rgba(124, 58, 237, 0.18);
        }
        .gai-card:nth-child(2) { border-left-color: #6366f1; }
        .gai-card:nth-child(3) { border-left-color: #ec4899; }
        .gai-card h3 { margin: 16px 0 8px; font-size: 18px; }
        .gai-card p { margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; }
        .gai-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ede9fe, #fce7f3);
          color: #7c3aed;
        }
        .gai-pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .gai-price-card {
          border-radius: 32px;
          padding: 40px 28px;
          text-align: center;
          background: #fafaf9;
          border: 1px solid #eee;
        }
        .gai-price-card.gai-featured {
          background: linear-gradient(160deg, #f5f3ff, #fdf2f8);
          border: 2px solid #a78bfa;
          transform: scale(1.04);
        }
        .gai-price-card .gai-price { font-size: 40px; font-weight: 700; margin: 12px 0; }
        .gai-price-card ul { list-style: none; padding: 0; margin: 24px 0; text-align: left; color: #57534e; font-size: 14px; }
        .gai-price-card li { margin-bottom: 10px; }
        .gai-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .gai-testimonial { background: #fff; border-radius: 24px; padding: 28px; border: 1px solid #f3f3f3; }
        .gai-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; color: #fff; margin-bottom: 14px;
        }
        .gai-testimonial p.gai-quote { color: #44403c; font-size: 14px; line-height: 1.6; margin: 0 0 16px; }
        .gai-testimonial .gai-name { font-weight: 600; font-size: 14px; }
        .gai-testimonial .gai-role { color: #9ca3af; font-size: 13px; }
      `}</style>

      <div className="gai-orb" style={{ width: 420, height: 420, top: -140, left: -120, background: "#a78bfa" }} />
      <div className="gai-orb" style={{ width: 360, height: 360, top: 40, right: -160, background: "#f472b6" }} />
      <div className="gai-orb" style={{ width: 300, height: 300, top: 480, left: "40%", background: "#818cf8" }} />

      <section className="gai-hero">
        <span className="gai-badge">
          {/* Icone Lucide brute, non stylee au-dela de la taille : svg class contient "lucide" */}
          <svg
            className="lucide lucide-sparkles"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
          </svg>
          ✨ AI-Powered Workflow Automation
        </span>

        <h1>
          Supercharge Your Workflow — Instantly — Effortlessly
        </h1>

        <p className="gai-tagline">
          It&apos;s not a scanner, it&apos;s a co-pilot for your QA. Trusted by
          fast-moving teams — from seed-stage startups to Fortune 500s.
        </p>

        <button
          type="button"
          className="gai-cta"
          style={{ backgroundColor: "rgb(139, 92, 246)" }}
        >
          Get started — free forever
          <span className="gai-arrow">→</span>
        </button>
      </section>

      <section className="gai-section">
        <h2>Everything you need, in one bento box</h2>
        <p className="gai-sub">
          Powerful, intuitive, and built for scale — no matter the size of your
          team.
        </p>
        <div className="gai-bento">
          <div className="gai-card">
            <div className="gai-icon-wrap">⚡</div>
            <h3>Real-time insights</h3>
            <p>
              Get a live pulse on everything that matters, the moment it
              happens.
            </p>
          </div>
          <div className="gai-card">
            <div className="gai-icon-wrap">🔗</div>
            <h3>Seamless integrations</h3>
            <p>Plug into your existing stack in minutes, not months.</p>
          </div>
          <div className="gai-card">
            <div className="gai-icon-wrap">🛡️</div>
            <h3>Enterprise-grade security</h3>
            <p>SOC 2, GDPR-ready, and built with security-first principles.</p>
          </div>
        </div>
      </section>

      <section className="gai-section">
        <h2>Simple, transparent pricing</h2>
        <p className="gai-sub">Choose the plan that scales with your team.</p>
        <div className="gai-pricing">
          <div className="gai-price-card">
            <h3>Starter</h3>
            <div className="gai-price">$0</div>
            <ul>
              <li>Up to 3 team members</li>
              <li>Core features</li>
              <li>Community support</li>
            </ul>
          </div>
          <div className="gai-price-card gai-featured">
            <h3>Pro</h3>
            <div className="gai-price">$29</div>
            <ul>
              <li>Unlimited team members</li>
              <li>Advanced automation</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div className="gai-price-card">
            <h3>Enterprise</h3>
            <div className="gai-price">Custom</div>
            <ul>
              <li>Dedicated success manager</li>
              <li>Custom SLAs</li>
              <li>SSO &amp; audit logs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="gai-section">
        <h2>Loved by teams everywhere</h2>
        <div className="gai-testimonials">
          <div className="gai-testimonial">
            <div className="gai-avatar" style={{ background: "#8b5cf6" }}>
              SK
            </div>
            <p className="gai-quote">
              "This platform completely transformed how our team ships
              product — we move faster than ever."
            </p>
            <div className="gai-name">Sarah K.</div>
            <div className="gai-role">Head of Product, Nova Labs</div>
          </div>
          <div className="gai-testimonial">
            <div className="gai-avatar" style={{ background: "#6366f1" }}>
              JM
            </div>
            <p className="gai-quote">
              "The best investment we made this year. Setup took minutes, ROI
              was immediate."
            </p>
            <div className="gai-name">James M.</div>
            <div className="gai-role">CTO, Brightline</div>
          </div>
          <div className="gai-testimonial">
            <div className="gai-avatar" style={{ background: "#ec4899" }}>
              AL
            </div>
            <p className="gai-quote">
              "Our whole workflow lives here now — it just works, every
              single time."
            </p>
            <div className="gai-name">Amara L.</div>
            <div className="gai-role">Ops Lead, Fernway</div>
          </div>
        </div>
      </section>
    </main>
  );
}
