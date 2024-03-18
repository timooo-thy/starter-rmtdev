import { useEffect, useState } from "react";
import { JobDetails, JobItem } from "./types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const jobItemsSliced = jobItems.slice(0, 7);

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

  return { jobItems: jobItemsSliced, loading };
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.substring(1);
      setActiveId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return { activeId };
}

export function useJobDetails() {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { activeId } = useActiveId();
  useEffect(() => {
    if (!activeId) {
      setJobDetails(null);
      return;
    }
    const fetchJobDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${activeId}`
        );
        const data = await response.json();
        setJobDetails(data.jobItem);
      } catch (error) {
        console.error("Error fetching job details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobDetails();
  }, [activeId]);

  return { jobDetails, isLoading };
}
