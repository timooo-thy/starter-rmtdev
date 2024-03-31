import { useContext, useEffect, useState } from "react";
import { JobDetails, JobItem } from "./types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../components/BookmarksContextProvider";
import { ActiveIdContext } from "../components/ActiveIdContextProvider";

/* API Calls */
const fetchJobItems = async (searchText: string): Promise<JobItem[]> => {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
  const data = await response.json();
  return data.jobItems;
};

const fetchJobDetails = async (id: number): Promise<JobDetails> => {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${id}`
  );
  // 404 error etc
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
  const data = await response.json();
  return data.jobItem;
};

/* React Query */
export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["jobItems", searchText],
    () => {
      return fetchJobItems(searchText);
    },
    {
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: handleError,
    }
  );
  return { jobItems: data, loading: isInitialLoading };
}

export function useJobDetails(activeId: number | null) {
  const { data, isLoading } = useQuery(
    ["jobDetails", activeId],
    () => {
      return activeId ? fetchJobDetails(activeId) : null;
    },
    {
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!activeId,
      onError: handleError,
    }
  );
  return { jobDetails: data, isLoading };
}

export function useJobItems(ids: number[]) {
  const result = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["jobItem", id],
        queryFn: () => fetchJobDetails(id),
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: false,
        onError: handleError,
      };
    }),
  });
  const bookmarkedJobItems = result
    .map((query) => query.data)
    .filter((jobItem) => jobItem !== undefined);
  const isLoading = result.some((query) => query.isLoading);

  return { bookmarkedJobItems, isLoading };
}

/* Custom Hooks */
export function useDebouncer<T>(value: T, delay = 500): T {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
}

export function useLocalStorage<T>(
  item: string,
  initialValue: T
): { value: T; setValue: React.Dispatch<React.SetStateAction<T>> } {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(item) || JSON.stringify(initialValue))
  );
  useEffect(() => {
    localStorage.setItem(item, JSON.stringify(value));
  }, [item, value]);

  return { value, setValue } as const;
}

type useOnClickOutsideType = (
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) => void;

export const useOnClickOutside: useOnClickOutsideType = (refs, handler) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      )
        handler();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
};

/* useContext */
export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "ActiveIdContext must be used within a ActiveIdContextProvider"
    );
  }
  return context;
}

// export function useJobDetails() {
// const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
// const [isLoading, setIsLoading] = useState(false);
// const { activeId } = useActiveId();
// useEffect(() => {
//   if (!activeId) {
//     setJobDetails(null);
//     return;
//   }
//   const fetchJobDetails = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${activeId}`
//       );
//       const data = await response.json();
//       setJobDetails(data.jobItem);
//     } catch (error) {
//       console.error("Error fetching job details");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchJobDetails();
// }, [activeId]);

// return { jobDetails, isLoading };

// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText) return;
//     setLoading(true);
//     const fetchAllJobItems = async () => {
//       try {
//         const response = await fetch(
//           `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
//         );
//         const data = await response.json();
//         setJobItems(data.jobItems);
//       } catch (error) {
//         console.error("Error fetching job items", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllJobItems();
//   }, [searchText]);

//   return { jobItems, loading };
// }
