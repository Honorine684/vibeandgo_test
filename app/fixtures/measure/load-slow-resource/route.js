export const dynamic = "force-dynamic";

// Sous-ressource utilisee par /fixtures/measure/load-slow : une petite image
// (1x1, non visuellement significative) retenue ~7s cote serveur. Une image
// bloque l'evenement "load" de la page jusqu'a sa resolution, independamment
// de sa taille d'affichage -> delai de chargement complet sans affecter le
// premier affichage (le HTML de la page, lui, arrive instantanement).
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 7000));
  // 1x1 PNG transparent minimal.
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
    "base64"
  );
  return new Response(pixel, {
    status: 200,
    headers: {
      "content-type": "image/png",
      "cache-control": "no-store, no-cache, must-revalidate",
    },
  });
}
