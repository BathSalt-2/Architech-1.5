import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Plus, Search, Grid, List, ArrowRight } from "lucide-react";

export default function AgentExplorer() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const sampleAgents = [
    {
      id: "1",
      name: "Customer Support Assistant",
      description: "Handles customer inquiries and provides support",
      tags: ["support", "customer service"],
      lastModified: "2 days ago",
    },
    {
      id: "2",
      name: "Data Analysis Agent",
      description: "Processes and analyzes data sets to extract insights",
      tags: ["data", "analysis"],
      lastModified: "1 week ago",
    },
    {
      id: "3",
      name: "Content Generator",
      description: "Creates blog posts, social media content, and more",
      tags: ["content", "creative"],
      lastModified: "3 days ago",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Agent Explorer</h1>
          <p className="text-gray-400 mt-1">Browse, create, and manage your intelligent agents</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="gradient-bg text-black">
            <a href="/agents/create">
              <Plus className="mr-2 h-4 w-4" /> Create Agent
            </a>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="my-agents">
          <TabsList className="bg-[#1a1a3a]">
            <TabsTrigger value="my-agents">My Agents</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="my-agents" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search agents..." 
                  className="pl-10 bg-[#1a1a3a] border-[#2a2a4a]"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#2a2a4a]" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#2a2a4a]" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleAgents.map((agent) => (
                  <Card key={agent.id} className="bg-[#0a1029] border-[#2a2a4a] hover:border-[#5ee7ff] transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
                          <Cpu className="h-5 w-5 text-black" />
                        </div>
                      </div>
                      <CardTitle className="mt-4">{agent.name}</CardTitle>
                      <CardDescription>{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {agent.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-[#1a1a3a] text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-xs text-gray-400">Modified {agent.lastModified}</span>
                      <Button variant="ghost" size="sm" className="text-[#5ee7ff]">
                        Open <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {/* Create New Card */}
                <Card className="bg-[#0a1029] border-[#2a2a4a] border-dashed flex flex-col items-center justify-center p-6 hover:border-[#5ee7ff] transition-colors cursor-pointer">
                  <div className="h-12 w-12 rounded-full border-2 border-[#2a2a4a] flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-[#5ee7ff]" />
                  </div>
                  <p className="text-center text-gray-400">Create New Agent</p>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                {sampleAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 bg-[#0a1029] border border-[#2a2a4a] rounded-lg hover:border-[#5ee7ff] transition-colors">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center mr-4">
                        <Cpu className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">{agent.name}</h3>
                        <p className="text-sm text-gray-400">{agent.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-400">Modified {agent.lastModified}</span>
                      <Button variant="ghost" size="sm" className="text-[#5ee7ff]">
                        Open <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="shared" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 rounded-full bg-[#1a1a3a] flex items-center justify-center mb-4">
                <Cpu className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No shared agents</h3>
              <p className="text-gray-400 text-center max-w-md">
                Agents shared with you will appear here. You can collaborate with team members on shared agents.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="templates" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 rounded-full bg-[#1a1a3a] flex items-center justify-center mb-4">
                <Cpu className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Agent templates coming soon</h3>
              <p className="text-gray-400 text-center max-w-md">
                Start with pre-built templates to accelerate your agent development. This feature is coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}