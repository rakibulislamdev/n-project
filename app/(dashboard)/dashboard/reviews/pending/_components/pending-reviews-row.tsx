"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { StarIcon } from "hugeicons-react";
import { ReviewPhotoGallery } from "../../_components/review-photo-gallery";

export interface Review {
  id: number | string;
  clientName: string;
  clientDate: string;
  clientAvatar: string;
  reviewRating: number;
  reviewText: string;
  propertyImages: string[];
}

interface PendingReviewsRowProps {
  review: Review;
  isSelected: boolean;
  onToggleSelect: (id: number | string) => void;
  onApprove: () => void;
  onReject: () => void;
}

export function PendingReviewsRow({ review, isSelected, onToggleSelect, onApprove, onReject }: PendingReviewsRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = (review.reviewText || "").length > 35;

  return (
    <TableRow className="border-b border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors group">
      <TableCell className="w-[72px] pl-8 align-top pt-[26px]">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(review.id)}
          className="border-zinc-300 data-[state=checked]:bg-[#FFC500] data-[state=checked]:border-[#FFC500] data-[state=checked]:text-black rounded-[4px] size-5 cursor-pointer"
        />
      </TableCell>
      <TableCell className="align-top pt-4 pb-4 pr-4 whitespace-normal">
        <div className="flex items-start gap-3.5 whitespace-normal">
          <Avatar className="w-10 h-10 border border-zinc-200 dark:border-zinc-700 shadow-sm mt-0.5 shrink-0">
            <AvatarImage src={review.clientAvatar} />
            <AvatarFallback className="font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 text-[13px]">{review.clientName?.slice(0, 2).toUpperCase() || "RV"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 min-w-0 whitespace-normal">
            <span className="font-semibold text-[13.5px] text-zinc-900 dark:text-zinc-100 whitespace-normal break-words leading-snug">{review.clientName}</span>
            <span className="text-[12px] text-zinc-500 dark:text-zinc-400 font-medium shrink-0">{review.clientDate}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top pt-4 pb-4 pr-6 whitespace-normal">
        <div className="flex flex-col gap-1.5 w-full whitespace-normal">
          <div className="flex text-amber-500 gap-0.5 shrink-0">
            {[...Array(review.reviewRating)].map((_, i) => (
              <StarIcon key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <div className="whitespace-normal break-words overflow-hidden w-full">
            <p 
              className={`text-[12.5px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal whitespace-normal break-words ${!isExpanded ? "line-clamp-2" : ""}`}
              title={!isExpanded ? review.reviewText : undefined}
            >
              {review.reviewText}
            </p>
            {isLongText && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:underline cursor-pointer mt-1 inline-block"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top pt-4 pb-4">
        <div className="relative w-24 h-16 rounded-xl overflow-hidden shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
          <ReviewPhotoGallery propertyImages={review.propertyImages} />
        </div>
      </TableCell>
      <TableCell className="text-right pr-6 align-top pt-6">
        <div className="flex items-center justify-end gap-3">
          <Button onClick={onApprove} className="bg-[#1a1a1a] hover:bg-black text-white rounded-full px-5 h-8 text-[12.5px] font-semibold tracking-wide shadow-xs hover:shadow transition-all cursor-pointer">
            Approve
          </Button>
          <Button onClick={onReject} variant="outline" className="border-red-200 bg-red-50/80 hover:bg-red-100 text-red-600 hover:text-red-700 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/60 rounded-full px-5 h-8 text-[12.5px] font-semibold tracking-wide border transition-all cursor-pointer">
            Reject
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
