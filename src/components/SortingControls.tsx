type SortingProps = {
  handleSort: (sortBy: "recent" | "relevant") => void;
  sortBy: "recent" | "relevant";
};

export default function Sorting({ handleSort, sortBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" && "sorting__button--active"
        }`}
        onClick={() => handleSort("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "recent" && "sorting__button--active"
        }`}
        onClick={() => handleSort("recent")}
      >
        Recent
      </button>
    </section>
  );
}
