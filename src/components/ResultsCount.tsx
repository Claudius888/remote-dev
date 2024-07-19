import { useJobStore } from '../store/store';

export default function ResultsCount() {
  const { currentJobsCount } = useJobStore();
  return (
    <p className='count'>
      <span className='u-bold'>{currentJobsCount}</span>
      {' '}
      results
    </p>
  );
}
