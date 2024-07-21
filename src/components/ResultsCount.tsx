import { useShallow } from 'zustand/react/shallow';
import { useJobStore } from '../store/store';

export default function ResultsCount() {
  const currentJobsCount = useJobStore(useShallow((state) => state.currentJobsCount));
  return (
    <p className='count'>
      <span className='u-bold'>{currentJobsCount}</span>
      {' '}
      results
    </p>
  );
}
