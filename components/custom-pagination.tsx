import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ totalPages, currentPage, onPageChange }: CustomPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8">
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

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
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
