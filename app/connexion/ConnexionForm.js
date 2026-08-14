"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../lib/api";

export default function ConnexionForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // FIX (SECURITE): le cookie de session est maintenant pose par le serveur (voir
    // app/api/session/route.js) avec HttpOnly + Secure + SameSite=Strict, au lieu d'un
    // `document.cookie` cote client sans aucun de ces attributs.
    fetch("/api/session");
  }, []);

  // BUG (SECURITE): aucune limite de tentatives / verrouillage de compte / captcha,
  // meme apres de nombreuses soumissions successives (pas de compteur d'essais du tout).
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // FIX (FONCTIONNEL): le login utilise desormais un vrai backend et reussit
        // avec les identifiants mockes corrects (test@vibeandgo.test / Test1234!).
        localStorage.setItem("vg_auth_token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.error || "Identifiants invalides.");
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setSubmitting(false);
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

      <button type="submit" className="btn" disabled={submitting}>
        {submitting ? "Connexion..." : "Se connecter"}
      </button>

      <p style={{ marginTop: 12 }}>
        <button type="button" onClick={handleForgotPassword} className="btn" style={{ background: "transparent", color: "#0a58ca", padding: 0 }}>
          Mot de passe oublie ?
        </button>
      </p>
    </form>
  );
}
