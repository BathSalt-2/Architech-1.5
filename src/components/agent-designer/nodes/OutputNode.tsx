import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { ArrowRight } from 'lucide-react';

export const OutputNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="bg-[#1a1a3a] border border-[#ffcc5e] rounded-lg p-3 shadow-md min-w-[180px]">
      <div className="flex items-center mb-2">
        <div className="h-6 w-6 rounded-full bg-[#ffcc5e] flex items-center justify-center mr-2">
          <ArrowRight className="h-3 w-3 text-black" />
        </div>
        <div className="font-medium text-sm">{data.label || 'Output'}</div>
      </div>
      <div className="text-xs text-gray-400 mb-1">Type: {data.type || 'text'}</div>
      {data.format && (
        <div className="text-xs text-[#ffcc5e]">Formatted</div>
      )}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: '#ffcc5e', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
    </div>
  );
});