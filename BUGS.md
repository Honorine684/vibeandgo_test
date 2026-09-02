# BUGS.md — Grille de correction

Site de test **volontairement bogué**, construit avec Next.js 14 (App Router) pour valider un outil de scan QA/sécurité automatisé. Toutes les données sensibles (clés API, tokens, mots de passe) sont **fausses** — aucun vrai secret n'est présent dans ce dépôt.

**Frontend** : https://vibeandgotest.vercel.app
**Backend** : https://vibeandgo-backend.onrender.com (Node/Express, déployé séparément sur Render — voir dossier `backend/`)

> Le backend est hébergé sur le tier gratuit de Render : la première requête après une période d'inactivité peut prendre 30-60s (cold start).

## ✅ Bugs corrigés (test de résolution automatique)

Un échantillon représentatif (1 par catégorie) a été **réellement corrigé** le 2026-08-13 pour valider qu'un scanner re-scanné détecte bien la disparition du bug et le marque comme résolu, plutôt que de simplement tester les faux négatifs sur bugs encore présents. Les 41 autres bugs du tableau restent intacts.

| Bug | Catégorie | Fix appliqué | Où |
|---|---|---|---|
| XSS DOM sur `/recherche?q=` | Sécurité | `dangerouslySetInnerHTML` remplacé par de l'interpolation React classique (`{query}`), échappée automatiquement | `app/recherche/RechercheClient.js` |
| Cookie de session sans Secure/HttpOnly/SameSite | Sécurité | Cookie posé côté serveur via un Route Handler (`Set-Cookie` avec `HttpOnly; Secure; SameSite=Strict`) au lieu de `document.cookie` côté client | `app/api/session/route.js` (nouveau), `app/connexion/ConnexionForm.js` |
| Viewport non responsive (`width=1024`) | SEO | Remis à `width=device-width, initial-scale=1` | `app/layout.js` |
| Lien mort `/a-propos` | Fiabilité | Page `/a-propos` créée (contenu réel, statut 200) | `app/a-propos/page.js` (nouveau) |

Les lignes correspondantes dans les tableaux ci-dessous sont marquées **[CORRIGÉ]**.

Par ailleurs, le login (`test@vibeandgo.test` / `Test1234!`) a été rendu **réellement fonctionnel** le 2026-08-14 avec l'ajout du backend (voir section API/Backend ci-dessous) — l'ancien bug "le login échoue systématiquement" est donc aussi marqué [CORRIGÉ].

## Comptes / valeurs utiles pour tester

- Identifiants mockés de connexion : `test@vibeandgo.test` / `Test1234!` — **le login fonctionne réellement** (backend Express + JWT), redirige vers `/dashboard`.
- Payload XSS de démonstration : `/recherche?q=<img src=x onerror=alert(1)>`
- Déclencheur du crash de recherche : sur `/recherche`, sélectionner la catégorie **"Inexistant"** dans le filtre.
- Open redirect de démonstration : `/redirect?to=https://example.com`
- Produit inexistant (soft 404) : `/produit/999`
- Signal d'injection SQL : champ de recherche sur `/dashboard`, essayer une référence contenant une apostrophe, ex. `vibe'test`, ou directement `GET https://vibeandgo-backend.onrender.com/api/orders/search?ref=vibe'test`

## Pages du site

| Route | Description |
|---|---|
| `/` | Accueil |
| `/inscription` | Inscription |
| `/connexion` | Connexion |
| `/recherche` | Recherche produits |
| `/checkout` | Formulaire de commande / paiement |
| `/produit/[id]` | Fiche produit (utilisée pour le bug "soft 404") |
| `/redirect?to=` | Utilitaire de redirection (open redirect) |
| `/dashboard` | Espace client protégé par connexion (backend) |
| n'importe quelle URL inconnue | 404 réelle (`app/not-found.js`) |

---

