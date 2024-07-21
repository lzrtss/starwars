import { updateSearchParams } from '@/lib/utils';
import { SEARCH_PARAMS } from '@/lib/constants';

describe('updateSearchParams', () => {
  it('should delete the page param if search param is updated', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.SEARCH,
      value: 'Darth Vader',
    });

    expect(result).toBe('?search=Darth+Vader');
  });

  it('should delete the page param if page is set to 1', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: '1',
    });

    expect(result).toBe('?search=Luke');
  });

  it('should set the param if value is provided', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: '3',
    });

    expect(result).toBe('?page=3&search=Luke');
  });

  it('should delete the param if value is null', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: null,
    });

    expect(result).toBe('?search=Luke');
  });

  it('should delete the param if value is empty string', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: '',
    });

    expect(result).toBe('?search=Luke');
  });

  it('should handle no initial params correctly', () => {
    const searchParams = new URLSearchParams('');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.SEARCH,
      value: 'Darth Vader',
    });

    expect(result).toBe('?search=Darth+Vader');
  });
});
