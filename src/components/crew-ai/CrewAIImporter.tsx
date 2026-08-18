import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Loader2, ArrowRight, Check, X, Upload, FileCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function CrewAIImporter() {
  const [crewConfig, setCrewConfig] = useState('');
  const [crewName, setCrewName] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importSteps, setImportSteps] = useState<{
    step: string;
    status: 'pending' | 'processing' | 'complete' | 'error';
    message?: string;
  }[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImport = async () => {
    if (!crewConfig.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Crew AI configuration",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setImportSteps([
      { step: 'Parsing configuration', status: 'processing' },
      { step: 'Validating agents', status: 'pending' },
      { step: 'Setting up tools and integrations', status: 'pending' },
      { step: 'Creating workflow', status: 'pending' },
      { step: 'Generating UI', status: 'pending' },
    ]);

    // Simulate the import process with delays
    setTimeout(() => {
      setImportSteps(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], status: 'complete' };
        updated[1] = { ...updated[1], status: 'processing' };
        return updated;
      });

      setTimeout(() => {
        setImportSteps(prev => {
          const updated = [...prev];
          updated[1] = { ...updated[1], status: 'complete' };
          updated[2] = { ...updated[2], status: 'processing' };
          return updated;
        });

        setTimeout(() => {
          setImportSteps(prev => {
            const updated = [...prev];
            updated[2] = { ...updated[2], status: 'complete' };
            updated[3] = { ...updated[3], status: 'processing' };
            return updated;
          });

          setTimeout(() => {
            setImportSteps(prev => {
              const updated = [...prev];
              updated[3] = { ...updated[3], status: 'complete' };
              updated[4] = { ...updated[4], status: 'processing' };
              return updated;
            });

            setTimeout(() => {
              setImportSteps(prev => {
                const updated = [...prev];
                updated[4] = { ...updated[4], status: 'complete' };
                return updated;
              });
              
              setIsImporting(false);
              toast({
                title: "Success",
                description: "Crew AI configuration imported successfully!",
              });
              
              // In a real app, this would navigate to the newly created workflow
              // For now, we'll just simulate it
              setTimeout(() => {
                navigate('/workflows');
              }, 1000);
            }, 1500);
          }, 1200);
        }, 1000);
      }, 1200);
    }, 1000);
  };

  const sampleYamlConfig = `
crew:
  name: Research Team
  description: A crew that researches topics and writes reports
  agents:
    - name: Researcher
      role: Finds relevant information on a topic
      goal: Gather comprehensive information
      backstory: Expert at finding and analyzing information
      tools:
        - type: web_search
          config:
            engine: google
    - name: Writer
      role: Writes reports based on research
      goal: Create clear, concise reports
      backstory: Experienced technical writer with a knack for simplifying complex topics
  tasks:
    - description: Research the topic
      agent: Researcher
      expected_output: Comprehensive research notes
    - description: Write the report
      agent: Writer
      expected_output: Final report document
`;

  const sampleJsonConfig = `
{
  "crew": {
    "name": "Customer Support Team",
    "description": "A crew that handles customer inquiries and resolves issues",
    "agents": [
      {
        "name": "Classifier",
        "role": "Categorizes customer inquiries",
        "goal": "Accurately determine the type of inquiry",
        "backstory": "Trained on thousands of customer interactions"
      },
      {
        "name": "Resolver",
        "role": "Provides solutions to customer issues",
        "goal": "Resolve customer issues efficiently",
        "backstory": "Expert in troubleshooting and customer satisfaction"
      },
      {
        "name": "Escalator",
        "role": "Handles complex issues that need human intervention",
        "goal": "Ensure complex issues are properly documented and escalated",
        "backstory": "Specializes in identifying when human support is needed"
      }
    ],
    "tasks": [
      {
        "description": "Classify the inquiry",
        "agent": "Classifier",
        "expected_output": "Inquiry category and priority"
      },
      {
        "description": "Resolve the issue if possible",
        "agent": "Resolver",
        "expected_output": "Solution or escalation recommendation"
      },
      {
        "description": "Escalate if necessary",
        "agent": "Escalator",
        "expected_output": "Escalation ticket with all relevant information"
      }
    ]
  }
}
`;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#0a1029] border-[#2a2a4a]">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-[#5ee7ff]" />
              <CardTitle>Crew AI Importer</CardTitle>
            </div>
            <CardDescription>
              Import your Crew AI configuration to create a workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="paste" className="space-y-4">
              <TabsList className="bg-[#1a1a3a]">
                <TabsTrigger value="paste">Paste Configuration</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="paste" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crew-name">Crew Name</Label>
                  <Input
                    id="crew-name"
                    placeholder="Enter a name for your crew"
                    value={crewName}
                    onChange={(e) => setCrewName(e.target.value)}
                    className="bg-[#1a1a3a] border-[#2a2a4a]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="crew-config">Crew AI Configuration (YAML or JSON)</Label>
                  <Textarea
                    id="crew-config"
                    placeholder="Paste your Crew AI configuration here..."
                    value={crewConfig}
                    onChange={(e) => setCrewConfig(e.target.value)}
                    className="bg-[#1a1a3a] border-[#2a2a4a] min-h-[300px] font-mono text-sm"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="upload">
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#2a2a4a] rounded-lg">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Configuration File</h3>
                  <p className="text-sm text-gray-400 mb-6 text-center">
                    Drag and drop your YAML or JSON file here, or click to browse
                  </p>
                  <Button variant="outline" className="border-[#5ee7ff] text-[#5ee7ff]">
                    Browse Files
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="examples">
                <div className="space-y-4">
                  <Card className="bg-[#1a1a3a] border-[#2a2a4a] cursor-pointer hover:border-[#5ee7ff]" onClick={() => {
                    setCrewConfig(sampleYamlConfig.trim());
                    setCrewName("Research Team");
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <FileCode className="h-5 w-5 mr-2 text-[#5ee7ff]" />
                        <h3 className="font-medium">Research Team (YAML)</h3>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">A crew that researches topics and writes reports</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1a1a3a] border-[#2a2a4a] cursor-pointer hover:border-[#5ee7ff]" onClick={() => {
                    setCrewConfig(sampleJsonConfig.trim());
                    setCrewName("Customer Support Team");
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <FileCode className="h-5 w-5 mr-2 text-[#5ee7ff]" />
                        <h3 className="font-medium">Customer Support Team (JSON)</h3>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">A crew that handles customer inquiries and resolves issues</p>
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
              onClick={handleImport}
              disabled={isImporting || !crewConfig.trim()}
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  Import Crew
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {isImporting && (
          <Card className="bg-[#0a1029] border-[#2a2a4a] mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Importing Crew AI Configuration</CardTitle>
              <CardDescription>
                This may take a few moments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {importSteps.map((step, index) => (
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