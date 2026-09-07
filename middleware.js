import { NextResponse } from "next/server";

// Fixture P3/C1 (checkSecurityHeaders par page) : /spa recoit des en-tetes de securite
// que le reste du site n'a pas (voir BUGS.md, bug volontaire "aucun header de securite"
// applicatif sur le reste du site, next.config.js). Sert a verifier qu'apres l'unification
// C1 le scanner teste bien ces en-tetes par page, et non plus une seule fois sur baseUrl.
//
// Fixture "AUTH_REQUIRED" (checklist des 64 checks) : /compte est protegee par un vrai
// gate cote serveur (middleware), au contraire de /dashboard qui rend toujours 200 et ne
// redirige que cote client apres coup (voir BUGS.md, fixtures 2026-08-30). La redirection
// ici a lieu AVANT tout rendu, via NextResponse.redirect() dans le middleware -> visible
// immediatement dans l'URL/le statut par un scanner qui ne lit pas apres une redirection
// JS tardive. Isolee : aucune session ne pose jamais le cookie "vg_admin_session" nulle
// part sur le site (pas de flux de login vers /compte), donc /compte redirige toujours
// vers /connexion pour un visiteur anonyme.
export function middleware(request) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/spa")) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/compte")) {
    const hasSession = request.cookies.has("vg_admin_session");
    if (!hasSession) {
      return NextResponse.redirect(new URL("/connexion", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/spa/:path*", "/compte/:path*"],
};
