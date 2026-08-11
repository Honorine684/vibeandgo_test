import InscriptionForm from "./InscriptionForm";

export const metadata = {
  title: "Inscription",
  description: "Creez votre compte VibeAndGo.",
};

export default function InscriptionPage() {
  return (
    <main className="container">
      <h1>Creer un compte</h1>
      <InscriptionForm />
    </main>
  );
}
