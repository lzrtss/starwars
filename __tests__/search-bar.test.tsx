import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import SearchBar from '@/components/search-bar';
import { ROUTES, SEARCH, SEARCH_PARAMS } from '@/lib/constants';
import { updateSearchParams } from '@/lib/utils';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

const mockSearchParams = new URLSearchParams();
const mockPathname = '/some/path';

(useRouter as jest.Mock).mockReturnValue(mockRouter);
(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
(usePathname as jest.Mock).mockReturnValue(mockPathname);

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default values', () => {
    render(<SearchBar />);

    const inputElement = screen.getByPlaceholderText(SEARCH.PLACEHOLDER);
    expect(inputElement).toBeInTheDocument();

    const imageElement = screen.getByAltText('Search');
    expect(imageElement).toBeInTheDocument();
  });

  it('should call router.push with the correct parameters on search query change', async () => {
    render(<SearchBar />);

    const inputElement = screen.getByPlaceholderText(SEARCH.PLACEHOLDER);

    fireEvent.change(inputElement, { target: { value: 'test' } });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        expect.stringContaining(
          updateSearchParams({
            searchParams: mockSearchParams,
            key: SEARCH_PARAMS.SEARCH,
            value: 'test',
          }),
        ),
      );
    });
  });

  it('should call router.push with the home route when search query is cleared', async () => {
    render(<SearchBar />);

    const inputElement = screen.getByPlaceholderText(SEARCH.PLACEHOLDER);

    // Initially, the search query is empty
    fireEvent.change(inputElement, { target: { value: 'test' } });
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        expect.stringContaining(
          updateSearchParams({
            searchParams: mockSearchParams,
            key: SEARCH_PARAMS.SEARCH,
            value: 'test',
          }),
        ),
      );
    });

    fireEvent.change(inputElement, { target: { value: '' } });
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.HOME);
    });
  });

  it('should render with additional className', () => {
    render(<SearchBar className="bg-gray-800" />);

    const formElement = screen.getByRole('search');
    expect(formElement).toHaveClass('bg-gray-800');
  });
});
