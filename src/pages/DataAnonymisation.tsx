import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { ShieldCheck, CheckCircle } from "lucide-react";

const sourceText = `SERIOUS ADVERSE EVENT REPORT — CONFIDENTIAL

Patient Name: Rajesh Kumar Sharma
Age: 58 years | Gender: Male
Aadhaar Number: 4832 7291 6845
Mobile: +91 98765 43210
Hospital: All India Institute of Medical Sciences (AIIMS), New Delhi
Treating Physician: Dr. Priya Venkatesh

Drug Administered: Meropenem 1g IV Injection
Route: Intravenous | Frequency: Every 8 hours
Indication: Nosocomial pneumonia with suspected MDR gram-negative infection

Adverse Event: Patient developed acute anaphylactic shock within 15 minutes of first dose administration on 14 March 2024. Patient experienced severe hypotension (BP 60/40 mmHg), bronchospasm, and urticaria.

Emergency intervention included IV Adrenaline 0.5mg, IV Hydrocortisone 200mg, and Chlorpheniramine 10mg. Patient was shifted to ICU.

Patient had a known history of Type 2 Diabetes Mellitus, Hypertension, and previous mild allergic reaction to Amoxicillin (documented in 2019).

Outcome: Patient expired on 16 March 2024 at 03:42 AM IST despite aggressive resuscitation efforts.

Report filed by: Dr. Priya Venkatesh, Department of Internal Medicine, AIIMS New Delhi.
Date of Report: 21 March 2024 (7 days post-event)`;

const anonymisedText = `SERIOUS ADVERSE EVENT REPORT — CONFIDENTIAL

Patient Name: [PATIENT_NAME]
Age: [AGE] years | Gender: [GENDER]
Aadhaar Number: [AADHAAR_REDACTED]
Mobile: [PHONE_REDACTED]
Hospital: [INSTITUTION_ID_204]
Treating Physician: [PHYSICIAN_NAME]

Drug Administered: Meropenem 1g IV Injection
Route: Intravenous | Frequency: Every 8 hours
Indication: Nosocomial pneumonia with suspected MDR gram-negative infection

Adverse Event: Patient developed acute anaphylactic shock within 15 minutes of first dose administration on [DATE_REDACTED]. Patient experienced severe hypotension (BP 60/40 mmHg), bronchospasm, and urticaria.

Emergency intervention included IV Adrenaline 0.5mg, IV Hydrocortisone 200mg, and Chlorpheniramine 10mg. Patient was shifted to ICU.

Patient had a known history of Type 2 Diabetes Mellitus, Hypertension, and previous mild allergic reaction to Amoxicillin (documented in [DATE_REDACTED]).

Outcome: Patient expired on [DATE_REDACTED] at [TIME_REDACTED] despite aggressive resuscitation efforts.

Report filed by: [PHYSICIAN_NAME], Department of Internal Medicine, [INSTITUTION_ID_204].
Date of Report: [DATE_REDACTED] (7 days post-event)`;

const piiEntities = [
  { type: "Patient Name", count: 1, color: "bg-destructive-light text-destructive" },
  { type: "Physician Name", count: 2, color: "bg-destructive-light text-destructive" },
  { type: "Phone Number", count: 1, color: "bg-warning-light text-warning" },
  { type: "Aadhaar", count: 1, color: "bg-warning-light text-warning" },
  { type: "Date of Birth", count: 1, color: "bg-primary-light text-primary" },
  { type: "Institution Name", count: 2, color: "bg-destructive-light text-destructive" },
  { type: "Dates", count: 4, color: "bg-primary-light text-primary" },
];

const complianceBadges = [
  { title: "DPDP Act 2023", status: "Compliant" },
  { title: "NDHM Framework", status: "Verified" },
  { title: "ICMR Data Guidelines", status: "Verified" },
];

export default function DataAnonymisation() {
  const loading = useSkeletonLoader();
  const [output, setOutput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [docType, setDocType] = useState("SAE Narrative");

  const runAnonymisation = () => {
    setProcessing(true);
    setOutput("");
    setTimeout(() => {
      setOutput(anonymisedText);
      setProcessing(false);
    }, 1500);
  };

  if (loading) {
    return (
      <DashboardLayout title="Data Anonymisation">
        <SkeletonBlock className="h-8 w-96 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <SkeletonBlock className="h-96" />
          <SkeletonBlock className="h-96" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Data Anonymisation">
      <p className="text-sm text-text-secondary mb-6">
        PII/PHI Detection and Redaction — Compliant with DPDP Act 2023, NDHM, and ICMR Guidelines
      </p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Input */}
        <div className="bg-bg-surface border border-border rounded-lg p-5">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 block">Source Document</label>
          <textarea
            className="w-full h-80 font-mono text-[13px] bg-bg-muted border border-border rounded-md p-4 text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            value={sourceText}
            readOnly
          />
          <div className="mt-3 flex gap-3">
            <select
              className="flex-1 text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option>SAE Narrative</option>
              <option>Clinical Trial Report</option>
              <option>Drug Application</option>
              <option>Inspection Report</option>
              <option>Patient Consent Form</option>
            </select>
          </div>
          <button
            onClick={runAnonymisation}
            disabled={processing}
            className="mt-3 w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {processing ? "Processing…" : "Run Anonymisation"}
          </button>
        </div>

        {/* Output */}
        <div className="bg-bg-surface border border-border rounded-lg p-5">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 block">Anonymised Output</label>
          <textarea
            className="w-full h-80 font-mono text-[13px] bg-bg-muted border border-border rounded-md p-4 text-foreground resize-none focus:outline-none"
            value={processing ? "Running PII detection engine…" : output}
            readOnly
          />
          {output && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Detected PII Entities</p>
              <div className="flex flex-wrap gap-2">
                {piiEntities.map((e) => (
                  <span key={e.type} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${e.color}`}>
                    {e.type} ({e.count})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compliance Badges */}
      <div className="grid grid-cols-3 gap-4">
        {complianceBadges.map((b) => (
          <div key={b.title} className="bg-bg-surface border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-success-light flex items-center justify-center">
              {b.status === "Compliant" ? <ShieldCheck className="h-5 w-5 text-success" /> : <CheckCircle className="h-5 w-5 text-success" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{b.title}</p>
              <p className="text-xs font-bold text-success">{b.status}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
