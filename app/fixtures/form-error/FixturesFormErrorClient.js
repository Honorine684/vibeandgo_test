"use client";

import { useState } from "react";

// Fixture "FORM_ERROR" : champ requis, aucun bouton submit dans le <form>.
export default function FixturesFormErrorClient() {
  const [preview, setPreview] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="card">
      <h2>Apercu (sans bouton d&apos;envoi)</h2>
      <form onSubmit={handleSubmit}>
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
  );
}
