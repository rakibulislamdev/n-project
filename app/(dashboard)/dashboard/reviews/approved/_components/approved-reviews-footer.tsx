import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CustomPagination } from "@/components/custom-pagination";

interface ApprovedReviewsFooterProps {
  selectedCount: number;
  totalCount: number;
  isAllCurrentSelected: boolean;
  onToggleSelectAll: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRemoveSelected: () => void;
}

export function ApprovedReviewsFooter({
  selectedCount,
  totalCount,
  isAllCurrentSelected,
  onToggleSelectAll,
  currentPage,
  totalPages,
  onPageChange,
  onRemoveSelected,
}: ApprovedReviewsFooterProps) {
  return (
    <div className="flex flex-col w-full mt-8 mb-4 gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-[13px] font-medium text-zinc-500">
          {selectedCount} of {totalCount} selected
        </div>
        
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer text-[14px] font-bold text-zinc-500 hover:text-zinc-800 transition-colors">
            <Checkbox 
              checked={isAllCurrentSelected && totalCount > 0}
              onCheckedChange={onToggleSelectAll}
              className="border-zinc-200 data-[state=checked]:bg-[#FFC500] data-[state=checked]:border-[#FFC500] data-[state=checked]:text-black rounded-[4px] size-5"
            />
            Select All
          </label>
          
          <div className="flex items-center">
            <Button 
              variant="outline"
              onClick={onRemoveSelected}
              disabled={selectedCount === 0}
              className="rounded-full bg-red-500 text-white hover:text-white from-red-600 border border-transparent h-10 px-6 text-[13px] font-bold gap-2 disabled:opacity-50 disabled:bg-[#fff5f5] disabled:text-red-500 disabled:border-red-100 shadow-sm"
            >
              <span className="font-bold text-lg leading-none mb-0.5">×</span> Remove Selected
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
