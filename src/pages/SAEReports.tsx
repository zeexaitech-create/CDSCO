import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StatusPill } from "@/components/StatusPill";
import { AlertTriangle, X } from "lucide-react";

const saeData = [
  { id: "SAE-2024-INJ-00412", drug: "Meropenem 1g", age: "58/M", event: "Death", onset: "14 Mar 2024", causality: "Probable", classification: "DEATH", status: "Critical", officer: "Dr. A. Sharma" },
  { id: "SAE-2024-TAB-00398", drug: "Metformin 500mg", age: "45/F", event: "Hospitalisation", onset: "12 Mar 2024", causality: "Possible", classification: "HOSPITALISATION", status: "In Review", officer: "Dr. R. Gupta" },
  { id: "SAE-2024-INJ-00405", drug: "Remdesivir 100mg", age: "62/M", event: "Life-threatening", onset: "10 Mar 2024", causality: "Probable", classification: "LIFE-THREATENING", status: "Critical", officer: "Dr. P. Singh" },
  { id: "SAE-2024-CAP-00391", drug: "Sitagliptin 50mg", age: "55/M", event: "Disability", onset: "09 Mar 2024", causality: "Unlikely", classification: "DISABILITY", status: "Verified", officer: "Dr. M. Patel" },
  { id: "SAE-2024-INF-00387", drug: "Infusion Pump v2", age: "34/F", event: "Hospitalisation", onset: "08 Mar 2024", causality: "Unrelated", classification: "HOSPITALISATION", status: "Verified", officer: "Dr. S. Reddy" },
  { id: "SAE-2024-TAB-00380", drug: "Amlodipine 5mg", age: "70/M", event: "Death", onset: "07 Mar 2024", causality: "Certain", classification: "DEATH", status: "Critical", officer: "Dr. A. Sharma" },
  { id: "SAE-2024-INJ-00375", drug: "Ceftriaxone 2g", age: "29/F", event: "Other Serious", onset: "06 Mar 2024", causality: "Possible", classification: "OTHER", status: "In Review", officer: "Dr. K. Nair" },
  { id: "SAE-2024-SYR-00371", drug: "Insulin Glargine", age: "52/M", event: "Hospitalisation", onset: "05 Mar 2024", causality: "Probable", classification: "HOSPITALISATION", status: "Pending", officer: "Dr. R. Gupta" },
  { id: "SAE-2024-MON-00368", drug: "SpO2 Monitor Pro", age: "41/F", event: "Life-threatening", onset: "04 Mar 2024", causality: "Possible", classification: "LIFE-THREATENING", status: "Critical", officer: "Dr. P. Singh" },
  { id: "SAE-2024-TAB-00362", drug: "Vildagliptin 100mg", age: "63/M", event: "Disability", onset: "03 Mar 2024", causality: "Unlikely", classification: "DISABILITY", status: "Verified", officer: "Dr. M. Patel" },
  { id: "SAE-2024-INJ-00355", drug: "Vancomycin 1g", age: "48/F", event: "Hospitalisation", onset: "02 Mar 2024", causality: "Probable", classification: "HOSPITALISATION", status: "In Review", officer: "Dr. S. Reddy" },
  { id: "SAE-2024-TAB-00349", drug: "Paracetamol 650mg", age: "36/M", event: "Other Serious", onset: "01 Mar 2024", causality: "Unrelated", classification: "OTHER", status: "Verified", officer: "Dr. K. Nair" },
  { id: "SAE-2024-INJ-00342", drug: "Dexamethasone 4mg", age: "57/F", event: "Death", onset: "28 Feb 2024", causality: "Possible", classification: "DEATH", status: "Critical", officer: "Dr. A. Sharma" },
  { id: "SAE-2024-CAP-00338", drug: "Oseltamivir 75mg", age: "44/M", event: "Hospitalisation", onset: "27 Feb 2024", causality: "Probable", classification: "HOSPITALISATION", status: "Pending", officer: "Dr. R. Gupta" },
  { id: "SAE-2024-INJ-00331", drug: "Rituximab 500mg", age: "51/F", event: "Life-threatening", onset: "26 Feb 2024", causality: "Certain", classification: "LIFE-THREATENING", status: "Critical", officer: "Dr. P. Singh" },
];

export default function SAEReports() {
  const loading = useSkeletonLoader();
  const [selectedSAE, setSelectedSAE] = useState<typeof saeData[0] | null>(null);

  if (loading) return <DashboardLayout title="SAE Reports"><SkeletonBlock className="h-[600px]" /></DashboardLayout>;

  const statusMap: Record<string, string> = { Critical: "flagged", "In Review": "in review", Verified: "verified", Pending: "pending" };

  return (
    <DashboardLayout title="SAE Reports">
      <div className="bg-destructive-light border border-destructive/20 rounded-lg px-4 py-2.5 mb-6 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <span className="text-sm text-destructive font-medium">14 Critical SAEs require review within 24 hours</span>
        <button className="ml-auto text-xs text-destructive font-semibold underline">View All Critical</button>
      </div>

      <div className="flex gap-6">
        <div className={`${selectedSAE ? "flex-1" : "w-full"} bg-bg-surface border border-border rounded-lg overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-wider">
                <th className="p-3">SAE ID</th><th className="p-3">Drug / Device</th><th className="p-3">Age/Sex</th>
                <th className="p-3">Event</th><th className="p-3">Onset</th><th className="p-3">Causality</th>
                <th className="p-3">AI Class.</th><th className="p-3">Status</th><th className="p-3">Officer</th>
              </tr></thead>
              <tbody>
                {saeData.map((s) => (
                  <tr key={s.id} onClick={() => setSelectedSAE(s)}
                    className="border-b border-border last:border-0 hover:bg-bg-muted/50 cursor-pointer transition-colors">
                    <td className="p-3 font-mono text-xs text-primary">{s.id}</td>
                    <td className="p-3 text-foreground">{s.drug}</td>
                    <td className="p-3 text-text-muted">{s.age}</td>
                    <td className="p-3">{s.event}</td>
                    <td className="p-3 text-text-muted text-xs">{s.onset}</td>
                    <td className="p-3 text-text-secondary">{s.causality}</td>
                    <td className="p-3 text-xs font-semibold">{s.classification}</td>
                    <td className="p-3"><StatusPill status={statusMap[s.status] || s.status} /></td>
                    <td className="p-3 text-text-muted text-xs">{s.officer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedSAE && (
          <div className="w-96 bg-bg-surface border border-border rounded-lg p-5 shrink-0 animate-fade-in-page">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base text-foreground">SAE Detail</h3>
              <button onClick={() => setSelectedSAE(null)} className="text-text-muted hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3">
              {Object.entries({
                "SAE ID": selectedSAE.id,
                "Drug / Device": selectedSAE.drug,
                "Patient": selectedSAE.age,
                "Event Type": selectedSAE.event,
                "Onset Date": selectedSAE.onset,
                "Causality": selectedSAE.causality,
                "AI Classification": selectedSAE.classification,
                "Review Status": selectedSAE.status,
                "Assigned Officer": selectedSAE.officer,
              }).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">{k}</dt>
                  <dd className="text-sm text-foreground mt-0.5">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">AI Summary</dt>
                <dd className="text-sm text-text-secondary mt-0.5">
                  Patient presented with {selectedSAE.event.toLowerCase()} following administration of {selectedSAE.drug}. 
                  WHO-UMC causality assessment: {selectedSAE.causality}. 
                  Case has been classified as {selectedSAE.classification} by the AI engine and requires immediate review.
                </dd>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
