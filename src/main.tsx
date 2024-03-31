import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ActiveIdProvider } from "./components/ActiveIdContextProvider.tsx";
import BookmarksContextProvider from "./components/BookmarksContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveIdProvider>
        <BookmarksContextProvider>
          <App />
        </BookmarksContextProvider>
      </ActiveIdProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
