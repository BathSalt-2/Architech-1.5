import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AstridCopilot() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Astrid, your AI co-pilot. How can I help you build today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    
    // Simulate Astrid response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I can help you with that! Let me build a prototype for you based on your requirements.",
        },
      ]);
    }, 1000);
    
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      {!isExpanded ? (
        <Card className="bg-[#0a1029] border border-[#2a2a4a] glow-card overflow-hidden cursor-pointer" onClick={() => setIsExpanded(true)}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 text-[#5ee7ff] mr-2" />
              <span className="gradient-text">Astrid Co-Pilot</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4 py-4">
              <Avatar className="h-10 w-10 border-2 border-[#5ee7ff] glow-border">
                <AvatarImage src="/astrid-avatar.png" alt="Astrid" />
                <AvatarFallback className="bg-gradient-to-r from-[#5ee7ff] to-[#8a5fff]">
                  <Bot className="h-6 w-6 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm text-gray-300 line-clamp-2">
                  {messages[messages.length - 1].content}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
              Chat with Astrid
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-[#0a1029] border border-[#2a2a4a] glow-card overflow-hidden w-full h-[500px] flex flex-col">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 text-[#5ee7ff] mr-2" />
              <span className="gradient-text">Astrid Co-Pilot</span>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto py-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-[#8a5fff] text-white"
                        : "bg-[#1a1a3a] border border-[#2a2a4a]"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-1">
                        <Avatar className="h-6 w-6 mr-2 border border-[#5ee7ff]">
                          <AvatarFallback className="bg-gradient-to-r from-[#5ee7ff] to-[#8a5fff]">
                            <Bot className="h-3 w-3 text-white" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-[#5ee7ff]">Astrid</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#2a2a4a] p-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask Astrid to build something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-[#1a1a3a] border-[#2a2a4a] focus-visible:ring-[#5ee7ff]"
              />
              <Button
                size="icon"
                className="gradient-bg"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4 text-black" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}