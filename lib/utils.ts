import { SEARCH_PARAMS } from '@/lib/constants';

export function updateSearchParams({
  searchParams,
  key,
  value,
}: {
  searchParams: URLSearchParams;
  key: string;
  value: string | null;
}): string {
  const params = new URLSearchParams(searchParams);

  if (key === SEARCH_PARAMS.SEARCH) {
    params.delete(SEARCH_PARAMS.PAGE);
  }
  if (key === SEARCH_PARAMS.PAGE && value === '1') {
    params.delete(SEARCH_PARAMS.PAGE);
  } else if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  return `?${params.toString()}`;
}
