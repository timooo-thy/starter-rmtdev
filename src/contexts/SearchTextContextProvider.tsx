import React, { createContext, useState } from "react";
import { useDebouncer } from "../lib/hooks";

type SearchTextContextType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  debounceSearchText: string;
};

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

type SearchTextProviderProps = {
  children: React.ReactNode;
};

export function SearchTextProvider({ children }: SearchTextProviderProps) {
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebouncer(searchText, 300);

  return (
    <SearchTextContext.Provider
      value={{ searchText, setSearchText, debounceSearchText }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
