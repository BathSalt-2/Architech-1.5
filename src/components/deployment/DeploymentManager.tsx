import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Rocket, Globe, Server, Code, Cloud, Loader2, Check, X, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DeploymentManager({ agentId, agentName }: { agentId: string; agentName: string }) {
  const [deploymentTarget, setDeploymentTarget] = useState('web');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [deploymentSteps, setDeploymentSteps] = useState<{
    step: string;
    status: 'pending' | 'processing' | 'complete' | 'error';
    message?: string;
  }[]>([]);
  const { toast } = useToast();

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentSteps([
      { step: 'Validating agent configuration', status: 'processing' },
      { step: 'Preparing deployment package', status: 'pending' },
      { step: 'Provisioning resources', status: 'pending' },
      { step: 'Deploying agent', status: 'pending' },
      { step: 'Configuring access', status: 'pending' },
    ]);

    // Simulate the deployment process with delays
    setTimeout(() => {
      setDeploymentSteps(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], status: 'complete' };
        updated[1] = { ...updated[1], status: 'processing' };
        return updated;
      });

      setTimeout(() => {
        setDeploymentSteps(prev => {
          const updated = [...prev];
          updated[1] = { ...updated[1], status: 'complete' };
          updated[2] = { ...updated[2], status: 'processing' };
          return updated;
        });

        setTimeout(() => {
          setDeploymentSteps(prev => {
            const updated = [...prev];
            updated[2] = { ...updated[2], status: 'complete' };
            updated[3] = { ...updated[3], status: 'processing' };
            return updated;
          });

          setTimeout(() => {
            setDeploymentSteps(prev => {
              const updated = [...prev];
              updated[3] = { ...updated[3], status: 'complete' };
              updated[4] = { ...updated[4], status: 'processing' };
              return updated;
            });

            setTimeout(() => {
              setDeploymentSteps(prev => {
                const updated = [...prev];
                updated[4] = { ...updated[4], status: 'complete' };
                return updated;
              });
              
              setIsDeploying(false);
              setIsDeployed(true);
              
              // Generate mock deployment URL and API key
              const mockUrl = `https://api.arch1tech.ai/agents/${agentId.slice(0, 8)}`;
              const mockApiKey = `at_${Math.random().toString(36).substring(2, 15)}`;
              
              setDeploymentUrl(mockUrl);
              setApiKey(mockApiKey);
              
              toast({
                title: "Success",
                description: "Agent deployed successfully!",
              });
            }, 1500);
          }, 1200);
        }, 1800);
      }, 1200);
    }, 1000);
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: message,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#0a1029] border-[#2a2a4a]">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-[#5ee7ff]" />
              <CardTitle>Deploy Agent: {agentName}</CardTitle>
            </div>
            <CardDescription>
              Deploy your agent to make it accessible via web or API
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isDeployed ? (
              <Tabs defaultValue="web" onValueChange={setDeploymentTarget} className="space-y-4">
                <TabsList className="bg-[#1a1a3a]">
                  <TabsTrigger value="web">Web App</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
                
                <TabsContent value="web" className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-[#1a1a3a] rounded-lg">
                    <Globe className="h-10 w-10 text-[#5ee7ff]" />
                    <div>
                      <h3 className="font-medium">Web Application</h3>
                      <p className="text-sm text-gray-400">Deploy as a standalone web application with a user interface</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="app-name">Application Name</Label>
                      <Input
                        id="app-name"
                        placeholder="my-agent-app"
                        defaultValue={agentName.toLowerCase().replace(/\s+/g, '-')}
                        className="bg-[#1a1a3a] border-[#2a2a4a]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="app-domain">Custom Domain (Optional)</Label>
                      <Input
                        id="app-domain"
                        placeholder="myagent.example.com"
                        className="bg-[#1a1a3a] border-[#2a2a4a]"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="public-access" defaultChecked />
                      <Label htmlFor="public-access">Public Access</Label>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="api" className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-[#1a1a3a] rounded-lg">
                    <Server className="h-10 w-10 text-[#8a5fff]" />
                    <div>
                      <h3 className="font-medium">API Endpoint</h3>
                      <p className="text-sm text-gray-400">Deploy as an API endpoint for integration with other applications</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-version">API Version</Label>
                      <Select defaultValue="v1">
                        <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
                          <SelectItem value="v1">v1</SelectItem>
                          <SelectItem value="v2">v2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
                      <Select defaultValue="60">
                        <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
                          <SelectValue placeholder="Select limit" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="60">60</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                          <SelectItem value="1000">1000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="auth-required" defaultChecked />
                      <Label htmlFor="auth-required">Require Authentication</Label>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="custom" className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-[#1a1a3a] rounded-lg">
                    <Code className="h-10 w-10 text-[#ff5e7f]" />
                    <div>
                      <h3 className="font-medium">Custom Deployment</h3>
                      <p className="text-sm text-gray-400">Deploy to your own infrastructure or third-party services</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="deployment-target">Deployment Target</Label>
                      <Select defaultValue="vercel">
                        <SelectTrigger className="bg-[#1a1a3a] border-[#2a2a4a]">
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a3a] border-[#2a2a4a]">
                          <SelectItem value="vercel">Vercel</SelectItem>
                          <SelectItem value="netlify">Netlify</SelectItem>
                          <SelectItem value="aws">AWS Lambda</SelectItem>
                          <SelectItem value="gcp">Google Cloud Functions</SelectItem>
                          <SelectItem value="azure">Azure Functions</SelectItem>
                          <SelectItem value="docker">Docker Container</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="config-file">Configuration File</Label>
                      <div className="flex">
                        <Input
                          id="config-file"
                          placeholder="Select configuration file"
                          className="bg-[#1a1a3a] border-[#2a2a4a] rounded-r-none"
                          disabled
                        />
                        <Button variant="outline" className="rounded-l-none border-[#2a2a4a]">Browse</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center p-6 bg-[#1a1a3a] rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full gradient-bg flex items-center justify-center mb-4">
                      <Cloud className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Deployment Successful</h3>
                    <p className="text-sm text-gray-400 text-center">
                      Your agent is now live and ready to use
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deployment-url">Deployment URL</Label>
                    <div className="flex">
                      <Input
                        id="deployment-url"
                        value={deploymentUrl}
                        readOnly
                        className="bg-[#1a1a3a] border-[#2a2a4a] rounded-r-none"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none border-[#2a2a4a]"
                        onClick={() => copyToClipboard(deploymentUrl, "URL copied to clipboard")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex">
                      <Input
                        id="api-key"
                        value={apiKey}
                        type="password"
                        readOnly
                        className="bg-[#1a1a3a] border-[#2a2a4a] rounded-r-none"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none border-[#2a2a4a]"
                        onClick={() => copyToClipboard(apiKey, "API key copied to clipboard")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-[#1a1a3a] rounded-lg">
                    <h4 className="font-medium mb-2">Quick Integration</h4>
                    <div className="bg-[#0a1029] p-3 rounded-md font-mono text-sm overflow-x-auto">
                      <code>
                        {`curl -X POST "${deploymentUrl}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{"input": "Your query here"}'`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            {!isDeployed ? (
              <Button 
                className="gradient-bg text-black" 
                onClick={handleDeploy}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    Deploy Agent
                    <Rocket className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button className="gradient-bg text-black">
                Manage Deployment
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {isDeploying && (
          <Card className="bg-[#0a1029] border-[#2a2a4a] mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Deployment Progress</CardTitle>
              <CardDescription>
                Deploying your agent to {deploymentTarget === 'web' ? 'web application' : deploymentTarget === 'api' ? 'API endpoint' : 'custom infrastructure'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentSteps.map((step, index) => (
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