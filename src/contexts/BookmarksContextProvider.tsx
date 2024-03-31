import { createContext, useCallback, useMemo } from "react";
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

  const { bookmarkedJobItems, isLoading } = useJobItems(bookmarkIds);

  const handleToggleBookmark = useCallback(
    (id: number) => {
      if (bookmarkIds.includes(id)) {
        setBookmarkIds((prev) =>
          prev.filter((bookmarkId) => bookmarkId !== id)
        );
      } else {
        setBookmarkIds((prev) => [...prev, id]);
      }
    },
    [bookmarkIds, setBookmarkIds]
  );

  const contextValues = useMemo(() => {
    return {
      bookmarkIds,
      handleToggleBookmark,
      bookmarkedJobItems,
      isLoading,
    };
  }, [bookmarkIds, handleToggleBookmark, bookmarkedJobItems, isLoading]);

  return (
    <BookmarksContext.Provider value={contextValues}>
      {children}
    </BookmarksContext.Provider>
  );
}
