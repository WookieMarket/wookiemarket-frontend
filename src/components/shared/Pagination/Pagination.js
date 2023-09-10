import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const visiblePages = [];
    if (totalPages <= 3) {
      return pageNumbers.map((number, index) => (
        <span key={`ellipsis-${index}`}>
          {index > 0 && <code> - </code>}
          <span
            key={number}
            className={`pagination-number ${
              number === currentPage ? 'active' : ''
            }`}
            onClick={() => onPageChange(number)}
          >
            <code>{number}</code>
          </span>
        </span>
      ));
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }

      return visiblePages.map((page, index) => (
        <span key={index}>
          {index > 0 && <code> - </code>}
          {page === '...' ? (
            <span
              className="pagination-number"
              onClick={() => onPageChange(currentPage + (index === 3 ? 2 : -2))}
            >
              <code>{page}</code>
            </span>
          ) : (
            <span
              className={`pagination-number ${
                page === currentPage ? 'active' : ''
              }`}
              onClick={() => {
                if (page !== '...') {
                  onPageChange(page);
                }
              }}
            >
              <code>{page}</code>
            </span>
          )}
        </span>
      ));
    }
  };

  return (
    <div className="pagination">
      {currentPage !== 1 ? (
        <span className="pagination-number" onClick={() => onPageChange(1)}>
          <code>&lt;</code>
          <code>&lt;</code>
          <code>&nbsp;</code>
          <code>&nbsp;</code>
        </span>
      ) : null}
      {currentPage !== 1 ? (
        <span
          className="pagination-number"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <code>&lt;</code>
          <code>&nbsp;</code>
        </span>
      ) : null}
      {renderPageNumbers()}
      {currentPage !== totalPages ? (
        <span
          className="pagination-number"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <code>&nbsp;</code>
          <code>&gt;</code>
          <code>&nbsp;</code>
        </span>
      ) : null}
      {currentPage !== totalPages ? (
        <span
          className="pagination-number"
          onClick={() => onPageChange(totalPages)}
        >
          <code>&gt;</code>
          <code>&gt;</code>
          <code>&nbsp;</code>
          <code>&nbsp;</code>
        </span>
      ) : null}
    </div>
  );
};

export default Pagination;
