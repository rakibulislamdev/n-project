"use client";

import { useRef } from "react";
import { useReviewsStore, ReviewData } from "@/lib/store/use-reviews-store";

export function ReviewsStoreInitializer({ 
  pending, 
  approved 
}: { 
  pending: ReviewData[], 
  approved: ReviewData[] 
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useReviewsStore.setState({ 
      pendingReviews: pending, 
      approvedReviews: approved 
    });
    initialized.current = true;
  }
  
  return null;
}
