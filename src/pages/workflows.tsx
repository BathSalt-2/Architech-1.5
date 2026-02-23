import React, { useState, useEffect } from "react";
import { callGroq, getGroqKey } from "../lib/groq";
import { logActivity } from "../lib/activity";

interface WorkflowStep {
  id: string;
  name: string;
  type: "trigger" | "action" | "condition" | "output";
  description: string;
  tool: string;
  config?: Record<string, unknown>;
}

interface WorkflowTrigger {
  type: string;
  description: string;
}

interface Workflow {
  id: number;
  name: string;
  description: string;
  steps: WorkflowStep[];
  estimatedRuntime: string;
  triggers: WorkflowTrigger[];
  createdAt: string;
}

const STEP_ICONS: Record<string, string> = {
  trigger: "⚡",
  action: "⚙️",
  condition: "🔀",
  output: "📤",
};

const STEP_COLORS: Record<string, string> = {
  trigger: "border-yellow-500/40 bg-yellow-500/10",
  action: "border-blue-500/40 bg-blue-500/10",
  condition: "border-purple-500/40 bg-purple-500/10",
  output: "border-green-500/40 bg-green-500/10",
};

const STEP_BADGE: Record<string, string> = {
  trigger: "bg-yellow-500/20 text-yellow-400",
  action: "bg-blue-500/20 text-blue-400",
  condition: "bg-purple-500/20 text-purple-400",
  output: "bg-green-500/20 text-green-400",
};

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [goal, setGoal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkflow, setGeneratedWorkflow] = useState<Partial<Workflow> | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [error, setError] = useState("");
  const hasKey = Boolean(getGroqKey());

  useEffect(() => {
    setWorkflows(JSON.parse(localStorage.getItem('arch15-workflows') || '[]'));
  }, []);

  const generateWorkflow = async () => {
    if (!goal.trim()) return;
    setIsGenerating(true);
    setError("");
    setGeneratedWorkflow(null);
    try {
      const content = await callGroq([
        {
          role: "system",
          content: `Generate a workflow specification as JSON with: name, description, steps (array of {id, name, type: 'trigger'|'action'|'condition'|'output', description, tool, config}), estimatedRuntime, triggers (array of {type, description}). Make it practical and detailed. Output ONLY valid JSON, no markdown code blocks.`
        },
        { role: "user", content: goal }
      ], { max_tokens: 2500 });

      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setGeneratedWorkflow(parsed);
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'NO_KEY') {
        setError('Configure your Groq API key in Settings first.');
      } else {
        setError('Failed to generate workflow. Try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const saveWorkflow = () => {
    if (!generatedWorkflow) return;
    const newWorkflow: Workflow = {
      id: Date.now(),
      ...(generatedWorkflow as Omit<Workflow, 'id' | 'createdAt'>),
      createdAt: new Date().toISOString()
    };
    const updated = [newWorkflow, ...workflows];
    setWorkflows(updated);
    localStorage.setItem('arch15-workflows', JSON.stringify(updated));
    logActivity('Workflow Created', `Built workflow: ${newWorkflow.name}`);
    setGeneratedWorkflow(null);
    setGoal("");
    setShowBuilder(false);
  };

  const deleteWorkflow = (id: number) => {
    const updated = workflows.filter(w => w.id !== id);
    setWorkflows(updated);
    localStorage.setItem('arch15-workflows', JSON.stringify(updated));
    if (selectedWorkflow?.id === id) setSelectedWorkflow(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">🔄 Workflow Builder</h1>
          <p className="text-slate-400 text-sm mt-1">Design AI-powered automated workflows</p>
        </div>
        <button
          onClick={() => { setShowBuilder(!showBuilder); setGeneratedWorkflow(null); setError(""); }}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium"
        >
          {showBuilder ? "✕ Close Builder" : "+ Create Workflow"}
        </button>
      </div>

      {!hasKey && (
        <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-xl text-sm">
          ⚠️ Configure your Groq API key in Settings to generate workflows.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Workflow List */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Saved Workflows ({workflows.length})
          </h2>
          {workflows.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">🔄</div>
              <p className="text-slate-400">No workflows yet</p>
              <p className="text-slate-600 text-sm mt-1">Create your first workflow →</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workflows.map(wf => (
                <div
                  key={wf.id}
                  onClick={() => { setSelectedWorkflow(wf); setShowBuilder(false); }}
                  className={`bg-slate-800 border rounded-xl p-4 cursor-pointer transition-all hover:border-green-500/50 ${
                    selectedWorkflow?.id === wf.id ? 'border-green-500/50 bg-slate-700' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-bold text-white">{wf.name}</div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                      {wf.steps?.length || 0} steps
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">{wf.description}</p>
                  {wf.estimatedRuntime && (
                    <div className="text-xs text-slate-500 mt-2">⏱ {wf.estimatedRuntime}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Builder or Detail */}
        <div>
          {showBuilder && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="font-bold text-white mb-4">Workflow Builder</h2>
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Describe your workflow's goal</label>
                <textarea
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  placeholder="e.g., Monitor Twitter mentions, classify sentiment, send digest email daily at 9 AM..."
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none w-full h-32 resize-none text-sm"
                />
              </div>
              {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm">{error}</div>
              )}
              <button
                onClick={generateWorkflow}
                disabled={isGenerating || !goal.trim()}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "⚡ Generating Workflow..." : "Generate Workflow"}
              </button>

              {generatedWorkflow && (
                <div className="mt-6 border-t border-slate-700 pt-4">
                  <h3 className="font-bold text-green-400 text-lg mb-1">{generatedWorkflow.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{generatedWorkflow.description}</p>

                  {generatedWorkflow.triggers && generatedWorkflow.triggers.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Triggers</div>
                      {generatedWorkflow.triggers.map((t, i) => (
                        <div key={i} className="bg-slate-900 rounded-lg px-3 py-2 mb-2 text-sm">
                          <span className="text-yellow-400 font-medium">{t.type}</span>
                          <span className="text-slate-400 ml-2">{t.description}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {generatedWorkflow.steps && (
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Steps</div>
                      <div className="space-y-2">
                        {generatedWorkflow.steps.map((step, i) => (
                          <div key={step.id || i}>
                            <div className={`border rounded-lg p-3 ${STEP_COLORS[step.type] || 'border-slate-600 bg-slate-900'}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span>{STEP_ICONS[step.type] || "⚙️"}</span>
                                <span className="font-medium text-white text-sm">{step.name}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${STEP_BADGE[step.type] || 'bg-slate-700 text-slate-400'}`}>
                                  {step.type}
                                </span>
                              </div>
                              <p className="text-slate-400 text-xs">{step.description}</p>
                              {step.tool && <p className="text-xs text-slate-500 mt-1">Tool: {step.tool}</p>}
                            </div>
                            {i < (generatedWorkflow.steps?.length || 0) - 1 && (
                              <div className="flex justify-center my-1">
                                <div className="w-px h-4 bg-slate-600"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={saveWorkflow}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium w-full"
                  >
                    💾 Save Workflow
                  </button>
                </div>
              )}
            </div>
          )}

          {selectedWorkflow && !showBuilder && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-white text-xl">{selectedWorkflow.name}</h2>
                  <p className="text-slate-400 text-sm mt-1">{selectedWorkflow.description}</p>
                </div>
                <button onClick={() => setSelectedWorkflow(null)} className="text-slate-500 hover:text-white transition">✕</button>
              </div>

              {selectedWorkflow.estimatedRuntime && (
                <div className="text-xs text-slate-500 mb-4">⏱ Runtime: {selectedWorkflow.estimatedRuntime}</div>
              )}

              {selectedWorkflow.steps && (
                <div className="mb-4">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Flow ({selectedWorkflow.steps.length} steps)</div>
                  <div className="space-y-2">
                    {selectedWorkflow.steps.map((step, i) => (
                      <div key={step.id || i}>
                        <div className={`border rounded-lg p-3 ${STEP_COLORS[step.type] || 'border-slate-600 bg-slate-900'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span>{STEP_ICONS[step.type] || "⚙️"}</span>
                            <span className="font-medium text-white text-sm">{step.name}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${STEP_BADGE[step.type] || 'bg-slate-700 text-slate-400'}`}>
                              {step.type}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs">{step.description}</p>
                          {step.tool && <p className="text-xs text-slate-500 mt-1">Tool: {step.tool}</p>}
                        </div>
                        {i < selectedWorkflow.steps.length - 1 && (
                          <div className="flex justify-center my-1">
                            <div className="w-px h-4 bg-slate-600"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => deleteWorkflow(selectedWorkflow.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm w-full"
              >
                Delete Workflow
              </button>
            </div>
          )}

          {!showBuilder && !selectedWorkflow && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-slate-400">Click "Create Workflow" to build a new automated workflow,</p>
              <p className="text-slate-600 text-sm mt-1">or select an existing workflow to view its steps.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
