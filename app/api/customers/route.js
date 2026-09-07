import { NextResponse } from "next/server";

// Fixture "INSECURE_ENDPOINT" (passif) + "API_AUTH_BYPASS" (actif) — checklist des 64
// checks. Route API SAME-ORIGIN (sur Vercel, contrairement a l'endpoint Render qui est
// cross-origin et ignore par le check passif). Chemin `/api/customers` = sur la liste
// des chemins sensibles surveilles. Renvoie de vraies donnees client (id/email/phone)
// SANS aucune authentification. Appelee au montage depuis /fixtures/ui pour que le
// trafic soit observable pendant un crawl normal.
//
// N'a rien a voir avec l'endpoint Render `/api/customers` (autre host), qui lui garde
// son `requireAuth` (fix 2026-09-02 conserve).
export async function GET() {
  return NextResponse.json({
    customers: [
      { id: 1, email: "alice@example.test", phone: "+33600000001" },
      { id: 2, email: "bob@example.test", phone: "+33600000002" },
      { id: 3, email: "chris@example.test", phone: "+33600000003" },
    ],
  });
}
