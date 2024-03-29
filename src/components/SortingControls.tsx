import { SortBy } from "../lib/types";

type SortingProps = {
  handleSort: (sortBy: SortBy) => void;
  sortBy: SortBy;
};

export default function Sorting({ handleSort, sortBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onClick={() => handleSort("relevance")}
        sortName="revelance"
        isActive={sortBy === "relevance"}
      />
      <SortingButton
        onClick={() => handleSort("recent")}
        sortName="recent"
        isActive={sortBy === "recent"}
      />
    </section>
  );
}

type SortingButtonProps = {
  onClick: () => void;
  sortName: string;
  isActive: boolean;
};

function SortingButton({ onClick, sortName, isActive }: SortingButtonProps) {
  return (
    <button
      className={`sorting__button sorting__button--relevant ${
        isActive && "sorting__button--active"
      }`}
      onClick={onClick}
    >
      {sortName}
    </button>
  );
}
