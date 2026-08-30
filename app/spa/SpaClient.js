"use client";

import { useState } from "react";

// Fixture P3/C1 (checkFormXss / checkReflectedUrlXss par page) : la valeur soumise est
// reinjectee sans echappement (dangerouslySetInnerHTML) - distinct du XSS deja corrige sur
// /recherche?q= (voir BUGS.md, section deja corrigee). Sert a verifier que le check XSS
// tourne bien sur cette sous-page du chemin SPA, et pas uniquement sur baseUrl.
export default function SpaClient() {
  const [pseudo, setPseudo] = useState("");
  const [preview, setPreview] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setPreview(pseudo);
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="field">
        <label htmlFor="spa-pseudo">Pseudo</label>
        <input id="spa-pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
      </div>
      <button type="submit" className="btn">
        Apercu
      </button>
      {preview && (
        <p>
          Apercu : <span dangerouslySetInnerHTML={{ __html: preview }} />
        </p>
      )}
    </form>
  );
}
