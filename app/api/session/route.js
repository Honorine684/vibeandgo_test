import { NextResponse } from "next/server";

// FIX (SECURITE): le cookie de session est desormais pose cote serveur via l'entete
// Set-Cookie, avec les attributs HttpOnly, Secure et SameSite=Strict — impossible a
// obtenir avec un simple `document.cookie` cote client (voir ancien bug dans
// ConnexionForm.js).
export async function GET() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("vg_session", "guest-" + Date.now(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  return response;
}
