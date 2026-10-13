import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "input file sans accept" — VRAI : aucun attribut accept. PIEGE :
// attribut accept present (ne doit PAS etre signale).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve input file</title>`,
      body: `
        <h1>Preuve : champ de depot de fichier sans restriction de type</h1>
        <section>
          <h2>Cas VRAI — aucun attribut accept</h2>
          <label for="markup-file-noaccept">Fichier</label>
          <input id="markup-file-noaccept" name="file_noaccept" type="file">
        </section>
        <section>
          <h2>Piege — attribut accept present</h2>
          <label for="markup-file-accept">Fichier</label>
          <input id="markup-file-accept" name="file_accept" type="file" accept=".pdf,.jpg,.png">
        </section>
      `,
    })
  );
}
