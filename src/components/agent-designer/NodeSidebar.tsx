import { Card, CardContent } from '@/components/ui/card';
import { Cpu, MessageSquare, Database, ArrowRight, Tool, Workflow } from 'lucide-react';

const nodeTypes = [
  {
    type: 'input',
    label: 'Input',
    description: 'Receives data from users or external sources',
    icon: MessageSquare,
    color: '#5ee7ff',
  },
  {
    type: 'process',
    label: 'Process',
    description: 'Processes data using AI models',
    icon: Cpu,
    color: '#8a5fff',
  },
  {
    type: 'memory',
    label: 'Memory',
    description: 'Stores and retrieves contextual information',
    icon: Database,
    color: '#ff5e7f',
  },
  {
    type: 'tool',
    label: 'Tool',
    description: 'Integrates with external tools and APIs',
    icon: Tool,
    color: '#5eff8a',
  },
  {
    type: 'output',
    label: 'Output',
    description: 'Returns processed data to users or other systems',
    icon: ArrowRight,
    color: '#ffcc5e',
  },
];

export function NodeSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Node Types</h3>
      <p className="text-sm text-gray-400 mb-4">Drag nodes onto the canvas to build your agent</p>
      
      <div className="space-y-3">
        {nodeTypes.map((node) => (
          <Card 
            key={node.type}
            className="bg-[#1a1a3a] border-[#2a2a4a] hover:border-[#5ee7ff] cursor-grab"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <CardContent className="p-3 flex items-center space-x-3">
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: node.color }}
              >
                <node.icon className="h-4 w-4 text-black" />
              </div>
              <div>
                <h4 className="font-medium">{node.label}</h4>
                <p className="text-xs text-gray-400">{node.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="border-t border-[#2a2a4a] pt-4 mt-6">
        <h3 className="text-sm font-medium mb-2">Templates</h3>
        <div className="space-y-2">
          <Card className="bg-[#1a1a3a] border-[#2a2a4a] hover:border-[#5ee7ff] cursor-pointer">
            <CardContent className="p-3">
              <h4 className="font-medium">Q&A Agent</h4>
              <p className="text-xs text-gray-400">Simple question answering</p>
            </CardContent>
          </Card>
          <Card className="bg-[#1a1a3a] border-[#2a2a4a] hover:border-[#5ee7ff] cursor-pointer">
            <CardContent className="p-3">
              <h4 className="font-medium">RAG Agent</h4>
              <p className="text-xs text-gray-400">With document retrieval</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}