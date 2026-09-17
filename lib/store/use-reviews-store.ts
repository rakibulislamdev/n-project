import { create } from "zustand";
export const INITIAL_PENDING_REVIEWS = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  clientName: "Stephen Crover",
  clientDate: "Sep 12, 2025 - 2:14 PM",
  clientAvatar: `https://i.pravatar.cc/150?u=${i + 1}`,
  reviewRating: 5,
  reviewText: "Rakib was amazing to work with! Very professional, responsive, and truly cares about his clients. He helped us find the perfect home and made the whole process smooth and stress-free.",
  photoMain: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
  photoCount: 2
}));

export const INITIAL_APPROVED_REVIEWS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 100, // offset IDs
  clientName: "Stephen Crover",
  clientDate: "Sep 12, 2025 - 2:14 PM",
  clientAvatar: `https://i.pravatar.cc/150?u=${i + 100}`,
  reviewRating: 5,
  reviewText: "Rakib was amazing to work with! Very professional, responsive, and truly cares about his clients. He helped us find the perfect home and made the whole process smooth and stress-free.",
  photoMain: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
  photoCount: 2
}));

type Review = typeof INITIAL_PENDING_REVIEWS[0];

interface ReviewsState {
  pendingReviews: Review[];
  approvedReviews: Review[];
  setPendingReviews: (reviews: Review[] | ((prev: Review[]) => Review[])) => void;
  setApprovedReviews: (reviews: Review[] | ((prev: Review[]) => Review[])) => void;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
  pendingReviews: INITIAL_PENDING_REVIEWS,
  approvedReviews: INITIAL_APPROVED_REVIEWS,
  setPendingReviews: (reviewsOrUpdater: Review[] | ((prev: Review[]) => Review[])) =>
    set((state) => ({
      pendingReviews: typeof reviewsOrUpdater === "function"
        ? reviewsOrUpdater(state.pendingReviews)
        : reviewsOrUpdater
    })),
  setApprovedReviews: (reviewsOrUpdater: Review[] | ((prev: Review[]) => Review[])) =>
    set((state) => ({
      approvedReviews: typeof reviewsOrUpdater === "function"
        ? reviewsOrUpdater(state.approvedReviews)
        : reviewsOrUpdater
    }))
}));
