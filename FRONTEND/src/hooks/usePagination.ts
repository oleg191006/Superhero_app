import { useState, useMemo } from "react";

export const usePagination = <T>(items: T[], perPage: number) => {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / perPage);
  }, [items.length, perPage]);

  const currentItems = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return items.slice(startIndex, endIndex);
  }, [items, page, perPage]);

  return {
    page,
    setPage,
    totalPages,
    currentItems,
  };
};
