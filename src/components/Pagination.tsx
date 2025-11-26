"use client";

import React from "react";
import "@/styles/components-css/pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-page ${page === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
