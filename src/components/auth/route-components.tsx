import { Navigate } from "react-router-dom";
import { fine } from "@/lib/fine";

interface ProtectedRouteProps {
  Component: React.ComponentType;
}

export const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
  const { data: session, status } = fine.auth.useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};