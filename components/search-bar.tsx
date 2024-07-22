'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDebounce } from '@/hooks/use-debounce';
import { ROUTES, SEARCH, SEARCH_PARAMS } from '@/lib/constants';
import { updateSearchParams } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get(SEARCH_PARAMS.SEARCH) ?? '',
  );

  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH.DELAY);

  useEffect(() => {
    if (debouncedSearchQuery) {
      router.push(
        pathname +
          updateSearchParams({
            searchParams,
            key: SEARCH_PARAMS.SEARCH,
            value: debouncedSearchQuery,
          }),
      );
    } else {
      router.push(ROUTES.HOME);
    }
  }, [debouncedSearchQuery, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form
      role="search"
      className={`px-4 py-3 flex gap-3 bg-neutral-800 rounded-full ${className}`}
    >
      <Image
        src="/search.svg"
        alt="Search"
        width={20}
        height={20}
        priority
        className="w-auto h-auto object-contain"
      />
      <input
        autoComplete="off"
        autoCorrect="off"
        type="search"
        id="text"
        maxLength={50}
        value={searchQuery}
        placeholder={SEARCH.PLACEHOLDER}
        className="w-full border-none outline-none bg-neutral-800 text-neutral-300 text-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        onChange={handleSearch}
      />
    </form>
  );
}
