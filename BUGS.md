# BUGS.md — Grille de correction

Site de test **volontairement bogué**, construit avec Next.js 14 (App Router) pour valider un outil de scan QA/sécurité automatisé. Toutes les données sensibles (clés API, tokens, mots de passe) sont **fausses** — aucun vrai secret n'est présent dans ce dépôt.

## Comptes / valeurs utiles pour tester

- Identifiants mockés de connexion : `test@vibeandgo.test` / `Test1234!` (le login échoue **volontairement** même avec ces identifiants corrects — voir bug FONCT-9).
- Payload XSS de démonstration : `/recherche?q=<img src=x onerror=alert(1)>`
- Déclencheur du crash de recherche : sur `/recherche`, sélectionner la catégorie **"Inexistant"** dans le filtre.
- Open redirect de démonstration : `/redirect?to=https://example.com`
- Produit inexistant (soft 404) : `/produit/999`

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
| n'importe quelle URL inconnue | 404 réelle (`app/not-found.js`) |

---

## 🔒 SÉCURITÉ

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Toutes les pages | Sécurité | Aucun header de sécurité applicatif (CSP, X-Frame-Options, X-Content-Type-Options...) | `next.config.js` — aucune fonction `headers()` définie |
| Connexion | Sécurité | Cookie de session posé sans `Secure`, `HttpOnly` ni `SameSite` | `app/connexion/ConnexionForm.js` — `useEffect` : `document.cookie = "vg_session=..."` |
| Accueil | Sécurité | Fausse clé API visible en clair dans un commentaire HTML du code source | `app/page.js` — `dangerouslySetInnerHTML` contenant `<!-- DEBUG API_SECRET_KEY=FAKE-DO-NOT-USE-... -->` |
| Inscription | Sécurité | Mot de passe stocké en clair dans `localStorage` | `app/inscription/InscriptionForm.js` — `handleSubmit` : `localStorage.setItem("vg_user_password", form.password)` |
| Recherche | Sécurité | XSS DOM : le paramètre `?q=` est réinjecté sans échappement dans le DOM | `app/recherche/RechercheClient.js` — `dangerouslySetInnerHTML={{ __html: \`Resultats pour : ${query}\` }}` |
| Inscription / Connexion / Checkout | Sécurité | Aucune protection CSRF (pas de token, pas de header anti-CSRF) sur les formulaires | `app/inscription/InscriptionForm.js`, `app/connexion/ConnexionForm.js`, `app/checkout/CheckoutForm.js` — fonctions `handleSubmit` |
| Inscription | Sécurité | Champ "Confirmer le mot de passe" en `type="text"` au lieu de `type="password"` | `app/inscription/InscriptionForm.js` — input `confirmPassword` |
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
| Toutes les pages | SEO | Viewport non responsive (largeur fixe 1024px au lieu de `device-width`) | `app/layout.js` — `export const viewport = { width: 1024 }` |
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
| Connexion | Fonctionnel | Le login échoue systématiquement, même avec les identifiants mockés corrects | `app/connexion/ConnexionForm.js` — `handleSubmit` : `const isValid = false && ...` (court-circuit volontaire) |

## 🧱 FIABILITÉ / RENDU

| Page | Catégorie | Bug | Où dans le code |
|---|---|---|---|
| Accueil | Fiabilité | Lien interne cassé vers une page qui n'existe pas | `app/page.js` — `<a href="/a-propos">` |
| Accueil | Fiabilité | Image cassée (`src` pointant vers un fichier inexistant) | `app/page.js` — `<img src="/img/does-not-exist.png" .../>` |
| Accueil | Fiabilité | Erreur JS déclenchée automatiquement dans la console au chargement de la page | `app/page.js` — `useEffect(() => { console.log("Utilisateur courant:", currentUser.name); }, [])` (`currentUser` non défini) |
| Checkout | Fiabilité | Layout cassé en mobile : tableau à largeur fixe (900px) provoquant un débordement horizontal | `app/checkout/CheckoutForm.js` — `<table style={{ width: 900 }}>` |

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
| **Total** | **45** |

## Notes techniques

- La page 404 réelle (`app/not-found.js`) fonctionne correctement (statut 404) — elle sert de contraste volontaire avec le "soft 404" de `/produit/999`.
- Le dépôt utilise Next.js `14.2.35` (patché pour la CVE critique de contournement de middleware de la branche 14.2.x) afin d'éviter d'exposer une vraie faille exploitable sur un site public ; les bugs listés ci-dessus sont les seuls volontairement injectés.
- Hébergé sur Vercel (domaine `*.vercel.app`), la plateforme injecte automatiquement le header `Strict-Transport-Security` au niveau infra, indépendamment de la configuration de l'app — il ne peut pas être retiré ici. C'est pourquoi le bug "headers de sécurité absents" porte sur CSP / X-Frame-Options / X-Content-Type-Options (vérifiés absents), et non sur HSTS.
