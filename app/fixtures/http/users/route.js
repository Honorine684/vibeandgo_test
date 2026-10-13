import { NextResponse } from "next/server";

// Fixture "INSECURE_ENDPOINT" (VRAI) — donnees utilisateur fictives renvoyees
// sans aucune authentification.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    users: [
      { id: 1, email: "alice@example.test", role: "admin" },
      { id: 2, email: "bob@example.test", role: "member" },
    ],
  });
}
