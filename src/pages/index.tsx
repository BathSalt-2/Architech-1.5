import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Workflow, Sparkles, Layers, Share2, Users } from "lucide-react";
import { fine } from "@/lib/fine";
import { AstridCopilot } from "@/components/astrid/AstridCopilot";

const Index = () => {
  const { data: session } = fine.auth.useSession();

  return (
    <main className="w-full min-h-screen bg-[#0a0a1f]">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-10 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('/brain-network.svg')] bg-no-repeat bg-center opacity-10"></div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text glow-text">
          Build the future, one thought at a time
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
          Create, customize, and deploy intelligent agents and complete applications using natural language
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {session?.user ? (
            <Button asChild size="lg" className="gradient-bg text-black font-bold">
              <Link to="/agents">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="gradient-bg text-black font-bold">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
          <Button asChild size="lg" variant="outline" className="border-[#5ee7ff] text-[#5ee7ff]">
            <Link to="/marketplace">Explore Marketplace</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Sparkles}
            title="Thought-to-App Engine"
            description="Type a goal or idea and generate a functioning app, agent, or workflow instantly."
          />
          <FeatureCard
            icon={Cpu}
            title="Visual Agent Designer"
            description="Drag-and-drop builder for editing agent logic with an integrated test environment."
          />
          <FeatureCard
            icon={Users}
            title="Astrid: AI Co-Pilot"
            description="Full-control co-pilot that can use every feature of the platform autonomously."
          />
          <FeatureCard
            icon={Workflow}
            title="Crew AI Integration"
            description="Paste in Crew AI scripts and automatically deploy as working agents with a full GUI."
          />
          <FeatureCard
            icon={Layers}
            title="Custom Model Playground"
            description="Import and use custom LLMs, vision models, or speech models with tuning capabilities."
          />
          <FeatureCard
            icon={Share2}
            title="Agent Marketplace"
            description="Share, fork, and remix agents publicly or within private teams."
          />
        </div>
      </section>

      {/* Astrid Section */}
      <section className="py-20 px-6 md:px-10 bg-[#0a1029]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Meet Astrid, Your AI Co-Pilot
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Astrid is a full-control AI assistant that can use every feature of the platform autonomously. 
                She can build specific agents from your prompts, optimize performance, and work silently in the background.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full gradient-bg flex items-center justify-center mr-3 mt-1">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <span className="text-gray-300">Mission Mode: Build specific agents/workflows from prompts</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full gradient-bg flex items-center justify-center mr-3 mt-1">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <span className="text-gray-300">Optimization Mode: Monitor and improve performance</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full gradient-bg flex items-center justify-center mr-3 mt-1">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <span className="text-gray-300">Background Mode: Work silently based on your preferences</span>
                </li>
              </ul>
              <Button asChild className="gradient-bg text-black font-bold">
                <Link to="/agents">Try Astrid Now</Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <AstridCopilot />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text glow-text">
            Ready to build the future?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Start creating intelligent agents and applications today with Arch1tech's powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {session?.user ? (
              <Button asChild size="lg" className="gradient-bg text-black font-bold">
                <Link to="/agents">
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="gradient-bg text-black font-bold">
                <Link to="/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="border-[#5ee7ff] text-[#5ee7ff]">
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  return (
    <Card className="bg-[#0a1029]/80 border border-[#2a2a4a] glow-card overflow-hidden">
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-black" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;