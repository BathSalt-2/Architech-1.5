import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);
  const [keyStatus, setKeyStatus] = useState<"none" | "set" | "testing">("none");
  const [darkMode, setDarkMode] = useState(true);
  const [importStatus, setImportStatus] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('arch15-groq-key');
    if (saved) {
      setApiKey(saved);
      setKeyStatus("set");
    }
    const dm = localStorage.getItem('arch15-dark-mode');
    setDarkMode(dm !== "false");
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('arch15-groq-key', apiKey.trim());
      setKeyStatus("set");
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2000);
    } else {
      localStorage.removeItem('arch15-groq-key');
      setKeyStatus("none");
    }
  };

  const clearData = (key: string, label: string) => {
    if (confirm(`Clear all ${label}? This cannot be undone.`)) {
      localStorage.removeItem(key);
    }
  };

  const exportData = () => {
    const data = {
      agents: JSON.parse(localStorage.getItem('arch15-agents') || '[]'),
      models: JSON.parse(localStorage.getItem('arch15-models') || '[]'),
      workflows: JSON.parse(localStorage.getItem('arch15-workflows') || '[]'),
      activity: JSON.parse(localStorage.getItem('arch15-activity') || '[]'),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arch15-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.agents) localStorage.setItem('arch15-agents', JSON.stringify(data.agents));
        if (data.models) localStorage.setItem('arch15-models', JSON.stringify(data.models));
        if (data.workflows) localStorage.setItem('arch15-workflows', JSON.stringify(data.workflows));
        if (data.activity) localStorage.setItem('arch15-activity', JSON.stringify(data.activity));
        setImportStatus("✅ Data imported successfully! Refresh to see changes.");
      } catch {
        setImportStatus("❌ Invalid file format.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const inputCls = "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none w-full text-sm";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">⚙️ Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure your Arch1tech platform</p>
      </div>

      <div className="space-y-6">
        {/* AI Configuration */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="font-bold text-white mb-1">AI Configuration</h2>
          <p className="text-slate-500 text-xs mb-4">Connect to Groq for AI-powered features</p>

          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-2">Groq API Key</label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className={`${inputCls} pr-20`}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white transition"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${keyStatus === 'set' ? 'bg-green-400' : 'bg-slate-600'}`}></span>
                <span className={`text-xs ${keyStatus === 'set' ? 'text-green-400' : 'text-slate-500'}`}>
                  {keyStatus === 'set' ? 'API key configured' : 'No API key set'}
                </span>
              </div>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:underline"
              >
                Get API key →
              </a>
            </div>
          </div>

          <button
            onClick={saveApiKey}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm"
          >
            {keySaved ? "✓ Saved!" : "Save API Key"}
          </button>
          {keyStatus === "set" && (
            <button
              onClick={() => { localStorage.removeItem('arch15-groq-key'); setApiKey(""); setKeyStatus("none"); }}
              className="ml-3 bg-red-600/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-600/30 transition text-sm"
            >
              Remove Key
            </button>
          )}
        </div>

        {/* Platform Preferences */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="font-bold text-white mb-1">Platform Preferences</h2>
          <p className="text-slate-500 text-xs mb-4">Customize your experience</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white">Dark Mode</div>
                <div className="text-xs text-slate-500">Cyberpunk dark theme (recommended)</div>
              </div>
              <button
                onClick={() => {
                  const next = !darkMode;
                  setDarkMode(next);
                  localStorage.setItem('arch15-dark-mode', String(next));
                }}
                className={`w-11 h-6 rounded-full transition-all ${darkMode ? 'bg-cyan-500' : 'bg-slate-600'} relative`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white">Language</div>
                <div className="text-xs text-slate-500">Interface language</div>
              </div>
              <span className="text-sm text-slate-400">English</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white">AI Model</div>
                <div className="text-xs text-slate-500">Groq inference model</div>
              </div>
              <span className="text-sm text-cyan-400">llama-3.3-70b-versatile</span>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="font-bold text-white mb-1">Data Management</h2>
          <p className="text-slate-500 text-xs mb-4">Manage your stored data</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => clearData('arch15-agents', 'agents')}
              className="bg-slate-700 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg hover:bg-red-600/20 transition text-sm text-left"
            >
              🗑 Clear all saved agents
            </button>
            <button
              onClick={() => clearData('arch15-models', 'models')}
              className="bg-slate-700 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg hover:bg-red-600/20 transition text-sm text-left"
            >
              🗑 Clear all saved models
            </button>
            <button
              onClick={() => clearData('arch15-workflows', 'workflows')}
              className="bg-slate-700 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg hover:bg-red-600/20 transition text-sm text-left"
            >
              🗑 Clear all workflows
            </button>
            <button
              onClick={() => clearData('arch15-activity', 'activity')}
              className="bg-slate-700 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg hover:bg-red-600/20 transition text-sm text-left"
            >
              🗑 Clear activity log
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportData}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition text-sm"
            >
              📤 Export all data
            </button>
            <label className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition text-sm cursor-pointer">
              📥 Import data
              <input type="file" accept=".json" onChange={importData} className="hidden" />
            </label>
          </div>
          {importStatus && (
            <p className="text-sm mt-3 text-slate-300">{importStatus}</p>
          )}
        </div>

        {/* About */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="font-bold text-white mb-4">About</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Platform Version</span>
              <span className="text-cyan-400 font-mono">1.5.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Built by</span>
              <span className="text-white">Or4cl3 AI Solutions</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">AI Provider</span>
              <span className="text-white">Groq (llama-3.3-70b-versatile)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">GitHub</span>
              <a
                href="https://github.com/BathSalt-2/Architech-1.5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                BathSalt-2/Architech-1.5 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
