export const dynamic = "force-dynamic";

import { getPendingReviewsAction } from "@/app/actions/review";
import PendingReviewsClient from "./_components/pending-reviews-client";

export default async function PendingReviewsPage() {
  const res = await getPendingReviewsAction();
  
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
      propertyImages: r.propertyImages || []
    }));
  }

  return <PendingReviewsClient initialReviews={initialReviews} />;
}
