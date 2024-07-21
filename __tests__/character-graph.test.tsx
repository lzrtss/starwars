import { render, screen } from '@testing-library/react';

import CharacterGraph from '@/components/character-graph';
import { TITLES } from '@/lib/constants';

// Mock ReactFlow and its subcomponents
jest.mock('@xyflow/react', () => ({
  Controls: () => <div>Controls</div>,
  Edge: () => null,
  Node: () => null,
  ReactFlow: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useEdgesState: () => [[], jest.fn(), jest.fn()],
  useNodesState: () => [[], jest.fn(), jest.fn()],
}));

describe('CharacterGraph', () => {
  const mockInitialNodes = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
  ];

  const mockInitialEdges = [{ id: '1-2', source: '1', target: '2' }];

  it('renders the title correctly', () => {
    render(
      <CharacterGraph
        initialEdges={mockInitialEdges}
        initialNodes={mockInitialNodes}
      />,
    );

    const title = screen.getByText(TITLES.CHARACTER_DETAILS_GRAPH);
    expect(title).toBeInTheDocument();
  });

  it('renders the Controls component', () => {
    render(
      <CharacterGraph
        initialEdges={mockInitialEdges}
        initialNodes={mockInitialNodes}
      />,
    );

    const controls = screen.getByText('Controls');
    expect(controls).toBeInTheDocument();
  });
});
