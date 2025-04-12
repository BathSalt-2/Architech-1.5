import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Tool } from 'lucide-react';

export const ToolNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="bg-[#1a1a3a] border border-[#5eff8a] rounded-lg p-3 shadow-md min-w-[180px]">
      <div className="flex items-center mb-2">
        <div className="h-6 w-6 rounded-full bg-[#5eff8a] flex items-center justify-center mr-2">
          <Tool className="h-3 w-3 text-black" />
        </div>
        <div className="font-medium text-sm">{data.label || 'Tool'}</div>
      </div>
      <div className="text-xs text-gray-400 mb-1">Type: {data.toolType || 'api'}</div>
      {data.endpoint && (
        <div className="text-xs text-gray-400 truncate max-w-[160px]">{data.endpoint}</div>
      )}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: '#5eff8a', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: '#5eff8a', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
    </div>
  );
});