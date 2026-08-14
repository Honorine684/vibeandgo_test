"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../lib/api";

export default function DashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchRef, setSearchRef] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("vg_auth_token");
    if (!token) {
      router.replace("/connexion");
      return;
    }

    fetch(`${API_URL}/api/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("unauthorized");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("vg_auth_token");
        router.replace("/connexion");
      });
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("vg_auth_token");
    router.push("/connexion");
  }

  async function handleSearch(e) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/orders/search?ref=${encodeURIComponent(searchRef)}`);
    const json = await res.json();
    setSearchResult(json);
  }

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <div className="card">
        <p>
          Connecte en tant que <strong>{data.user.email}</strong>
        </p>
        <button type="button" onClick={handleLogout} className="btn">
          Deconnexion
        </button>
      </div>

      <section className="card">
        <h2>Rechercher une commande</h2>
        <form onSubmit={handleSearch} className="field" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="order-ref">Reference de commande</label>
            <input
              id="order-ref"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="CMD-1001"
            />
          </div>
          <button type="submit" className="btn">
            Rechercher
          </button>
        </form>
        {searchResult && (
          <pre style={{ background: "#f5f5f5", padding: 12, borderRadius: 6, marginTop: 12, overflowX: "auto" }}>
            {JSON.stringify(searchResult, null, 2)}
          </pre>
        )}
      </section>

      <section className="card">
        <h2>Mes commandes</h2>
        <ul>
          {data.orders.map((order) => (
            <li key={order.id}>
              {order.reference} — {order.item} ({order.status})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
