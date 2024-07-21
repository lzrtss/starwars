import { render, screen } from '@testing-library/react';

import Hero from '@/components/hero';
import { TITLES } from '@/lib/constants';

describe('Hero', () => {
  it('renders in the document', () => {
    render(<Hero />);

    const sectionElement = screen.getByRole('hero');
    expect(sectionElement).toBeInTheDocument();
  });

  it('renders with additional className', () => {
    render(<Hero className="bg-gray-800" />);

    const sectionElement = screen.getByRole('hero');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('bg-gray-800');
  });

  it('displays the correct title', () => {
    render(<Hero />);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(TITLES.HERO);
  });
});
