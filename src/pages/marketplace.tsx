import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Cpu, Workflow, Star, Download, ArrowRight } from "lucide-react";

export default function Marketplace() {
  const sampleAgents = [
    {
      id: "1",
      name: "Customer Support Bot",
      creator: "Arch1tech",
      description: "Handles customer inquiries and provides support",
      tags: ["support", "customer service"],
      rating: 4.8,
      downloads: 1245,
      type: "agent",
    },
    {
      id: "2",
      name: "Content Writer",
      creator: "AICreators",
      description: "Generates blog posts, articles, and social media content",
      tags: ["content", "writing"],
      rating: 4.5,
      downloads: 987,
      type: "agent",
    },
    {
      id: "3",
      name: "Data Analysis Suite",
      creator: "DataMasters",
      description: "Comprehensive data analysis and visualization workflow",
      tags: ["data", "analysis"],
      rating: 4.7,
      downloads: 756,
      type: "workflow",
    },
    {
      id: "4",
      name: "Email Automation",
      creator: "ProductivityAI",
      description: "Automates email responses and follow-ups",
      tags: ["email", "automation"],
      rating: 4.6,
      downloads: 1089,
      type: "workflow",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Marketplace</h1>
          <p className="text-gray-400 mt-1">Discover, share, and remix agents and workflows</p>
        </div>
      </div>

      <div className="relative w-full max-w-lg mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search marketplace..." 
          className="pl-10 bg-[#1a1a3a] border-[#2a2a4a]"
        />
      </div>

      <Tabs defaultValue="featured">
        <TabsList className="bg-[#1a1a3a]">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAgents.map((item) => (
              <Card key={item.id} className="bg-[#0a1029] border-[#2a2a4a] hover:border-[#5ee7ff] transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
                      {item.type === "agent" ? (
                        <Cpu className="h-5 w-5 text-black" />
                      ) : (
                        <Workflow className="h-5 w-5 text-black" />
                      )}
                    </div>
                    <span className="px-2 py-1 bg-[#1a1a3a] text-xs rounded-full">
                      {item.type === "agent" ? "Agent" : "Workflow"}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{item.name}</CardTitle>
                  <CardDescription>By {item.creator}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-[#1a1a3a] text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">{item.downloads}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAgents.filter(item => item.type === "agent").map((item) => (
              <Card key={item.id} className="bg-[#0a1029] border-[#2a2a4a] hover:border-[#5ee7ff] transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  <CardTitle className="mt-4">{item.name}</CardTitle>
                  <CardDescription>By {item.creator}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-[#1a1a3a] text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">{item.downloads}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="workflows" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAgents.filter(item => item.type === "workflow").map((item) => (
              <Card key={item.id} className="bg-[#0a1029] border-[#2a2a4a] hover:border-[#5ee7ff] transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
                      <Workflow className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  <CardTitle className="mt-4">{item.name}</CardTitle>
                  <CardDescription>By {item.creator}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-[#1a1a3a] text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">{item.downloads}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="models" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-[#1a1a3a] flex items-center justify-center mb-4">
              <Cpu className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Model marketplace coming soon</h3>
            <p className="text-gray-400 text-center max-w-md">
              The ability to share and download custom models will be available soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}