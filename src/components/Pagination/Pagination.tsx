import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps={
  currentPage: number;
  onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  const handlePageClick = (event: any) => {
    onChangePage(event.selected + 1);
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel=' >'
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel='< '
      forcePage={currentPage - 1}
      //renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
