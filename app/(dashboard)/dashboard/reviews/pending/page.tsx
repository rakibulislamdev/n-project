"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { useReviewsStore } from "@/lib/store/use-reviews-store";
import { PendingReviewsTable } from "./_components/pending-reviews-table";
import { PendingReviewsFooter } from "./_components/pending-reviews-footer";


export default function PendingReviewsPage() {
  const { pendingReviews: reviews, setPendingReviews: setReviews } = useReviewsStore();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

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

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAction = (id: number) => {
    // Both approve and reject remove it from pending for now
    setReviews(prev => prev.filter(r => r.id !== id));
    setSelectedIds(prev => prev.filter(item => item !== id));

    // Adjust pagination if page becomes empty
    if (currentReviews.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleBatchAction = () => {
    setReviews(prev => prev.filter(r => !selectedIds.includes(r.id)));
    setSelectedIds([]);

    const remainingAfterRemove = reviews.length - selectedIds.length;
    const newTotalPages = Math.ceil(remainingAfterRemove / ITEMS_PER_PAGE) || 1;
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-zinc-900 min-h-screen">
      <PageHeader
        breadcrumbs={["REVIEWS", "PENDING REVIEWS"]}
        title="Pending Reviews"
        description="Review and approve client feedback to keep your platform trustworthy and authentic."
      />

      <div className="px-8 flex-1 pb-10">
        <PendingReviewsTable
          reviews={currentReviews}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onApprove={handleAction}
          onReject={handleAction}
        />

        <PendingReviewsFooter
          selectedCount={selectedIds.length}
          totalCount={reviews.length}
          isAllCurrentSelected={isAllCurrentSelected}
          onToggleSelectAll={toggleSelectAll}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onApproveSelected={handleBatchAction}
          onRejectSelected={handleBatchAction}
        />
      </div>
    </div>
  );
}
