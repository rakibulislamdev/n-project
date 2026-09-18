"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { useReviewsStore, ReviewData } from "@/lib/store/use-reviews-store";
import { PendingReviewsTable } from "./pending-reviews-table";
import { PendingReviewsFooter } from "./pending-reviews-footer";
import { toast } from "sonner";
import { updateReviewStatusAction } from "@/app/actions/review";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PendingReviewsClientProps {
  initialReviews: ReviewData[];
}

export default function PendingReviewsClient({ initialReviews }: PendingReviewsClientProps) {
  const { pendingReviews: reviews, setPendingReviews: setReviews, setApprovedReviews } = useReviewsStore();
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
  const [rejectAction, setRejectAction] = useState<{ type: 'single', id: number | string } | { type: 'batch' } | null>(null);

  const handleAction = async (id: number | string, actionType: "approve" | "reject") => {
    setIsLoading(true);
    const status = actionType === "approve" ? "APPROVED" : "REJECTED";
    
    try {
      const res = await updateReviewStatusAction(id, status);
      
      if (res.success) {
        const reviewToMove = reviews.find(r => r.id === id);
        
        setReviews(prev => prev.filter(r => r.id !== id));
        setSelectedIds(prev => prev.filter(item => item !== id));
        
        if (status === "APPROVED" && reviewToMove) {
          setApprovedReviews(prev => [reviewToMove, ...prev]);
        }

        if (currentReviews.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
        toast.success(`Review ${actionType}d successfully`);
      } else {
        toast.error(res.message || `Failed to ${actionType} review`);
      }
    } catch (error) {
      toast.error(`An error occurred while trying to ${actionType} review`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchAction = async (actionType: "approve" | "reject") => {
    setIsLoading(true);
    const status = actionType === "approve" ? "APPROVED" : "REJECTED";
    let successCount = 0;
    
    try {
      // For batch, we could ideally use a batch endpoint, but we loop for now
      for (const id of selectedIds) {
        const res = await updateReviewStatusAction(id, status);
        if (res.success) successCount++;
      }
      
      if (successCount > 0) {
        const reviewsToMove = reviews.filter(r => selectedIds.includes(r.id));
        
        setReviews(prev => prev.filter(r => !selectedIds.includes(r.id)));
        setSelectedIds([]);
        
        if (status === "APPROVED") {
          setApprovedReviews(prev => [...reviewsToMove, ...prev]);
        }

        const remainingAfterRemove = reviews.length - selectedIds.length;
        const newTotalPages = Math.ceil(remainingAfterRemove / ITEMS_PER_PAGE) || 1;
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }
        toast.success(`${successCount} review${successCount !== 1 ? 's' : ''} ${actionType}d successfully`);
      }
    } catch (error) {
      toast.error(`An error occurred during batch ${actionType}`);
    } finally {
      setIsLoading(false);
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
          onApprove={(id) => {
            handleAction(id, "approve");
          }}
          onReject={(id) => {
            setRejectAction({ type: 'single', id });
          }}
        />

        <PendingReviewsFooter
          selectedCount={selectedIds.length}
          totalCount={reviews.length}
          isAllCurrentSelected={isAllCurrentSelected}
          onToggleSelectAll={toggleSelectAll}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onApproveSelected={() => {
            handleBatchAction("approve");
          }}
          onRejectSelected={() => {
            setRejectAction({ type: 'batch' });
          }}
        />
      </div>

      <Dialog open={!!rejectAction} onOpenChange={(open) => !open && setRejectAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to reject?</DialogTitle>
            <DialogDescription>
              This action will reject the selected {rejectAction?.type === 'batch' ? 'reviews' : 'review'}. The {rejectAction?.type === 'batch' ? 'reviews' : 'review'} will be moved to the rejected state and will not be displayed on the website.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-transparent border-none">
            <Button variant="outline" onClick={() => setRejectAction(null)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (rejectAction?.type === 'single') {
                  handleAction(rejectAction.id, "reject").then(() => setRejectAction(null));
                } else if (rejectAction?.type === 'batch') {
                  handleBatchAction("reject").then(() => setRejectAction(null));
                }
              }}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isLoading ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
