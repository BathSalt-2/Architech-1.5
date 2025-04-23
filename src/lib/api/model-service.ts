export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: "text" | "vision" | "audio" | "multimodal";
  capabilities: string[];
  contextSize: number;
  pricing: {
    inputPerToken: number;
    outputPerToken: number;
  };
}

// Available models (in a real app, this would come from an API)
export const availableModels: AIModel[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    type: "text",
    capabilities: ["text-generation", "reasoning", "code"],
    contextSize: 8192,
    pricing: {
      inputPerToken: 0.00001,
      outputPerToken: 0.00003
    }
  },
  {
    id: "gpt-4-vision",
    name: "GPT-4 Vision",
    provider: "OpenAI",
    type: "vision",
    capabilities: ["text-generation", "image-understanding", "reasoning"],
    contextSize: 8192,
    pricing: {
      inputPerToken: 0.00001,
      outputPerToken: 0.00003
    }
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    type: "multimodal",
    capabilities: ["text-generation", "reasoning", "image-understanding"],
    contextSize: 200000,
    pricing: {
      inputPerToken: 0.000015,
      outputPerToken: 0.000075
    }
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    provider: "Meta",
    type: "text",
    capabilities: ["text-generation", "reasoning", "code"],
    contextSize: 8192,
    pricing: {
      inputPerToken: 0.000005,
      outputPerToken: 0.000015
    }
  }
];

export const modelService = {
  // Get all available models
  async getAvailableModels(): Promise<AIModel[]> {
    return availableModels;
  },
  
  // Get a specific model by ID
  async getModelById(id: string): Promise<AIModel | undefined> {
    return availableModels.find(model => model.id === id);
  },
  
  // Run inference with a model
  async runInference(modelId: string, prompt: string, options: any = {}): Promise<string> {
    const model = availableModels.find(m => m.id === modelId);
    if (!model) throw new Error(`Model ${modelId} not found`);
    
    // In a real implementation, this would call an external API
    // For now, we'll simulate a response
    return `This is a simulated response from ${model.name} by ${model.provider}`;
  },
  
  // Estimate token usage and cost
  estimateUsage(modelId: string, promptLength: number, estimatedResponseLength: number): {tokens: number, cost: number} {
    const model = availableModels.find(m => m.id === modelId);
    if (!model) throw new Error(`Model ${modelId} not found`);
    
    // Rough estimation (in a real app, use a proper tokenizer)
    const inputTokens = Math.ceil(promptLength / 4);
    const outputTokens = Math.ceil(estimatedResponseLength / 4);
    
    const cost = (inputTokens * model.pricing.inputPerToken) + 
                 (outputTokens * model.pricing.outputPerToken);
    
    return {
      tokens: inputTokens + outputTokens,
      cost
    };
  }
};