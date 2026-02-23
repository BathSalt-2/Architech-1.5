import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getGroqKey } from "../../lib/groq";

const NAV_ITEMS = [
  { icon: "🏠", label: "Dashboard", path: "/" },
  { icon: "🤖", label: "Agents", path: "/agents" },
  { icon: "🔄", label: "Workflows", path: "/workflows" },
  { icon: "🧪", label: "Model Playground", path: "/models" },
  { icon: "🏪", label: "Marketplace", path: "/marketplace" },
  { icon: "⚙️", label: "Settings", path: "/settings" },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasKey = Boolean(getGroqKey());

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-700 fixed h-full z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Arch1tech
            </span>
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">1.5</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Powered by Or4cl3 AI</p>
        </div>

        {/* API Status */}
        <div className="px-6 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${hasKey ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-red-400'}`}></span>
            <span className={hasKey ? 'text-green-400' : 'text-red-400'}>
              {hasKey ? 'Groq Connected' : 'API Key Required'}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700">
          <p className="text-xs text-slate-600">© 2025 Or4cl3 AI Solutions</p>
          <p className="text-xs text-slate-600">v1.5.0</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-700 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Arch1tech
          </span>
          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full font-semibold">1.5</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-400 hover:text-white p-2"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 w-64 h-full bg-slate-900 border-r border-slate-700 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Arch1tech 1.5
              </span>
              <p className="text-xs text-slate-500 mt-1">Powered by Or4cl3 AI</p>
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path ||
                  (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 border border-cyan-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-0 md:pt-0">
        <div className="md:hidden h-14"></div>
        <div className="min-h-screen bg-slate-950">
          {children}
        </div>
      </main>
    </div>
  );
}
