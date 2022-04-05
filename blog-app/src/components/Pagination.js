import React from "react";

function Pagination(props) {
  let { articlesCount, articlesPerPage, activePage, updateCurrentPAgeIndex } =
    props;
  let numOfPages = Math.ceil(articlesCount / articlesPerPage);

  let pageArray = [];

  for (let i = 1; i <= numOfPages; i++) {
    pageArray.push(i);
  }
  return (
    <div className="flex jc-start flex-wrap pagination">
      <div className="prev">
        <p
          onClick={() =>
            updateCurrentPAgeIndex(activePage - 1 < 1 ? 1 : activePage - 1)
          }
        >
          Prev
        </p>
      </div>
      <div className="pagination-count flex flex-wrap">
        {pageArray.map((page) => (
          <span
            key={page}
            onClick={() => updateCurrentPAgeIndex(page)}
            className={`${activePage === page ? "active" : ""}`}
          >
            {page}
          </span>
        ))}
      </div>
      <div className="next">
        <p
          onClick={() =>
            updateCurrentPAgeIndex(
              activePage + 1 > numOfPages ? numOfPages : activePage + 1
            )
          }
        >
          Next
        </p>
      </div>
    </div>
  );
}

export default Pagination;
