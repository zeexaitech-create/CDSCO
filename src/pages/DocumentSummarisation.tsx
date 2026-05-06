import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { Upload, FileText, ChevronDown, ChevronUp } from "lucide-react";

const summaryFields = [
  ["Document Type", "Serious Adverse Event Report"],
  ["Reference ID", "SAE-2024-INJ-00412"],
  ["Drug / Device", "Meropenem 1g Injection"],
  ["Applicant", "PharmaCo India Pvt. Ltd."],
  ["Event Classification", "Death — Possibly Related"],
  ["Event Onset Date", "14 March 2024"],
  ["Patient Profile", "58-year-old male, known diabetic"],
  ["Summary Narrative", "Patient received Meropenem 1g IV for nosocomial pneumonia. Acute anaphylactic shock developed within 15 minutes of first dose, presenting with severe hypotension and bronchospasm. Despite emergency intervention including adrenaline and corticosteroids, patient expired 48 hours later in ICU."],
  ["Key Concerns", "Dosage inconsistency, delayed reporting (7 days)"],
  ["Recommended Action", "Escalate for Expert Committee Review"],
  ["AI Confidence", "91.2%"],
];

const traceability = [
  { section: "Patient Demographics", text: "Patient Name: Rajesh Kumar Sharma, Age: 58 years, Gender: Male..." },
  { section: "Drug Administration", text: "Drug Administered: Meropenem 1g IV Injection, Route: Intravenous..." },
  { section: "Adverse Event Description", text: "Patient developed acute anaphylactic shock within 15 minutes..." },
  { section: "Clinical Outcome", text: "Patient expired on 16 March 2024 at 03:42 AM IST..." },
];

export default function DocumentSummarisation() {
  const loading = useSkeletonLoader();
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [summaryLength, setSummaryLength] = useState("Standard");
  const [outputFormat, setOutputFormat] = useState("Structured Fields");
  const [domain, setDomain] = useState("SAE Narrative");
  const [expandedTrace, setExpandedTrace] = useState<number | null>(null);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerated(true); setGenerating(false); }, 1500);
  };

  if (loading) {
    return <DashboardLayout title="Document Summarisation"><SkeletonBlock className="h-96" /></DashboardLayout>;
  }

  return (
    <DashboardLayout title="Document Summarisation">
      <p className="text-sm text-text-secondary mb-6">
        Regulatory document compression with standardised structured output
      </p>

      {/* Upload */}
      <div className="bg-bg-surface border border-border rounded-lg p-5 mb-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
          <Upload className="h-8 w-8 text-text-muted mx-auto mb-2" />
          <p className="text-sm text-text-secondary">Drag and drop or click to upload (PDF, DOCX, TXT)</p>
        </div>
        <button
          onClick={generate}
          className="bg-bg-muted text-text-secondary px-4 py-2 rounded-md text-sm font-medium hover:bg-border transition-colors"
        >
          <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
          Load Demo Document
        </button>
      </div>

      {/* Settings */}
      <div className="bg-bg-surface border border-border rounded-lg p-5 mb-6">
        <div className="flex gap-6 items-center flex-wrap">
          <div>
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Summary Length</label>
            <div className="flex border border-border rounded-md overflow-hidden">
              {["Short", "Standard", "Detailed"].map((o) => (
                <button key={o} onClick={() => setSummaryLength(o)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${summaryLength === o ? "bg-primary text-primary-foreground" : "bg-bg-surface text-text-secondary hover:bg-bg-muted"}`}
                >{o}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Output Format</label>
            <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}
              className="text-sm border border-border rounded-md px-3 py-1.5 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Structured Fields</option>
              <option>Narrative Paragraph</option>
              <option>Both</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Domain Focus</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)}
              className="text-sm border border-border rounded-md px-3 py-1.5 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option>SAE Narrative</option>
              <option>Clinical Efficacy</option>
              <option>Device Safety</option>
              <option>Import Application</option>
            </select>
          </div>
          <div className="ml-auto">
            <button onClick={generate} disabled={generating}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
              {generating ? "Generating…" : "Generate Summary"}
            </button>
          </div>
        </div>
      </div>

      {/* Output */}
      {generated && (
        <>
          <div className="bg-bg-surface border border-border rounded-lg p-6 mb-6">
            <h3 className="font-display text-base text-foreground mb-4">AI-Generated Regulatory Summary</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {summaryFields.map(([key, val]) => (
                <div key={key} className={key === "Summary Narrative" ? "col-span-2" : ""}>
                  <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">{key}</dt>
                  <dd className={`text-sm mt-0.5 ${key === "Event Classification" ? "text-destructive font-semibold" : key === "AI Confidence" ? "text-success font-bold" : "text-foreground"}`}>{val}</dd>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-surface border border-border rounded-lg p-5">
            <h3 className="font-display text-base text-foreground mb-4">Source Traceability</h3>
            <div className="space-y-2">
              {traceability.map((t, i) => (
                <div key={i} className="border border-border rounded-md">
                  <button onClick={() => setExpandedTrace(expandedTrace === i ? null : i)}
                    className="w-full flex items-center justify-between p-3 text-sm font-medium text-text-secondary hover:bg-bg-muted transition-colors">
                    {t.section}
                    {expandedTrace === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {expandedTrace === i && (
                    <div className="px-3 pb-3 text-xs text-text-muted font-mono">{t.text}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
