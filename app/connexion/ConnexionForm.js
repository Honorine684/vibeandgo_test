"use client";

import { useEffect, useState } from "react";

const MOCK_USER = { email: "test@vibeandgo.test", password: "Test1234!" };

export default function ConnexionForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // FIX (SECURITE): le cookie de session est maintenant pose par le serveur (voir
    // app/api/session/route.js) avec HttpOnly + Secure + SameSite=Strict, au lieu d'un
    // `document.cookie` cote client sans aucun de ces attributs.
    fetch("/api/session");
  }, []);

  // BUG (SECURITE): aucune limite de tentatives / verrouillage de compte / captcha,
  // meme apres de nombreuses soumissions successives (pas de compteur d'essais du tout).
  function handleSubmit(e) {
    e.preventDefault();

    // BUG (FONCTIONNEL): le login echoue systematiquement, meme avec les identifiants
    // mockes corrects (test@vibeandgo.test / Test1234!), a cause du "false &&" ci-dessous
    // qui court-circuite volontairement la validation.
    const isValid = false && email === MOCK_USER.email && password === MOCK_USER.password;

    if (isValid) {
      setError("");
    } else {
      setError("Identifiants invalides.");
    }
  }

  function handleForgotPassword() {
    // BUG (FONCTIONNEL): le flux "mot de passe oublie" plante (appel a une fonction inexistante).
    sendPasswordResetEmail(email);
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="field">
        <label htmlFor="login-email">Adresse email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="login-password">Mot de passe</label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <p role="alert" style={{ color: "#b91c1c" }}>
          {error}
        </p>
      )}

      <button type="submit" className="btn">
        Se connecter
      </button>

      <p style={{ marginTop: 12 }}>
        <button type="button" onClick={handleForgotPassword} className="btn" style={{ background: "transparent", color: "#0a58ca", padding: 0 }}>
          Mot de passe oublie ?
        </button>
      </p>
    </form>
  );
}
