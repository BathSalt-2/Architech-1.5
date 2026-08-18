import { 
  Home, 
  Cpu, 
  Workflow, 
  Layers, 
  Share2, 
  Settings, 
  Users, 
  Sparkles
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Agent Explorer",
    url: "/agents",
    icon: Cpu,
  },
  {
    title: "Workflow Builder",
    url: "/workflows",
    icon: Workflow,
  },
  {
    title: "Model Playground",
    url: "/models",
    icon: Layers,
  },
  {
    title: "Marketplace",
    url: "/marketplace",
    icon: Share2,
  },
  {
    title: "Team",
    url: "/team",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-[#0a1029] border-r border-[#2a2a4a]">
      <SidebarContent>
        <div className="flex items-center justify-center py-6">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-[#5ee7ff]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#5ee7ff] to-[#8a5fff] bg-clip-text text-transparent">
              Arch1tech
            </span>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#8a5fff]">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2 text-gray-300 hover:text-[#5ee7ff] transition-colors">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}