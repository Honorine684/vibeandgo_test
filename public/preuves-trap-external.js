// Fixture "JS_ERROR" (PIEGE) — ce fichier est servi depuis un AUTRE domaine
// (via jsDelivr, epingle a un commit precis) sur la page /fixtures/preuves/js-error.
// Une erreur venant d'un script tiers ne doit PAS etre signalee comme un bug
// du site teste.
const trap = 1; trap();
