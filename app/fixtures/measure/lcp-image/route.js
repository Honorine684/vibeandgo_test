import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

// Fixture "LCP lent" (VRAI) — sert l'image d'en-tete (public/measure-hero.jpg)
// apres une retenue serveur de ~5s. Le HTML de la page arrive instantanement,
// mais le plus grand element visible (cette image) ne peut peindre qu'une
// fois ces octets arrives -> LCP mecaniquement > 5s.
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const bytes = await readFile(path.join(process.cwd(), "public", "measure-hero.jpg"));
  return new Response(bytes, {
    status: 200,
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "no-store, no-cache, must-revalidate",
    },
  });
}
