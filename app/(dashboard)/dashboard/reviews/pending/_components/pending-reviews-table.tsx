import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PendingReviewsRow, Review } from "./pending-reviews-row";

interface PendingReviewsTableProps {
  reviews: Review[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export function PendingReviewsTable({ reviews, selectedIds, onToggleSelect, onApprove, onReject }: PendingReviewsTableProps) {
  return (
    <div className="border border-zinc-100 rounded-xl overflow-hidden bg-white shadow-[0px_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <Table>
        <TableHeader className="bg-[#f8f9fa]">
          <TableRow className="border-b-zinc-100 hover:bg-[#f8f9fa]">
            <TableHead className="w-[72px] pl-8">
              {/* Visual placeholder for checkbox col */}
            </TableHead>
            <TableHead className="text-[11px] font-bold text-zinc-600 tracking-widest w-[25%] h-14">CLIENT</TableHead>
            <TableHead className="text-[11px] font-bold text-zinc-600 tracking-widest w-[40%] h-14">REVIEW</TableHead>
            <TableHead className="text-[11px] font-bold text-zinc-600 tracking-widest w-[15%] h-14">PHOTOS</TableHead>
            <TableHead className="text-[11px] font-bold text-zinc-600 tracking-widest w-[20%] text-right pr-12 h-14">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-[14px] text-zinc-500 font-medium">
                No pending reviews found.
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <PendingReviewsRow 
                key={review.id} 
                review={review} 
                isSelected={selectedIds.includes(review.id)}
                onToggleSelect={onToggleSelect}
                onApprove={() => onApprove(review.id)}
                onReject={() => onReject(review.id)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
