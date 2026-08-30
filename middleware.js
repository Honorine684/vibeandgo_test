import { NextResponse } from "next/server";

// Fixture P3/C1 (checkSecurityHeaders par page) : /spa recoit des en-tetes de securite
// que le reste du site n'a pas (voir BUGS.md, bug volontaire "aucun header de securite"
// applicatif sur le reste du site, next.config.js). Sert a verifier qu'apres l'unification
// C1 le scanner teste bien ces en-tetes par page, et non plus une seule fois sur baseUrl.
export function middleware(request) {
  const response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/spa")) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
  }
  return response;
}

export const config = {
  matcher: "/spa/:path*",
};
