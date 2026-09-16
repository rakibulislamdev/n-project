import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { ReviewSummary } from "./_components/review-summary";
import { Reviews } from "./_components/reviews";
import { Footer } from "./_components/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <ReviewSummary />
      <Reviews />
      <Footer />
    </main>
  );
}
