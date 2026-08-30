import StallFetch from "../StallFetch";

export const metadata = {
  title: "Zone lente B (fixture scanner)",
};

export default function SlowBPage() {
  return (
    <main className="container">
      <h1>/slow/b</h1>
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
          <a href="/slow/c">/slow/c</a>
        </li>
      </ul>
    </main>
  );
}
