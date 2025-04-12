import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2, ArrowRight, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function TextToAgentBuilder() {
  const [prompt, setPrompt] = useState('');
  const [agentName, setAgentName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<{
    step: string;
    status: 'pending' | 'processing' | 'complete' | 'error';
    message?: string;
  }[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your agent",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationSteps([
      { step: 'Analyzing requirements', status: 'processing' },
      { step: 'Designing agent architecture', status: 'pending' },
      { step: 'Configuring AI models', status: 'pending' },
      { step: 'Setting up tools and integrations', status: 'pending' },
      { step: 'Generating agent', status: 'pending' },
    ]);

    // Simulate the generation process with delays
    setTimeout(() => {
      setGenerationSteps(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], status: 'complete' };
        updated[1] = { ...updated[1], status: 'processing' };
        return updated;
      });

      setTimeout(() => {
        setGenerationSteps(prev => {
          const updated = [...prev];
          updated[1] = { ...updated[1], status: 'complete' };
          updated[2] = { ...updated[2], status: 'processing' };
          return updated;
        });

        setTimeout(() => {
          setGenerationSteps(prev => {
            const updated = [...prev];
            updated[2] = { ...updated[2], status: 'complete' };
            updated[3] = { ...updated[3], status: 'processing' };
            return updated;
          });

          setTimeout(() => {
            setGenerationSteps(prev => {
              const updated = [...prev];
              updated[3] = { ...updated[3], status: 'complete' };
              updated[4] = { ...updated[4], status: 'processing' };
              return updated;
            });

            setTimeout(() => {
              setGenerationSteps(prev => {
                const updated = [...prev];
                updated[4] = { ...updated[4], status: 'complete' };
                return updated;
              });
              
              setIsGenerating(false);
              toast({
                title: "Success",
                description: "Agent generated successfully!",
              });
              
              // In a real app, this would navigate to the newly created agent
              // For now, we'll just simulate it
              setTimeout(() => {
                navigate('/agents');
              }, 1000);
            }, 1500);
          }, 1200);
        }, 1000);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#0a1029] border-[#2a2a4a]">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-[#5ee7ff]" />
              <CardTitle>Text-to-Agent Builder</CardTitle>
            </div>
            <CardDescription>
              Describe your agent in natural language and we'll build it for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="prompt" className="space-y-4">
              <TabsList className="bg-[#1a1a3a]">
                <TabsTrigger value="prompt">Prompt</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="prompt" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input
                    id="agent-name"
                    placeholder="Enter a name for your agent"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="bg-[#1a1a3a] border-[#2a2a4a]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="agent-description">Describe Your Agent</Label>
                  <Textarea
                    id="agent-description"
                    placeholder="Describe what you want your agent to do in natural language. Be as specific as possible about its purpose, capabilities, and any specific tools or integrations it should use."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-[#1a1a3a] border-[#2a2a4a] min-h-[200px]"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="examples">
                <div className="space-y-4">
                  <Card className="bg-[#1a1a3a] border-[#2a2a4a] cursor-pointer hover:border-[#5ee7ff]" onClick={() => {
                    setPrompt("Create a customer support agent that can answer questions about our product, handle refund requests, and escalate complex issues to human support. It should have a friendly tone and be able to access our knowledge base to provide accurate information.");
                    setAgentName("Customer Support Assistant");
                  }}>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Customer Support Agent</h3>
                      <p className="text-sm text-gray-400">Handles customer inquiries and support requests</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1a1a3a] border-[#2a2a4a] cursor-pointer hover:border-[#5ee7ff]" onClick={() => {
                    setPrompt("Build a data analysis agent that can process CSV files, generate insights, and create visualizations. It should be able to handle basic statistical operations and present findings in a clear, concise manner.");
                    setAgentName("Data Analyst");
                  }}>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Data Analysis Agent</h3>
                      <p className="text-sm text-gray-400">Processes data and generates insights</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1a1a3a] border-[#2a2a4a] cursor-pointer hover:border-[#5ee7ff]" onClick={() => {
                    setPrompt("Create a content generation agent that can write blog posts, social media updates, and marketing copy. It should maintain a consistent brand voice, optimize content for SEO, and generate relevant images to accompany the text.");
                    setAgentName("Content Creator");
                  }}>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Content Generation Agent</h3>
                      <p className="text-sm text-gray-400">Creates various types of content</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button 
              className="gradient-bg text-black" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {isGenerating && (
          <Card className="bg-[#0a1029] border-[#2a2a4a] mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Generating Your Agent</CardTitle>
              <CardDescription>
                This may take a few moments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generationSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 mr-3 flex-shrink-0">
                      {step.status === 'processing' && (
                        <Loader2 className="h-6 w-6 animate-spin text-[#5ee7ff]" />
                      )}
                      {step.status === 'complete' && (
                        <div className="h-6 w-6 rounded-full bg-[#5eff8a] flex items-center justify-center">
                          <Check className="h-4 w-4 text-black" />
                        </div>
                      )}
                      {step.status === 'error' && (
                        <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                          <X className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {step.status === 'pending' && (
                        <div className="h-6 w-6 rounded-full border border-[#2a2a4a]"></div>
                      )}
                    </div>
                    <div>
                      <p className={`${step.status === 'processing' ? 'text-[#5ee7ff]' : step.status === 'complete' ? 'text-white' : 'text-gray-400'}`}>
                        {step.step}
                      </p>
                      {step.message && (
                        <p className="text-xs text-gray-400">{step.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}