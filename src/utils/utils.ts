import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { JobItem } from '../lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const chunk = (arr: JobItem[], size: number = 7) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
