export const metadata = {
  title: "Fixture perf lente",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fixtures "PERFORMANCE" (MAJOR, >6s) + "LCP_POOR" (>4000ms) + "FCP_SLOW" (>3000ms)
// (checklist des 64 checks). Delai artificiel cote serveur AVANT tout rendu (Server
// Component async) plutot que de compter sur une lenteur naturelle : 7s, choisi pour
// depasser les 3 seuils en une seule fixture (7000 > 6000 > 4000 > 3000).
export default async function SlowCwvPage() {
  await sleep(7000);

  return (
    <main className="container">
      <h1>Fixture : rendu lent (delai serveur ~7s)</h1>
      <p>Cette page attend volontairement avant de repondre.</p>
    </main>
  );
}
