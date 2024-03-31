import JobList from "./JobList";
import { useBookmarksContext } from "../lib/hooks";
import { createPortal } from "react-dom";

type BookmarksPopoverProps = {
  ref: React.RefObject<HTMLDivElement>;
};
export default function BookmarksPopover({ ref }: BookmarksPopoverProps) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} loading={isLoading} />
    </div>,
    document.body
  );
}
