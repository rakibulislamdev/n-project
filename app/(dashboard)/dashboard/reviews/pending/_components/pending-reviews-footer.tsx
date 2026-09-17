import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckmarkBadge01Icon } from "hugeicons-react";
import { CustomPagination } from "@/components/custom-pagination";

interface PendingReviewsFooterProps {
  selectedCount: number;
  totalCount: number;
  isAllCurrentSelected: boolean;
  onToggleSelectAll: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onApproveSelected: () => void;
  onRejectSelected: () => void;
}

export function PendingReviewsFooter({
  selectedCount,
  totalCount,
  isAllCurrentSelected,
  onToggleSelectAll,
  currentPage,
  totalPages,
  onPageChange,
  onApproveSelected,
  onRejectSelected,
}: PendingReviewsFooterProps) {
  return (
    <div className="flex flex-col w-full mt-8 mb-4 gap-6">
      <div className="flex flex-wrap items-center justify-between w-full gap-y-4 gap-x-6">
        
        {/* Selection Count */}
        <div className="text-[13px] font-medium text-zinc-500 shrink-0">
          {selectedCount} of {totalCount} selected
        </div>
        
        {/* Actions Area */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full sm:w-auto">
          <label className="flex items-center gap-3 cursor-pointer text-[14px] font-bold text-zinc-500 hover:text-zinc-800 transition-colors shrink-0">
            <Checkbox 
              checked={isAllCurrentSelected && totalCount > 0}
              onCheckedChange={onToggleSelectAll}
              className="border-zinc-200 data-[state=checked]:bg-[#FFC500] data-[state=checked]:border-[#FFC500] data-[state=checked]:text-black rounded-[4px] size-5"
            />
            Select All
          </label>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={onApproveSelected}
              disabled={selectedCount === 0}
              className="flex-1 sm:flex-none rounded-xl md:rounded-full bg-black text-white hover:text-white from-zinc-800 border border-transparent h-10 px-4 md:px-6 text-[13px] font-bold gap-2 disabled:opacity-50 disabled:bg-[#f3f4f6] disabled:text-zinc-500 disabled:border-zinc-200 shadow-sm transition-all"
            >
              <CheckmarkBadge01Icon className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
              <span className="xl:hidden">Approve</span>
              <span className="hidden xl:inline">Approve Selected</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={onRejectSelected}
              disabled={selectedCount === 0}
              className="flex-1 sm:flex-none rounded-xl md:rounded-full bg-red-500 text-white hover:text-white from-red-600 border border-transparent h-10 px-4 md:px-6 text-[13px] font-bold gap-2 disabled:opacity-50 disabled:bg-[#fff5f5] disabled:text-red-500 disabled:border-red-100 shadow-sm transition-all"
            >
              <span className="font-bold text-base md:text-lg leading-none mb-0.5">×</span> 
              <span className="xl:hidden">Reject</span>
              <span className="hidden xl:inline">Reject Selected</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <CustomPagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={onPageChange} 
          className="m-0"
        />
      </div>
    </div>
  );
}
