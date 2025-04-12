import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Layers, Upload, Plus, ArrowRight, Rocket } from "lucide-react";
import { DeploymentManager } from "@/components/deployment/DeploymentManager";

export default function ModelPlayground() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  const sampleModels = [
    {
      id: "1",
      name: "GPT-4",
      type: "LLM",
      provider: "OpenAI",
      description: "Advanced language model for text generation and reasoning",
    },
    {
      id: "2",
      name: "DALL-E 3",
      type: "Vision",
      provider: "OpenAI",
      description: "Image generation model capable of creating realistic images",
    },
    {
      id: "3",
      name: "Whisper",
      type: "Speech",
      provider: "OpenAI",
      description: "Speech recognition model for transcription and translation",
    },
    {
      id: "4",
      name: "Custom BERT",
      type: "LLM",
      provider: "Custom",
      description: "Fine-tuned BERT model for specific domain tasks",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Model Playground</h1>
          <p className="text-gray-400 mt-1">Import, test, and fine-tune AI models</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="gradient-bg text-black">
            <a href="/models/import">
              <Upload className="mr-2 h-4 w-4" /> Import Model
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models">
        <TabsList className="bg-[#1a1a3a]">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="tuning">Fine-tuning</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleModels.map((model) => (
              <Card key={model.id} className="bg-[#0a1029] border-[#2a2a4a] hover:border-[#5ee7ff] transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
                      <Layers className="h-5 w-5 text-black" />
                    </div>
                    <span className="px-2 py-1 bg-[#1a1a3a] text-xs rounded-full">
                      {model.type}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{model.name}</CardTitle>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">Provider: {model.provider}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 border-[#5ee7ff] text-[#5ee7ff]">
                      Open in Playground
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Rocket className="h-4 w-4 mr-1" /> Deploy
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[900px] bg-[#0a1029] border-[#2a2a4a]">
                        <DialogHeader>
                          <DialogTitle>Deploy Model</DialogTitle>
                          <DialogDescription>
                            Configure and deploy your model as an API endpoint
                          </DialogDescription>
                        </DialogHeader>
                        <DeploymentManager agentId={model.id} agentName={model.name} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Import New Model Card */}
            <Card className="bg-[#0a1029] border-[#2a2a4a] border-dashed flex flex-col items-center justify-center p-6 hover:border-[#5ee7ff] transition-colors cursor-pointer">
              <div className="h-12 w-12 rounded-full border-2 border-[#2a2a4a] flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-[#5ee7ff]" />
              </div>
              <p className="text-center text-gray-400">Import New Model</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="playground" className="mt-6">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>Model Playground</CardTitle>
              <CardDescription>
                Test and experiment with different models in an interactive environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-[#1a1a3a] flex items-center justify-center mb-4">
                  <Layers className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Select a model to begin</h3>
                <p className="text-gray-400 text-center max-w-md mb-6">
                  Choose a model from the Models tab or import a new one to start experimenting in the playground.
                </p>
                <Button className="gradient-bg text-black">
                  Browse Models
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tuning" className="mt-6">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>Fine-tuning</CardTitle>
              <CardDescription>
                Customize models for your specific use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-[#1a1a3a] flex items-center justify-center mb-4">
                  <Layers className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Fine-tuning coming soon</h3>
                <p className="text-gray-400 text-center max-w-md">
                  The ability to fine-tune models with your own data will be available soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deployment" className="mt-6">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>Model Deployment</CardTitle>
              <CardDescription>
                Deploy your models as API endpoints or integrate with other services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#1a1a3a] border-[#2a2a4a]">
                  <CardHeader>
                    <CardTitle className="text-lg">API Deployment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Deploy your model as a REST API endpoint for integration with other applications.
                    </p>
                    <Button className="w-full gradient-bg text-black">
                      Deploy as API
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1a1a3a] border-[#2a2a4a]">
                  <CardHeader>
                    <CardTitle className="text-lg">Web UI Deployment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Deploy your model with a web interface for easy interaction.
                    </p>
                    <Button className="w-full gradient-bg text-black">
                      Deploy with UI
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1a1a3a] border-[#2a2a4a]">
                  <CardHeader>
                    <CardTitle className="text-lg">Export Model</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Export your model for use in other environments or platforms.
                    </p>
                    <Button className="w-full border-[#5ee7ff] text-[#5ee7ff]" variant="outline">
                      Export Model
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1a1a3a] border-[#2a2a4a]">
                  <CardHeader>
                    <CardTitle className="text-lg">Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Integrate your model with third-party services and platforms.
                    </p>
                    <Button className="w-full border-[#5ee7ff] text-[#5ee7ff]" variant="outline">
                      View Integrations
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}