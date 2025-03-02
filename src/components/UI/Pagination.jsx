import "./Pagination.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePages = 3; // Show only 3 pages at a time

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="pagination-btn"
      >
        Prev
      </button>

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((number) => (
        <button
          key={number}
          className={`pagination-btn ${currentPage === number ? "active" : ""}`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
