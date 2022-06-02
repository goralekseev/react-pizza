import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage }) => {
  const handlePageClick = (event) => {
    onChangePage(event.selected + 1);
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel=' >'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel='< '
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
