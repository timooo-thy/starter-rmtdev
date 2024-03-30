import { useState } from "react";
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
import { useDebouncer, useJobItems } from "../lib/hooks";
import { Toaster } from "sonner";
import { SortBy } from "../lib/types";
import BookmarksContextProvider from "./BookmarksContextProvider";

const PAGE_LENGTH = 7;

function App() {
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebouncer(searchText, 300);
  const { jobItems, loading } = useJobItems(debounceSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  const maxPage =
    (jobItems?.length && Math.ceil(jobItems.length / PAGE_LENGTH)) || 1;
  const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
    if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    } else {
      return a.relevanceScore - b.relevanceScore;
    }
  });
  const jobItemsSortedAndSliced =
    jobItemsSorted?.slice(
      (currentPage - 1) * PAGE_LENGTH,
      PAGE_LENGTH * currentPage
    ) || [];
  const resultCount = jobItems?.length || 0;
  const handleSort = (sortBy: SortBy) => {
    setSortBy(sortBy);
    setCurrentPage(1);
  };

  return (
    <>
      <Toaster richColors />
      <Background />
      <BookmarksContextProvider>
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
      </BookmarksContextProvider>

      <Footer />
    </>
  );
}

export default App;
