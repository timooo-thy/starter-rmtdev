import { useEffect, useState } from "react";
import { JobItem } from "./types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  return { jobItems, loading };
}
