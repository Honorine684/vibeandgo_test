const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Fausse cle, pour un backend de demo jetable uniquement. Aucun vrai secret.
const JWT_SECRET = "FAKE-JWT-SECRET-DO-NOT-USE-vibeandgo-test-only";

const FRONTEND_ORIGIN = "https://vibeandgotest.vercel.app";

// CORS par defaut : restreint a l'origine du frontend, sans credentials.
// Volontairement PAS applique de la meme facon sur /api/dashboard (voir plus bas).
app.use(
  cors({
    origin: [FRONTEND_ORIGIN, "http://localhost:3000"],
    credentials: false,
  })
);

const MOCK_USER = { email: "test@vibeandgo.test", password: "Test1234!" };

const FAKE_CUSTOMERS = [
  { id: 1, email: "alice@example.test", phone: "+33600000001" },
  { id: 2, email: "bob@example.test", phone: "+33600000002" },
  { id: 3, email: "chris@example.test", phone: "+33600000003" },
];

const FAKE_ORDERS = [
  { id: 1, reference: "CMD-1001", item: "Chaise scandinave", status: "Expediee" },
  { id: 2, reference: "CMD-1002", item: "Table basse", status: "En cours" },
  { id: 3, reference: "CMD-1003", item: "Lampe de bureau", status: "Livree" },
];

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Non authentifie." });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide ou expire." });
  }
}

app.get("/", (req, res) => {
  res.json({ ok: true, service: "vibeandgo-backend" });
});

// --- 1. Login fonctionnel (contrairement a l'ancien mock front qui echouait toujours) ---
app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token, user: { email } });
  }
  return res.status(401).json({ error: "Identifiants invalides." });
});

// --- 2. Zone protegee consommee par /dashboard ---
// BUG (SECURITE): CORS mal configure - Access-Control-Allow-Origin: * combine a
// Access-Control-Allow-Credentials: true sur cette route precise.
// BUG (SECURITE): Cache-Control: public sur une reponse contenant des donnees
// utilisateur sensibles (email, telephone).
app.get("/api/dashboard", requireAuth, (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Cache-Control", "public, max-age=60");
  res.json({
    user: { email: req.user.email, phone: "+33600000099" },
    orders: FAKE_ORDERS,
  });
});

// --- 6. Signal d'injection SQL (recherche de commande) ---
app.get("/api/orders/search", (req, res) => {
  const ref = String(req.query.ref || "");
  if (ref.includes("'")) {
    return res.status(500).json({
      error: 'syntax error at or near "\'"',
      detail:
        `ERROR:  unterminated quoted string at or near "'${ref}'"\n` +
        `LINE 1: SELECT * FROM orders WHERE reference = '${ref}'\n` +
        `                                                ^`,
      code: "42601",
    });
  }
  const results = FAKE_ORDERS.filter((o) =>
    o.reference.toLowerCase().includes(ref.toLowerCase())
  );
  res.json({ results });
});

// --- 3. Endpoints sondes a l'aveugle, sans authentification ---
// BUG (SECURITE): contournement d'authentification - aucune verification de session/token.
app.get("/api/customers", (req, res) => {
  res.json({ customers: FAKE_CUSTOMERS });
});

// BUG (SECURITE): fuite d'information - exception non geree, stack trace Node brute
// renvoyee au client (voir le middleware d'erreur plus bas) quand l'id ne correspond
// a aucun client.
app.get("/api/customers/:id", (req, res) => {
  const customer = FAKE_CUSTOMERS.find((c) => c.id === Number(req.params.id));
  res.json({ customer: customer.email });
});

// BUG (SECURITE): methode dangereuse (DELETE) acceptee sans authentification.
app.delete("/api/customers/:id", (req, res) => {
  const id = Number(req.params.id);
  res.status(200).json({ deleted: true, customer: { id, email: `user${id}@example.test` } });
});

// BUG (SECURITE): methode dangereuse (PUT) acceptee sans authentification.
app.put("/api/customers/:id", (req, res) => {
  const id = Number(req.params.id);
  res
    .status(200)
    .json({ updated: true, customer: { id, email: `user${id}@example.test`, ...req.body } });
});

// --- 7. Fixture de test scanner : endpoint volontairement tres lent ---
// PAS un bug du site — sert de cible pour valider le correctif "P1" du scanner
// (un scan qui n'a rien pu tester doit finir en echec/incomplet, jamais en 100/100).
// Consomme par app/slow/*.js (StallFetch) : le fetch client declenche a l'arrivee
// sur une page /slow/* reste en attente 90-180s avant de resoudre, ce qui empeche
// networkidle de se stabiliser pendant tout ce temps sans jamais bloquer la reponse
// HTTP initiale de la page elle-meme (rendue par Next.js independamment de cet appel).
app.get("/api/slow/stall", (req, res) => {
  const delayMs = 90_000 + Math.floor(Math.random() * 90_000); // 90-180s
  setTimeout(() => {
    res.json({ ok: true, delayMs });
  }, delayMs);
});

// Middleware d'erreur : renvoie volontairement la stack trace Node brute au client.
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack });
});

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`vibeandgo-backend listening on port ${PORT}`);
});

// Necessaire pour que /api/slow/stall (ci-dessus) puisse rester en attente
// jusqu'a 180s sans que Node ne coupe la connexion sous le nez d'Express.
server.timeout = 0; // pas de timeout d'inactivite socket
server.keepAliveTimeout = 185_000;
server.headersTimeout = 190_000;
