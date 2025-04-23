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
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={localData.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="bg-[#1a1a3a] border-[#2a2a4a]"
        />
      </div>
      <div>
        <Label htmlFor="type">Input Type</Label>
        <Select
          value={localData.type || 'text'}
          onValueChange={(value) => handleChange('type', value)}
        >
          <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="file">File</SelectItem>
            <SelectItem value="structured">Structured Data</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="required"
          checked={localData.required || false}
          onCheckedChange={(checked) => handleChange('required', checked)}
        />
        <Label htmlFor="required">Required</Label>
      </div>
    </div>
  );

  const renderProcessNodeProperties = () => (
    <Tabs defaultValue="basic">
      <TabsList className="bg-[#1a1a3a]">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="basic" className="space-y-4 pt-4">
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={localData.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            className="bg-[#1a1a3a] border-[#2a2a4a]"
          />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Select
            value={localData.model || 'gpt-4'}
            onValueChange={(value) => handleChange('model', value)}
          >
            <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-4-vision">GPT-4 Vision</SelectItem>
              <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
              <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="prompt">System Prompt</Label>
          <Textarea
            id="prompt"
            value={localData.prompt || ''}
            onChange={(e) => handleChange('prompt', e.target.value)}
            className="bg-[#1a1a3a] border-[#2a2a4a] min-h-[120px]"
          />
        </div>
      </TabsContent>
      <TabsContent value="advanced" className="space-y-4 pt-4">
        <div>
          <div className="flex justify-between">
            <Label htmlFor="temperature">Temperature: {localData.temperature || 0.7}</Label>
          </div>
          <Slider
            id="temperature"
            min={0}
            max={2}
            step={0.1}
            value={[localData.temperature || 0.7]}
            onValueChange={(value) => handleChange('temperature', value[0])}
            className="my-2"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <Label htmlFor="maxTokens">Max Tokens: {localData.maxTokens || 1000}</Label>
          </div>
          <Slider
            id="maxTokens"
            min={100}
            max={8000}
            step={100}
            value={[localData.maxTokens || 1000]}
            onValueChange={(value) => handleChange('maxTokens', value[0])}
            className="my-2"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="memory"
            checked={localData.memory || false}
            onCheckedChange={(checked) => handleChange('memory', checked)}
          />
          <Label htmlFor="memory">Enable Memory</Label>
        </div>
      </TabsContent>
    </Tabs>
  );

  const renderMemoryNodeProperties = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={localData.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="bg-[#1a1a3a] border-[#2a2a4a]"
        />
      </div>
      <div>
        <Label htmlFor="memoryType">Memory Type</Label>
        <Select
          value={localData.memoryType || 'conversation'}
          onValueChange={(value) => handleChange('memoryType', value)}
        >
          <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectItem value="conversation">Conversation</SelectItem>
            <SelectItem value="vector">Vector Store</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="flex justify-between">
          <Label htmlFor="capacity">Capacity: {localData.capacity || 10}</Label>
        </div>
        <Slider
          id="capacity"
          min={1}
          max={50}
          step={1}
          value={[localData.capacity || 10]}
          onValueChange={(value) => handleChange('capacity', value[0])}
          className="my-2"
        />
      </div>
    </div>
  );

  const renderToolNodeProperties = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={localData.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="bg-[#1a1a3a] border-[#2a2a4a]"
        />
      </div>
      <div>
        <Label htmlFor="toolType">Tool Type</Label>
        <Select
          value={localData.toolType || 'api'}
          onValueChange={(value) => handleChange('toolType', value)}
        >
          <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectItem value="api">API Call</SelectItem>
            <SelectItem value="function">Function</SelectItem>
            <SelectItem value="data">Data Source</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {localData.toolType === 'api' && (
        <div>
          <Label htmlFor="endpoint">API Endpoint</Label>
          <Input
            id="endpoint"
            value={localData.endpoint || ''}
            onChange={(e) => handleChange('endpoint', e.target.value)}
            className="bg-[#1a1a3a] border-[#2a2a4a]"
          />
        </div>
      )}
      {localData.toolType === 'function' && (
        <div>
          <Label htmlFor="function">Function Code</Label>
          <Textarea
            id="function"
            value={localData.function || ''}
            onChange={(e) => handleChange('function', e.target.value)}
            className="bg-[#1a1a3a] border-[#2a2a4a] min-h-[120px] font-mono"
          />
        </div>
      )}
    </div>
  );

  const renderOutputNodeProperties = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={localData.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="bg-[#1a1a3a] border-[#2a2a4a]"
        />
      </div>
      <div>
        <Label htmlFor="type">Output Type</Label>
        <Select
          value={localData.type || 'text'}
          onValueChange={(value) => handleChange('type', value)}
        >
          <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="file">File</SelectItem>
            <SelectItem value="structured">Structured Data</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="format"
          checked={localData.format || false}
          onCheckedChange={(checked) => handleChange('format', checked)}
        />
        <Label htmlFor="format">Format Output</Label>
      </div>
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