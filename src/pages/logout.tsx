import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fine } from "@/lib/fine";

export default function Logout() {
  useEffect(() => {
    const logout = async () => {
      await fine.auth.signOut();
    };
    
    logout();
  }, []);

  return <Navigate to="/" />;
}