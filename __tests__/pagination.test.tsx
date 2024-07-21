import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Pagination from '@/components/pagination';
import { updateSearchParams } from '@/lib/utils';
import { PAGINATION, SEARCH_PARAMS } from '@/lib/constants';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/current-path'),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams('page=1')),
}));

describe('Pagination', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders page numbers and buttons', () => {
    render(<Pagination currentPage="1" totalPages={5} />);

    expect(screen.getByText(PAGINATION.PREVIOUS_PAGE)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(PAGINATION.NEXT_PAGE)).toBeInTheDocument();
  });

  it('handles page change correctly', async () => {
    render(<Pagination currentPage="1" totalPages={5} />);

    fireEvent.click(screen.getByText('2'));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith(
        '/current-path' +
          updateSearchParams({
            searchParams: new URLSearchParams('page=1'),
            key: SEARCH_PARAMS.PAGE,
            value: '2',
          }),
      );
    });
  });

  it('disables previous button on the first page', () => {
    render(<Pagination currentPage="1" totalPages={5} />);

    const previousButton = screen.getByText(PAGINATION.PREVIOUS_PAGE);
    expect(previousButton).toBeDisabled();
  });

  it('disables next button on the last page', () => {
    render(<Pagination currentPage="5" totalPages={5} />);

    const nextButton = screen.getByText(PAGINATION.NEXT_PAGE);
    expect(nextButton).toBeDisabled();
  });

  it('calls router.push with updated searchParams when page changes', async () => {
    render(<Pagination currentPage="2" totalPages={5} />);

    fireEvent.click(screen.getByText('3'));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith(
        '/current-path' +
          updateSearchParams({
            searchParams: new URLSearchParams('page=2'),
            key: SEARCH_PARAMS.PAGE,
            value: '3',
          }),
      );
    });
  });
});
