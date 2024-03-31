import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ActiveIdProvider } from "./contexts/ActiveIdContextProvider.tsx";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import { SearchTextProvider } from "./contexts/SearchTextContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchTextProvider>
        <ActiveIdProvider>
          <BookmarksContextProvider>
            <App />
          </BookmarksContextProvider>
        </ActiveIdProvider>
      </SearchTextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
