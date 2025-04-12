import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow, Plus, ArrowRight } from "lucide-react";

export default function WorkflowBuilder() {
  const sampleWorkflows = [
    {
      id: "1",
      name: "Customer Onboarding",
      description: "Automated workflow for new customer onboarding",
      steps: 5,
      lastModified: "3 days ago",
    },
    {
      id: "2",
      name: "Content Approval",
      description: "Review and approval process for content publication",
      steps: 3,
      lastModified: "1 week ago",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Workflow Builder</h1>
          <p className="text-gray-400 mt-1">Create and manage automated workflows</p>
        </div>
        <Button asChild className="gradient-bg text-black">
          <a href="/workflows/create">
            <Plus className="mr-2 h-4 w-4" /> Create Workflow
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleWorkflows.map((workflow) => (
          <Card key={workflow.id} className="bg-[#0a1029] border-[#2a2a4a] hover:border-[#5ee7ff] transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
                  <Workflow className="h-5 w-5 text-black" />
                </div>
              </div>
              <CardTitle className="mt-4">{workflow.name}</CardTitle>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{workflow.steps} steps</span>
                <span className="text-xs text-gray-400">Modified {workflow.lastModified}</span>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                  Open Workflow <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Create New Card */}
        <Card className="bg-[#0a1029] border-[#2a2a4a] border-dashed flex flex-col items-center justify-center p-6 hover:border-[#5ee7ff] transition-colors cursor-pointer">
          <div className="h-12 w-12 rounded-full border-2 border-[#2a2a4a] flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-[#5ee7ff]" />
          </div>
          <p className="text-center text-gray-400">Create New Workflow</p>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle className="text-lg">Text-to-Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Describe your workflow in natural language and let Arch1tech generate it for you.
              </p>
              <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                Try It Now
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle className="text-lg">Visual Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Use our drag-and-drop interface to create complex workflows visually.
              </p>
              <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                Open Builder
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle className="text-lg">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Start with pre-built templates to accelerate your workflow development.
              </p>
              <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                Browse Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}