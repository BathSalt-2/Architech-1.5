import { fine } from "@/lib/fine";

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: "text" | "vision" | "multimodal" | "workflow";
  model: string;
  createdAt: string;
  updatedAt: string;
  config: AgentConfig;
  status: "active" | "inactive" | "draft";
  tags: string[];
  ownerId: string;
}

export interface AgentConfig {
  prompt: string;
  temperature: number;
  maxTokens: number;
  memory: boolean;
  memoryConfig?: {
    type: "conversation" | "vector" | "hybrid";
    capacity: number;
  };
  tools: AgentTool[];
  inputs: AgentInput[];
  outputs: AgentOutput[];
}

export interface AgentTool {
  id: string;
  name: string;
  description: string;
  type: "api" | "function" | "data" | "model";
  config: Record<string, any>;
}

export interface AgentInput {
  id: string;
  name: string;
  type: "text" | "image" | "audio" | "file" | "structured";
  required: boolean;
  description: string;
}

export interface AgentOutput {
  id: string;
  name: string;
  type: "text" | "image" | "audio" | "file" | "structured";
  description: string;
}

// Database collection for agents
const agentsCollection = fine.db.collection<Agent>("agents");

export const agentService = {
  // Create a new agent
  async createAgent(agent: Omit<Agent, "id" | "createdAt" | "updatedAt">): Promise<Agent> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const now = new Date().toISOString();
    const newAgent: Agent = {
      ...agent,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ownerId: user.id
    };
    
    await agentsCollection.insertOne(newAgent);
    return newAgent;
  },
  
  // Get all agents for the current user
  async getUserAgents(): Promise<Agent[]> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    return agentsCollection.find({ ownerId: user.id });
  },
  
  // Get a specific agent by ID
  async getAgentById(id: string): Promise<Agent | null> {
    return agentsCollection.findOne({ id });
  },
  
  // Update an existing agent
  async updateAgent(id: string, updates: Partial<Omit<Agent, "id" | "createdAt" | "updatedAt" | "ownerId">>): Promise<Agent> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const agent = await agentsCollection.findOne({ id });
    if (!agent) throw new Error("Agent not found");
    if (agent.ownerId !== user.id) throw new Error("Not authorized to update this agent");
    
    const updatedAgent: Agent = {
      ...agent,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await agentsCollection.updateOne({ id }, updatedAgent);
    return updatedAgent;
  },
  
  // Delete an agent
  async deleteAgent(id: string): Promise<boolean> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const agent = await agentsCollection.findOne({ id });
    if (!agent) throw new Error("Agent not found");
    if (agent.ownerId !== user.id) throw new Error("Not authorized to delete this agent");
    
    await agentsCollection.deleteOne({ id });
    return true;
  },
  
  // Clone an existing agent
  async cloneAgent(id: string, newName: string): Promise<Agent> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const agent = await agentsCollection.findOne({ id });
    if (!agent) throw new Error("Agent not found");
    
    const now = new Date().toISOString();
    const clonedAgent: Agent = {
      ...agent,
      id: crypto.randomUUID(),
      name: newName,
      createdAt: now,
      updatedAt: now,
      ownerId: user.id,
      status: "draft"
    };
    
    await agentsCollection.insertOne(clonedAgent);
    return clonedAgent;
  },
  
  // Run an agent with input
  async runAgent(id: string, inputs: Record<string, any>): Promise<Record<string, any>> {
    const agent = await agentsCollection.findOne({ id });
    if (!agent) throw new Error("Agent not found");
    if (agent.status !== "active") throw new Error("Agent is not active");
    
    // This would connect to the AI model service in a real implementation
    // For now, we'll simulate a response
    return {
      response: `This is a simulated response from agent ${agent.name}`,
      timestamp: new Date().toISOString()
    };
  }
};