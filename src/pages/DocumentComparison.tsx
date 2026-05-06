import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { Download } from "lucide-react";

const docA = [
  { text: "SECTION 3: CLINICAL PHARMACOLOGY", type: "heading" },
  { text: "Meropenem is a broad-spectrum carbapenem antibiotic administered intravenously.", type: "same" },
  { text: "The recommended dosage for adults is 500mg every 8 hours for mild infections.", type: "removed" },
  { text: "In cases of nosocomial pneumonia, dosage may be increased to 1g every 8 hours.", type: "same" },
  { text: "", type: "same" },
  { text: "SECTION 5: DOSAGE AND ADMINISTRATION", type: "heading" },
  { text: "Each vial should be reconstituted with 20mL of Sterile Water for Injection.", type: "same" },
  { text: "Infusion time: 15-30 minutes for standard dosing.", type: "removed" },
  { text: "Do not mix with other medications in the same infusion line.", type: "same" },
  { text: "", type: "same" },
  { text: "SECTION 8: CONTRAINDICATIONS", type: "heading" },
  { text: "Known hypersensitivity to meropenem or other carbapenems.", type: "same" },
  { text: "History of anaphylactic reactions to beta-lactam antibiotics.", type: "same" },
];

const docB = [
  { text: "SECTION 3: CLINICAL PHARMACOLOGY", type: "heading" },
  { text: "Meropenem is a broad-spectrum carbapenem antibiotic administered intravenously.", type: "same" },
  { text: "The recommended dosage for adults is 1g every 8 hours for all indications.", type: "added" },
  { text: "In cases of nosocomial pneumonia, dosage may be increased to 1g every 8 hours.", type: "same" },
  { text: "", type: "same" },
  { text: "SECTION 5: DOSAGE AND ADMINISTRATION", type: "heading" },
  { text: "Each vial should be reconstituted with 20mL of Sterile Water for Injection.", type: "same" },
  { text: "Infusion time: 30 minutes minimum for all dosing regimens. Extended infusion of 3 hours may improve clinical outcomes.", type: "added" },
  { text: "Do not mix with other medications in the same infusion line.", type: "same" },
  { text: "", type: "same" },
  { text: "SECTION 8: CONTRAINDICATIONS", type: "heading" },
  { text: "Known hypersensitivity to meropenem or other carbapenems.", type: "same" },
  { text: "History of anaphylactic reactions to beta-lactam antibiotics.", type: "same" },
  { text: "", type: "same" },
  { text: "SECTION 12: PAEDIATRIC USE ADDENDUM (NEW)", type: "heading" },
  { text: "Meropenem may be used in paediatric patients aged 3 months and older at a dose of 10-40mg/kg every 8 hours depending on indication severity.", type: "added" },
];

export default function DocumentComparison() {
  const loading = useSkeletonLoader();
  const [compared, setCompared] = useState(false);
  const [view, setView] = useState<"side" | "unified">("side");

  const lineClass = (type: string) => {
    if (type === "removed") return "bg-destructive-light line-through text-destructive";
    if (type === "added") return "bg-success-light text-success";
    if (type === "heading") return "font-bold text-foreground";
    return "text-text-secondary";
  };

  if (loading) return <DashboardLayout title="Document Comparison"><SkeletonBlock className="h-[500px]" /></DashboardLayout>;

  return (
    <DashboardLayout title="Document Comparison">
      <p className="text-sm text-text-secondary mb-6">Regulatory Document Version Comparison</p>

      <div className="bg-bg-surface border border-border rounded-lg p-5 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <select className="text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            <option>v1.0 — Submitted 10 Jan 2024</option>
          </select>
          <span className="text-text-muted text-sm">vs</span>
          <select className="text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            <option>v2.1 — Resubmitted 04 Apr 2024</option>
          </select>
          <button onClick={() => setCompared(true)}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            Run Comparison
          </button>
          <div className="ml-auto flex border border-border rounded-md overflow-hidden">
            {(["side", "unified"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-medium ${view === v ? "bg-primary text-primary-foreground" : "text-text-secondary hover:bg-bg-muted"}`}>
                {v === "side" ? "Side by Side" : "Unified Diff"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {compared && (
        <>
          <div className={`grid ${view === "side" ? "grid-cols-2" : "grid-cols-1"} gap-4 mb-6`}>
            {view === "side" ? (
              <>
                <div className="bg-bg-surface border border-border rounded-lg p-4 font-mono text-[13px] leading-relaxed space-y-0.5">
                  <p className="text-xs text-text-muted font-semibold mb-2 font-sans uppercase tracking-wider">Version A — Original</p>
                  {docA.map((l, i) => <div key={i} className={`px-2 py-0.5 rounded ${lineClass(l.type)}`}>{l.text || "\u00A0"}</div>)}
                </div>
                <div className="bg-bg-surface border border-border rounded-lg p-4 font-mono text-[13px] leading-relaxed space-y-0.5">
                  <p className="text-xs text-text-muted font-semibold mb-2 font-sans uppercase tracking-wider">Version B — Revised</p>
                  {docB.map((l, i) => <div key={i} className={`px-2 py-0.5 rounded ${lineClass(l.type)}`}>{l.text || "\u00A0"}</div>)}
                </div>
              </>
            ) : (
              <div className="bg-bg-surface border border-border rounded-lg p-4 font-mono text-[13px] leading-relaxed space-y-0.5">
                {docB.map((l, i) => (
                  <div key={i} className={`px-2 py-0.5 rounded ${lineClass(l.type)}`}>
                    {l.type === "added" && <span className="text-success mr-2">+</span>}
                    {l.type === "removed" && <span className="text-destructive mr-2">-</span>}
                    {l.text || "\u00A0"}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-bg-surface border border-border rounded-lg p-5 mb-4">
            <h3 className="font-display text-base text-foreground mb-4">Change Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                ["Total Changes", "23", "text-foreground"],
                ["Sections Modified", "Clinical Pharmacology, Dosage and Administration, Contraindications", "text-text-secondary"],
                ["Critical Changes", "3", "text-destructive font-semibold"],
                ["Formatting Changes", "7", "text-text-muted"],
                ["New Sections Added", "1 (Paediatric Use Addendum)", "text-success"],
                ["Sections Removed", "0", "text-text-muted"],
              ].map(([k, v, c]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">{k}</dt>
                  <dd className={`mt-0.5 ${c}`}>{v}</dd>
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 text-sm text-primary border border-primary/30 px-4 py-2 rounded-md hover:bg-primary-light transition-colors">
            <Download className="h-4 w-4" /> Export Comparison Report as PDF
          </button>
        </>
      )}
    </DashboardLayout>
  );
}
