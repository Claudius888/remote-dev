import { create } from 'zustand'

interface JobsList {
  jobItems: []
  updateJobs: (newJobs: []) => void
}

interface SearchText {
    searchText: string
    setSearchText: (searchQuery: string) => void
  }

export const useJobStore = create<JobsList>()((set) => ({
  jobItems: [],
  updateJobs: (by) => set(() => ({ jobItems: by})),
}))

export const useSearchText = create<SearchText>()((set) => ({
    searchText: '',
    setSearchText: (by) => set(() => ({ searchText: by})),
  }))