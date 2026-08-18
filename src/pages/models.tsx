import React, { useState, useEffect } from "react";
import { callGroq, getGroqKey } from "../lib/groq";
import { logActivity } from "../lib/activity";

interface GeneratedModel {
  systemPrompt: string;
  modelfile: string;
  jsonl: string;
  modelCard: string;
}

interface SavedModel {
  id: number;
  name: string;
  baseModel: string;
  description: string;
  useCase: string;
  personality: string;
  systemPrompt: string;
  modelfile: string;
  jsonl: string;
  modelCard: string;
  createdAt: string;
}

const BASE_MODELS = ["Llama 3.2", "Mistral 7B", "Phi-3 Mini", "Gemma 2 9B", "TinyLlama"];
const BASE_MODEL_TAGS: Record<string, string> = {
  "Llama 3.2": "llama3.2",
  "Mistral 7B": "mistral",
  "Phi-3 Mini": "phi3:mini",
  "Gemma 2 9B": "gemma2:9b",
  "TinyLlama": "tinyllama",
};
const USE_CASES = ["Customer Service", "Code Assistant", "Research", "Creative Writing", "Data Analysis", "Medical", "Legal", "General"];
const PERSONALITIES = ["Professional", "Friendly", "Technical", "Creative", "Concise", "Detailed"];

const GENERATION_STEPS = [
  "Analyzing your description",
  "Generating system prompt",
  "Writing Ollama Modelfile",
  "Creating training dataset",
  "Building model card",
  "Finalizing",
];

type TabKey = "system-prompt" | "modelfile" | "finetune" | "model-card";
const TABS: { key: TabKey; label: string }[] = [
  { key: "system-prompt", label: "System Prompt" },
  { key: "modelfile", label: "Ollama Modelfile" },
  { key: "finetune", label: "Fine-tune Data" },
  { key: "model-card", label: "Model Card" },
];

