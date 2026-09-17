import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { ReviewSummary } from "./_components/review-summary";
import { Reviews } from "./_components/reviews";
import { Footer } from "./_components/footer";
import { getReviewsAction } from "@/app/actions/review";

export default async function LandingPage() {
  const res = await getReviewsAction();
  let fetchedReviews: any[] = [];
  
  let totalReviews = 0;
  let averageRating = 0;
  
  if (res.success && res.data) {
    const approvedData = res.data.filter((r: any) => r.status === "APPROVED");
    totalReviews = approvedData.length;
    
    if (totalReviews > 0) {
      const sum = approvedData.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
      averageRating = sum / totalReviews;
    }

    fetchedReviews = approvedData.map((r: any) => ({
      id: r.id,
      name: r.name,
      date: new Date(r.createdAt).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      avatarUrl: r.photo || "",
      rating: r.rating,
      text: r.review
    }));
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <ReviewSummary 
        averageRating={totalReviews > 0 ? averageRating : undefined} 
        totalReviews={totalReviews > 0 ? totalReviews : undefined} 
      />
      <Reviews initialReviews={fetchedReviews} />
      <Footer />
    </main>
  );
}
