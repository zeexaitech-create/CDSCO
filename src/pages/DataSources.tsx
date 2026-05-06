import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { DATA_SOURCES } from "@/data/dataSources";
import { Activity, Lock, Plug, ArrowRight, ShieldCheck, Cable } from "lucide-react";

const statusVariant = (s: string): "live" | "simulated" | "ready" =>
  s === "live" ? "live" : s === "simulated" ? "simulated" : "ready";

const adapterCode = `// Open-architecture adapter contract — same interface, swappable implementation
interface RegulatoryDataAdapter {
  id: string;
  authenticate(credentials?: Credentials): Promise<Session>;
  listSubmissions(filter: SubmissionFilter): Promise<Submission[]>;
  pushStatus(id: string, status: ReviewStatus): Promise<Ack>;
  pullDocument(id: string): Promise<DocumentBlob>;
  subscribe(event: EventTopic, handler: Handler): Unsubscribe;
}

// Today
const sugam   = new SugamPortalAdapter({ baseUrl: "api.sugam.gov.in/v2" });
const mdo     = new MdOnlineAdapter({ baseUrl: "api.mdonline.gov.in/v1" });
const public_ = new CdscoPublicRegistryAdapter();

// Tomorrow — drop-in replacement post DDRS award (RFP last date 30 May 2026)
const ddrs    = new DdrsAdapter({
  baseUrl: "ddrs.cdsco.gov.in",
  federates: ["SUGAM", "SUGAM_LABS", "MD_ONLINE", "ONDLS"],
  downstream: ["GST", "CUSTOMS", "ICMR"],
});`;

export default function DataSources() {
  const loading = useSkeletonLoader();
  if (loading) {
    return (
      <DashboardLayout title="Data Sources">
        <SkeletonBlock className="h-[600px]" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Data Sources">
      <p className="text-sm text-text-secondary mb-6 max-w-3xl">
        CDSCO RegAI follows an open-architecture adapter pattern. Each upstream system — SUGAM, MD Online, the
        public CDSCO registry, and the forthcoming DDRS platform — is wired through the same contract, so the
        platform plugs into today's portals and tomorrow's unified system without code changes to consuming modules.
      </p>

      {/* Adapter cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {DATA_SOURCES.map((src) => (
          <div key={src.id} className="bg-bg-surface border border-border rounded-lg p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-md bg-bg-muted border border-border flex items-center justify-center">
                  {src.status === "live" ? <Activity className="h-4 w-4 text-success" /> :
                   src.status === "simulated" ? <Plug className="h-4 w-4 text-warning" /> :
                   <Cable className="h-4 w-4 text-text-muted" />}
                </div>
                <div>
                  <h3 className="font-display text-base text-foreground leading-tight">{src.name}</h3>
                  <p className="text-[11px] font-mono-code text-text-muted mt-0.5">{src.endpoint}</p>
                </div>
              </div>
              <ProvenanceChip variant={statusVariant(src.status)} source={src.status.toUpperCase()} pulse={src.status === "live"} />
            </div>

            <p className="text-xs text-text-secondary leading-relaxed mb-4">{src.description}</p>

            <div className="grid grid-cols-3 gap-3 text-xs mb-3">
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Auth</div>
                <div className="text-foreground mt-0.5 flex items-center gap-1">
                  <Lock className="h-3 w-3 text-text-muted" />
                  {src.authMode}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Records</div>
                <div className="text-foreground mt-0.5 font-mono-code">
                  {src.recordsAvailable.toLocaleString("en-IN")}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Last Sync</div>
                <div className="text-foreground mt-0.5 font-mono-code">
                  {src.lastSyncAt ? new Date(src.lastSyncAt).toLocaleTimeString("en-IN", { hour12: false }) : "—"}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {src.capabilities.map((c) => (
                <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue-light text-primary">
                  {c}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-text-muted border-t border-border pt-3 leading-relaxed">{src.notes}</p>
          </div>
        ))}
      </div>

      {/* Migration timeline */}
      <div className="bg-bg-surface border border-border rounded-lg p-5 mb-6">
        <h3 className="font-display text-base text-foreground mb-1">Migration Path: SUGAM → DDRS</h3>
        <p className="text-xs text-text-muted mb-5">
          DCGI announcement: "The SUGAM portal is 10 years old and has lived its life. We are now moving towards a
          new platform built on open architecture." DDRS RFP last date: 30 May 2026.
        </p>

        <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
          {[
            { title: "Today", subtitle: "SUGAM + MD Online", tone: "live" as const, items: ["Session-based APIs", "Per-portal silos"] },
            { title: "RFP Window", subtitle: "DDRS tender", tone: "simulated" as const, items: ["Open architecture spec", "Vendor evaluation"] },
            { title: "Cutover", subtitle: "DDRS Production", tone: "ready" as const, items: ["OAuth2 federation", "Unified data plane"] },
            { title: "Connected Systems", subtitle: "GST · Customs · ICMR", tone: "ready" as const, items: ["Auto data flow", "Real-time reconciliation"] },
          ].map((step, i, arr) => (
            <div key={step.title} className="flex items-stretch gap-2 shrink-0">
              <div className="border border-border rounded-md p-3 bg-bg-muted min-w-[180px]">
                <ProvenanceChip variant={step.tone} source={step.title.toUpperCase()} />
                <div className="text-sm font-medium text-foreground mt-2">{step.subtitle}</div>
                <ul className="mt-2 space-y-1">
                  {step.items.map((it) => (
                    <li key={it} className="text-[11px] text-text-secondary flex items-start gap-1">
                      <span className="h-1 w-1 rounded-full bg-text-muted mt-1.5 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-text-muted self-center shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Adapter contract */}
      <div className="bg-bg-surface border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <h3 className="font-display text-base text-foreground">Adapter Contract</h3>
          <span className="ml-auto text-[10px] text-text-muted font-mono-code">src/adapters/RegulatoryDataAdapter.ts</span>
        </div>
        <pre className="bg-foreground text-success-light text-[12px] leading-relaxed font-mono p-4 rounded-md overflow-x-auto">
{adapterCode}
        </pre>
      </div>
    </DashboardLayout>
  );
}
