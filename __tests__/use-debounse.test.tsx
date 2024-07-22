import { render, act } from '@testing-library/react';

import { useDebounce } from '@/hooks/use-debounce';

function TestComponent({ value, delay }: { value: string; delay: number }) {
  const debouncedValue = useDebounce(value, delay);
  return <div>{debouncedValue}</div>;
}

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { getByText } = render(<TestComponent value="test" delay={500} />);
    expect(getByText('test')).toBeInTheDocument();
  });

  it('should return debounced value after specified delay', () => {
    const { getByText, rerender } = render(
      <TestComponent value="test" delay={500} />,
    );

    rerender(<TestComponent value="test2" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(getByText('test')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(getByText('test2')).toBeInTheDocument();
  });
});
