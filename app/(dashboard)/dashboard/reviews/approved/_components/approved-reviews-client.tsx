"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { useReviewsStore, ReviewData } from "@/lib/store/use-reviews-store";
import { ApprovedReviewsTable } from "./approved-reviews-table";
import { ApprovedReviewsFooter } from "./approved-reviews-footer";
import { toast } from "sonner";

interface ApprovedReviewsClientProps {
  initialReviews: ReviewData[];
}

export default function ApprovedReviewsClient({ initialReviews }: ApprovedReviewsClientProps) {
  const { approvedReviews: reviews, setApprovedReviews: setReviews } = useReviewsStore();
  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  // Sync server data with store on mount
  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews, setReviews]);

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE) || 1;
  const currentReviews = reviews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const isAllCurrentSelected = currentReviews.length > 0 && currentReviews.every(r => selectedIds.includes(r.id));

  const toggleSelectAll = () => {
    if (isAllCurrentSelected) {
      setSelectedIds(prev => prev.filter(id => !currentReviews.find(r => r.id === id)));
    } else {
      const newIds = [...selectedIds];
      currentReviews.forEach(r => {
        if (!newIds.includes(r.id)) newIds.push(r.id);
      });
      setSelectedIds(newIds);
    }
  };

  const toggleSelect = (id: number | string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async (id: number | string) => {
    setIsLoading(true);
    try {
      const { updateReviewStatusAction } = await import("@/app/actions/review");
      // Assuming REJECTED or REMOVED is the status for removing from approved list
      const res = await updateReviewStatusAction(id, "REJECTED");
      
      if (res.success) {
        setReviews(prev => prev.filter(r => r.id !== id));
        setSelectedIds(prev => prev.filter(item => item !== id));

        // Adjust pagination if page becomes empty
        if (currentReviews.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
        toast.success("Review removed successfully");
      } else {
        toast.error(res.message || "Failed to remove review");
      }
    } catch (error) {
      toast.error("An error occurred while removing review");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSelected = async () => {
    setIsLoading(true);
    let successCount = 0;
    
    try {
      const { updateReviewStatusAction } = await import("@/app/actions/review");
      for (const id of selectedIds) {
        const res = await updateReviewStatusAction(id, "REJECTED");
        if (res.success) successCount++;
      }
      
      if (successCount > 0) {
        setReviews(prev => prev.filter(r => !selectedIds.includes(r.id)));
        setSelectedIds([]);

        const remainingAfterRemove = reviews.length - selectedIds.length;
        const newTotalPages = Math.ceil(remainingAfterRemove / ITEMS_PER_PAGE) || 1;
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }
        toast.success(`${successCount} review${successCount !== 1 ? 's' : ''} removed successfully`);
      }
    } catch (error) {
      toast.error("An error occurred while removing reviews");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-zinc-900 min-h-screen">
      <PageHeader
        breadcrumbs={["REVIEWS", "APPROVED REVIEWS"]}
        title="Approved Reviews"
        description="Manage and remove approved reviews. These reviews are publicly visible on the website."
      />

      <div className="px-8 flex-1 pb-10">
        <ApprovedReviewsTable
          reviews={currentReviews}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onRemove={handleRemove}
        />

        <ApprovedReviewsFooter
          selectedCount={selectedIds.length}
          totalCount={reviews.length}
          isAllCurrentSelected={isAllCurrentSelected}
          onToggleSelectAll={toggleSelectAll}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onRemoveSelected={handleRemoveSelected}
        />
      </div>
    </div>
  );
}
