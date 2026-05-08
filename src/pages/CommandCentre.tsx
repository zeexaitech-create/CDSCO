import { DashboardLayout } from "@/components/DashboardLayout";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StatusPill } from "@/components/StatusPill";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Brain, Eye, Shield, FileText, ClipboardCheck, GitCompare } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const pipelineData = [
  { name: "New Drug Applications", value: 1842 },
  { name: "Clinical Trials", value: 1124 },
  { name: "Medical Devices", value: 876 },
  { name: "SAE Reports", value: 643 },
  { name: "Import Licenses", value: 342 },
];

const classificationData = [
  { name: "Death", value: 89, color: "#9B1C1C" },
  { name: "Disability", value: 124, color: "#B45309" },
  { name: "Hospitalisation", value: 312, color: "#1B4F8A" },
  { name: "Life-threatening", value: 67, color: "#7F1D1D" },
  { name: "Other Serious", value: 251, color: "#8A94A6" },
];

const submissions = [
  { id: "NDA-2024-0841", type: "New Drug", applicant: "PharmaCo India Pvt. Ltd.", date: "12 Apr 2024", status: "Verified", completeness: 98, drug: "Remdesivir 100mg" },
  { id: "CT-CTRI/2024/04/081", type: "Clinical Trial", applicant: "BioGen Therapeutics", date: "11 Apr 2024", status: "In Review", completeness: 74, drug: "Sitagliptin 50mg" },
  { id: "MD-2024-0156", type: "Medical Device", applicant: "MedTech Solutions", date: "10 Apr 2024", status: "Flagged", completeness: 45, drug: "Infusion Pump v2" },
  { id: "SAE-2024-INJ-00412", type: "SAE Report", applicant: "Cipla Ltd.", date: "10 Apr 2024", status: "Flagged", completeness: 92, drug: "Meropenem 1g" },
  { id: "NDA-2024-0839", type: "New Drug", applicant: "Sun Pharma", date: "09 Apr 2024", status: "Verified", completeness: 100, drug: "Amlodipine 5mg" },
  { id: "IL-2024-0223", type: "Import License", applicant: "Global Health Imports", date: "09 Apr 2024", status: "Duplicate", completeness: 88, drug: "SpO2 Monitor Pro" },
  { id: "CT-CTRI/2024/04/079", type: "Clinical Trial", applicant: "Novartis India", date: "08 Apr 2024", status: "Verified", completeness: 96, drug: "Vildagliptin 100mg" },
  { id: "SAE-2024-TAB-00398", type: "SAE Report", applicant: "Dr. Reddy's Labs", date: "08 Apr 2024", status: "In Review", completeness: 67, drug: "Metformin 500mg" },
];

function KPICard({ icon: Icon, value, decimals = 0, label, subtext, subtextColor }: {
  icon: React.ElementType; value: number; decimals?: number; label: string; subtext: string; subtextColor: string;
}) {
  const counter = useAnimatedCounter(value, 1200, decimals);
  const colorMap: Record<string, string> = {
    green: "text-success",
    amber: "text-warning",
    red: "text-destructive",
    muted: "text-text-muted",
  };
  return (
    <div ref={counter.ref} className="bg-bg-surface border border-border rounded-lg p-5 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-md bg-primary-light flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground font-display animate-count-up">
        {decimals > 0 ? counter.value.toFixed(decimals) + "%" : counter.value.toLocaleString()}
      </div>
      <p className="text-sm text-text-secondary mt-0.5">{label}</p>
      <p className={`text-xs mt-1 ${colorMap[subtextColor] || "text-text-muted"}`}>{subtext}</p>
    </div>
  );
}

