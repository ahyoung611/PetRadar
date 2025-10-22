import { useState } from "react";
import "../style/Pagination.css";
const Pagination = ({ totalItems, page, itemSize, onClick, pageSize = 5 }) => {
  const totalPages = Math.ceil(totalItems / itemSize);
  //const totalPageBlocks = Math.ceil(totalPages / pageSize);
  const currPageBlock = Math.floor((page - 1) / pageSize) + 1;
  const blockEnd = currPageBlock * pageSize;
  const blockStart = blockEnd - pageSize + 1;
  const pageArr = [];
  for (let i = blockStart; i <= blockEnd; i++) {
    pageArr.push(i);
  }
  const handlePageChange = (newPage) =>
    onClick(Math.min(totalPages, Math.max(1, newPage)));
  return (
    totalPages > 1 && (
      <div className="Pagination">
        {blockStart > 1 && (
          <span
            className="nav"
            onClick={() => handlePageChange(blockStart - 1)}
          >
            {"<"}
          </span>
        )}
        {pageArr.map((item) => {
          return (
            <span
              key={item}
              className={`page ${item <= totalPages ? "" : "hide"} ${
                item === page ? "active" : ""
              }`}
              onClick={() => item <= totalPages && handlePageChange(item)}
            >
              {item}
            </span>
          );
        })}
        {blockEnd < totalPages && (
          <span className="nav" onClick={() => handlePageChange(blockEnd + 1)}>
            {">"}
          </span>
        )}
      </div>
    )
  );
};
export default Pagination;
