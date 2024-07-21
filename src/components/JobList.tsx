import { useEffect, useState } from 'react';
import { useJobItems } from '../lib/hooks';
import JobListItem from './JobListItem';
import Spinner from './Spinner';
import { useJobStore, usePaginationStore } from '../store/store';
import { JobItem } from '../lib/types';
import { chunk } from '../utils/utils';

export function JobList() {
  // const { jobItems } = useJobStore();
  const { jobItems, isLoading, isError, postsCount } = useJobItems();
  const { setMaxPageCount, page } = usePaginationStore()
  const [jobItemsCleaned, setJobItemsCleaned] = useState<JobItem[][]>([])

  const { setCurrentJobsFound } = useJobStore();

  useEffect(() => {
    if(postsCount) {
      setCurrentJobsFound(postsCount)
    }
  
    return () => {
      
    }
  }, [postsCount, setCurrentJobsFound])


  useEffect(() => {
    if(jobItems) {
      const cleanup = chunk(jobItems)
      setMaxPageCount(cleanup.length)
      setJobItemsCleaned(cleanup)
    }
  
    return () => {
      
    }
  }, [jobItems, setMaxPageCount])


  useEffect(() => {
    if(isLoading){
      setCurrentJobsFound(null)
    }
  },[isLoading, setCurrentJobsFound])
  

  if(isError) {
    return <Spinner />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!jobItems) {
    return (<div/>);
  }

  if (jobItemsCleaned.length > 0 && jobItemsCleaned[page].length > 1) {
    return (
      <ul className='job-list'>
        {jobItemsCleaned[page].map((jobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} />
        ))}
      </ul>
    );
  }
}

export default JobList;
