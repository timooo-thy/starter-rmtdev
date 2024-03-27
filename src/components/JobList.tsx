import { useActiveId } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  loading: boolean;
};

export function JobList({ jobItems, loading }: JobListProps) {
  const activeId = useActiveId();
  const isActive = (id: number) => id === activeId;
  return (
    <ul className="job-list">
      {loading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={isActive(jobItem.id)}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
