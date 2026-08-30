"use client";

import { useState } from "react";

// BUG (SECURITE): cle API/token expose en clair dans le code JS cote client.
const PAYMENT_API_KEY = "FAKE-PAYMENT-KEY-DO-NOT-USE-51H8VibeAndGoTestOnly";

export default function CheckoutForm() {
  const [form, setForm] = useState({ nom: "", email: "", adresse: "", promo: "" });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // BUG (SECURITE + FONCTIONNEL): pas de protection CSRF, et le bouton reste actif pendant
  // la soumission -> le formulaire peut etre soumis plusieurs fois de suite (pas de disabled).
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // BUG (FONCTIONNEL): fetch factice qui ne se resout jamais -> loader infini, la commande
    // ne se termine jamais.
    new Promise(() => {});
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="field">
        <label htmlFor="nom">Nom complet</label>
        <input id="nom" name="nom" value={form.nom} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="checkout-email">Email</label>
        <input id="checkout-email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="adresse">Adresse de livraison</label>
        <input id="adresse" name="adresse" value={form.adresse} onChange={handleChange} required />
      </div>

      <div className="field">
        {/*
          Fixture P3/C1 (checkFormLabels) : champ sans <label> associe (ni id+for, ni
          aria-label, ni aria-labelledby) - distinct du champ telephone sans label sur
          /inscription (couvert par checkAccessibility). Voir BUGS.md, fixtures P3.
        */}
        <input id="promo" name="promo" placeholder="Code promo" value={form.promo} onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="justificatif">Justificatif (photo, PDF...)</label>
        {/* BUG (SECURITE): upload de fichier sans aucune restriction de type ni de taille. */}
        <input id="justificatif" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>

      {/*
        BUG (SEO/OVERFLOW MOBILE): tableau recapitulatif a largeur fixe (900px) sans max-width:100%,
        ce qui provoque un debordement horizontal (scroll horizontal) sur mobile.
      */}
      <table style={{ width: 900, borderCollapse: "collapse", marginBottom: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Article</th>
            <th style={{ textAlign: "left" }}>Quantite</th>
            <th style={{ textAlign: "left" }}>Prix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chaise scandinave</td>
            <td>1</td>
            <td>89,00 EUR</td>
          </tr>
        </tbody>
      </table>

      {submitting && <p>Traitement du paiement en cours...</p>}

      {/*
        BUG (FONCTIONNEL): bouton de validation finale invisible (texte blanc sur fond blanc),
        alors qu'il est bien present et cliquable dans le DOM.
      */}
      <button type="submit" className="btn" style={{ color: "#fff", background: "#fff", border: "none" }}>
        Valider la commande
      </button>

      {/* BUG (SECURITE): token/cle API visible directement dans l'URL. */}
      <p style={{ marginTop: 12 }}>
        <a href={`/checkout/recu?token=${PAYMENT_API_KEY}`}>Voir le recu</a>
      </p>
    </form>
  );
}
