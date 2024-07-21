import { render, screen, waitFor } from '@testing-library/react';

import MotionOpacity from '@/components/motion-opacity';

describe('MotionOpacity Component', () => {
  it('renders its children', () => {
    render(
      <MotionOpacity>
        <div>Child Component</div>
      </MotionOpacity>,
    );

    // Check if the child component is rendered
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('applies correct motion properties', async () => {
    render(
      <MotionOpacity delay={0.5} duration={0.5}>
        <div>Child Component</div>
      </MotionOpacity>,
    );

    // Find the motion.div element
    const motionDiv = screen.getByText('Child Component')
      .parentElement as HTMLElement;

    // Check if the motion.div has the correct motion properties
    expect(motionDiv).toHaveStyle('opacity: 0'); // Initial style applied by framer-motion

    await waitFor(
      () => {
        expect(motionDiv).toHaveStyle('opacity: 1');
      },
      { timeout: 2000 },
    );
  });
});
