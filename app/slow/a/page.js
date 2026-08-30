import StallFetch from "../StallFetch";

export const metadata = {
  title: "Zone lente A (fixture scanner)",
};

export default function SlowAPage() {
  return (
    <main className="container">
      <h1>/slow/a</h1>
      <p>Meme fixture que /slow/ — reponse HTTP rapide, stabilisation reseau lente.</p>
      <StallFetch />
      <ul>
        <li>
          <a href="/slow/">/slow/</a>
        </li>
        <li>
          <a href="/slow/b">/slow/b</a>
        </li>
        <li>
          <a href="/slow/c">/slow/c</a>
        </li>
      </ul>
    </main>
  );
}
