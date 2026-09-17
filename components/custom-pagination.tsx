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
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
};

export function CustomPagination({ totalPages, currentPage, onPageChange, className = "mt-8" }: CustomPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={`border border-border/60 hover:bg-secondary transition-colors ${
                currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }`}
            />
          </PaginationItem>

          {getVisiblePages(currentPage, totalPages).map((page, i) => {
            if (page === '...') {
              return (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
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
                  className={`transition-colors rounded-md w-9 h-9 ${
                    isActive
                      ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={`border border-border/60 hover:bg-secondary transition-colors ${
                currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
