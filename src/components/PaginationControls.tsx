import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { usePaginationStore } from '../store/store';
import { useEffect, useState } from 'react';
import { cn } from '../utils/utils';

const init = ['prev', 'next'];

export default function PaginationControls() {
  const { page, increasePage, decreasePage } = usePaginationStore();
  const [pagesLimit, setPagesLimit] = useState(init);

  useEffect(() => {
    if (page > 1) {
      setPagesLimit([String(page - 1), String(page + 1)]);
    } else {
      setPagesLimit(init);
    }

    return () => {
      setPagesLimit(init);
    };
  }, [page]);

  useEffect(() => {
    console.log(pagesLimit);
  }, [pagesLimit]);

  const nextStyle = pagesLimit[1] == init[1] && 'ml-auto';

  return (
    <section className='pagination'>
      {page > 0 && (
        <button className='pagination__button' onClick={decreasePage}>
          <ArrowLeftIcon />
          {pagesLimit[0] === init[0]
            ? `${pagesLimit[0]}`
            : `Page ${pagesLimit[0]}`}
        </button>
      )}
      <button
        className={cn('pagination__button ', nextStyle)}
        onClick={increasePage}
      >
        {pagesLimit[1] === init[1]
          ? `${pagesLimit[1]}`
          : `Page ${pagesLimit[1]}`}
        <ArrowRightIcon />
      </button>
    </section>
  );
}
