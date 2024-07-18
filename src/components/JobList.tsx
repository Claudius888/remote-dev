import { useJobStore } from '../store/store';
import JobListItem from './JobListItem';

export function JobList() {
  const { jobItems } = useJobStore();
  return (
    <ul className='job-list'>
      {jobItems.map((jobItem) => (
        <JobListItem jobItem={jobItem}/>
      ))}
    </ul>
  );
}

export default JobList;
