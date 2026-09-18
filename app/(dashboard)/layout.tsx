export const dynamic = "force-dynamic";

import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileTopbar } from "@/components/dashboard/mobile-topbar";
import { getReviewsAction, getPendingReviewsAction } from "@/app/actions/review";
import { ReviewsStoreInitializer } from "@/components/dashboard/reviews-store-initializer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reviewsRes, pendingRes] = await Promise.all([
    getReviewsAction(),
    getPendingReviewsAction()
  ]);

  let approvedData = [];
  if (reviewsRes.success && reviewsRes.data) {
    approvedData = reviewsRes.data
      .filter((r: any) => r.status === "APPROVED")
      .map((r: any) => ({
        id: r.id,
        clientName: r.name,
        clientDate: new Date(r.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }),
        clientAvatar: r.photo || "",
        reviewRating: r.rating,
        reviewText: r.review,
        propertyImages: r.propertyImages || []
      }));
  }

  let pendingData = [];
  if (pendingRes.success && pendingRes.data) {
    pendingData = pendingRes.data.map((r: any) => ({
      id: r.id,
      clientName: r.name,
      clientDate: new Date(r.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }),
      clientAvatar: r.photo || "",
      reviewRating: r.rating,
      reviewText: r.review,
      propertyImages: r.propertyImages || []
    }));
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background font-inter">
      <ReviewsStoreInitializer pending={pendingData} approved={approvedData} />
      <Sidebar />
      <MobileTopbar />
      <main className="flex-1 bg-muted/10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
