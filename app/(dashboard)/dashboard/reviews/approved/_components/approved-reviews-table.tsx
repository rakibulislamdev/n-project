import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApprovedReviewsRow, Review } from "./approved-reviews-row";

interface ApprovedReviewsTableProps {
  reviews: Review[];
  selectedIds: (number | string)[];
  onToggleSelect: (id: number | string) => void;
  onRemove: (id: number | string) => void;
}

export function ApprovedReviewsTable({ reviews, selectedIds, onToggleSelect, onRemove }: ApprovedReviewsTableProps) {
  return (
    <div className="border border-zinc-200/80 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs">
      <Table className="table-fixed w-full">
        <TableHeader className="bg-zinc-50/90 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800">
          <TableRow className="border-b border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50/90 dark:hover:bg-zinc-900/90">
            <TableHead className="w-[72px] pl-8">
              {/* Visual placeholder for checkbox col */}
            </TableHead>
            <TableHead className="text-[12px] font-bold text-zinc-700 dark:text-zinc-300 tracking-wider w-[26%] h-12">CLIENT</TableHead>
            <TableHead className="text-[12px] font-bold text-zinc-700 dark:text-zinc-300 tracking-wider w-[32%] h-12">REVIEW</TableHead>
            <TableHead className="text-[12px] font-bold text-zinc-700 dark:text-zinc-300 tracking-wider w-[18%] h-12">PHOTOS</TableHead>
            <TableHead className="text-[12px] font-bold text-zinc-700 dark:text-zinc-300 tracking-wider w-[24%] text-right pr-12 h-12">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-[14px] text-zinc-600 dark:text-zinc-400 font-medium">
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
