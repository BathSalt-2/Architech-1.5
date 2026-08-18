import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { modelService } from '@/lib/api/model-service';

// ── Shared field styling ──────────────────────────────────────────────
const FIELD_CLASS = 'bg-[#1a1a3a] border-[#2a2a4a]';

// ── Reusable field components ─────────────────────────────────────────

/** Text input field with label — used by every node type for "Label" and similar fields. */
function TextField({
  id,
  label,
  value,
  onChange,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className ?? FIELD_CLASS}
      />
    </div>
  );
}

/** Dropdown select field with label. */
function SelectField({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={FIELD_CLASS}>
          <SelectValue placeholder={placeholder ?? 'Select'} />
        </SelectTrigger>
        <SelectContent className={FIELD_CLASS}>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Toggle switch with label. */
function SwitchField({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

/** Range slider with label showing current value. */
function SliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <Label htmlFor={id}>
          {label}: {value}
        </Label>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        className="my-2"
      />
    </div>
  );
}

// ── Shared option sets ────────────────────────────────────────────────

/** I/O type options shared by Input and Output nodes. */
const IO_TYPE_OPTIONS = [
  { value: 'text', label: 'Text' },
  { value: 'image', label: 'Image' },
  { value: 'file', label: 'File' },
  { value: 'structured', label: 'Structured Data' },
];

const MODEL_OPTIONS = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4-vision', label: 'GPT-4 Vision' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'llama-3-70b', label: 'Llama 3 70B' },
];

const MEMORY_TYPE_OPTIONS = [
  { value: 'conversation', label: 'Conversation' },
  { value: 'vector', label: 'Vector Store' },
  { value: 'hybrid', label: 'Hybrid' },
];

const TOOL_TYPE_OPTIONS = [
  { value: 'api', label: 'API Call' },
  { value: 'function', label: 'Function' },
  { value: 'data', label: 'Data Source' },
];

// ── Main component ────────────────────────────────────────────────────

interface PropertiesPanelProps {
  node: any;
  updateNodeData: (nodeId: string, data: any) => void;
}

export function PropertiesPanel({ node, updateNodeData }: PropertiesPanelProps) {
  const [localData, setLocalData] = useState({ ...node.data });

  useEffect(() => {
    setLocalData({ ...node.data });
  }, [node]);

  const handleChange = (key: string, value: any) => {
    const newData = { ...localData, [key]: value };
    setLocalData(newData);
    updateNodeData(node.id, { [key]: value });
  };

  const renderInputNodeProperties = () => (
    <div className="space-y-4">
      <TextField id="label" label="Label" value={localData.label || ''} onChange={(v) => handleChange('label', v)} />
      <SelectField
        id="type"
        label="Input Type"
        value={localData.type || 'text'}
        options={IO_TYPE_OPTIONS}
        placeholder="Select type"
        onChange={(v) => handleChange('type', v)}
      />
      <SwitchField id="required" label="Required" checked={localData.required || false} onChange={(v) => handleChange('required', v)} />
    </div>
  );

  const renderProcessNodeProperties = () => (
    <Tabs defaultValue="basic">
      <TabsList className={FIELD_CLASS}>
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="basic" className="space-y-4 pt-4">
        <TextField id="label" label="Label" value={localData.label || ''} onChange={(v) => handleChange('label', v)} />
        <SelectField
          id="model"
          label="Model"
          value={localData.model || 'gpt-4'}
          options={MODEL_OPTIONS}
          placeholder="Select model"
          onChange={(v) => handleChange('model', v)}
        />
        <div>
          <Label htmlFor="prompt">System Prompt</Label>
          <Textarea
            id="prompt"
            value={localData.prompt || ''}
            onChange={(e) => handleChange('prompt', e.target.value)}
            className={`${FIELD_CLASS} min-h-[120px]`}
          />
        </div>
      </TabsContent>
      <TabsContent value="advanced" className="space-y-4 pt-4">
        <SliderField id="temperature" label="Temperature" value={localData.temperature || 0.7} min={0} max={2} step={0.1} onChange={(v) => handleChange('temperature', v)} />
        <SliderField id="maxTokens" label="Max Tokens" value={localData.maxTokens || 1000} min={100} max={8000} step={100} onChange={(v) => handleChange('maxTokens', v)} />
        <SwitchField id="memory" label="Enable Memory" checked={localData.memory || false} onChange={(v) => handleChange('memory', v)} />
      </TabsContent>
    </Tabs>
  );

  const renderMemoryNodeProperties = () => (
    <div className="space-y-4">
      <TextField id="label" label="Label" value={localData.label || ''} onChange={(v) => handleChange('label', v)} />
      <SelectField
        id="memoryType"
        label="Memory Type"
        value={localData.memoryType || 'conversation'}
        options={MEMORY_TYPE_OPTIONS}
        placeholder="Select type"
        onChange={(v) => handleChange('memoryType', v)}
      />
      <SliderField id="capacity" label="Capacity" value={localData.capacity || 10} min={1} max={50} step={1} onChange={(v) => handleChange('capacity', v)} />
    </div>
  );

  const renderToolNodeProperties = () => (
    <div className="space-y-4">
      <TextField id="label" label="Label" value={localData.label || ''} onChange={(v) => handleChange('label', v)} />
      <SelectField
        id="toolType"
        label="Tool Type"
        value={localData.toolType || 'api'}
        options={TOOL_TYPE_OPTIONS}
        placeholder="Select type"
        onChange={(v) => handleChange('toolType', v)}
      />
      {localData.toolType === 'api' && (
        <TextField id="endpoint" label="API Endpoint" value={localData.endpoint || ''} onChange={(v) => handleChange('endpoint', v)} />
      )}
      {localData.toolType === 'function' && (
        <div>
          <Label htmlFor="function">Function Code</Label>
          <Textarea
            id="function"
            value={localData.function || ''}
            onChange={(e) => handleChange('function', e.target.value)}
            className={`${FIELD_CLASS} min-h-[120px] font-mono`}
          />
        </div>
      )}
    </div>
  );

  const renderOutputNodeProperties = () => (
    <div className="space-y-4">
      <TextField id="label" label="Label" value={localData.label || ''} onChange={(v) => handleChange('label', v)} />
      <SelectField
        id="type"
        label="Output Type"
        value={localData.type || 'text'}
        options={IO_TYPE_OPTIONS}
        placeholder="Select type"
        onChange={(v) => handleChange('type', v)}
      />
      <SwitchField id="format" label="Format Output" checked={localData.format || false} onChange={(v) => handleChange('format', v)} />
    </div>
  );

  const renderNodeProperties = () => {
    switch (node.type) {
      case 'input':
        return renderInputNodeProperties();
      case 'process':
        return renderProcessNodeProperties();
      case 'memory':
        return renderMemoryNodeProperties();
      case 'tool':
        return renderToolNodeProperties();
      case 'output':
        return renderOutputNodeProperties();
      default:
        return <p>Select a node to edit its properties</p>;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Node Properties</h3>
      <div className="space-y-4">
        {renderNodeProperties()}
      </div>
    </div>
  );
}
