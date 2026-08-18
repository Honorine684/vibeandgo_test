import { NextResponse } from "next/server";

// FIX (SECURITE): le cookie de session est pose cote serveur via l'entete Set-Cookie,
// avec HttpOnly et Secure — impossible a obtenir avec un simple `document.cookie` cote
// client (voir ancien bug dans ConnexionForm.js).
// BUG (SECURITE): SameSite=None reintroduit volontairement pour tester la detection CSRF
// du scanner — le cookie est desormais envoye sur les requetes cross-site.
export async function GET() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("vg_session", "guest-" + Date.now(), {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return response;
}
