import { useEffect } from 'react';
import { useJobItems } from '../lib/hooks';
import JobListItem from './JobListItem';
import Spinner from './Spinner';
import { useJobStore } from '../store/store';

export function JobList() {
  // const { jobItems } = useJobStore();
  const { jobItems, isLoading } = useJobItems();

  const { setCurrentJobsFound } = useJobStore();
  // const jobsRef = useRef(useJobStore.getState().jobItems)
  useEffect(() => {
    if(jobItems)
      setCurrentJobsFound(jobItems.length)
  
    return () => {
      
    }
  }, [jobItems, setCurrentJobsFound])
  

  if (isLoading) {
    <Spinner />;
  }

  if (!jobItems) {
    return <></>;
  }

  return (
    <ul className='job-list'>
      {jobItems.map((jobItem) => (
        <JobListItem key={jobItem.id} jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
