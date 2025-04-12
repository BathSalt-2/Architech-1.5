import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  Connection,
  Edge,
  NodeTypes,
  EdgeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Save, Play, Plus, Trash2, Settings, Code, Cpu, MessageSquare, Database, ArrowRight } from 'lucide-react';

import { InputNode } from './nodes/InputNode';
import { OutputNode } from './nodes/OutputNode';
import { ProcessNode } from './nodes/ProcessNode';
import { MemoryNode } from './nodes/MemoryNode';
import { ToolNode } from './nodes/ToolNode';
import { CustomEdge } from './edges/CustomEdge';
import { NodeSidebar } from './NodeSidebar';
import { PropertiesPanel } from './PropertiesPanel';

// Define custom node types
const nodeTypes: NodeTypes = {
  input: InputNode,
  output: OutputNode,
  process: ProcessNode,
  memory: MemoryNode,
  tool: ToolNode,
};

// Define custom edge types
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

// Initial nodes for a new agent
const initialNodes = [
  {
    id: 'input-1',
    type: 'input',
    position: { x: 100, y: 200 },
    data: { label: 'User Input', type: 'text' },
  },
  {
    id: 'process-1',
    type: 'process',
    position: { x: 400, y: 200 },
    data: { 
      label: 'Process',
      model: 'gpt-4',
      prompt: 'You are a helpful assistant. Respond to the user query.',
      temperature: 0.7,
    },
  },
  {
    id: 'output-1',
    type: 'output',
    position: { x: 700, y: 200 },
    data: { label: 'Response', type: 'text' },
  },
];

// Initial edges connecting the nodes
const initialEdges = [
  {
    id: 'edge-input-process',
    source: 'input-1',
    target: 'process-1',
    type: 'custom',
    animated: true,
  },
  {
    id: 'edge-process-output',
    source: 'process-1',
    target: 'output-1',
    type: 'custom',
    animated: true,
  },
];

export function AgentDesigner() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [agentName, setAgentName] = useState('New Agent');
  const [agentDescription, setAgentDescription] = useState('');
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, type: 'custom', animated: true }, eds)),
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: any) => {
      setSelectedNode(node);
    },
    []
  );

  // Handle drag and drop from sidebar
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Update node data when properties change
  const updateNodeData = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Delete selected node
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => 
        eds.filter(
          (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  // Save agent configuration
  const saveAgent = () => {
    const agentConfig = {
      name: agentName,
      description: agentDescription,
      nodes: nodes,
      edges: edges,
    };
    console.log('Saving agent:', agentConfig);
    // In a real app, this would call the API to save the agent
  };

  // Test the agent
  const testAgent = () => {
    console.log('Testing agent with current configuration');
    // In a real app, this would run the agent with test input
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-[#2a2a4a]">
        <div className="flex items-center space-x-4">
          <div>
            <Label htmlFor="agent-name">Agent Name</Label>
            <Input
              id="agent-name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="bg-[#1a1a3a] border-[#2a2a4a] w-64"
            />
          </div>
          <div>
            <Label htmlFor="agent-description">Description</Label>
            <Input
              id="agent-description"
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
              className="bg-[#1a1a3a] border-[#2a2a4a] w-96"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={testAgent}>
            <Play className="mr-2 h-4 w-4" /> Test
          </Button>
          <Button className="gradient-bg text-black" onClick={saveAgent}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-64 border-r border-[#2a2a4a] bg-[#0a1029] p-4">
          <NodeSidebar />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1" ref={reactFlowWrapper}>
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onInit={setReactFlowInstance}
                fitView
                className="bg-[#0a0a1f]"
              >
                <Background color="#2a2a4a" gap={16} />
                <Controls />
                <Panel position="top-right">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => console.log(nodes, edges)}>
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={deleteSelectedNode} disabled={!selectedNode}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Panel>
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>

        {selectedNode && (
          <div className="w-80 border-l border-[#2a2a4a] bg-[#0a1029] p-4 overflow-y-auto">
            <PropertiesPanel 
              node={selectedNode} 
              updateNodeData={updateNodeData} 
            />
          </div>
        )}
      </div>
    </div>
  );
}