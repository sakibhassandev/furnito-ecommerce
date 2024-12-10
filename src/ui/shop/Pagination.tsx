import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationButton } from "./PaginationButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <div className="flex items-center gap-1">
          <ChevronLeft size={16} />
          <span>Prev</span>
        </div>
      </PaginationButton>

      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <div className="flex items-center gap-1">
          <span>Next</span>
          <ChevronRight size={16} />
        </div>
      </PaginationButton>
    </div>
  );
}
