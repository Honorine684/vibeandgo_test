"use client";

import { useState } from "react";

export default function FixturesInscriptionClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Fixture "EMAIL_CONFIRMATION_NOT_SENT" : succes explicite, aucune mention d'email
    // de verification / confirmation.
    setDone(true);
  }

  // Sur la page de succes : plus AUCUN champ (surtout pas d'input[type=password]
  // visible, sinon le check considere qu'on est encore sur le formulaire et ne
  // s'exerce pas). Juste le message de succes, sans mot-cle d'erreur.
  if (done) {
    return (
      <div className="card">
        <p role="status">
          Inscription reussie ! Votre compte a ete cree avec succes. Bienvenue.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="field">
        <label htmlFor="signup-email">Adresse email</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="signup-password">Mot de passe</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn">
        Creer mon compte
      </button>
    </form>
  );
}
