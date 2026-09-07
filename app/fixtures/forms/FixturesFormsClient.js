"use client";

import { useState } from "react";
import { API_URL } from "../../lib/api";

export default function FixturesFormsClient() {
  const [preview, setPreview] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fixture "FORM_ERROR" (checklist des 64 checks). Champ requis, aucun bouton
  // submit visible nulle part dans ce formulaire — le seul moyen de "valider" est
  // la touche Entree, jamais expose visuellement a l'utilisateur.
  function handlePreviewSubmit(e) {
    e.preventDefault();
  }

  // Fixtures "DUPLICATE_SUBMIT" + "INSECURE_FORM_FIELD" (checklist des 64 checks), sur
  // ce formulaire newsletter :
  // - le bouton reste actif pendant "submitting" (pas de disabled), et POST reellement
  //   vers /api/newsletter a chaque clic, sans deduplication cote serveur ni client ->
  //   un double-clic envoie deux requetes identiques. Le handler /api/newsletter attend
  //   ~3,5s (voir backend/server.js) pour que l'etat "Envoi..." tienne pendant le
  //   double-clic.
  // - le champ "passwordHint" ci-dessous n'a aucun rapport avec un vrai mot de passe,
  //   mais son name/placeholder contiennent le mot "password" (voir <input> plus bas).
  // (EMAIL_CONFIRMATION_NOT_SENT est traite separement sur /fixtures/inscription.)
  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="card">
        <h2>Apercu (sans bouton d&apos;envoi)</h2>
        <form onSubmit={handlePreviewSubmit}>
          <div className="field">
            <label htmlFor="preview-input">Nom du produit</label>
            <input
              id="preview-input"
              name="preview"
              type="text"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              required
            />
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Newsletter</h2>
        <form onSubmit={handleNewsletterSubmit}>
          <div className="field">
            <label htmlFor="newsletter-email">Adresse email</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="newsletter-password-hint">Indice mot de passe (test)</label>
            <input
              id="newsletter-password-hint"
              name="password_hint"
              type="text"
              placeholder="mot de passe habituel"
              value={passwordHint}
              onChange={(e) => setPasswordHint(e.target.value)}
              autoComplete="on"
            />
          </div>

          {success && <p role="status">Merci, c&apos;est note.</p>}

          <button type="submit" className="btn">
            {submitting ? "Envoi..." : "S'abonner"}
          </button>
        </form>
      </section>
    </>
  );
}
