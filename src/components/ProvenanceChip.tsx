import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

type Provenance = "live" | "simulated" | "ready";

const styles: Record<Provenance, { dot: string; text: string; bg: string; label: string }> = {
  live: {
    dot: "bg-success",
    text: "text-success",
    bg: "bg-success-light border-success/20",
    label: "LIVE",
  },
  simulated: {
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning-light border-warning/20",
    label: "SIMULATED",
  },
  ready: {
    dot: "bg-text-muted",
    text: "text-text-muted",
    bg: "bg-bg-muted border-border",
    label: "READY",
  },
};

export function ProvenanceChip({
  variant,
  source,
  href,
  pulse = false,
  className,
}: {
  variant: Provenance;
  source: string;
  href?: string;
  pulse?: boolean;
  className?: string;
}) {
  const s = styles[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-medium font-mono-code tracking-wide",
        s.bg,
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot, pulse && "animate-pulse")} />
      {s.label} · {source}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:underline inline-flex items-center"
          aria-label="Open source"
        >
          <ExternalLink className="h-2.5 w-2.5 ml-0.5" strokeWidth={2.25} />
        </a>
      )}
    </span>
  );
}
