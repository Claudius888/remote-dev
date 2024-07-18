import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon } from './SearchIcon';
import { cn } from '../utils/utils';
import { useSearchText } from '../store/store';

export default function SearchForm() {
  const { searchText, setSearchText } = useSearchText()
  return (
    <form
      action='#'
      className='search'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className='flex flex-row min-w-192'>
        <motion.span
          className='absolute self-center left-3'
          initial={{ rotateY: 0 }}
          animate={
            {
              // rotate: [0, 60, 120, 240, 360],
              rotateY: searchText ? 90 : 0,
            }
          }
          transition={{ ease: 'easeIn', duration: 0.2 }}
        >
          {/* <i className='fa-solid fa-magnifying-glass text-blue-600'></i> */}
          <SearchIcon />
        </motion.span>
        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          spellCheck='false'
          type='text'
          required
          placeholder='Find remote developer jobs...'
        />
        <AnimatePresence>
          {searchText && (
            <motion.button
              className={cn(
                'absolute right-2 self-center bg-transparent text-blue-700'
              )}
              initial={{
                opacity: 0,
                scaleZ:0
              }}
              animate={{
                opacity: 1,
                scaleZ: 1
              }}
              exit={{
                opacity: 0,
                scaleZ: 0
              }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
            >
              Search
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
