import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import GoBackButton from '@/components/go-back-button';
import { BUTTONS } from '@/lib/constants';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('GoBackButton', () => {
  it('renders correctly with default className', () => {
    // Mock router
    const router = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);

    const { getByText } = render(<GoBackButton />);

    const button = getByText(`< ${BUTTONS.GO_BACK}`);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'text-white hover:text-blue-200 transition duration-300 ease-in-out',
    );
  });

  it('renders correctly with custom className', () => {
    // Mock router
    const router = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);

    const { getByText } = render(<GoBackButton className="custom-class" />);

    const button = getByText(`< ${BUTTONS.GO_BACK}`);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
  });

  it('calls router.back() when clicked', () => {
    // Mock router
    const router = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);

    const { getByText } = render(<GoBackButton />);

    const button = getByText(`< ${BUTTONS.GO_BACK}`);
    fireEvent.click(button);

    expect(router.back).toHaveBeenCalled();
  });
});
