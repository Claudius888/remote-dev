import { useEffect } from 'react';
import { useSearchText } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { JobItem, JobItemContentProps } from './types';

const BASE_URL = 'https://bytegrad.com/course-assets/projects/rmtdev/api/data';

interface JobItemApiResponse {
  public: boolean;
  jobItem: JobItemContentProps;
}

interface JobItemsApiResponse {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
}

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  const data = await response.json();
  return data;
};

export function useJobItems() {
  const { debouncedSearchValue } = useSearchText();

  const { data, isLoading } = useQuery({
    queryKey: ['job-items', debouncedSearchValue],
    queryFn: () => fetchJobItems(debouncedSearchValue),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(debouncedSearchValue),
  });
  
  const jobItems = data?.jobItems;
  return { jobItems, isLoading };
}

const fetchJobItem = async (id: string): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data;
};

export function useJobItem(id: string | null) {
  const { data, isLoading } = useQuery({
    queryKey: ['job-item', id],
    queryFn: async () => (id ? fetchJobItem(id) : null),
    meta: {
      errorMessage: 'Failed to fetch posts',
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id),
  });

  const jobItem = data?.jobItem;
  return { jobItem, isLoading } as const;
}

export function useDebounce(delay?: number) {
  const { setDebouncedValue, searchText } = useSearchText();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(searchText), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, delay]);
}
