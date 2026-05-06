import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { CheckCircle, XCircle, AlertTriangle as WarnIcon } from "lucide-react";

type FieldStatus = "valid" | "missing" | "warning";

const fields: { name: string; status: FieldStatus; rule?: string; action?: string }[] = [
  { name: "Applicant Name", status: "valid" },
  { name: "Drug Name", status: "valid" },
  { name: "Generic Name", status: "valid" },
  { name: "Dosage Form", status: "valid" },
  { name: "Strength", status: "valid" },
  { name: "Route of Administration", status: "valid" },
  { name: "Shelf Life", status: "missing", rule: "Rule 122B of D&C Act", action: "Request shelf life data from applicant" },
  { name: "Manufacturing Site", status: "valid" },
  { name: "GMP Certificate", status: "warning", rule: "Schedule M", action: "Verify certificate validity — expiry date unclear" },
  { name: "Clinical Trial Reference", status: "valid" },
  { name: "Pharmacovigilance Plan", status: "missing", rule: "Schedule Y, Rule 122DAB", action: "Request PV plan submission within 15 days" },
  { name: "Labelling Drafts", status: "missing", rule: "Rule 96", action: "Request draft labels in Schedule D format" },
  { name: "Package Insert", status: "valid" },
  { name: "SmPC", status: "missing", rule: "CDSCO Guidance 2023", action: "SmPC in CTD Module 1.3 format required" },
  { name: "Patent Status", status: "valid" },
  { name: "Bioequivalence Data", status: "missing", rule: "Rule 122E", action: "BE study data with pivotal study report required" },
];

const duplicateData = [
  { id: "NDA-2024-0788", similarity: 91.2, patient: "Match", drug: "Match", dateRange: "Jan–Mar 2024" },
  { id: "NDA-2024-0312", similarity: 87.4, patient: "Partial", drug: "Match", dateRange: "Dec 2023–Feb 2024" },
  { id: "NDA-2023-0951", similarity: 62.1, patient: "No Match", drug: "Match", dateRange: "Sep–Nov 2023" },
  { id: "NDA-2024-0102", similarity: 44.8, patient: "No Match", drug: "Partial", dateRange: "Jan–Feb 2024" },
];

const validCount = fields.filter((f) => f.status === "valid").length;
const completeness = Math.round((validCount / fields.length) * 100);
const missingCount = fields.filter((f) => f.status === "missing").length;

export default function CompletenessClassification() {
  const loading = useSkeletonLoader();
  const [tab, setTab] = useState<"missing" | "classification" | "duplicate">("missing");
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimatedScore(Math.round(progress * completeness));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Completeness & Classification">
        <div className="flex gap-6"><SkeletonBlock className="w-72 h-[500px]" /><SkeletonBlock className="flex-1 h-[500px]" /></div>
      </DashboardLayout>
    );
  }

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <DashboardLayout title="Completeness & Classification">
      <p className="text-sm text-text-secondary mb-6">Completeness Assessment and Case Classification</p>
      <div className="flex gap-6">
        {/* Left sidebar */}
        <div className="w-72 shrink-0 bg-bg-surface border border-border rounded-lg p-5">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Field Validation Status</h3>
          <ul className="space-y-1.5">
            {fields.map((f) => (
              <li key={f.name} className="flex items-center gap-2 text-sm">
                {f.status === "valid" && <CheckCircle className="h-4 w-4 text-success shrink-0" />}
                {f.status === "missing" && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                {f.status === "warning" && <WarnIcon className="h-4 w-4 text-warning shrink-0" />}
                <span className={f.status === "valid" ? "text-text-secondary" : f.status === "missing" ? "text-destructive" : "text-warning"}>
                  {f.name}
                </span>
              </li>
            ))}
          </ul>
          {/* Circular progress */}
          <div className="mt-6 flex flex-col items-center">
            <svg className="w-32 h-32" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#EEF1F6" strokeWidth="8" />
              <circle cx="60" cy="60" r="54" fill="none" stroke={animatedScore >= 80 ? "#2E7D5E" : "#B45309"} strokeWidth="8"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 60 60)" className="transition-all duration-300" />
              <text x="60" y="60" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-2xl font-bold" style={{ fontFamily: "DM Serif Display" }}>
                {animatedScore}%
              </text>
            </svg>
            <p className="text-sm text-warning font-semibold mt-2">Application Incomplete</p>
            <p className="text-xs text-text-muted">{missingCount} Fields Missing</p>
          </div>
        </div>

        {/* Right main */}
        <div className="flex-1">
          <div className="flex border-b border-border mb-4">
            {[
              { key: "missing" as const, label: "Missing Fields Report" },
              { key: "classification" as const, label: "Case Classification" },
              { key: "duplicate" as const, label: "Duplicate Detection" },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-secondary"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "missing" && (
            <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-3">Field</th><th className="p-3">Regulation</th><th className="p-3">Recommended Action</th>
                </tr></thead>
                <tbody>
                  {fields.filter((f) => f.status !== "valid").map((f) => (
                    <tr key={f.name} className="border-b border-border last:border-0">
                      <td className="p-3 font-medium text-foreground">{f.name}</td>
                      <td className="p-3 text-text-muted font-mono text-xs">{f.rule}</td>
                      <td className="p-3 text-text-secondary">{f.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "classification" && (
            <div className="bg-bg-surface border-l-4 border-destructive rounded-lg p-6 border border-border">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Primary Classification", "DEATH"],
                  ["Secondary Classification", "POSSIBLY DRUG-RELATED"],
                  ["Severity Score", "9.2 / 10"],
                  ["WHO-UMC Causality", "Probable"],
                  ["Duplicate Detection", "No duplicate found (checked against 4,827 records)"],
                  ["Priority", "CRITICAL — Assign within 24 hours"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">{k}</dt>
                    <dd className={`text-sm font-semibold mt-0.5 ${v.includes("DEATH") || v.includes("CRITICAL") ? "text-destructive" : "text-foreground"}`}>{v}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "duplicate" && (
            <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-3">Submission ID</th><th className="p-3">Similarity</th><th className="p-3">Patient Match</th><th className="p-3">Drug Match</th><th className="p-3">Date Range</th><th className="p-3">Status</th>
                </tr></thead>
                <tbody>
                  {duplicateData.map((d) => (
                    <tr key={d.id} className="border-b border-border last:border-0">
                      <td className="p-3 font-mono text-xs text-primary">{d.id}</td>
                      <td className="p-3">{d.similarity}%</td>
                      <td className="p-3">{d.patient}</td>
                      <td className="p-3">{d.drug}</td>
                      <td className="p-3 text-text-muted">{d.dateRange}</td>
                      <td className="p-3">
                        {d.similarity > 85 ? <span className="text-xs font-semibold text-destructive">Potential Duplicate</span> : <span className="text-xs text-text-muted">Low Risk</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
