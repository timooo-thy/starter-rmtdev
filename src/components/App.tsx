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

function App() {
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebouncer(searchText, 300);
  const { jobItems, loading } = useJobItems(debounceSearchText);

  const jobItemsSliced = jobItems?.slice(0, 7) || [];
  const resultCount = jobItems?.length || 0;

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
            <Sorting />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} loading={loading} />
          <Pagination />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
