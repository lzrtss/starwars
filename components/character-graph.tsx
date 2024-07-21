'use client';

import {
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';

import { TITLES } from '@/lib/constants';
import '@xyflow/react/dist/style.css';

interface CharacterGraphProps {
  initialEdges: Edge[];
  initialNodes: Node[];
}

export default function CharacterGraph({
  initialEdges,
  initialNodes,
}: CharacterGraphProps) {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <section>
      <h2 className="mb-10 text-2xl">{TITLES.CHARACTER_DETAILS_GRAPH}</h2>

      <div className="max-w-[1280px] h-[540px] p-8 rounded-xl overflow-hidden bg-neutral-900 text-black">
        <ReactFlow
          edges={edges}
          nodes={nodes}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <Controls />
        </ReactFlow>
      </div>
    </section>
  );
}
