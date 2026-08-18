import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { MessageSquare } from 'lucide-react';

export const InputNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="bg-[#1a1a3a] border border-[#5ee7ff] rounded-lg p-3 shadow-md min-w-[180px]">
      <div className="flex items-center mb-2">
        <div className="h-6 w-6 rounded-full bg-[#5ee7ff] flex items-center justify-center mr-2">
          <MessageSquare className="h-3 w-3 text-black" />
        </div>
        <div className="font-medium text-sm">{data.label || 'Input'}</div>
      </div>
      <div className="text-xs text-gray-400 mb-1">Type: {data.type || 'text'}</div>
      {data.required && (
        <div className="text-xs text-[#5ee7ff]">Required</div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: '#5ee7ff', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
    </div>
  );
});