import { render, screen } from '@testing-library/react';

import Container from '@/components/container';

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <p>Test Child</p>
      </Container>,
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(
      <Container>
        <p>Test Child</p>
      </Container>,
    );
    const div = container.firstChild;
    expect(div).toHaveClass('h-full max-w-7xl mx-auto p-5');
  });

  it('applies additional className when provided', () => {
    const { container } = render(
      <Container className="bg-gray-200">
        <p>Test Child</p>
      </Container>,
    );
    const div = container.firstChild;
    expect(div).toHaveClass('bg-gray-200');
  });

  it('applies both default and additional classNames', () => {
    const { container } = render(
      <Container className="bg-gray-200 text-center">
        <p>Test Child</p>
      </Container>,
    );
    const div = container.firstChild;
    expect(div).toHaveClass('h-full max-w-7xl mx-auto p-5');
    expect(div).toHaveClass('bg-gray-200');
    expect(div).toHaveClass('text-center');
  });
});
