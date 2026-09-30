import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const getVisiblePages = (current: number, total: number) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export function CustomPagination({
  totalPages,
  currentPage,
  onPageChange,
  className = "mt-8",
}: CustomPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent className="gap-1.5 sm:gap-2">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={`border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all rounded-xl px-3 py-1.5 text-xs font-semibold shadow-2xs ${
                currentPage === 1 ? "pointer-events-none opacity-40 text-zinc-400 dark:text-zinc-600" : "cursor-pointer"
              }`}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {getVisiblePages(currentPage, totalPages).map((page, i) => {
            if (page === "...") {
              return (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis className="text-zinc-400 dark:text-zinc-500" />
                </PaginationItem>
              );
            }

            const isActive = currentPage === page;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                  isActive={isActive}
                  className={`transition-all rounded-xl w-9 h-9 text-xs sm:text-sm font-semibold cursor-pointer ${
                    isActive
                      ? "!bg-[#FFD000] !text-black !border-[#FFD000] font-bold shadow-sm shadow-[#FFD000]/25 hover:!bg-[#FFD000]/95 hover:!text-black"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white border border-transparent"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={`border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all rounded-xl px-3 py-1.5 text-xs font-semibold shadow-2xs ${
                currentPage === totalPages ? "pointer-events-none opacity-40 text-zinc-400 dark:text-zinc-600" : "cursor-pointer"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
