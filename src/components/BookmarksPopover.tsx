import JobList from "./JobList";
import { useBookmarksContext } from "../lib/hooks";

type BookmarksPopoverProps = {
  ref: React.RefObject<HTMLDivElement>;
};
export default function BookmarksPopover({ ref }: BookmarksPopoverProps) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} loading={isLoading} />
    </div>
  );
}
