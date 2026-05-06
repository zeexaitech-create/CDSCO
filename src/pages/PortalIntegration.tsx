import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { ArrowRight } from "lucide-react";

const logTemplates = [
  "SUGAM SYNC — Fetched {n} new submissions",
  "ANONYMISATION — Processed NDA-2024-{id} (PII entities: {n})",
  "CLASSIFICATION — SAE-2024-INJ-{id} classified as {cls}",
  "ALERT — Duplicate detected: NDA-2024-{id} matches {pct}% with NDA-2024-{id2}",
  "SUGAM SYNC — Status push completed for {n} records",
  "MD ONLINE — Device registration {id} verified",
  "INTAKE ENGINE — Queued {n} documents for processing",
  "REVIEWER DASHBOARD — {n} cases assigned to Officer Pool A",
];

const cls = ["DEATH/CRITICAL", "HOSPITALISATION/MODERATE", "LIFE-THREATENING/CRITICAL", "DISABILITY/SERIOUS", "OTHER/LOW"];

function genLog() {
  const now = new Date();
  const ts = now.toLocaleTimeString("en-IN", { hour12: false });
  const tmpl = logTemplates[Math.floor(Math.random() * logTemplates.length)];
  return `[${ts}] ` + tmpl
    .replace("{n}", String(Math.floor(Math.random() * 30) + 1))
    .replace("{id}", String(Math.floor(Math.random() * 900) + 100).padStart(4, "0"))
    .replace("{id2}", String(Math.floor(Math.random() * 900) + 100).padStart(4, "0"))
    .replace("{pct}", (Math.random() * 20 + 75).toFixed(1))
    .replace("{cls}", cls[Math.floor(Math.random() * cls.length)]);
}

const pipelineNodes = [
  { name: "SUGAM Portal", throughput: "842 docs/day" },
  { name: "AI Intake Engine", throughput: "838 docs/day" },
  { name: "Anonymisation Layer", throughput: "835 docs/day" },
  { name: "Classification Engine", throughput: "830 docs/day" },
  { name: "Reviewer Dashboard", throughput: "812 docs/day" },
  { name: "Decision Output", throughput: "798 docs/day" },
  { name: "Status Push", throughput: "798 docs/day" },
];

export default function PortalIntegration() {
  const loading = useSkeletonLoader();
  const [logs, setLogs] = useState<string[]>(() => Array.from({ length: 8 }, genLog));
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => {
      setLogs((prev) => [...prev.slice(-50), genLog()]);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  if (loading) return <DashboardLayout title="Portal Integration"><SkeletonBlock className="h-[600px]" /></DashboardLayout>;

  return (
    <DashboardLayout title="Portal Integration">
      <p className="text-sm text-text-secondary mb-6">Integration Status — SUGAM and MD Online Portals</p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {[
          { name: "SUGAM Portal", status: "Connected", lastSync: "2 minutes ago", records: "3,241", endpoint: "api.sugam.gov.in/v2", modules: "Submission Intake, Status Push, Document Pull", next: "Every 15 minutes" },
          { name: "MD Online Portal", status: "Connected", lastSync: "7 minutes ago", records: "1,586", endpoint: "api.mdonline.gov.in/v1", modules: "Device Registration, Importer Verification", next: "Every 15 minutes" },
        ].map((p) => (
          <div key={p.name} className="bg-bg-surface border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
              <h3 className="font-display text-base text-foreground">{p.name}</h3>
              <span className="ml-auto text-xs font-semibold text-success">{p.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {Object.entries({ "Last Sync": p.lastSync, "Records Synced": p.records, "API Endpoint": p.endpoint, "Modules Active": p.modules, "Next Sync": p.next }).map(([k, v]) => (
                <div key={k} className={k === "Modules Active" ? "col-span-2" : ""}>
                  <dt className="text-xs text-text-muted">{k}</dt>
                  <dd className={`text-foreground mt-0.5 ${k === "API Endpoint" ? "font-mono text-xs" : ""}`}>{v}</dd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div className="bg-bg-surface border border-border rounded-lg p-5 mb-6">
        <h3 className="font-display text-base text-foreground mb-4">Data Pipeline Monitor</h3>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {pipelineNodes.map((n, i) => (
            <div key={n.name} className="flex items-center gap-1 shrink-0">
              <div className="border border-border rounded-md px-3 py-2 bg-bg-muted text-center min-w-[110px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-medium text-foreground">{n.name}</span>
                </div>
                <span className="text-[10px] text-text-muted">{n.throughput}</span>
              </div>
              {i < pipelineNodes.length - 1 && <ArrowRight className="h-4 w-4 text-text-muted shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-bg-surface border border-border rounded-lg p-5">
        <h3 className="font-display text-base text-foreground mb-3">Live Activity Log</h3>
        <div ref={logRef} className="h-48 overflow-y-auto bg-foreground rounded-md p-3 font-mono text-[12px] leading-relaxed text-success-light">
          {logs.map((l, i) => <div key={i} className="opacity-90">{l}</div>)}
        </div>
      </div>
    </DashboardLayout>
  );
}