export default function ModelsPage() {
  const [modelName, setModelName] = useState("");
  const [baseModel, setBaseModel] = useState("Llama 3.2");
  const [description, setDescription] = useState("");
  const [useCase, setUseCase] = useState("General");
  const [personality, setPersonality] = useState("Professional");
  const [constraints, setConstraints] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStep, setGeneratingStep] = useState(-1);
  const [generatedModel, setGeneratedModel] = useState<GeneratedModel | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("system-prompt");
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const hasKey = Boolean(getGroqKey());

  useEffect(() => {
    setSavedModels(JSON.parse(localStorage.getItem('arch15-models') || '[]'));
  }, []);

  const generate = async () => {
    if (!modelName.trim() || !description.trim()) return;
    setIsGenerating(true);
    setError("");
    setGeneratedModel(null);
    const modelTag = BASE_MODEL_TAGS[baseModel] || baseModel.toLowerCase();

    try {
      setGeneratingStep(0);
      await new Promise(r => setTimeout(r, 300));

      setGeneratingStep(1);
      const systemPrompt = await callGroq([
        {
          role: "user",
          content: `Generate a production-ready system prompt for an AI named '${modelName}' based on ${baseModel}. Use case: ${useCase}. Personality: ${personality}. Description: ${description}. Constraints: ${constraints || 'none'}. Output just the system prompt text, no preamble.`
        }
      ], { max_tokens: 1000, temperature: 0.7 });

      setGeneratingStep(2);
      const modelfile = await callGroq([
        {
          role: "user",
          content: `Write an Ollama Modelfile for '${modelName}' FROM ${modelTag}. Include SYSTEM with this content: "${systemPrompt.substring(0, 200)}...", PARAMETER temperature 0.7, PARAMETER num_ctx 4096, PARAMETER top_p 0.9. Base it on this description: ${description}. Output only the Modelfile content.`
        }
      ], { max_tokens: 800, temperature: 0.3 });

      setGeneratingStep(3);
      const jsonl = await callGroq([
        {
          role: "user",
          content: `Generate 8 fine-tuning examples in JSONL format (newline-separated JSON objects, no markdown) for an AI described as: ${description}. Use case: ${useCase}. Format each line as: {"messages":[{"role":"user","content":".."},{"role":"assistant","content":".."}]}`
        }
      ], { max_tokens: 2000, temperature: 0.8 });

      setGeneratingStep(4);
      const modelCard = await callGroq([
        {
          role: "user",
          content: `Write a professional HuggingFace model card README.md for model '${modelName}'. Description: ${description}. Base: ${baseModel}. Use case: ${useCase}. Include sections: ## Model Description, ## Intended Uses, ## Out-of-Scope Uses, ## Training, ## Evaluation, ## Limitations, ## License (Or4cl3 Open Model License v1.0). Use markdown formatting.`
        }
      ], { max_tokens: 1500, temperature: 0.5 });

      setGeneratingStep(5);
      await new Promise(r => setTimeout(r, 500));

      setGeneratedModel({ systemPrompt, modelfile, jsonl, modelCard });
      setActiveTab("system-prompt");
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'NO_KEY') {
        setError('Configure your Groq API key in Settings first.');
      } else {
        setError('Generation failed. Check your API key and try again.');
      }
    } finally {
      setIsGenerating(false);
      setGeneratingStep(-1);
    }
  };

  const saveModel = () => {
    if (!generatedModel) return;
    const newModel: SavedModel = {
      id: Date.now(),
      name: modelName,
      baseModel,
      description,
      useCase,
      personality,
      ...generatedModel,
      createdAt: new Date().toISOString()
    };
    const updated = [newModel, ...savedModels];
    setSavedModels(updated);
    localStorage.setItem('arch15-models', JSON.stringify(updated));
    logActivity('Model Generated', `Created model: ${modelName} (${baseModel})`);
  };

  const deleteModel = (id: number) => {
    const updated = savedModels.filter(m => m.id !== id);
    setSavedModels(updated);
    localStorage.setItem('arch15-models', JSON.stringify(updated));
  };

  const loadModel = (model: SavedModel) => {
    setModelName(model.name);
    setBaseModel(model.baseModel);
    setDescription(model.description);
    setUseCase(model.useCase);
    setPersonality(model.personality);
    setGeneratedModel({ systemPrompt: model.systemPrompt, modelfile: model.modelfile, jsonl: model.jsonl, modelCard: model.modelCard });
    setActiveTab("system-prompt");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const getTabContent = (): string => {
    if (!generatedModel) return "";
    switch (activeTab) {
      case "system-prompt": return generatedModel.systemPrompt;
      case "modelfile": return generatedModel.modelfile;
      case "finetune": return generatedModel.jsonl;
      case "model-card": return generatedModel.modelCard;
    }
  };

  const inputCls = "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none w-full text-sm";
  const selectCls = "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none w-full text-sm";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">🧪 Model Playground</h1>
        <p className="text-slate-400 text-sm mt-1">Generate custom LLMs from natural language — the crown jewel of Arch1tech</p>
      </div>

      {!hasKey && (
        <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-xl text-sm">
          ⚠️ Configure your Groq API key in Settings to generate models.
        </div>
      )}

      {/* Builder Form */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-white mb-4">Configure Your Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Model Name</label>
            <input
              type="text"
              value={modelName}
              onChange={e => setModelName(e.target.value)}
              placeholder="e.g., SupportBot Pro"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Base Model</label>
            <select value={baseModel} onChange={e => setBaseModel(e.target.value)} className={selectCls}>
              {BASE_MODELS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Primary Use Case</label>
            <select value={useCase} onChange={e => setUseCase(e.target.value)} className={selectCls}>
              {USE_CASES.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Personality</label>
            <select value={personality} onChange={e => setPersonality(e.target.value)} className={selectCls}>
              {PERSONALITIES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-1.5">Natural Language Description <span className="text-slate-600">(be specific!)</span></label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your model in detail. What should it excel at? What domain knowledge should it have? How should it communicate? What problems does it solve?"
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none w-full h-28 resize-none text-sm"
          />
        </div>
        <div className="mb-6">
          <label className="block text-xs text-slate-400 mb-1.5">Constraints & Guidelines <span className="text-slate-600">(optional)</span></label>
          <textarea
            value={constraints}
            onChange={e => setConstraints(e.target.value)}
            placeholder="e.g., Never provide medical diagnoses. Always recommend consulting a professional. Keep responses under 200 words."
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none w-full h-20 resize-none text-sm"
          />
        </div>

        {/* Generation Steps */}
        {isGenerating && (
          <div className="mb-6 bg-slate-900 rounded-xl p-4">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">Generation Progress</div>
            <div className="space-y-2">
              {GENERATION_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i < generatingStep ? 'bg-green-500 text-white' :
                    i === generatingStep ? 'bg-cyan-500 text-white' :
                    'bg-slate-700 text-slate-500'
                  }`}>
                    {i < generatingStep ? '✓' : i === generatingStep ? '→' : ' '}
                  </div>
                  <span className={
                    i < generatingStep ? 'text-green-400' :
                    i === generatingStep ? 'text-cyan-400 font-medium' :
                    'text-slate-600'
                  }>
                    {step}
                    {i === generatingStep && <span className="ml-2 animate-pulse">...</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm">{error}</div>
        )}

        <button
          onClick={generate}
          disabled={isGenerating || !modelName.trim() || !description.trim()}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isGenerating ? "⚡ Generating Your Model..." : "🚀 Generate Model"}
        </button>
      </div>

      {/* Output Display */}
      {generatedModel && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-white text-lg">{modelName}</h2>
              <p className="text-xs text-slate-500">{baseModel} • {useCase} • {personality}</p>
            </div>
            <button
              onClick={saveModel}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm"
            >
              💾 Save Model
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-slate-900 rounded-lg p-1">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative bg-slate-950 rounded-xl border border-slate-700">
            <button
              onClick={() => copyToClipboard(getTabContent(), activeTab)}
              className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-xs text-white px-3 py-1 rounded-lg transition"
            >
              {copied === activeTab ? "✓ Copied!" : "Copy"}
            </button>
            <pre className="p-4 text-xs text-slate-300 overflow-x-auto max-h-80 overflow-y-auto font-mono whitespace-pre-wrap">
              {getTabContent()}
            </pre>
          </div>
        </div>
      )}

      {/* Saved Models */}
      {savedModels.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Saved Models ({savedModels.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedModels.map(model => (
              <div key={model.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-white">{model.name}</div>
                    <div className="text-purple-400 text-xs">{model.baseModel}</div>
                  </div>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">{model.useCase}</span>
                </div>
                <p className="text-slate-400 text-xs mb-3 line-clamp-2">{model.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadModel(model)}
                    className="bg-slate-700 text-white px-3 py-1 rounded-lg hover:bg-slate-600 transition text-xs"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => copyToClipboard(model.systemPrompt, `sp-${model.id}`)}
                    className="bg-slate-700 text-white px-3 py-1 rounded-lg hover:bg-slate-600 transition text-xs"
                  >
                    {copied === `sp-${model.id}` ? "✓ Copied!" : "Copy Prompt"}
                  </button>
                  <button
                    onClick={() => deleteModel(model.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition text-xs ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
