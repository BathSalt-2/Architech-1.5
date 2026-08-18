import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Cpu } from 'lucide-react';

export const ProcessNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="bg-[#1a1a3a] border border-[#8a5fff] rounded-lg p-3 shadow-md min-w-[200px]">
      <div className="flex items-center mb-2">
        <div className="h-6 w-6 rounded-full bg-[#8a5fff] flex items-center justify-center mr-2">
          <Cpu className="h-3 w-3 text-black" />
        </div>
        <div className="font-medium text-sm">{data.label || 'Process'}</div>
      </div>
      <div className="text-xs text-gray-400 mb-1">Model: {data.model || 'gpt-4'}</div>
      <div className="text-xs text-gray-400 mb-1">Temp: {data.temperature || '0.7'}</div>
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: '#8a5fff', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: '#8a5fff', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
    </div>
  );
});