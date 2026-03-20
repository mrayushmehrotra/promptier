"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedSearch<T>(
  items: T[] | undefined,
  searchFields: Array<keyof T>,
  debounceMs: number = 300
) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, debounceMs);

  const filtered = useMemo(() => {
    if (!items) return [];
    if (!debouncedQuery.trim()) return items;

    const lowerQuery = debouncedQuery.toLowerCase();
    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return typeof value === "string" && value.toLowerCase().includes(lowerQuery);
      })
    );
  }, [items, debouncedQuery, searchFields]);

  return { query, setQuery, filtered };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}