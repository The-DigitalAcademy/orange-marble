import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFilteredListUniqueValues<T>(list: T[], filters: Partial<T>, returnKey: keyof T) {
  const filtered = filterList(list, filters).map(item => item[returnKey]);
  return [...new Set(filtered.sort())]
}

export function filterList<T>(list: T[], filters: Partial<T>) {
  return list.filter(item => {
    for (const key of Object.keys(filters)) {
      if (filters[key as keyof typeof item] && item[key as keyof typeof item] != filters[key as keyof typeof item]) {
        return false; // Exclude item if it doesn't match the filter
      }
    }
    return true;
  })
}