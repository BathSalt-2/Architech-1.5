import { fine } from "@/lib/fine";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: "active" | "inactive" | "draft";
  ownerId: string;
  tags: string[];
}

export interface WorkflowNode {
  id: string;
  type: "trigger" | "action" | "condition" | "agent" | "output";
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: "success" | "failure" | "default";
}

// Database collection for workflows
const workflowsCollection = fine.db.collection<Workflow>("workflows");

export const workflowService = {
  // Create a new workflow
  async createWorkflow(workflow: Omit<Workflow, "id" | "createdAt" | "updatedAt">): Promise<Workflow> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const now = new Date().toISOString();
    const newWorkflow: Workflow = {
      ...workflow,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ownerId: user.id
    };
    
    await workflowsCollection.insertOne(newWorkflow);
    return newWorkflow;
  },
  
  // Get all workflows for the current user
  async getUserWorkflows(): Promise<Workflow[]> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    return workflowsCollection.find({ ownerId: user.id });
  },
  
  // Get a specific workflow by ID
  async getWorkflowById(id: string): Promise<Workflow | null> {
    return workflowsCollection.findOne({ id });
  },
  
  // Update an existing workflow
  async updateWorkflow(id: string, updates: Partial<Omit<Workflow, "id" | "createdAt" | "updatedAt" | "ownerId">>): Promise<Workflow> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const workflow = await workflowsCollection.findOne({ id });
    if (!workflow) throw new Error("Workflow not found");
    if (workflow.ownerId !== user.id) throw new Error("Not authorized to update this workflow");
    
    const updatedWorkflow: Workflow = {
      ...workflow,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await workflowsCollection.updateOne({ id }, updatedWorkflow);
    return updatedWorkflow;
  },
  
  // Delete a workflow
  async deleteWorkflow(id: string): Promise<boolean> {
    const user = await fine.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    const workflow = await workflowsCollection.findOne({ id });
    if (!workflow) throw new Error("Workflow not found");
    if (workflow.ownerId !== user.id) throw new Error("Not authorized to delete this workflow");
    
    await workflowsCollection.deleteOne({ id });
    return true;
  },
  
  // Execute a workflow
  async executeWorkflow(id: string, inputs: Record<string, any> = {}): Promise<Record<string, any>> {
    const workflow = await workflowsCollection.findOne({ id });
    if (!workflow) throw new Error("Workflow not found");
    if (workflow.status !== "active") throw new Error("Workflow is not active");
    
    // This would execute the workflow in a real implementation
    // For now, we'll simulate a response
    return {
      result: `Workflow ${workflow.name} executed successfully`,
      timestamp: new Date().toISOString()
    };
  }
};