// Simplified toast implementation
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function toast({ title, description, variant }: ToastProps) {
  return sonnerToast(title, {
    description,
    className: variant === "destructive" ? "bg-red-500" : undefined,
  });
}