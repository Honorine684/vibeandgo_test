import {
  Rocket,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata = {
  title: "Fixture AI Visual Differentiation",
};

// Fixture "AI Visual Differentiation" (checklist des 64 checks + jugement vision
// separe). Empile deliberement le maximum des 29 signes "site genere par IA sans
// retouche" (exclut le #30 "palette pastel", couvert a part par
// /fixtures/ai-generic-look-pastel, opposee esthetiquement).
//
// Les 8 signes avec detecteur deterministe (code) sont numerotes ci-dessous en
// [DET: nom_du_signal] ; les 21 autres sont uniquement pour le jugement du modele
// vision, numerotes [1] a [29] selon la liste fournie.
export default function FixturesAiGenericLookPage() {
  return (
    <main className="gen2-page">
      <style>{`
        /* [3] [DET: pure_white_background] — blanc pur litteral, pas casse */
        html, body { background: #ffffff; }

        .gen2-page {
          position: relative;
          overflow: hidden;
          font-family: Roboto, Inter, -apple-system, sans-serif; /* [10] typo par defaut, sans override de marque */
        }

        /* [22] orbes lumineux/flous decoratifs derriere le hero */
        .gen2-orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.6; z-index: 0; pointer-events: none; }

        /* [1] degrade flashy violet/bleu dans le hero */
        .gen2-hero {
          position: relative;
          z-index: 1;
          padding: 96px 24px 120px;
          text-align: center;
          background: linear-gradient(135deg, #7c3aed, #3b82f6);
          color: #fff;
        }
        .gen2-hero h1 { font-size: 46px; line-height: 1.15; margin: 24px 0 16px; }
        .gen2-hero p.gen2-tagline { font-size: 19px; opacity: 0.92; max-width: 640px; margin: 0 auto 36px; }

        /* [25] fleche animee au survol */
        .gen2-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 34px; border-radius: 999px; /* [19] arrondi excessif */
          border: none; font-size: 16px; font-weight: 600; cursor: pointer;
          background: #7c3aed; color: #fff; /* [DET: ai_purple_accent] [20] violet/indigo par defaut */
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.4); /* [5] drop shadow */
          transition: transform 0.2s ease, box-shadow 0.2s ease; /* [28] hover surcharge */
        }
        .gen2-cta:hover { transform: scale(1.05); box-shadow: 0 12px 32px rgba(124, 58, 237, 0.55); }
        .gen2-cta .gen2-arrow { transition: transform 0.2s ease; display: inline-flex; }
        .gen2-cta:hover .gen2-arrow { transform: translateX(6px); }

        /* [23] trame de points en fond */
        .gen2-dotgrid {
          position: relative; z-index: 1;
          background-image: radial-gradient(circle, #d4d4d8 1.5px, transparent 1.5px);
          background-size: 22px 22px;
          padding: 80px 24px;
        }

        .gen2-section { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 80px 24px; }
        .gen2-section h2 { text-align: center; font-size: 30px; margin-bottom: 48px; }

        /* [6] exactement 3 cartes de features, [4] couleurs arc-en-ciel sans coherence,
           [11] lisere colore a gauche, [19] arrondi excessif, [5] drop shadow,
           [28] hover surcharge */
        .gen2-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .gen2-fcard {
          background: #fff; border-radius: 24px; padding: 32px;
          border-left: 4px solid #ef4444;
          box-shadow: 0 10px 28px -10px rgba(0,0,0,0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gen2-fcard:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 16px 36px -10px rgba(0,0,0,0.22); }
        .gen2-fcard:nth-child(2) { border-left-color: #eab308; }
        .gen2-fcard:nth-child(3) { border-left-color: #22c55e; }
        .gen2-fcard h3 { margin: 16px 0 8px; font-size: 18px; }
        .gen2-fcard p { margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; }

        /* [16] liste a puces avec coches */
        .gen2-checklist { list-style: none; padding: 0; margin: 24px 0 0; max-width: 420px; margin-left: auto; margin-right: auto; }
        .gen2-checklist li { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #374151; }
        .gen2-checklist .gen2-check { color: #22c55e; }

        /* [13] grille bento (boites de tailles inegales) */
        .gen2-bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 140px);
          gap: 16px;
        }
        .gen2-bento-tile {
          border-radius: 24px; /* [19] */
          padding: 24px;
          box-shadow: 0 8px 20px -8px rgba(0,0,0,0.15); /* [5] */
          display: flex; flex-direction: column; justify-content: center;
          transition: transform 0.2s ease; /* [28] */
        }
        .gen2-bento-tile:hover { transform: scale(1.02); }
        .gen2-bento-tile.gen2-big { grid-column: span 2; grid-row: span 2; background: linear-gradient(160deg, #ede9fe, #dbeafe); }
        .gen2-bento-tile.gen2-tall { grid-row: span 2; background: #fef9c3; }
        .gen2-bento-tile.gen2-wide { grid-column: span 2; background: #dcfce7; }
        .gen2-bento-tile.gen2-small { background: #fee2e2; }

        /* [8] effet "liquid glass" */
        .gen2-glass {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 28px;
          padding: 32px;
        }

        /* [14] fenetre terminal/code decorative (pas une vraie demo produit) */
        .gen2-terminal { background: #0f172a; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 40px -12px rgba(0,0,0,0.35); }
        .gen2-terminal-bar { display: flex; gap: 8px; padding: 12px 16px; background: #1e293b; }
        .gen2-terminal-dot { width: 12px; height: 12px; border-radius: 50%; }
        .gen2-terminal-body { padding: 24px; font-family: "SF Mono", Menlo, monospace; font-size: 13px; color: #94a3b8; line-height: 1.8; }
        .gen2-terminal-body .gen2-kw { color: #c084fc; }
        .gen2-terminal-body .gen2-str { color: #86efac; }

        /* [17] exactement 3 formules de prix */
        .gen2-pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .gen2-price-card {
          border-radius: 28px; padding: 36px 24px; text-align: center;
          background: #fafafa; border: 1px solid #eee;
          box-shadow: 0 8px 20px -10px rgba(0,0,0,0.1); /* [5] */
          transition: transform 0.2s ease; /* [28] */
        }
        .gen2-price-card:hover { transform: translateY(-4px); }
        .gen2-price-card.gen2-featured { background: linear-gradient(160deg, #f5f3ff, #eff6ff); border: 2px solid #7c3aed; transform: scale(1.03); }
        .gen2-price { font-size: 38px; font-weight: 700; margin: 8px 0 20px; }

        .gen2-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .gen2-testimonial { background: #fff; border-radius: 24px; padding: 26px; box-shadow: 0 8px 20px -10px rgba(0,0,0,0.12); transition: transform 0.2s ease; }
        .gen2-testimonial:hover { transform: translateY(-3px); }
        .gen2-testimonial img { width: 48px; height: 48px; border-radius: 50%; margin-bottom: 12px; } /* [12][19] */
        .gen2-testimonial p { font-size: 14px; color: #44403c; line-height: 1.6; margin: 0 0 12px; }
        .gen2-testimonial .gen2-name { font-weight: 600; font-size: 14px; }

        /* [21] "ecran de chargement" vide, sans spinner ni skeleton */
        .gen2-empty-loading { height: 160px; border: 1px dashed #e5e7eb; border-radius: 20px; background: #fff; }

        /* [29] couleur neon saturee */
        .gen2-neon-badge {
          display: inline-block; padding: 6px 14px; border-radius: 999px;
          background: #d9f99d; color: #365314; font-weight: 700; font-size: 12px;
          box-shadow: 0 0 18px 2px #a3e635; margin-bottom: 16px;
        }
      `}</style>

      <div className="gen2-orb" style={{ width: 380, height: 380, top: -120, left: -100, background: "#c4b5fd" }} />
      <div className="gen2-orb" style={{ width: 320, height: 320, top: 60, right: -140, background: "#93c5fd" }} />

      <section className="gen2-hero">
        <span className="gen2-neon-badge">🚀 v2.0 IS HERE</span>
        {/* [DET: sparkle_icon] icone Lucide Sparkles, purement decorative */}
        <div>
          <Sparkles size={40} />
        </div>
        <h1>Ce n&apos;est pas un simple outil, c&apos;est une révolution</h1>
        <p className="gen2-tagline">
          Automatisez tout — livrez plus vite — sans effort. Rejoint par des
          milliers d&apos;équipes qui réinventent leur façon de travailler —
          dès aujourd&apos;hui.
        </p>
        <button type="button" className="gen2-cta">
          Commencer gratuitement
          <ArrowRight size={18} className="gen2-arrow" />
        </button>
      </section>

      <div className="gen2-dotgrid">
        <div className="gen2-glass">
          <h2 style={{ marginTop: 0 }}>Tout ce dont vous avez besoin</h2>
          <ul className="gen2-checklist">
            <li>
              <Check size={16} className="gen2-check" /> Configuration en
              moins de 5 minutes
            </li>
            <li>
              <Check size={16} className="gen2-check" /> Intégrations
              illimitées
            </li>
            <li>
              <Check size={16} className="gen2-check" /> Support prioritaire
              24/7
            </li>
          </ul>
        </div>
      </div>

      <section className="gen2-section">
        <h2>Fonctionnalités principales</h2>
        <div className="gen2-features">
          <div className="gen2-fcard">
            {/* [DET: lucide_icons] icone Lucide brute, aucun style custom */}
            <Rocket />
            <h3>Lancement instantané</h3>
            <p>Deployez en un clic, sans configuration complexe.</p>
          </div>
          <div className="gen2-fcard">
            <Zap />
            <h3>Performance ultra-rapide</h3>
            <p>Une infrastructure pensee pour la vitesse, a toute echelle.</p>
          </div>
          <div className="gen2-fcard">
            <Shield />
            <h3>Sécurité de niveau entreprise</h3>
            <p>Chiffrement de bout en bout et conformite integree.</p>
          </div>
        </div>
      </section>

      <section className="gen2-section">
        <h2>Une mosaïque de possibilités</h2>
        <div className="gen2-bento">
          <div className="gen2-bento-tile gen2-big">
            <div style={{ fontSize: 28 }}>✨</div>
            <h3 style={{ margin: "8px 0 4px" }}>Automatisation intelligente</h3>
            <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
              Laissez l&apos;IA s&apos;occuper du reste.
            </p>
          </div>
          <div className="gen2-bento-tile gen2-tall">
            <div style={{ fontSize: 24 }}>💡</div>
            <h3 style={{ margin: "8px 0 0", fontSize: 15 }}>Idées en temps reel</h3>
          </div>
          <div className="gen2-bento-tile gen2-small">
            <div style={{ fontSize: 22 }}>🔥</div>
            <h3 style={{ margin: "8px 0 0", fontSize: 14 }}>Tendances</h3>
          </div>
          <div className="gen2-bento-tile gen2-wide">
            <div style={{ fontSize: 24 }}>🚀</div>
            <h3 style={{ margin: "8px 0 0", fontSize: 15 }}>Croissance accélérée</h3>
          </div>
        </div>
      </section>

      <section className="gen2-section">
        <h2>Aperçu de la plateforme</h2>
        {/* [18] aucune vraie demo produit — mockup decoratif abstrait, pas une
            vraie capture d'ecran de l'app */}
        <div className="gen2-terminal">
          <div className="gen2-terminal-bar">
            <span className="gen2-terminal-dot" style={{ background: "#ef4444" }} />
            <span className="gen2-terminal-dot" style={{ background: "#eab308" }} />
            <span className="gen2-terminal-dot" style={{ background: "#22c55e" }} />
          </div>
          <div className="gen2-terminal-body">
            <div>
              <span className="gen2-kw">const</span> workflow ={" "}
              <span className="gen2-kw">await</span> platform.
              <span className="gen2-str">automate</span>();
            </div>
            <div>console.log(<span className="gen2-str">&quot;Done in 2.3s&quot;</span>);</div>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 13, marginTop: 12 }}>
          Aperçu du tableau de bord — chargement des données
        </p>
        {/* [21] etat de chargement vide, sans spinner ni skeleton */}
        <div className="gen2-empty-loading" />
      </section>

      <section className="gen2-section">
        <h2>Tarification simple et transparente</h2>
        <div className="gen2-pricing">
          <div className="gen2-price-card">
            <h3>Starter</h3>
            <div className="gen2-price">0€</div>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Pour démarrer</p>
          </div>
          <div className="gen2-price-card gen2-featured">
            <h3>Pro</h3>
            <div className="gen2-price">29€</div>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Pour les équipes</p>
          </div>
          <div className="gen2-price-card">
            <h3>Enterprise</h3>
            <div className="gen2-price">Sur devis</div>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Pour les grandes structures</p>
          </div>
        </div>
      </section>

      <section className="gen2-section">
        <h2>Ils nous font confiance</h2>
        <div className="gen2-testimonials">
          <div className="gen2-testimonial">
            <img src="https://i.pravatar.cc/96?img=47" alt="" />
            <p>&quot;Une vraie révolution pour notre équipe — on ne pourrait plus s&apos;en passer.&quot;</p>
            <div className="gen2-name">Sarah M.</div>
          </div>
          <div className="gen2-testimonial">
            <img src="https://i.pravatar.cc/96?img=12" alt="" />
            <p>&quot;Mise en place en quelques minutes, résultats immédiats.&quot;</p>
            <div className="gen2-name">Alex T.</div>
          </div>
          <div className="gen2-testimonial">
            <img src="https://i.pravatar.cc/96?img=33" alt="" />
            <p>&quot;Le meilleur investissement que nous ayons fait cette année.&quot;</p>
            <div className="gen2-name">Jordan P.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
