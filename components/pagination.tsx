'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { updateSearchParams } from '@/lib/utils';
import { PAGINATION, SEARCH_PARAMS } from '@/lib/constants';

interface PaginationProps {
  currentPage: string;
  totalPages: number;
}

export default function Pagination({
  currentPage = '1',
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.push(
      pathname +
        updateSearchParams({
          searchParams,
          key: SEARCH_PARAMS.PAGE,
          value: currentPage,
        }),
    );
  }, [currentPage]);

  const currentPageNumber = Number(currentPage);
  const pages = Array.from({ length: totalPages }, (_, i) => String(i + 1));
  const nextPage = Number(currentPage) + 1;
  const previousPage = Number(currentPage) - 1;

  const handleChangePage = (page: string) => {
    router.push(
      pathname +
        updateSearchParams({
          searchParams,
          key: SEARCH_PARAMS.PAGE,
          value: page,
        }),
    );
  };

  return (
    <ul className="flex justify-center items-center gap-3 mb-10">
      <li>
        <button
          className="px-4 py-2 rounded-lg border border-white hover:text-blue-200 hover:border-y hover:border-blue-200 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:border-neutral-500"
          type="button"
          disabled={previousPage < 1}
          onClick={() => handleChangePage(previousPage.toString())}
        >
          {PAGINATION.PREVIOUS_PAGE}
        </button>
      </li>

      {pages.map((page) => (
        <li key={page}>
          <button
            role="button"
            className={`max-md:hidden p-2 ${
              currentPage === page
                ? 'py-1 text-xl font-bold text-blue-200 border-y-[1px] border-blue-200'
                : ''
            } hover:text-blue-200`}
            onClick={() => handleChangePage(page.toString())}
          >
            {page}
          </button>
        </li>
      ))}

      <li>
        <button
          className="px-4 py-2 rounded-lg border border-white hover:text-blue-200 hover:border-y hover:border-blue-200 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:border-neutral-500"
          type="button"
          disabled={currentPageNumber >= totalPages}
          onClick={() => handleChangePage(nextPage.toString())}
        >
          {PAGINATION.NEXT_PAGE}
        </button>
      </li>
    </ul>
  );
}
