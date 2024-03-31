import { createContext } from "react";
import { useLocalStorage, useJobItems } from "../lib/hooks";
import { JobItem } from "../lib/types";

type BookmarksContextType = {
  bookmarkIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItem[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const { value: bookmarkIds, setValue: setBookmarkIds } = useLocalStorage<
    number[]
  >("bookmarkIds", []);
  console.log(bookmarkIds, "hello");
  const { bookmarkedJobItems, isLoading } = useJobItems(bookmarkIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
