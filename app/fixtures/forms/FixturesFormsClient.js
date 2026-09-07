"use client";

import { useState } from "react";
import { API_URL } from "../../lib/api";

// Fixtures "INSECURE_FORM_FIELD" + "DUPLICATE_SUBMIT" (checklist des 64 checks) sur
// ce SEUL formulaire newsletter (Form #1 de la page, avec un vrai bouton submit —
// FORM_ERROR est desormais isole sur /fixtures/form-error pour ne pas faire bailer
// la routine de test de formulaires avant d'atteindre celui-ci) :
// - INSECURE_FORM_FIELD : le champ "password_hint" (name + placeholder contiennent
//   "password" / "mot de passe") est en type="text".
// - DUPLICATE_SUBMIT : le bouton n'est JAMAIS desactive pendant l'envoi ; le POST
//   vers /api/newsletter est retenu ~3,5s cote backend, donc un double-clic envoie
//   deux POST identiques pendant que l'indicateur "Traitement en cours..." est
//   visible (class="loading" -> LOADING_SEL, texte -> PROCESSING_TEXT_RE).
export default function FixturesFormsClient() {
  const [email, setEmail] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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

        {submitting && (
          <p className="loading" role="status" aria-busy="true">
            Traitement en cours&hellip;
          </p>
        )}
        {success && <p role="status">Merci, c&apos;est note.</p>}

        {/* Bouton JAMAIS desactive pendant l'envoi. */}
        <button type="submit" className="btn">
          {submitting ? "Envoi..." : "S'abonner"}
        </button>
      </form>
    </section>
  );
}
