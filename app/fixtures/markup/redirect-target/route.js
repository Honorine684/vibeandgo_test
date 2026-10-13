// Cible de redirection utilisee par /fixtures/markup/canonical-redirect.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.redirect("https://vibeandgotest.vercel.app/fixtures/markup", 302);
}
