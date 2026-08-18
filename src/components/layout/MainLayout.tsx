import { AppSidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {!isMobile && <AppSidebar />}
      
      {isMobile && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed top-4 left-4 z-50 bg-purple-600 text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </Button>
          
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0">
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </>
      )}
      
      <main className="flex-1 bg-white text-black">
        {children}
      </main>
    </div>
  );
}