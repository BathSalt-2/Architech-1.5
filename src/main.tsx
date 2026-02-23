import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import { AppLayout } from "./components/layout/AppLayout";
import IndexPage from "./pages/index";
import AgentsPage from "./pages/agents";
import WorkflowsPage from "./pages/workflows";
import ModelsPage from "./pages/models";
import MarketplacePage from "./pages/marketplace";
import SettingsPage from "./pages/settings";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppLayout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/workflows" element={<WorkflowsPage />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  </BrowserRouter>
);
