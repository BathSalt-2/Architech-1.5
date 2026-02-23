import React, { useState, useEffect } from "react";
import { callGroq, getGroqKey } from "../lib/groq";
import { logActivity } from "../lib/activity";

interface Tool {
  name: string;
  description: string;
}

interface Agent {
  id: number;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  systemPrompt: string;
  tools: Tool[];
  persona: string;
  constraints: string[];
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAgent, setGeneratedAgent] = useState<Partial<Agent> | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const hasKey = Boolean(getGroqKey());

  useEffect(() => {
    setAgents(JSON.parse(localStorage.getItem('arch15-agents') || '[]'));
  }, []);

  const generateAgent = async () => {
    if (!description.trim()) return;
    setIsGenerating(true);
    setError("");
    setGeneratedAgent(null);
    try {
      const content = await callGroq([
        {
          role: "system",
          content: "You are an AI agent specification generator for Arch1tech. Generate a detailed agent spec as JSON with: name, role, description, capabilities (array of strings), systemPrompt, tools (array: {name, description}), persona, constraints (array). Make it professional and production-ready. Output ONLY valid JSON, no markdown code blocks."
        },
        { role: "user", content: description }
      ], { max_tokens: 2500 });

      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setGeneratedAgent(parsed);
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'NO_KEY') {
        setError('Configure your Groq API key in Settings first.');
      } else {
        setError('Failed to generate agent. Check your API key and try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAgent = () => {
    if (!generatedAgent) return;
    const newAgent: Agent = {
      id: Date.now(),
      ...(generatedAgent as Omit<Agent, 'id' | 'createdAt'>),
      createdAt: new Date().toISOString()
    };
    const updated = [newAgent, ...agents];
    setAgents(updated);
    localStorage.setItem('arch15-agents', JSON.stringify(updated));
    logActivity('Agent Created', `Built agent: ${newAgent.name}`);
    setGeneratedAgent(null);
    setDescription("");
    setShowBuilder(false);
  };

  const deleteAgent = (id: number) => {
    const updated = agents.filter(a => a.id !== id);
    setAgents(updated);
    localStorage.setItem('arch15-agents', JSON.stringify(updated));
    if (selectedAgent?.id === id) setSelectedAgent(null);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const exportAgent = (agent: Agent) => {
    const blob = new Blob([JSON.stringify(agent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agent.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">🤖 Agent Explorer</h1>
          <p className="text-slate-400 text-sm mt-1">Build AI agents from natural language descriptions</p>
        </div>
        <button
          onClick={() => { setShowBuilder(!showBuilder); setGeneratedAgent(null); setError(""); }}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium"
        >
          {showBuilder ? "✕ Close Builder" : "+ Build Agent"}
        </button>
      </div>

      {!hasKey && (
        <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-xl text-sm">
          ⚠️ Configure your Groq API key in Settings to generate agents.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Agent List */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Saved Agents ({agents.length})
          </h2>
          {agents.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <p className="text-slate-400">No agents yet</p>
              <p className="text-slate-600 text-sm mt-1">Build your first agent using the builder →</p>
            </div>
          ) : (
            <div className="space-y-3">
              {agents.map(agent => (
                <div
                  key={agent.id}
                  onClick={() => { setSelectedAgent(agent); setShowBuilder(false); }}
                  className={`bg-slate-800 border rounded-xl p-4 cursor-pointer transition-all hover:border-cyan-500/50 ${
                    selectedAgent?.id === agent.id ? 'border-cyan-500/50 bg-slate-700' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">{agent.name}</div>
                      <div className="text-cyan-400 text-xs mt-0.5">{agent.role}</div>
                    </div>
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                      {agent.capabilities?.length || 0} capabilities
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">{agent.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Builder or Detail */}
        <div>
          {showBuilder && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="font-bold text-white mb-4">Agent Builder</h2>
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">What should your agent do?</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g., A customer support agent for a SaaS company that handles billing questions, escalates complex issues, and speaks in a friendly professional tone..."
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none w-full h-32 resize-none text-sm"
                />
              </div>
              {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm">{error}</div>
              )}
              <button
                onClick={generateAgent}
                disabled={isGenerating || !description.trim()}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "⚡ Generating Agent..." : "Generate Agent"}
              </button>

              {generatedAgent && (
                <div className="mt-6 space-y-4">
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-cyan-400 text-lg">{generatedAgent.name}</h3>
                      <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">{generatedAgent.role}</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">{generatedAgent.description}</p>

                    {generatedAgent.capabilities && (
                      <div className="mb-4">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Capabilities</div>
                        <div className="flex flex-wrap gap-2">
                          {generatedAgent.capabilities.map((cap, i) => (
                            <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{cap}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {generatedAgent.tools && generatedAgent.tools.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Tools ({generatedAgent.tools.length})</div>
                        <div className="space-y-2">
                          {generatedAgent.tools.map((tool, i) => (
                            <div key={i} className="bg-slate-900 rounded-lg px-3 py-2">
                              <div className="text-sm font-medium text-white">{tool.name}</div>
                              <div className="text-xs text-slate-500">{tool.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {generatedAgent.constraints && (
                      <div className="mb-4">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Constraints</div>
                        <ul className="space-y-1">
                          {generatedAgent.constraints.map((c, i) => (
                            <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-red-400">•</span>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={saveAgent}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium w-full mt-2"
                    >
                      💾 Save Agent
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedAgent && !showBuilder && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-white text-xl">{selectedAgent.name}</h2>
                  <span className="text-cyan-400 text-sm">{selectedAgent.role}</span>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="text-slate-500 hover:text-white transition">✕</button>
              </div>

              <p className="text-slate-300 text-sm mb-4">{selectedAgent.description}</p>

              <div className="mb-4">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Persona</div>
                <p className="text-slate-400 text-sm bg-slate-900 rounded-lg p-3">{selectedAgent.persona}</p>
              </div>

              {selectedAgent.capabilities?.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Capabilities</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.capabilities.map((cap, i) => (
                      <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{cap}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedAgent.tools?.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Tools</div>
                  <div className="space-y-2">
                    {selectedAgent.tools.map((tool, i) => (
                      <div key={i} className="bg-slate-900 rounded-lg px-3 py-2">
                        <div className="text-sm font-medium text-white">{tool.name}</div>
                        <div className="text-xs text-slate-500">{tool.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">System Prompt</div>
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-300 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedAgent.systemPrompt}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => copyToClipboard(selectedAgent.systemPrompt, `prompt-${selectedAgent.id}`)}
                  className="bg-slate-700 text-white px-3 py-1.5 rounded-lg hover:bg-slate-600 transition text-sm"
                >
                  {copied === `prompt-${selectedAgent.id}` ? "✓ Copied!" : "Copy System Prompt"}
                </button>
                <button
                  onClick={() => exportAgent(selectedAgent)}
                  className="bg-slate-700 text-white px-3 py-1.5 rounded-lg hover:bg-slate-600 transition text-sm"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => deleteAgent(selectedAgent.id)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {!showBuilder && !selectedAgent && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-slate-400">Click "Build Agent" to create a new AI agent,</p>
              <p className="text-slate-600 text-sm mt-1">or select an existing agent to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
