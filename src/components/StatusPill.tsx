import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  verified: "bg-success-light text-success",
  approved: "bg-success-light text-success",
  connected: "bg-success-light text-success",
  flagged: "bg-destructive-light text-destructive",
  critical: "bg-destructive-light text-destructive",
  "in review": "bg-warning-light text-warning",
  pending: "bg-warning-light text-warning",
  duplicate: "bg-muted text-muted-foreground",
  demo: "bg-warning-light text-warning",
};

export function StatusPill({ status, pulse = false }: { status: string; pulse?: boolean }) {
  const key = status.toLowerCase();
  const style = variants[key] || "bg-muted text-muted-foreground";
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
      style,
      pulse && "animate-pulse-once"
    )}>
      {status}
    </span>
  );
}
