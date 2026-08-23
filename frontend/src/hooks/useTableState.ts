import { useState, useCallback } from 'react';

export interface UseTableStateOptions {
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
  initialLimit?: number;
  initialPage?: number;
}

export function useTableState(options: UseTableStateOptions = {}) {
  const {
    initialSortBy = 'nombre',
    initialSortOrder = 'asc',
    initialLimit = 10,
    initialPage = 1,
  } = options;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const toggleSort = useCallback((field: string) => {
    setSortBy((prevSortBy) => {
      if (prevSortBy === field) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortOrder('asc');
      }
      return field;
    });
    setPage(1);
  }, []);

  return {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
  };
}
