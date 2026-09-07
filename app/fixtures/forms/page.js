import FixturesFormsClient from "./FixturesFormsClient";

export const metadata = {
  title: "Fixtures formulaires",
};

export default function FixturesFormsPage() {
  return (
    <main className="container">
      <h1>Fixtures : formulaires</h1>
      <FixturesFormsClient />
    </main>
  );
}
