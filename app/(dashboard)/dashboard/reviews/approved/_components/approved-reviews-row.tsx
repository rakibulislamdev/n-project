import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { StarIcon } from "hugeicons-react";

export interface Review {
  id: number | string;
  clientName: string;
  clientDate: string;
  clientAvatar: string;
  reviewRating: number;
  reviewText: string;
  photoMain: string;
  photoCount: number;
}

interface ApprovedReviewsRowProps {
  review: Review;
  isSelected: boolean;
  onToggleSelect: (id: number | string) => void;
  onRemove: () => void;
}

export function ApprovedReviewsRow({ review, isSelected, onToggleSelect, onRemove }: ApprovedReviewsRowProps) {
  return (
    <TableRow className="border-b-zinc-100 hover:bg-zinc-50/50 transition-colors group">
      <TableCell className="w-[72px] pl-8 align-top pt-[34px]">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(review.id)}
          className="border-zinc-200 data-[state=checked]:bg-[#FFC500] data-[state=checked]:border-[#FFC500] data-[state=checked]:text-black rounded-[4px] size-5"
        />
      </TableCell>
      <TableCell className="align-top pt-5 pb-5">
        <div className="flex items-start gap-4">
          <Avatar className="w-11 h-11 border border-zinc-100 shadow-sm mt-0.5">
            <AvatarImage src={review.clientAvatar} />
            <AvatarFallback>{review.clientName?.slice(0, 2).toUpperCase() || "RV"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-[14px] text-zinc-900">{review.clientName}</span>
            <span className="text-[13px] text-zinc-500 font-medium">{review.clientDate}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top pt-5 pb-5 pr-8">
        <div className="flex flex-col gap-2">
          <div className="flex text-amber-400 gap-0.5">
            {[...Array(review.reviewRating)].map((_, i) => (
              <StarIcon key={i} className="w-[14px] h-[14px] fill-current" />
            ))}
          </div>
          <p className="text-[13px] text-zinc-400 leading-relaxed font-medium">
            {review.reviewText}
          </p>
        </div>
      </TableCell>
      <TableCell className="align-top pt-5 pb-5">
        <div className="relative w-24 h-16 rounded-xl overflow-hidden shadow-sm bg-zinc-100">
          {review.photoMain ? (
            <img src={review.photoMain} alt="Review" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No Photo</div>
          )}
          {review.photoCount > 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold tracking-wider">
              +{review.photoCount}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right pr-6 align-top pt-7">
        <div className="flex items-center justify-end">
          <Button onClick={onRemove} variant="outline" className="border-red-100 bg-[#fff5f5] hover:bg-[#ffebeb] text-red-500 rounded-full px-6 h-9 text-[13px] font-semibold tracking-wide border transition-all">
            Remove
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
