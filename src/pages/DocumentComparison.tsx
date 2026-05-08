import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitCompare, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

export default function DocumentComparison() {
  const loading = useSkeletonLoader();
  const [isComparing, setIsComparing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const runComparison = () => {
    setIsComparing(true);
    setTimeout(() => {
      setIsComparing(false);
      setShowResults(true);
    }, 1500);
  };

  const handleExport = () => {
    toast("Report exported. Critical safety change flagged for senior reviewer.");
  };

  if (loading) {
    return (
      <DashboardLayout title="Document Comparison">
        <SkeletonBlock className="h-[600px] mb-6" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Document Comparison">
      <div className="text-xs text-text-muted mb-2 uppercase tracking-wider">Command Centre / Core Modules / Document Comparison</div>
      <h1 className="font-serif text-2xl font-normal text-foreground mb-2">Document Version Comparison</h1>
      <p className="text-sm text-text-muted mb-8 max-w-2xl">
        Detects substantive changes between regulatory filing versions. Classifies each change by clinical significance.
      </p>

      {/* 3-input row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1 block">Document Title</label>
          <input 
            type="text" 
            defaultValue="Rosuvastatin 10mg — Section 4.2 PK Properties" 
            className="w-full text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1 block">Version A</label>
          <select className="w-full text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            <option>Original Submission — Feb 2024</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1 block">Version B</label>
          <select className="w-full text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            <option>Revised Filing — Apr 2024</option>
          </select>
        </div>
      </div>

      {/* Two equal Cards side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Card */}
        <Card className="flex flex-col border border-border shadow-sm">
          <CardHeader className="border-b border-border pb-3 pt-4 px-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-foreground">Version A</h2>
              <Badge variant="outline">Original</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <textarea 
              readOnly
              className="w-full h-48 p-4 text-sm font-mono text-text-secondary bg-bg-muted/10 resize-none focus:outline-none"
              defaultValue={`Absorption: Cmax 3-5 hours. Bioavailability ~20%.
Distribution: 88% protein bound, mainly albumin.
Half-life: ~19 hours.
Renal Impairment: Use with caution in severe renal impairment.
Paediatric: Not established in children below 10 years.`}
            />
          </CardContent>
        </Card>

        {/* Right Card */}
        <Card className="flex flex-col border border-border shadow-sm">
          <CardHeader className="border-b border-border pb-3 pt-4 px-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-foreground">Version B</h2>
              <Badge variant="secondary">Revised</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <textarea 
              readOnly
              className="w-full h-48 p-4 text-sm font-mono text-text-secondary bg-bg-muted/10 resize-none focus:outline-none"
              defaultValue={`Absorption: Cmax 3 hours. Bioavailability ~20%.
Distribution: 90% protein bound, albumin and lipoproteins.
Half-life: ~19 hours.
Renal Impairment: Contraindicated — CrCl less than 30 mL/min.
Paediatric: Not established in children below 6 years.`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Centered Button */}
      {!showResults && (
        <div className="flex justify-center mb-8">
          <Button onClick={runComparison} disabled={isComparing} className="gap-2 px-8 py-6 text-base">
            <GitCompare className="h-5 w-5" />
            {isComparing ? "Running Comparison..." : "Run Comparison"}
          </Button>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="animate-fade-in">
          {/* Summary strip */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-bg-surface border border-border rounded-lg p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-mono text-foreground">4</span>
              <span className="text-xs text-text-muted mt-1 uppercase tracking-wider">Changes</span>
            </div>
            <div className="bg-bg-surface border border-border rounded-lg p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-mono text-amber-600">2</span>
              <span className="text-xs text-text-muted mt-1 uppercase tracking-wider">High</span>
            </div>
            <div className="bg-bg-surface border border-destructive/30 rounded-lg p-4 flex flex-col items-center justify-center bg-destructive/5">
              <span className="text-2xl font-mono text-destructive">1</span>
              <span className="text-xs text-destructive mt-1 uppercase tracking-wider">Critical</span>
            </div>
            <div className="bg-bg-surface border border-border rounded-lg p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-mono text-foreground">1</span>
              <span className="text-xs text-text-muted mt-1 uppercase tracking-wider">Medium</span>
            </div>
          </div>

          <Card className="mb-6 border border-border shadow-sm overflow-hidden">
            <CardHeader className="border-b border-border pb-4 bg-bg-surface flex flex-row items-center justify-between">
              <h2 className="font-semibold text-foreground m-0">Change Analysis Report</h2>
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2 m-0 h-8">
                <Download className="h-3.5 w-3.5" /> Export Report
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-bg-muted/30">
                    <tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium w-1/5">Section</th>
                      <th className="px-6 py-4 font-medium w-[10%]">Change</th>
                      <th className="px-6 py-4 font-medium w-[30%]">Version A</th>
                      <th className="px-6 py-4 font-medium w-[30%]">Version B</th>
                      <th className="px-6 py-4 font-medium w-[10%] text-right">Significance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">Absorption</td>
                      <td className="px-6 py-4 text-text-secondary">Modified</td>
                      <td className="px-6 py-4 font-mono text-xs text-text-muted line-through">"3-5 hours"</td>
                      <td className="px-6 py-4 font-mono text-xs text-foreground">"3 hours"</td>
                      <td className="px-6 py-4 text-right"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200">High</Badge></td>
                    </tr>
                    <tr className="border-b border-border hover:bg-bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">Distribution</td>
                      <td className="px-6 py-4 text-text-secondary">Modified</td>
                      <td className="px-6 py-4 font-mono text-xs text-text-muted line-through">"88% albumin"</td>
                      <td className="px-6 py-4 font-mono text-xs text-foreground">"90% albumin + lipoproteins"</td>
                      <td className="px-6 py-4 text-right"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200">High</Badge></td>
                    </tr>
                    <tr className="border-b border-border bg-destructive/5 hover:bg-destructive/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">Renal Impairment</td>
                      <td className="px-6 py-4 text-text-secondary">Modified</td>
                      <td className="px-6 py-4 font-mono text-xs text-text-muted line-through">"Use with caution"</td>
                      <td className="px-6 py-4 font-mono text-xs text-foreground font-medium">"Contraindicated CrCl&lt;30"</td>
                      <td className="px-6 py-4 text-right"><Badge variant="destructive">Critical</Badge></td>
                    </tr>
                    <tr className="border-b border-border last:border-0 hover:bg-bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">Paediatric</td>
                      <td className="px-6 py-4 text-text-secondary">Modified</td>
                      <td className="px-6 py-4 font-mono text-xs text-text-muted line-through">"below 10 years"</td>
                      <td className="px-6 py-4 font-mono text-xs text-foreground">"below 6 years"</td>
                      <td className="px-6 py-4 text-right"><Badge variant="outline">Medium</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Alert Row */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 font-medium leading-relaxed">
              1 safety-critical change in Renal Impairment section requires mandatory senior reviewer sign-off before filing acceptance.
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
