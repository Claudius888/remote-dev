import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchText } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { JobItem, JobItemContentProps } from './types';
import { useShallow } from 'zustand/react/shallow';

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
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;

  // const response = await axios.get(
  //   `${BASE_URL}?search=${searchText}`,
  // );
  // return response.data;
};

export function useJobItems() {
  const debouncedSearchValue  = useSearchText(useShallow((state) => state.debouncedSearchValue));
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-items', debouncedSearchValue],
    queryFn: () => fetchJobItems(debouncedSearchValue),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(debouncedSearchValue),
  });

  
    return {
      jobItems: data?.jobItems,
      postsCount: data?.jobItems.length,
      isLoading,
      isError,
    };
}

const fetchJobItem = async (id: string): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
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

  return { jobItem: data?.jobItem, isLoading } as const;
}

export function useDebounce(delay?: number) {
  const { setDebouncedValue, searchText } = useSearchText();
  const timerRef = useRef<number>();

  const setDebounced = useCallback(() => {
    console.log('EVERYTHING', searchText, delay);
    if (searchText) {
      timerRef.current = setTimeout(
        () => setDebouncedValue(searchText),
        delay || 500
      );
    }
    return;
  }, [timerRef, setDebouncedValue, delay, searchText]);

  useEffect(() => {
    // const timer = setTimeout(() => setDebouncedValue(searchText), delay || 500);
    setDebounced();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [setDebounced]);

  return searchText;
}

export function useInputFocused(
  ref: React.RefObject<HTMLInputElement | undefined>
) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('focusin', () => {
        setIsFocused(() => true);
      });

      ref.current.addEventListener('focusout', () => {
        setIsFocused(() => false);
      });

      return () => {
        setIsFocused(false);
      };
    }
  }, [ref]);

  return isFocused;
}
