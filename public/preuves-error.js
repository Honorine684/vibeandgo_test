// Fixture "JS_ERROR" (VRAI cas) — fichier separe (pas inline), execute des le
// chargement. "e" est un nombre, pas une fonction -> TypeError non rattrapee.
const e = 1; e();
