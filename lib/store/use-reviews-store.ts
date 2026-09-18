import { create } from "zustand";

export interface ReviewData {
  id: string | number;
  clientName: string;
  clientDate: string;
  clientAvatar: string;
  reviewRating: number;
  reviewText: string;
  propertyImages: string[];
}

interface ReviewsState {
  pendingReviews: ReviewData[];
  approvedReviews: ReviewData[];
  setPendingReviews: (reviews: ReviewData[] | ((prev: ReviewData[]) => ReviewData[])) => void;
  setApprovedReviews: (reviews: ReviewData[] | ((prev: ReviewData[]) => ReviewData[])) => void;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
  pendingReviews: [],
  approvedReviews: [],
  setPendingReviews: (reviewsOrUpdater: ReviewData[] | ((prev: ReviewData[]) => ReviewData[])) =>
    set((state) => ({
      pendingReviews: typeof reviewsOrUpdater === "function"
        ? reviewsOrUpdater(state.pendingReviews)
        : reviewsOrUpdater
    })),
  setApprovedReviews: (reviewsOrUpdater: ReviewData[] | ((prev: ReviewData[]) => ReviewData[])) =>
    set((state) => ({
      approvedReviews: typeof reviewsOrUpdater === "function"
        ? reviewsOrUpdater(state.approvedReviews)
        : reviewsOrUpdater
    }))
}));
