import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type BookmarksContextType = {
  bookmarkIds: number[];
  handleToggleBookmark: (id: number) => void;
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
  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarkIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
