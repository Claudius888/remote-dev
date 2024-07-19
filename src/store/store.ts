import { create } from 'zustand';
import { JobItem } from '../lib/types';
import { devtools } from 'zustand/middleware'

interface JobsList {
  jobItems: JobItem[];
  activeId: string | null;
  currentJobsCount: number | null;
  updateJobs: (newJobs: JobItem[]) => void;
  currentJobHash: (hash: string) => void;
  setCurrentJobsFound: (count: number) => void;
}

interface SearchText {
  searchText: string;
  debouncedSearchValue: string;
  setSearchText: (searchQuery: string) => void;
  setDebouncedValue: (searchQuery: string) => void;
}

export const useJobStore = create<JobsList>()((set) => ({
  jobItems: [],
  activeId: null,
  currentJobsCount: null,
  updateJobs: (by) => set(() => ({ jobItems: by })),
  currentJobHash: (hash) => set(() => ({ activeId: hash })),
  setCurrentJobsFound: (count) => set(() => ({currentJobsCount: count})) 
}));

export const useSearchText = create<SearchText>()(devtools((set) => ({
  searchText: '',
  debouncedSearchValue: '',
  setSearchText: (by) =>
    set(() => ({
      searchText: by,
    })),
  setDebouncedValue: (by) =>
    set(() => ({
      debouncedSearchValue: by,
    })),
})));
