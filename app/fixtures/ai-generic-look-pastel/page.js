export const metadata = {
  title: "Fixture palette pastel",
};

// Fixture "AI Visual Differentiation" — signe [30] "palette pastel delavee et
// sans caractere" UNIQUEMENT. Esthetique volontairement opposee a
// /fixtures/ai-generic-look (pas de degrade flashy, pas de neon, pas d'ombres
// marquees) : tons desatures, faible contraste, generique par platitude plutot
// que par surenchere visuelle.
export default function FixturesAiGenericLookPastelPage() {
  return (
    <main className="gen2p-page">
      <style>{`
        .gen2p-page { font-family: Roboto, Inter, -apple-system, sans-serif; }
        .gen2p-hero {
          padding: 96px 24px;
          text-align: center;
          background: linear-gradient(135deg, #fdf2f8, #f5f3ff, #f0f9ff);
        }
        .gen2p-hero h1 { font-size: 40px; color: #78716c; margin: 0 0 16px; font-weight: 500; }
        .gen2p-hero p { font-size: 17px; color: #a8a29e; max-width: 560px; margin: 0 auto 32px; }
        .gen2p-cta {
          display: inline-block; padding: 14px 30px; border-radius: 12px;
          border: 1px solid #e7e5e4; background: #faf9f7; color: #78716c;
          font-size: 15px;
        }
        .gen2p-section { max-width: 960px; margin: 0 auto; padding: 64px 24px; }
        .gen2p-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .gen2p-card { background: #fafaf9; border: 1px solid #f0efed; border-radius: 12px; padding: 24px; }
        .gen2p-card h3 { color: #78716c; font-size: 16px; margin: 0 0 8px; font-weight: 500; }
        .gen2p-card p { color: #a8a29e; font-size: 14px; margin: 0; line-height: 1.6; }
      `}</style>

      <section className="gen2p-hero">
        <h1>Une solution pour votre activité</h1>
        <p>Des outils simples pour accompagner votre quotidien professionnel.</p>
        <span className="gen2p-cta">En savoir plus</span>
      </section>

      <section className="gen2p-section">
        <div className="gen2p-cards">
          <div className="gen2p-card">
            <h3>Simplicité</h3>
            <p>Une expérience pensée pour rester discrète et efficace.</p>
          </div>
          <div className="gen2p-card">
            <h3>Fiabilité</h3>
            <p>Une base solide pour vos opérations de tous les jours.</p>
          </div>
          <div className="gen2p-card">
            <h3>Accompagnement</h3>
            <p>Une équipe disponible pour répondre à vos questions.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
