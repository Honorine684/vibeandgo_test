import StallFetch from "../StallFetch";

export const metadata = {
  title: "Zone lente C (fixture scanner)",
};

export default function SlowCPage() {
  return (
    <main className="container">
      <h1>/slow/c</h1>
      <p>Meme fixture que /slow/ — reponse HTTP rapide, stabilisation reseau lente.</p>
      <StallFetch />
      <ul>
        <li>
          <a href="/slow/">/slow/</a>
        </li>
        <li>
          <a href="/slow/a">/slow/a</a>
        </li>
        <li>
          <a href="/slow/b">/slow/b</a>
        </li>
      </ul>
    </main>
  );
}
