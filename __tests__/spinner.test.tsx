import { render, screen } from '@testing-library/react';
import Spinner from '@/components/spinner';

describe('Spinner Component', () => {
  it('renders the spinner component', () => {
    render(<Spinner />);

    expect(screen.getByRole('spinner')).toBeInTheDocument();
  });
});
