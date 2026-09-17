import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApprovedReviewsRow, Review } from "./approved-reviews-row";

interface ApprovedReviewsTableProps {
  reviews: Review[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

export function ApprovedReviewsTable({ reviews, selectedIds, onToggleSelect, onRemove }: ApprovedReviewsTableProps) {
  return (
    <div className="border border-zinc-100 rounded-xl overflow-hidden bg-white shadow-[0px_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <Table>
        <TableHeader className="bg-[#f8f9fa]">
          <TableRow className="border-b-zinc-100 hover:bg-[#f8f9fa]">
            <TableHead className="w-[72px] pl-8">
              {/* Visual placeholder for checkbox col */}
            </TableHead>
            <TableHead className="text-[12px] font-semibold text-zinc-500 tracking-wider w-[25%] h-14">CLIENT</TableHead>
            <TableHead className="text-[12px] font-semibold text-zinc-500 tracking-wider w-[40%] h-14">REVIEW</TableHead>
            <TableHead className="text-[12px] font-semibold text-zinc-500 tracking-wider w-[15%] h-14">PHOTOS</TableHead>
            <TableHead className="text-[12px] font-semibold text-zinc-500 tracking-wider w-[20%] text-right pr-12 h-14">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-[14px] text-zinc-500 font-medium">
                No approved reviews found.
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <ApprovedReviewsRow 
                key={review.id} 
                review={review} 
                isSelected={selectedIds.includes(review.id)}
                onToggleSelect={onToggleSelect}
                onRemove={() => onRemove(review.id)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
