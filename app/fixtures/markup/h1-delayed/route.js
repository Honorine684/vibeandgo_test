import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "1 seul h1, rendu apres un fetch de 1s" (PIEGE) — aucun h1 au premier
// rendu HTML ; un script vanilla JS insere un unique <h1> une fois que
// /fixtures/markup/h1-delayed-data (tenu ~1s cote serveur) a repondu. Le
// scanner doit attendre ce resultat plutot que de signaler "h1 absent".
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve h1 differe</title>`,
      body: `
        <div id="h1-slot"></div>
        <p>Preuve : un unique h1 est insere apres un fetch reseau de ~1s.</p>
        <script>
          fetch("/fixtures/markup/h1-delayed-data")
            .then((r) => r.json())
            .then((data) => {
              var h1 = document.createElement("h1");
              h1.textContent = data.title;
              document.getElementById("h1-slot").appendChild(h1);
            });
        </script>
      `,
    })
  );
}
