import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Database } from 'lucide-react';

export const MemoryNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="bg-[#1a1a3a] border border-[#ff5e7f] rounded-lg p-3 shadow-md min-w-[180px]">
      <div className="flex items-center mb-2">
        <div className="h-6 w-6 rounded-full bg-[#ff5e7f] flex items-center justify-center mr-2">
          <Database className="h-3 w-3 text-black" />
        </div>
        <div className="font-medium text-sm">{data.label || 'Memory'}</div>
      </div>
      <div className="text-xs text-gray-400 mb-1">Type: {data.memoryType || 'conversation'}</div>
      <div className="text-xs text-gray-400 mb-1">Capacity: {data.capacity || '10'}</div>
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: '#ff5e7f', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: '#ff5e7f', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
    </div>
  );
});