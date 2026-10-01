import { useSearchParams } from "react-router-dom";
import type { PaginationProps } from "../types/types";

function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
  };
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 0 || currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>Page {currentPage}</span>

      <button
        disabled={totalPages === 0 || currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;
