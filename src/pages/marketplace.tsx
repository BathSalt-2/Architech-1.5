import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MarketplaceItem {
  id: number;
  name: string;
  type: "agent" | "model" | "workflow";
  category: string;
  downloads: number;
  rating: number;
  description: string;
  author: string;
  tags: string[];
  baseModel?: string;
}

const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  { id: 1, name: "GitHub PR Summarizer", type: "agent", category: "DevOps", downloads: 1247, rating: 4.8, description: "Automatically summarizes pull requests and generates code review comments", author: "Or4cl3 AI", tags: ["github", "code-review", "automation"] },
  { id: 2, name: "Customer Support Pro", type: "agent", category: "Business", downloads: 3421, rating: 4.9, description: "Multi-language customer support agent with sentiment detection and escalation routing", author: "community", tags: ["support", "nlp", "multilingual"] },
  { id: 3, name: "ResearchBot Alpha", type: "agent", category: "Research", downloads: 892, rating: 4.7, description: "Searches, summarizes, and synthesizes research papers into actionable insights", author: "Or4cl3 AI", tags: ["research", "summarization", "academic"] },
  { id: 4, name: "CodeGenius 7B", type: "model", category: "Development", downloads: 5102, rating: 4.9, description: "Fine-tuned LLM for code generation, debugging, and documentation", baseModel: "Llama 3.2", author: "Or4cl3 AI", tags: ["code", "debugging", "typescript"] },
  { id: 5, name: "LegalEagle Assistant", type: "agent", category: "Legal", downloads: 634, rating: 4.6, description: "Contract analysis, legal research, and compliance checking agent", author: "community", tags: ["legal", "contracts", "compliance"] },
  { id: 6, name: "DataInsight Analyst", type: "agent", category: "Analytics", downloads: 2189, rating: 4.8, description: "Transforms raw data descriptions into analytical frameworks and Python code", author: "Or4cl3 AI", tags: ["analytics", "python", "data-science"] },
  { id: 7, name: "CreativeWriter Pro", type: "model", category: "Creative", downloads: 4321, rating: 4.7, description: "Custom-tuned model for creative writing, storytelling, and content creation", baseModel: "Mistral 7B", author: "community", tags: ["creative", "writing", "content"] },
  { id: 8, name: "DevOps Orchestrator", type: "workflow", category: "DevOps", downloads: 1567, rating: 4.8, description: "Automated CI/CD pipeline monitoring and incident response workflow", author: "Or4cl3 AI", tags: ["devops", "cicd", "monitoring"] },
  { id: 9, name: "Medical Triage Bot", type: "agent", category: "Healthcare", downloads: 423, rating: 4.5, description: "Symptom collection and triage routing agent for healthcare platforms", author: "community", tags: ["healthcare", "triage", "hipaa"] },
  { id: 10, name: "SalesGenius CRM", type: "agent", category: "Sales", downloads: 2876, rating: 4.9, description: "Lead scoring, email personalization, and deal progression agent", author: "Or4cl3 AI", tags: ["sales", "crm", "email"] },
  { id: 11, name: "TinyFinance 3B", type: "model", category: "Finance", downloads: 1092, rating: 4.6, description: "Small but accurate financial analysis and reporting model", baseModel: "Phi-3 Mini", author: "community", tags: ["finance", "analysis", "reporting"] },
  { id: 12, name: "ContentPipeline Pro", type: "workflow", category: "Marketing", downloads: 3245, rating: 4.8, description: "End-to-end content creation workflow: research → draft → edit → schedule", author: "Or4cl3 AI", tags: ["content", "marketing", "automation"] },
];

const TYPE_COLORS: Record<string, string> = {
  agent: "bg-cyan-500/20 text-cyan-400",
  model: "bg-purple-500/20 text-purple-400",
  workflow: "bg-green-500/20 text-green-400",
};

const TYPE_ICONS: Record<string, string> = {
  agent: "🤖",
  model: "🧪",
  workflow: "🔄",
};

const TYPE_DESTINATIONS: Record<string, string> = {
  agent: "/agents",
  model: "/models",
  workflow: "/workflows",
};

const CATEGORIES = Array.from(new Set(MARKETPLACE_ITEMS.map(i => i.category))).sort();

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} className={`text-xs ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}</span>
    </div>
  );
}

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<"all" | "agent" | "model" | "workflow">("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cloneModal, setCloneModal] = useState<MarketplaceItem | null>(null);

  const filtered = MARKETPLACE_ITEMS.filter(item => {
    const matchType = filterType === "all" || item.type === filterType;
    const matchCat = filterCategory === "all" || item.category === filterCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.tags.some(t => t.includes(q));
    return matchType && matchCat && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">🏪 Marketplace</h1>
        <p className="text-slate-400 text-sm mt-1">Discover and clone pre-built agents, models, and workflows</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Type Filter */}
        <div className="flex bg-slate-800 border border-slate-700 rounded-lg p-1 gap-1">
          {(["all", "agent", "model", "workflow"] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                filterType === type
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {type === "all" ? "All" : `${TYPE_ICONS[type]} ${type}s`}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-cyan-400 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search marketplace..."
          className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs focus:border-cyan-400 focus:outline-none flex-1 min-w-40"
        />

        <div className="text-xs text-slate-500 flex items-center">{filtered.length} items</div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition-all flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-bold text-white text-sm">{item.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{item.category}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${TYPE_COLORS[item.type]}`}>
                {TYPE_ICONS[item.type]} {item.type}
              </span>
            </div>

            <p className="text-slate-400 text-xs flex-1 mb-3">{item.description}</p>

            {item.baseModel && (
              <div className="text-xs text-purple-400 mb-2">Base: {item.baseModel}</div>
            )}

            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <StarRating rating={item.rating} />
              <div className="text-xs text-slate-500">
                ⬇ {item.downloads.toLocaleString()}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">
                {item.author === "Or4cl3 AI" ? "🔵 Or4cl3 AI" : "👤 community"}
              </span>
              <button
                onClick={() => setCloneModal(item)}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition text-xs font-medium"
              >
                Clone & Customize
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-400">No items match your filters</p>
        </div>
      )}

      {/* Clone Modal */}
      {cloneModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setCloneModal(null)}>
          <div
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{TYPE_ICONS[cloneModal.type]}</span>
              <div>
                <div className="font-bold text-white">{cloneModal.name}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[cloneModal.type]}`}>
                  {cloneModal.type}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              This will open the <span className="text-cyan-400 font-medium">
                {cloneModal.type === "agent" ? "Agent Builder" : cloneModal.type === "model" ? "Model Playground" : "Workflow Builder"}
              </span> pre-filled with this item's configuration so you can customize it.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigate(TYPE_DESTINATIONS[cloneModal.type]);
                  setCloneModal(null);
                }}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm"
              >
                Open Builder →
              </button>
              <button
                onClick={() => setCloneModal(null)}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
