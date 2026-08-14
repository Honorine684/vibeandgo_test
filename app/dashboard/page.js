import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Tableau de bord",
  description: "Espace client VibeAndGo.",
};

export default function DashboardPage() {
  return (
    <main className="container">
      <h1>Tableau de bord</h1>
      <DashboardClient />
    </main>
  );
}
