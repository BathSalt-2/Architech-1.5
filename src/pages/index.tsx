import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroqKey } from "../lib/groq";
import { getActivity } from "../lib/activity";

interface Activity {
  id: number;
  action: string;
  detail: string;
  timestamp: string;
}

const QUICK_ACTIONS = [
  { icon: "🤖", title: "Build an Agent", description: "Create a custom AI agent from natural language", path: "/agents", color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30" },
  { icon: "🧪", title: "Create LLM from Text", description: "Generate a custom language model", path: "/models", color: "from-purple-500/20 to-purple-600/10 border-purple-500/30" },
  { icon: "🔄", title: "Design Workflow", description: "Build automated AI-powered workflows", path: "/workflows", color: "from-green-500/20 to-green-600/10 border-green-500/30" },
  { icon: "🏪", title: "Browse Marketplace", description: "Discover pre-built agents and models", path: "/marketplace", color: "from-orange-500/20 to-orange-600/10 border-orange-500/30" },
];

export default function IndexPage() {
  const navigate = useNavigate();
  const hasKey = Boolean(getGroqKey());
  const [activity, setActivity] = useState<Activity[]>([]);
  const [stats, setStats] = useState({ agents: 0, models: 0, workflows: 0 });

  useEffect(() => {
    setActivity(getActivity());
    setStats({
      agents: JSON.parse(localStorage.getItem('arch15-agents') || '[]').length,
      models: JSON.parse(localStorage.getItem('arch15-models') || '[]').length,
      workflows: JSON.parse(localStorage.getItem('arch15-workflows') || '[]').length,
    });
  }, []);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-black text-white">Welcome to <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Arch1tech 1.5</span></h1>
          {hasKey ? (
            <span className="flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full font-semibold">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              AI Active
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-semibold">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
              Configure API Key
            </span>
          )}
        </div>
        <p className="text-slate-400 text-lg">Build, deploy, and manage AI agents and custom models — powered by Or4cl3 AI.</p>
        {!hasKey && (
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>Set your Groq API key in <button onClick={() => navigate('/settings')} className="underline font-semibold">Settings</button> to unlock AI features.</span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className={`bg-gradient-to-br ${action.color} border rounded-xl p-5 text-left hover:scale-105 transition-all duration-200 group`}
            >
              <div className="text-3xl mb-3">{action.icon}</div>
              <div className="font-bold text-white text-sm mb-1 group-hover:text-cyan-400 transition-colors">{action.title}</div>
              <div className="text-slate-400 text-xs">{action.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Platform Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <span className="text-slate-400 text-sm">Agents Built</span>
              </div>
              <span className="text-2xl font-black text-cyan-400">{stats.agents}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧪</span>
                <span className="text-slate-400 text-sm">Models Generated</span>
              </div>
              <span className="text-2xl font-black text-purple-400">{stats.models}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔄</span>
                <span className="text-slate-400 text-sm">Workflows Created</span>
              </div>
              <span className="text-2xl font-black text-green-400">{stats.workflows}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
          {activity.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📋</div>
              <p className="text-slate-500 text-sm">No activity yet</p>
              <p className="text-slate-600 text-xs mt-1">Build something to get started!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{item.action}</p>
                    <p className="text-slate-500 text-xs truncate">{item.detail}</p>
                  </div>
                  <span className="text-slate-600 text-xs flex-shrink-0">{formatTime(item.timestamp)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Getting Started */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Getting Started</h2>
          <ol className="space-y-3">
            {[
              { step: 1, text: "Set your Groq API key in Settings", icon: "🔑", done: hasKey, path: "/settings" },
              { step: 2, text: "Build your first AI agent", icon: "🤖", done: stats.agents > 0, path: "/agents" },
              { step: 3, text: "Generate a custom LLM", icon: "🧪", done: stats.models > 0, path: "/models" },
              { step: 4, text: "Deploy to marketplace", icon: "🏪", done: false, path: "/marketplace" },
            ].map((item) => (
              <div
                key={item.step}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  item.done
                    ? "bg-green-500/10 border border-green-500/20"
                    : "bg-slate-700/50 hover:bg-slate-700 border border-transparent"
                }`}
                onClick={() => navigate(item.path)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  item.done ? "bg-green-500 text-white" : "bg-slate-600 text-slate-400"
                }`}>
                  {item.done ? "✓" : item.step}
                </div>
                <span className="text-lg">{item.icon}</span>
                <span className={`text-sm ${item.done ? "text-green-400 line-through" : "text-slate-300"}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
