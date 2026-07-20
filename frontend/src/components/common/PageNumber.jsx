import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PageNumber({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Builds a compact page list like: 1 … 4 5 6 … 12
  // Keeps logic self-contained; currentPage/totalPages/onPageChange behavior is unchanged.
  const getPageList = () => {
    const pages = [];
    const siblings = 1;

    const start = Math.max(2, currentPage - siblings);
    const end = Math.min(totalPages - 1, currentPage + siblings);

    pages.push(1);

    if (start > 2) pages.push("start-ellipsis");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 1) pages.push("end-ellipsis");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageList =
    totalPages <= 7
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : getPageList();

  const baseBtn =
    "flex items-center justify-center h-9 min-w-9 px-2.5 rounded-lg text-sm font-medium transition-colors";

  return (
    <div className="flex justify-center items-center gap-1.5 mt-8">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className={`${baseBtn} border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <FaChevronLeft size={11} />
      </button>

      {/* Page Numbers */}
      {pageList.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`${baseBtn} ${
              currentPage === page
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={`${page}-${index}`}
            className="flex items-center justify-center h-9 min-w-9 text-sm text-gray-400"
          >
            …
          </span>
        ),
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className={`${baseBtn} border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <FaChevronRight size={11} />
      </button>
    </div>
  );
}

export default PageNumber;