export default function CommandCentre() {
  const loading = useSkeletonLoader();
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState<typeof submissions[0] | null>(null);

  if (loading) {
    return (
      <DashboardLayout title="Command Centre">
        <div className="grid grid-cols-5 gap-4 mb-6">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonBlock key={i} className="h-32" />)}
        </div>
        <div className="grid grid-cols-5 gap-4 mb-6">
          <SkeletonBlock className="col-span-3 h-72" />
          <SkeletonBlock className="col-span-2 h-72" />
        </div>
        <SkeletonBlock className="h-80" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Command Centre">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="w-full lg:w-[60%] flex flex-col space-y-4">
          <div className="font-mono text-xs uppercase text-text-muted">
            Stage 1 — AI-Driven Regulatory Workflow Automation
          </div>
          <h1 className="font-serif text-2xl font-normal text-foreground">
            Regulatory Intelligence Platform for CDSCO
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            Designed to streamline drug approval reviews, SAE monitoring, and document intelligence for CDSCO — reducing manual burden and supporting faster, consistent regulatory decisions.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">DPDP Act 2023</Badge>
            <Badge variant="outline">ICMR Guidelines</Badge>
            <Badge variant="outline">NDHM Policy</Badge>
          </div>
        </div>
        <div className="w-full lg:w-[40%] grid grid-cols-2 gap-y-8 gap-x-4">
          <div className="flex flex-col">
            <span className="text-2xl font-mono text-foreground">1,284</span>
            <span className="text-xs text-text-muted mt-1">Documents Processed</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-mono text-foreground">47,392</span>
            <span className="text-xs text-text-muted mt-1">PII Entities Redacted</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-mono text-foreground">68%</span>
            <span className="text-xs text-text-muted mt-1">Review Time Reduced</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-mono text-foreground">312</span>
            <span className="text-xs text-text-muted mt-1">SAE Cases Resolved</span>
          </div>
        </div>
      </div>

      {/* Core AI Capabilities */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-serif text-lg font-normal text-foreground">Core AI Capabilities</h2>
          <span className="text-xs text-text-muted">Four modules addressing the Stage 1 problem statement</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Card className="border-l-4 border-l-blue-600 flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <Badge variant="secondary" className="text-[10px] uppercase font-mono tracking-wider">Active — Demo Mode</Badge>
              </div>
              <h3 className="font-medium text-base text-foreground">Data Anonymisation</h3>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0 text-xs text-text-muted">
              <p className="mb-4 leading-relaxed">
                Hybrid NLP and rule-based PII detection. Pseudonymisation and irreversible anonymisation per DPDP Act 2023.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-8"
                onClick={() => navigate("/data-anonymisation")}
              >
                Open Module
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-600 flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <FileText className="h-6 w-6 text-green-600" />
                <Badge variant="secondary" className="text-[10px] uppercase font-mono tracking-wider">Active — Demo Mode</Badge>
              </div>
              <h3 className="font-medium text-base text-foreground">Document Summarisation</h3>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0 text-xs text-text-muted">
              <p className="mb-4 leading-relaxed">
                Processes SUGAM checklists, SAE narrations, and meeting transcripts into standardised reviewer-ready summaries.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-8"
                onClick={() => navigate("/document-summarisation")}
              >
                Open Module
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-600 flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <ClipboardCheck className="h-6 w-6 text-amber-600" />
                <Badge variant="secondary" className="text-[10px] uppercase font-mono tracking-wider">Active — Demo Mode</Badge>
              </div>
              <h3 className="font-medium text-base text-foreground">Completeness & Classification</h3>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0 text-xs text-text-muted">
              <p className="mb-4 leading-relaxed">
                Verifies submissions against CDSCO checklists. Classifies SAE severity — death, disability, hospitalisation. Detects duplicates.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-8"
                onClick={() => navigate("/completeness-classification")}
              >
                Open Module
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-rose-600 flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <GitCompare className="h-6 w-6 text-rose-600" />
                <Badge variant="secondary" className="text-[10px] uppercase font-mono tracking-wider">Active — Demo Mode</Badge>
              </div>
              <h3 className="font-medium text-base text-foreground">Document Comparison</h3>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0 text-xs text-text-muted">
              <p className="mb-4 leading-relaxed">
                Detects substantive changes between filing versions. Generates structured change reports with clinical significance rating.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-8"
                onClick={() => navigate("/document-comparison")}
              >
                Open Module
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-bg-muted/40 border border-border rounded-lg p-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 shrink-0" size={14} />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">DPDP Act 2023</span>
                <span className="text-xs text-text-muted">Data protection standard</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 shrink-0" size={14} />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">ICMR Guidelines</span>
                <span className="text-xs text-text-muted">Clinical ethics framework</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 shrink-0" size={14} />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">NDHM Health Data Policy</span>
                <span className="text-xs text-text-muted">Health interoperability</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 shrink-0" size={14} />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">CDSCO Standards</span>
                <span className="text-xs text-text-muted">Regulatory compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <KPICard icon={TrendingUp} value={4827} label="Submissions This Quarter" subtext="+12.4% vs last quarter" subtextColor="green" />
        <KPICard icon={Clock} value={342} label="Awaiting AI Assessment" subtext="Avg wait: 2.1 days" subtextColor="amber" />
        <KPICard icon={CheckCircle} value={3941} label="Cleared for Approval" subtext="81.6% clearance rate" subtextColor="green" />
        <KPICard icon={AlertTriangle} value={89} label="Serious Adverse Events" subtext="14 require urgent review" subtextColor="red" />
        <KPICard icon={Brain} value={94.7} decimals={1} label="Model Confidence Score" subtext="Based on last 1,000 reviews" subtextColor="muted" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="col-span-3 bg-bg-surface border border-border rounded-lg p-5">
          <h3 className="font-display text-base mb-4 text-foreground">Submission Pipeline</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pipelineData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: "#8A94A6" }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#4A5568" }} width={140} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #D6DCE8", borderRadius: 6 }} />
              <Bar dataKey="value" fill="#1B4F8A" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 bg-bg-surface border border-border rounded-lg p-5">
          <h3 className="font-display text-base mb-4 text-foreground">Case Classification Breakdown</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={classificationData} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                {classificationData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #D6DCE8", borderRadius: 6 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-bg-surface border border-border rounded-lg p-5">
        <h3 className="font-display text-base mb-4 text-foreground">Recent Submissions Feed</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Submission ID</th>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Applicant</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">AI Status</th>
                <th className="pb-3 pr-4">Completeness</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-bg-muted/50 transition-colors">
                  <td className="py-3 pr-4 font-mono text-xs text-primary">{s.id}</td>
                  <td className="py-3 pr-4 text-text-secondary">{s.type}</td>
                  <td className="py-3 pr-4 text-foreground">{s.applicant}</td>
                  <td className="py-3 pr-4 text-text-muted text-xs">{s.date}</td>
                  <td className="py-3 pr-4"><StatusPill status={s.status} pulse /></td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-fill-bar" style={{ width: `${s.completeness}%` }} />
                      </div>
                      <span className="text-xs text-text-muted w-8">{s.completeness}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <button 
                      onClick={() => setSelectedSubmission(s)}
                      className="flex items-center gap-1 text-xs text-primary border border-primary/30 px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95 font-medium"
                    >
                      <Eye className="h-3 w-3" /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="font-display text-2xl flex items-center gap-2">
              <span className="text-primary">Submission Review</span>
            </SheetTitle>
            <SheetDescription className="text-sm">
              Detailed analysis and validation report for {selectedSubmission?.id}
            </SheetDescription>
          </SheetHeader>
          
          {selectedSubmission && (
            <div className="mt-6 space-y-6">
              <div className="bg-bg-muted/30 p-4 rounded-xl border border-border/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">Applicant</h4>
                    <p className="text-lg font-medium text-foreground">{selectedSubmission.applicant}</p>
                  </div>
                  <StatusPill status={selectedSubmission.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase mb-1">Drug/Product</h4>
                    <p className="text-sm font-medium text-foreground">{selectedSubmission.drug}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase mb-1">Submission Type</h4>
                    <p className="text-sm font-medium text-foreground">{selectedSubmission.type}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase mb-1">Date Submitted</h4>
                    <p className="text-sm font-medium text-foreground">{selectedSubmission.date}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase mb-1">AI Completeness</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-1.5 bg-bg-muted rounded-full overflow-hidden w-24">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${selectedSubmission.completeness}%` }} />
                      </div>
                      <span className="text-xs text-text-muted font-medium">{selectedSubmission.completeness}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg text-foreground border-b border-border pb-2">AI Analysis Summary</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  The RegAI model has analyzed this submission for regulatory compliance, data integrity, and completeness. The overall confidence score is high. Minor anomalies detected in section 3.2.P (Impurities) have been flagged for manual verification.
                </p>
                
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Dossier format validated against eCTD requirements.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Clinical trial data consistency check passed.</span>
                  </li>
                  {selectedSubmission.status !== "Verified" && (
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                      <span>Missing signatures on Form 44 annexures.</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-3 pt-6 border-t border-border">
                <button 
                  onClick={() => {
                    toast.success(`Application ${selectedSubmission.id} Approved successfully!`);
                    setSelectedSubmission(null);
                  }}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Approve Application
                </button>
                <button 
                  onClick={() => {
                    toast.info(`Requesting more info for ${selectedSubmission.id}`);
                    setSelectedSubmission(null);
                  }}
                  className="flex-1 bg-white border border-border text-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-bg-muted transition-colors shadow-sm"
                >
                  Request Information
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </DashboardLayout>
  );
}
