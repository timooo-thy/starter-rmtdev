import { useEffect, useState } from "react";
import { JobDetails, JobItem } from "./types";
import { useQuery } from "@tanstack/react-query";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const jobItemsSliced = jobItems.slice(0, 7);
  const resultCount = jobItems.length;

  useEffect(() => {
    if (!searchText) return;
    setLoading(true);
    const fetchAllJobItems = async () => {
      try {
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        const data = await response.json();
        setJobItems(data.jobItems);
      } catch (error) {
        console.error("Error fetching job items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobItems();
  }, [searchText]);

  return { jobItems: jobItemsSliced, loading, resultCount };
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.substring(1);
      if (id === 0) return;
      setActiveId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

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

export function useJobDetails() {
  const activeId = useActiveId();
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
      onError: (error) => {
        console.error("Error", error);
      },
    }
  );
  return { jobDetails: data, isLoading };
}

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
