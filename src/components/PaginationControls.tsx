import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

type PaginationProps = {
  currentPage: number;
  maxPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
  currentPage,
  maxPage,
  setCurrentPage,
}: PaginationProps) {
  const previousPage = currentPage !== 1 ? currentPage - 1 : currentPage;
  const nextPage = maxPage !== currentPage ? currentPage + 1 : currentPage;

  return (
    <section className="pagination">
      <button
        className={`${
          previousPage === currentPage && "pagination__button--hidden"
        } pagination__button`}
        onClick={(e) => {
          setCurrentPage(previousPage);
          e.currentTarget.blur();
        }}
      >
        <ArrowLeftIcon />
        Page {previousPage}
      </button>
      <button
        className={`${
          currentPage === maxPage && "pagination__button--hidden"
        } pagination__button`}
        onClick={(e) => {
          setCurrentPage(nextPage);
          e.currentTarget.blur();
        }}
      >
        Page {nextPage}
        <ArrowRightIcon />
      </button>
    </section>
  );
}
