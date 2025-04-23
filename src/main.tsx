import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/layout/theme-provider";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/auth/route-components";

import "./index.css";
import Index from "./pages";
import LoginForm from "./pages/login";
import SignupForm from "./pages/signup";
import Logout from "./pages/logout";
import AgentExplorer from "./pages/agents";
import WorkflowBuilder from "./pages/workflows";
import ModelPlayground from "./pages/models";
import Marketplace from "./pages/marketplace";
import TeamPage from "./pages/team";
import SettingsPage from "./pages/settings";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route 
              path="/" 
              element={
                <AppLayout>
                  <Index />
                </AppLayout>
              } 
            />
            <Route 
              path="/agents" 
              element={
                <AppLayout>
                  <ProtectedRoute Component={AgentExplorer} />
                </AppLayout>
              } 
            />
            <Route 
              path="/workflows" 
              element={
                <AppLayout>
                  <ProtectedRoute Component={WorkflowBuilder} />
                </AppLayout>
              } 
            />
            <Route 
              path="/models" 
              element={
                <AppLayout>
                  <ProtectedRoute Component={ModelPlayground} />
                </AppLayout>
              } 
            />
            <Route 
              path="/marketplace" 
              element={
                <AppLayout>
                  <Marketplace />
                </AppLayout>
              } 
            />
            <Route 
              path="/team" 
              element={
                <AppLayout>
                  <ProtectedRoute Component={TeamPage} />
                </AppLayout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AppLayout>
                  <ProtectedRoute Component={SettingsPage} />
                </AppLayout>
              } 
            />
          </Routes>
          <Sonner />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);