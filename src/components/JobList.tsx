import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  loading: boolean;
};

export function JobList({ jobItems, loading }: JobListProps) {
  return (
    <ul className="job-list">
      {loading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} />
        ))
      )}
    </ul>
  );
}

export default JobList;
