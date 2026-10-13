import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "champ mot de passe autocomplete=on" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve autocomplete mot de passe</title>`,
      body: `
        <h1>Preuve : champ mot de passe avec autocomplete="on"</h1>
        <form>
          <label for="markup-password">Mot de passe</label>
          <input id="markup-password" name="password" type="password" autocomplete="on">
        </form>
      `,
    })
  );
}
