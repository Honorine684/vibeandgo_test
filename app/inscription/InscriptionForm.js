"use client";

import { useState } from "react";

export default function InscriptionForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // BUG (SECURITE): pas de protection CSRF sur ce formulaire (pas de token, pas de header
  // anti-CSRF, simple soumission cote client vers un "backend" mocke).
  function handleSubmit(e) {
    e.preventDefault();

    // BUG (SECURITE): donnee sensible (mot de passe) stockee en clair dans localStorage.
    localStorage.setItem("vg_user_email", form.email);
    localStorage.setItem("vg_user_password", form.password);

    // BUG (FONCTIONNEL): aucun message de confirmation apres l'inscription.
    // Le formulaire est simplement reinitialise sans aucun retour visuel pour l'utilisateur.
    setForm({ email: "", password: "", confirmPassword: "", phone: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="field">
        <label htmlFor="email">Adresse email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        {/* BUG (SECURITE): champ de confirmation de mot de passe en type="text" au lieu de "password" -> le mot de passe s'affiche en clair a l'ecran. */}
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        {/* BUG (ACCESSIBILITE): champ de formulaire sans <label> associe (juste un placeholder). */}
        <input name="phone" type="tel" placeholder="Telephone" value={form.phone} onChange={handleChange} />
      </div>

      <button type="submit" className="btn">
        S'inscrire
      </button>
    </form>
  );
}