## 🔒 SÉCURITÉ

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Toutes les pages | Sécurité | Aucun header de sécurité applicatif (CSP, X-Frame-Options, X-Content-Type-Options...) | `next.config.js` — aucune fonction `headers()` définie |
| Connexion | Sécurité | **[CORRIGÉ, partiellement ré-ouvert]** ~~Cookie de session posé sans `Secure`, `HttpOnly` ni `SameSite`~~ — `HttpOnly`/`Secure` restent actifs, mais `SameSite` a été repassé à `None` le 2026-08-18 pour tester si le scanner détecte le CSRF que ça réintroduit | `app/connexion/ConnexionForm.js` + `app/api/session/route.js` |
| Accueil | Sécurité | Fausse clé API visible en clair dans un commentaire HTML du code source | `app/page.js` — `dangerouslySetInnerHTML` contenant `<!-- DEBUG API_SECRET_KEY=FAKE-DO-NOT-USE-... -->` |
| Inscription | Sécurité | Mot de passe stocké en clair dans `localStorage` | `app/inscription/InscriptionForm.js` — `handleSubmit` : `localStorage.setItem("vg_user_password", form.password)` |
| Recherche | Sécurité | **[CORRIGÉ]** ~~XSS DOM : le paramètre `?q=` est réinjecté sans échappement dans le DOM~~ | `app/recherche/RechercheClient.js` |
| Inscription / Connexion / Checkout | Sécurité | Aucune protection CSRF (pas de token, pas de header anti-CSRF) sur les formulaires. Depuis le 2026-08-18, `SameSite=None` sur le cookie de session (voir ligne ci-dessus) rend ce signal effectivement exploitable, pour tester si le scanner le détecte | `app/inscription/InscriptionForm.js`, `app/connexion/ConnexionForm.js`, `app/checkout/CheckoutForm.js` — fonctions `handleSubmit` ; `app/api/session/route.js` |
| Inscription | Sécurité | **[CORRIGÉ 2026-09-01]** ~~Champ "Confirmer le mot de passe" en `type="text"` au lieu de `type="password"`~~ — input `confirmPassword` repassé en `type="password"` | `app/inscription/InscriptionForm.js` — input `confirmPassword` |
| Connexion | Sécurité | Aucune limite de tentatives de connexion (pas de compteur, pas de verrouillage, pas de captcha) | `app/connexion/ConnexionForm.js` — `handleSubmit` |
| Checkout | Sécurité | Clé API exposée en clair dans le code JS client, et token visible dans l'URL | `app/checkout/CheckoutForm.js` — `const PAYMENT_API_KEY = "FAKE-PAYMENT-KEY-DO-NOT-USE-..."` et `href={`/checkout/recu?token=${PAYMENT_API_KEY}`}` |
| Accueil | Sécurité | Mixed content : ressource chargée en `http://` sur une page servie en HTTPS | `app/page.js` — `<img src="http://www.w3.org/Icons/w3c_home" .../>` |
| Checkout | Sécurité | Upload de fichier sans restriction de type ni de taille | `app/checkout/CheckoutForm.js` — `<input type="file" .../>` (pas d'`accept`, pas de contrôle de taille) |
| Redirect | Sécurité | Redirection ouverte (open redirect) via le paramètre `?to=` | `app/redirect/RedirectClient.js` — `window.location.href = to` sans validation/liste blanche |

## 🔍 SEO

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Checkout | SEO | Page sans balise `<title>` (le titre est totalement absent du `<head>`) | `app/checkout/page.js` — `metadata = { title: { absolute: "" }, ... }` |
| Connexion | SEO | Page sans meta description | `app/connexion/page.js` — `metadata = { ..., description: "" }` |
| Recherche | SEO | Page sans aucun `<h1>` (seulement des `<h2>` / texte stylé) | `app/recherche/page.js` |
| Accueil | SEO | Page avec deux balises `<h1>` | `app/page.js` — deux `<h1>` consécutifs |
| Toutes les pages | SEO | Aucune balise Open Graph (`og:title`, `og:image`, etc.) | `app/layout.js` — objet `metadata` sans champ `openGraph` |
| Toutes les pages | SEO | **[CORRIGÉ]** ~~Viewport non responsive (largeur fixe 1024px au lieu de `device-width`)~~ | `app/layout.js` |
| Toutes les pages | SEO | Balise `<html>` sans attribut `lang` | `app/layout.js` — `<html>` |
| Site entier | SEO | Pas de `robots.txt` ni de `sitemap.xml` | Absence de `app/robots.js`/`public/robots.txt` et `app/sitemap.js`/`public/sitemap.xml` |
| Site entier | SEO | Pas de favicon | Absence de `app/favicon.ico` / `public/favicon.ico` |
| Toutes les pages (footer) | SEO | Lien `target="_blank"` sans `rel="noopener"` | `app/layout.js` — `<a href="https://example.com" target="_blank">` |
| Toutes les pages (footer) | SEO | Lien constitué uniquement d'une icône, sans texte visible ni `aria-label` | `app/layout.js` — même lien, contenu `🔗` uniquement |
| Produit (`/produit/999`) | SEO | Fausse page 404 ("soft 404") : affiche "Produit introuvable" mais renvoie un statut HTTP 200 | `app/produit/[id]/page.js` — retourne du JSX sans jamais appeler `notFound()` |

## ⚡ PERFORMANCE

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Accueil | Performance | Image "above the fold" énorme (4000x3000, plusieurs Mo) chargée sans optimisation (`<img>` brut, pas de `next/image`) | `app/page.js` — `<img src="https://picsum.photos/id/1015/4000/3000" .../>` |
| Accueil | Performance | `loading="lazy"` appliqué à une image visible immédiatement à l'écran (mauvaise gestion du lazy-loading) | `app/page.js` — même `<img>`, attribut `loading="lazy"` |
| Accueil | Performance | Bundle JS gonflé par l'import complet de lodash pour une seule fonction | `app/page.js` — `import _ from "lodash"` |
| Accueil | Performance | Layout shift volontaire : bannière apparaissant après 2s sans espace réservé | `app/page.js` — `useEffect` + `setTimeout(() => setShowBanner(true), 2000)` |

## ♿ ACCESSIBILITÉ

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Accueil | Accessibilité | Image sans attribut `alt` | `app/page.js` — `<img src="https://picsum.photos/id/20/80/40" />` (logo partenaire) |
| Inscription | Accessibilité | Champ de formulaire (téléphone) sans `<label>` associé | `app/inscription/InscriptionForm.js` — input `phone` (placeholder uniquement) |
| Toutes les pages (footer) | Accessibilité | Contraste très faible, texte gris clair sur fond blanc | `app/globals.css` — classe `.fine-print { color: #e0e0e0; }`, utilisée dans `app/layout.js` |
| Recherche | Accessibilité | Boutons de pagination trop petits pour le tactile (16x16px, sous les 24px recommandés) | `app/recherche/RechercheClient.js` — boutons `‹` / `›`, `style={{ width: 16, height: 16 }}` |

## 🖱️ FONCTIONNEL / INTERACTIF

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Connexion | Fonctionnel | Le flux "mot de passe oublié" plante (appel à une fonction inexistante) | `app/connexion/ConnexionForm.js` — `handleForgotPassword` appelle `sendPasswordResetEmail(email)` (non définie) |
| Inscription | Fonctionnel | Aucun message de confirmation après l'inscription | `app/inscription/InscriptionForm.js` — `handleSubmit` réinitialise le formulaire sans aucun retour visuel |
| Checkout | Fonctionnel | Loader qui tourne indéfiniment (faux fetch qui ne résout jamais) | `app/checkout/CheckoutForm.js` — `handleSubmit` : `new Promise(() => {})` |
| Recherche | Fonctionnel | La recherche renvoie une erreur / page blanche (catégorie "Inexistant") | `app/recherche/RechercheClient.js` — `categoryResults[0].toUpperCase()` accédé sans vérifier que le tableau n'est pas vide |
| Checkout | Fonctionnel | Formulaire soumissible plusieurs fois de suite (bouton jamais désactivé) | `app/checkout/CheckoutForm.js` — bouton `submit` sans attribut `disabled={submitting}` |
| Recherche | Fonctionnel | Pagination cassée : les boutons "Suivant"/"Précédent" ne changent jamais la page | `app/recherche/RechercheClient.js` — `onClick={() => {}}` |
| Recherche | Fonctionnel | Liste "Recherches récentes" toujours vide, sans message explicatif | `app/recherche/RechercheClient.js` — `const recentSearches = []` rendue sans état vide géré |
| Checkout | Fonctionnel | Bouton de validation finale invisible (texte blanc sur fond blanc) | `app/checkout/CheckoutForm.js` — bouton `submit`, `style={{ color: "#fff", background: "#fff" }}` |
| Connexion | Fonctionnel | **[CORRIGÉ]** ~~Le login échoue systématiquement, même avec les identifiants mockés corrects~~ | `app/connexion/ConnexionForm.js` + `backend/server.js` (`POST /api/login`) |

## 🧱 FIABILITÉ / RENDU

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Accueil | Fiabilité | **[CORRIGÉ]** ~~Lien interne cassé vers une page qui n'existe pas~~ | `app/page.js` — `<a href="/a-propos">` + `app/a-propos/page.js` |
| Accueil | Fiabilité | Image cassée (`src` pointant vers un fichier inexistant) | `app/page.js` — `<img src="/img/does-not-exist.png" .../>` |
| Accueil | Fiabilité | Erreur JS déclenchée automatiquement dans la console au chargement de la page | `app/page.js` — `useEffect(() => { console.log("Utilisateur courant:", currentUser.name); }, [])` (`currentUser` non défini) |
| Checkout | Fiabilité | Layout cassé en mobile : tableau à largeur fixe (900px) provoquant un débordement horizontal | `app/checkout/CheckoutForm.js` — `<table style={{ width: 900 }}>` |

## 🔌 API / BACKEND

Backend Node/Express séparé, déployé sur Render : `https://vibeandgo-backend.onrender.com`. Ajouté le 2026-08-14 pour donner du contenu réel aux checks de sécurité API (auth, CORS, cache, erreurs serveur) — le reste du site restait purement statique jusqu'ici.

| Page / Endpoint | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| `GET /api/customers` | Sécurité | **[CORRIGÉ 2026-09-02]** ~~Contournement d'authentification : liste des clients renvoyée sans token~~ — `requireAuth` ajouté, 401 sans session. Fix conservé (comportement correct, pas une fixture à revert). | `backend/server.js` — `app.get("/api/customers", requireAuth, ...)` |
| `GET /api/customers/:id` | Sécurité / Fiabilité | **[CORRIGÉ 2026-09-02 — accès anonyme]** `requireAuth` ajouté → 401 sans token (plus de stack trace pour un anonyme). ⚠️ La fuite de stack trace sur id inconnu reste atteignable **avec un token valide** (`customer.email` accédé sans vérifier `customer`). | `backend/server.js` — `app.get("/api/customers/:id", requireAuth, ...)` ; `customer.email` toujours non gardé |
| `DELETE /api/customers/:id` | Sécurité | Méthode destructive acceptée sans authentification, renvoie un corps JSON réaliste | `backend/server.js` — route `app.delete("/api/customers/:id", ...)` sans `requireAuth` |
| `PUT /api/customers/:id` | Sécurité | Méthode de modification acceptée sans authentification, renvoie l'objet modifié (y compris des champs injectés par le client) | `backend/server.js` — route `app.put("/api/customers/:id", ...)` sans `requireAuth`, `...req.body` fusionné tel quel |
| `GET /api/dashboard` (appelé par `/dashboard`) | Sécurité | CORS mal configuré : `Access-Control-Allow-Origin: *` combiné à `Access-Control-Allow-Credentials: true` sur cette route précise (contrairement au reste du backend, restreint à l'origine du frontend) | `backend/server.js` — `res.set("Access-Control-Allow-Origin", "*")` + `res.set("Access-Control-Allow-Credentials", "true")` dans la route `/api/dashboard` |
| `GET /api/dashboard` (appelé par `/dashboard`) | Sécurité | `Cache-Control: public` sur une réponse contenant des données utilisateur sensibles (email, téléphone) | `backend/server.js` — `res.set("Cache-Control", "public, max-age=60")`, corps `{ user: { email, phone }, orders }` |
| `GET /api/orders/search?ref=` (appelé par `/dashboard`) | Sécurité | Signal d'injection SQL : une valeur contenant une apostrophe non fermée renvoie une erreur 500 avec un message imitant un vrai message Postgres (`syntax error ... code 42601`) | `backend/server.js` — route `app.get("/api/orders/search", ...)`, condition `ref.includes("'")` |

---

## Récapitulatif

| Catégorie | Nombre de bugs |
|---|---|
| Sécurité | 12 |
| SEO | 12 |
| Performance | 4 |
| Accessibilité | 4 |
| Fonctionnel / Interactif | 9 |
| Fiabilité / Rendu | 4 |
| API / Backend | 7 |
| **Total** | **52** |

5 de ces 52 bugs sont désormais **[CORRIGÉ]** (4 de la section dédiée en haut du fichier + le login, corrigé avec l'ajout du backend) — 47 restent actifs pour la suite des tests.

## Notes techniques

- La page 404 réelle (`app/not-found.js`) fonctionne correctement (statut 404) — elle sert de contraste volontaire avec le "soft 404" de `/produit/999`.
- Le dépôt utilise Next.js `14.2.35` (patché pour la CVE critique de contournement de middleware de la branche 14.2.x) afin d'éviter d'exposer une vraie faille exploitable sur un site public ; les bugs listés ci-dessus sont les seuls volontairement injectés.
- Hébergé sur Vercel (domaine `*.vercel.app`), la plateforme injecte automatiquement le header `Strict-Transport-Security` au niveau infra, indépendamment de la configuration de l'app — il ne peut pas être retiré ici. C'est pourquoi le bug "headers de sécurité absents" porte sur CSP / X-Frame-Options / X-Content-Type-Options (vérifiés absents), et non sur HSTS.
- Le backend (`backend/server.js`) utilise un secret JWT codé en dur et factice (`FAKE-JWT-SECRET-DO-NOT-USE-...`), pour rester cohérent avec le reste du site (aucun vrai secret nulle part). Le CORS par défaut du backend est correctement restreint à l'origine du frontend (`vibeandgotest.vercel.app`) — seule la route `/api/dashboard` a le CORS volontairement mal configuré (voir section API/Backend).
- Le backend est déployé sur le tier gratuit de Render, qui met le service en veille après inactivité (cold start ~30-60s sur la première requête).

## 🧪 Fixtures de test scanner (2026-08-30, pas des bugs du site)

Ajoutées pour valider le correctif P1 du scanner : *"le scanner ne doit plus jamais faire passer un non-résultat pour un bon résultat"*. Volontairement **isolées** du reste du site (aucune page hors de `/slow/*` n'y renvoie), pour ne pas perturber les scans normaux de `vibeandgotest.vercel.app`.

| Fixture | Comportement | Où |
|---|---|---|
| `/slow/`, `/slow/a`, `/slow/b`, `/slow/c` | Répondent en HTTP brut en quelques centaines de ms (un `fetch()` simple passe), mais chaque page déclenche côté client un appel qui ne résout qu'après 90-180s — le réseau du navigateur ne devient jamais "au repos" avant ça. Un scan qui attend cette stabilité avant de tester quoi que ce soit doit donc épuiser son budget temps sur ces pages. | `app/slow/page.js`, `app/slow/a\|b\|c/page.js`, `app/slow/StallFetch.js` (déclencheur client) + `backend/server.js` — route `GET /api/slow/stall` (délai serveur 90-180s, timeouts Node relevés en conséquence) |
| `GET /dashboard` et `GET /api/dashboard` sans JWT | `/api/dashboard` (backend) renvoie **401** sans token — confirmé en direct. `/dashboard` (frontend Next.js) renvoie en revanche **200** dans tous les cas : la page est rendue côté serveur sans aucune vérification d'auth (le JWT vit dans `localStorage`, inaccessible en SSR) ; c'est `DashboardClient.js` qui redirige côté client vers `/connexion` **après coup**, en JS, une fois la page déjà chargée. Donc un scan sans identifiants qui teste `/dashboard` en HTTP brut verra un 200 avec un shell HTML vide ("Chargement..."), pas un 401 — la détection "zone non atteinte" doit se baser sur `/api/dashboard`, pas sur la route front. | `backend/server.js` (`requireAuth`), `app/dashboard/page.js` + `DashboardClient.js` |
| `/crash/` | **Non implémentée.** Faire planter un onglet de façon fiable en headless (grosses allocations, DOM sans fin) dépend trop de l'environnement (limites mémoire du conteneur, comportement du GC, Chromium qui tue proprement l'onglet plutôt que de vraiment crasher) pour être un test reproductible. À valider par revue de code plutôt que sur le site, comme convenu. |

**Vérifié en direct le 2026-08-30** : `/slow`, `/slow/a`, `/slow/b`, `/slow/c` répondent bien en ~1s en HTTP brut. `GET /api/slow/stall` a tenu la connexion 130 055ms (dans la fenêtre 90-180s prévue) sans être coupée par Render ni par Cloudflare devant, et renvoie 200 avec le bon CORS pour l'origine du frontend. Deux redéploiements manuels ont été nécessaires (webhook GitHub→Vercel et build Render tous deux restés bloqués sur l'ancien code après le push) — rien à signaler côté comportement de la fixture elle-même une fois en prod.

**Constat en croisant un scan complet du 2026-08-30 14:14** : `/slow` et `/slow/a` se sont fait ramasser par un crawl normal (pas ciblé sur `/slow/` en racine) sans faire échouer le scan ni générer de bandeau "incomplet" — tous les findings remontés dessus (lien 🔗 sans texte, `lang` manquant, contraste, cibles tactiles) sont des éléments du layout partagé visibles dès `domcontentloaded`, avant que le fetch de 90-180s ne bloque quoi que ce soit. Ça suggère que ce scanner extrait ses findings DOM/SEO/a11y sans attendre `networkidle` pour tout son pipeline — seuls les checks qui en dépendent réellement (spinner, soumission de formulaire) seraient bloqués. Le vrai test de baseline nécessite de pointer le crawl sur `/slow/` comme racine, pas de compter sur une découverte incidente.

## 🧪 Fixtures P2 (2026-08-30, pas des bugs du site)

Ajoutées pour valider 3 corrections "P2" du scanner (rapport qui ment sur ce qu'il a réellement testé) :

| Fixture | Comportement | Où |
|---|---|---|
| **P2.1 — page fantôme** | Lien mort `/promo-2024` ajouté dans le footer (partagé, toutes les pages). La page 404 globale (`app/not-found.js`) a un vrai `<title>` et du texte visible, mais **volontairement pas de `<h1>`** — sert à vérifier que le scanner ne remonte plus de findings "contenu" (h1, lang...) sur une page qui n'existe pas, tout en gardant le finding "lien cassé" lui-même. `/a-propos` (dans la grille de bugs ci-dessus, marqué corrigé) est **réellement en ligne** depuis le 2026-08-13 — ce n'est plus un lien mort, il ne peut plus servir à ce test. | `app/layout.js` (lien footer), `app/not-found.js` |
| **P2.2 — plantage moteur-spécifique** | `app/EngineTrap.js`, monté dans `app/layout.js`, détecte le vrai WebKit/Safari (regex UA excluant Chrome/Firefox qui contiennent aussi "Safari") et appelle `window.chrome.loadTimes()` (API Chrome-only, absente sur WebKit) sans garde → exception non rattrapée au montage. Aucun `error.js`/`global-error.js` dans ce dépôt → Next.js remplace toute la page (header/nav compris) par son fallback d'erreur générique sur cet appareil, à chaque page chargée. Chrome et Firefox ne sont pas affectés. | `app/EngineTrap.js`, monté dans `app/layout.js` |
| **P2.3 — connexion confirmée** | Aucun changement nécessaire : `ConnexionForm.js` fait déjà `router.push("/dashboard")` (changement d'URL réel) après un login réussi. **Attention** : les identifiants corrects sont `test@vibeandgo.test` / `Test1234!` — pas `test@vibeandgotest.test` comme écrit dans la demande initiale, ce mail-là n'existe pas côté backend et échouerait le test. | `app/connexion/ConnexionForm.js` (inchangé) |

**Vérif prod à faire après déploiement** :
- `curl -i https://vibeandgotest.vercel.app/promo-2024` → 404, contenu réel, aucun `<h1>` dans le HTML.
- Scan WebKit (iPad/iPhone Safari) → devrait crawler ~1 page contre ~8 pour Chrome/Firefox sur le même run.
- Login avec `test@vibeandgo.test` / `Test1234!` → redirection vers `/dashboard` confirmée par changement d'URL.

**Statut 2026-08-31** : les 3 fixes P2 sont confirmés actifs en production (scan du 2026-08-30 22:34) — P2.1 en particulier n'apparaissait plus corrigé sur les 2 scans précédents (21:32 et 22:15), confirmé le 3e essai. `/promo-2024` et `/checkout/recu` ne remontent plus que leur finding `BROKEN_LINK`, plus aucun faux finding de contenu (h1/lang/liens/contraste/tap-targets), et un nouveau bandeau confirme le retrait explicite des pages mortes de l'analyse.

## 🧪 Fixtures P3 (2026-08-31, pas des bugs du site) — C1

Ajoutées pour valider la phase C1 du scanner : unification de la suite de checks (une seule fonction, appelée à la fois par le crawl MPA et le crawl SPA — aujourd'hui certains checks ne tournent que dans l'un des deux chemins). Le site de test est en Next.js App Router = chemin MPA par défaut, donc 3 checks n'y tournent jamais aujourd'hui ; 2 autres ne tournent qu'une fois sur `baseUrl` côté SPA.

| Fixture | Check visé | Où |
|---|---|---|
| `<link rel="canonical">` sur `/a-propos` pointant vers `/a-propos-2019` (404) | `checkCanonical` | `app/a-propos/page.js` — `metadata.alternates.canonical` |
| Sélecteur de langue site-wide (footer, FR/EN) vers une vraie page `/en`, sans aucune balise `hreflang` nulle part | `checkHreflang` | `app/layout.js` (lien footer), `app/en/page.js` (nouveau) |
| Champ "Code promo" sur `/checkout` sans `<label>`, sans `aria-label`, sans `aria-labelledby` — distinct du champ téléphone sans label sur `/inscription` (celui-là couvert par `checkAccessibility`, pas `checkFormLabels`) | `checkFormLabels` | `app/checkout/CheckoutForm.js` — input `promo` |
| Sous-page `/spa` avec des en-têtes de sécurité (`X-Frame-Options`, `X-Content-Type-Options`) absents du reste du site (voir bug sitewide existant, `next.config.js`) | `checkSecurityHeaders` par page | `middleware.js` (nouveau, `matcher: "/spa/:path*"`) |
| Formulaire sur `/spa` (pseudo → aperçu) réinjectant la valeur soumise sans échappement (`dangerouslySetInnerHTML`), distinct du XSS déjà corrigé sur `/recherche?q=` | `checkFormXss` / `checkReflectedUrlXss` par page | `app/spa/page.js`, `app/spa/SpaClient.js` (nouveaux) |

`/spa` sert aussi de point d'entrée pour la fixture C2-A (section 100% CSR à venir : `/spa/tableau`, `/spa/reglages`, `/spa/facture` via routeur client, pas de page Next correspondante). Lien découvrable depuis le footer (toutes les pages).

**À vérifier en prod après déploiement** :
- `curl -i https://vibeandgotest.vercel.app/a-propos` → `<link rel="canonical" href=".../a-propos-2019">` présent dans le `<head>`, et `/a-propos-2019` renvoie bien 404.
- `curl -i https://vibeandgotest.vercel.app/en` → 200, contenu réel, aucune balise `hreflang` dans le HTML ni sur `/`.
- `curl -i https://vibeandgotest.vercel.app/checkout` → input `id="promo"` présent, sans `<label for="promo">` ni `aria-label`/`aria-labelledby` associé.
- `curl -i https://vibeandgotest.vercel.app/spa` → présence de `X-Frame-Options: DENY` et `X-Content-Type-Options: nosniff` dans les headers de réponse, absents sur `curl -i https://vibeandgotest.vercel.app/`.
- Sur `/spa`, saisir `<img src=x onerror=alert(1)>` dans le champ pseudo, soumettre → payload injecté tel quel dans le DOM (aperçu), non échappé.

## 🧪 Fixtures P3 (2026-08-31, pas des bugs du site) — C2

Ajoutées pour valider la phase C2 du scanner : fusion des deux boucles de crawl (une seule boucle qui décide par URL — `goto` d'abord, et si le sous-chemin renvoie 404 sans catch-all serveur, fallback sur navigation via le routeur client) et suppression de `detectAppType`. Construit sur `/spa` (déjà en place pour C1, gardé).

| Fixture | Comportement | Où |
|---|---|---|
| Routeur 100% client sous `/spa` | `/spa` reste une vraie page Next.js (server-rendered). `/spa/tableau`, `/spa/reglages`, `/spa/facture` n'ont **aucune** route Next.js correspondante : un `GET` direct renvoie la 404 standard. La nav interne au shell (`SpaApp.js`) intercepte le clic (`preventDefault` + `window.history.pushState`), change l'URL et le contenu affiché sans jamais passer par le routeur Next.js ni recharger la page — les 3 liens (`<a href="/spa/tableau">` etc.) sont présents dans le HTML servi par `/spa` dès le premier chargement (pas conditionnés à l'hydratation), donc toujours visibles même sans exécuter le JS. | `app/spa/page.js` (server), `app/spa/SpaApp.js` (nouveau, client) |
| Champ sans label sur `/spa/facture` | Input `reference` (placeholder "Reference de facture") sans `<label>`, `aria-label` ni `aria-labelledby` — sur la vue "Facture", atteignable uniquement via le routeur client. Sert à vérifier que le finding `checkFormLabels` est bien attribué à `/spa/facture` (l'URL réellement affichée) et pas à `/spa` (l'URL du dernier vrai chargement serveur). | `app/spa/SpaApp.js` — vue `facture` |
| Hydratation lente | Pas de nouvelle fixture : `/slow/*` (voir plus haut, fixtures P1) sert déjà ce rôle — réponse HTTP rapide mais réseau jamais "au repos" avant 90-180s côté navigateur. Choisi plutôt qu'un délai artificiel sur les 3 liens de `/spa`, qui aurait fait disparaître ces liens du HTML initial et cassé la vérif `curl` ci-dessous. | `app/slow/*` (inchangé) |

**Ce qui ne change pas** : les fixtures MPA existantes (canonical, hreflang, form labels sur `/checkout`/`/inscription`, en-têtes par page, XSS `/recherche` et `/spa`) sont intactes — aucun fichier de ces routes n'a été touché pour C2, en dehors de `app/spa/page.js`/`SpaApp.js` eux-mêmes (le formulaire XSS de `/spa`, `SpaClient.js`, est réutilisé tel quel dans la vue "home" du nouveau shell).

**À vérifier en prod après déploiement** :
- `curl -sI https://vibeandgotest.vercel.app/spa/tableau` → `404`.
- `curl -sI https://vibeandgotest.vercel.app/spa/reglages` → `404`.
- `curl -sI https://vibeandgotest.vercel.app/spa/facture` → `404`.
- `curl -s https://vibeandgotest.vercel.app/spa | grep -o 'href="/spa/[a-z]*"'` → les 3 liens (`/spa/tableau`, `/spa/reglages`, `/spa/facture`) présents dans le HTML brut.
- Dans un navigateur réel, sur `/spa`, cliquer "Facture" → l'URL devient `/spa/facture` sans rechargement (onglet réseau : aucune requête de navigation), le champ "Reference de facture" est visible sans `<label>` associé.
