import { JobItem } from "../lib/types";
import { useJobStore } from "../store/store";
import { cn } from "../utils/utils";
import BookmarkIcon from "./BookmarkIcon";

type JobListItemProps = {
  jobItem: JobItem
}

export default function JobListItem({jobItem}: JobListItemProps) {
  const { currentJobHash, activeId } = useJobStore()
  const selectedJobHighlight = activeId === jobItem.id ?  'job-item--active': ""
  
  return (
    <li className={cn("job-item", selectedJobHighlight)}>
      <a className="job-item__link" href={`#${jobItem.id}`} onClick={() => currentJobHash(jobItem.id)}>
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
