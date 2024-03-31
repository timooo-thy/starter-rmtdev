import { useMemo, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import Sorting from "./SortingControls";
import ResultsCount from "./ResultsCount";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { Toaster } from "sonner";
import { SortBy } from "../lib/types";

const PAGE_LENGTH = 7;

function App() {
  /* Use States */
  const { searchText, setSearchText, debounceSearchText } =
    useSearchTextContext();
  const { jobItems, loading } = useSearchQuery(debounceSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  /* Computed States */
  const maxPage =
    (jobItems?.length && Math.ceil(jobItems.length / PAGE_LENGTH)) || 1;
  const resultCount = jobItems?.length || 0;

  const jobItemsSorted = useMemo(() => {
    return [...(jobItems || [])]?.sort((a, b) => {
      if (sortBy === "recent") {
        return a.daysAgo - b.daysAgo;
      } else {
        return a.relevanceScore - b.relevanceScore;
      }
    });
  }, [jobItems, sortBy]);

  const jobItemsSortedAndSliced = useMemo(() => {
    return (
      jobItemsSorted?.slice(
        (currentPage - 1) * PAGE_LENGTH,
        PAGE_LENGTH * currentPage
      ) || []
    );
  }, [currentPage, jobItemsSorted]);

  /* Event handlers */
  const handleSort = (sortBy: SortBy) => {
    setSortBy(sortBy);
    setCurrentPage(1);
  };

  return (
    <>
      <Toaster richColors />
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount resultCount={resultCount} />
            <Sorting handleSort={handleSort} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSortedAndSliced} loading={loading} />
          <Pagination
            currentPage={currentPage}
            maxPage={maxPage}
            setCurrentPage={setCurrentPage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
