import { getReviewsAction } from "@/app/actions/review";
import ApprovedReviewsClient from "./_components/approved-reviews-client";

export default async function ApprovedReviewsPage() {
  const res = await getReviewsAction();
  
  let initialReviews = [];
  
  if (res.success && res.data) {
    initialReviews = res.data.map((r: any) => ({
      id: r.id,
      clientName: r.name,
      clientDate: new Date(r.createdAt).toLocaleString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric", 
        hour: "numeric", 
        minute: "numeric" 
      }),
      clientAvatar: r.photo || "",
      reviewRating: r.rating,
      reviewText: r.review,
      photoMain: r.photo || "",
      photoCount: 0
    }));
  }

  return <ApprovedReviewsClient initialReviews={initialReviews} />;
}
