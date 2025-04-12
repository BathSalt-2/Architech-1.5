import { AppSidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fine } from "@/lib/fine";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = fine.auth.useSession();

  return (
    <div className="flex h-screen bg-[#0a0a1f] text-white overflow-hidden">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? sidebarOpen
              ? "fixed inset-y-0 left-0 z-40 w-64 transform translate-x-0 transition-transform duration-300 ease-in-out"
              : "fixed inset-y-0 left-0 z-40 w-64 transform -translate-x-full transition-transform duration-300 ease-in-out"
            : "w-64"
        }`}
      >
        <AppSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-end px-6 border-b border-[#2a2a4a] bg-[#0a1029]">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                    <AvatarFallback className="bg-[#8a5fff]">
                      {session.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button asChild variant="ghost" className="text-[#5ee7ff] hover:text-[#5ee7ff]/90">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-[#5ee7ff] to-[#8a5fff] hover:opacity-90 text-black">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-[#0a0a1f]">
          {children}
        </main>
      </div>
    </div>
  );
}