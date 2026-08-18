import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fine } from "@/lib/fine";
import { useToast } from "@/hooks/use-toast";

export default function Logout() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fine.auth.signOut();
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to log out. Please try again.",
          variant: "destructive",
        });
      } finally {
        navigate("/");
      }
    };

    handleLogout();
  }, [navigate, toast]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}