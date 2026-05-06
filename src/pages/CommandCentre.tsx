import { DashboardLayout } from "@/components/DashboardLayout";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { StatusPill } from "@/components/StatusPill";
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Brain, Eye } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

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
                    <button className="flex items-center gap-1 text-xs text-primary border border-primary/30 px-3 py-1 rounded-md hover:bg-primary-light transition-colors">
                      <Eye className="h-3 w-3" /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
