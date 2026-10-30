// Correctif isole, temporaire (voir demande) : /checkout/recu n'existait pas,
// le lien "Voir le recu" sur /checkout (CheckoutForm.js) pointait donc vers un
// 404 reel. Cette page repond 200. Le parametre ?token=... reste accepte dans
// l'adresse (Next.js l'ignore simplement s'il n'est pas lu) sans etre lu : le
// jeton visible dans l'URL reste le defaut volontaire, inchange.
export default function CheckoutRecuPage() {
  return (
    <main className="container">
      <h1>Reçu</h1>
      <p>Merci pour votre commande, votre reçu est disponible ci-dessus.</p>
    </main>
  );
}
