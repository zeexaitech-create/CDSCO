import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ClipboardCheck, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function CompletenessClassification() {
  const loading = useSkeletonLoader();
  const [isAssessing, setIsAssessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const [isClassifying, setIsClassifying] = useState(false);
  const [showClassify, setShowClassify] = useState(false);

  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [investigateDialogOpen, setInvestigateDialogOpen] = useState(false);

  const runAssessment = () => {
    setIsAssessing(true);
    setTimeout(() => {
      setIsAssessing(false);
      setShowResults(true);
    }, 1000);
  };

  const runClassification = () => {
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
      setShowClassify(true);
    }, 1000);
  };

  if (loading) {
    return (
      <DashboardLayout title="Completeness & Classification">
        <SkeletonBlock className="h-[600px] mb-6" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Completeness & Classification">
      <div className="text-xs text-text-muted mb-2 uppercase tracking-wider">Completeness Assessment and Case Classification</div>
      <h1 className="font-serif text-2xl font-normal text-foreground mb-2">Completeness Assessment and Case Classification</h1>
      <p className="text-sm text-text-muted mb-8 max-w-2xl">
        Verifies submissions against CDSCO checklists. Classifies SAE severity. Detects duplicate case submissions.
      </p>

      {/* 3-input row */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <select className="flex-1 text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
          <option>New Drug Application (NDA)</option>
          <option>Clinical Trial Application</option>
        </select>
        <input 
          type="text" 
          defaultValue="NDA-2024-0847" 
          className="flex-1 text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button onClick={runAssessment} disabled={isAssessing} className="flex-1 gap-2">
          <ClipboardCheck className="h-4 w-4" />
          {isAssessing ? "Running Assessment..." : "Run Assessment"}
        </Button>
      </div>

      {showResults && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* LEFT CARD */}
            <Card className="flex flex-col border border-border shadow-sm">
              <CardHeader className="border-b border-border pb-4 mb-4">
                <h2 className="font-semibold text-foreground">Completeness Assessment NDA-2024-0847</h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-mono text-foreground">84/100</span>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Conditional Review</Badge>
                  </div>
                </div>
                
                <div className="w-full bg-bg-muted rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Administrative", score: 100, label: "Complete", color: "green" },
                    { name: "Drug Substance", score: 100, label: "Complete", color: "green" },
                    { name: "Drug Product", score: 72, label: "Incomplete", color: "amber" },
                    { name: "Clinical Data", score: 95, label: "Complete", color: "green" },
                    { name: "Risk Management", score: 90, label: "Complete", color: "green" },
                  ].map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-text-muted">{s.score}% <Badge variant={s.color === "green" ? "secondary" : "outline"} className={s.color === "green" ? "bg-green-100 text-green-800 border-transparent hover:bg-green-200 ml-2" : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 ml-2"}>{s.label}</Badge></span>
                      </div>
                      <div className="w-full bg-bg-muted rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${s.color === "green" ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${s.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Missing Items</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <div className="flex-1 flex justify-between items-start gap-2">
                        <span className="text-foreground leading-tight">Form 12 — Manufacturing Licence</span>
                        <Badge variant="destructive" className="shrink-0 text-[10px]">Mandatory</Badge>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <div className="flex-1 flex justify-between items-start gap-2">
                        <span className="text-foreground leading-tight">Section 3.2.P.8.3 — Stability Commitments</span>
                        <Badge variant="destructive" className="shrink-0 text-[10px]">Mandatory</Badge>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <div className="flex-1 flex justify-between items-start gap-2">
                        <span className="text-foreground leading-tight">Section 3.2.P.5.6 — Dissolution Data Month 24</span>
                        <Badge variant="outline" className="shrink-0 text-[10px]">Conditional</Badge>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-border">
                  <Button className="flex-1 text-xs" onClick={() => setReportDialogOpen(true)}>Generate Report</Button>
                  <Button variant="outline" className="flex-1 text-xs" onClick={() => setFlagDialogOpen(true)}>Flag for Review</Button>
                </div>
              </CardContent>
            </Card>

            {/* RIGHT CARD */}
            <Card className="flex flex-col border border-border shadow-sm">
              <CardHeader className="border-b border-border pb-4 mb-4">
                <h2 className="font-semibold text-foreground">SAE Severity Classification</h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    defaultValue="SAE-2024-MH-1847" 
                    className="flex-1 text-sm border border-border rounded-md px-3 py-2 bg-bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button onClick={runClassification} disabled={isClassifying} variant="secondary">
                    {isClassifying ? "..." : "Classify"}
                  </Button>
                </div>

                {showClassify && (
                  <div className="flex flex-col gap-6 animate-fade-in flex-1">
                    <div className="flex flex-col items-center justify-center py-8 bg-bg-muted/50 rounded-lg border border-border">
                      <span className="text-2xl font-mono text-foreground mb-3">Hospitalisation</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200">Non-Fatal</Badge>
                    </div>

                    <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> <span className="text-foreground">Death</span></div>
                        <Badge variant="outline" className="text-text-muted">Not Applicable</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> <span className="text-foreground">Permanent Disability</span></div>
                        <Badge variant="outline" className="text-text-muted">Not Applicable</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-500" /> <span className="text-foreground font-medium">Hospitalisation</span></div>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">Confirmed</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-amber-500" /> <span className="text-foreground">Other Serious</span></div>
                        <Badge variant="outline" className="text-amber-700 border-amber-200">Concomitant Noted</Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-bg-muted/30 p-3 rounded-md border border-border">
                      <div className="text-xs"><span className="text-text-muted">Causality:</span> <span className="font-medium text-foreground">Probable WHO-UMC</span></div>
                      <div className="text-xs"><span className="text-text-muted">Score:</span> <span className="font-medium text-foreground">7.2/10</span></div>
                      <div className="text-xs"><span className="text-text-muted">Date:</span> <span className="font-medium text-foreground">22-Apr-2024</span></div>
                    </div>

                    <Button className="w-full mt-auto" onClick={() => toast.success("Case classified and submitted.")}>
                      Submit to Review Queue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 border border-border shadow-sm">
            <CardHeader className="border-b border-border pb-4 mb-0">
              <h2 className="font-semibold text-foreground">Duplicate Detection — Last 90 Days</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-bg-muted/30">
                    <tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">Case Pair</th>
                      <th className="px-6 py-4 font-medium">Similarity</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border last:border-0 hover:bg-bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-mono text-xs">MH-1847 vs MH-1831</td>
                      <td className="px-6 py-4 text-text-secondary">23%</td>
                      <td className="px-6 py-4"><Badge className="bg-green-100 text-green-800 hover:bg-green-200 border border-green-200">No Duplicate</Badge></td>
                      <td className="px-6 py-4 text-right">—</td>
                    </tr>
                    <tr className="border-b border-border last:border-0 hover:bg-bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-mono text-xs">DL-0923 vs DL-0891</td>
                      <td className="px-6 py-4 text-text-secondary">87%</td>
                      <td className="px-6 py-4"><Badge variant="destructive">Review Required</Badge></td>
                      <td className="px-6 py-4 text-right"><Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setInvestigateDialogOpen(true)}>Investigate</Button></td>
                    </tr>
                    <tr className="border-b border-border last:border-0 hover:bg-bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-mono text-xs">KA-0445 vs KA-0431</td>
                      <td className="px-6 py-4 text-text-secondary">41%</td>
                      <td className="px-6 py-4"><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200">Low Probability</Badge></td>
                      <td className="px-6 py-4 text-right">—</td>
                    </tr>
                    <tr className="border-b border-border last:border-0 hover:bg-bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-foreground font-mono text-xs">MH-1902 vs MH-1847</td>
                      <td className="px-6 py-4 text-text-secondary">19%</td>
                      <td className="px-6 py-4"><Badge className="bg-green-100 text-green-800 hover:bg-green-200 border border-green-200">No Duplicate</Badge></td>
                      <td className="px-6 py-4 text-right">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialogs */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Completeness Report</DialogTitle>
            <DialogDescription>
              This will compile the automated assessment into a formal PDF report.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="text-success h-4 w-4" /> Administrative Checks
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="text-success h-4 w-4" /> Technical Data Validation
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="text-destructive h-4 w-4" /> Missing Mandatories (2)
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Completeness report generated for NDA-2024-0847");
              setReportDialogOpen(false);
            }}>Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flag Application for Senior Review</DialogTitle>
            <DialogDescription>
              Assign this application to a senior reviewer due to missing mandatory items.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Reviewer Notes</label>
            <textarea className="w-full text-sm border border-border rounded-md p-3 bg-bg-surface resize-none focus:outline-none focus:ring-1 focus:ring-primary h-24" placeholder="Enter reason for escalation..." defaultValue="Missing Form 12 and Stability Commitments. Requires regulatory exception or RFI." />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFlagDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Flagged and assigned to senior reviewer.");
              setFlagDialogOpen(false);
            }}>Confirm Escalation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={investigateDialogOpen} onOpenChange={setInvestigateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Investigate Potential Duplicate</DialogTitle>
            <DialogDescription>
              Comparing DL-0923 with DL-0891 (87% Similarity)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 grid grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4 bg-bg-muted/30">
              <h4 className="font-semibold text-sm mb-2 border-b border-border pb-2">DL-0923 (Current)</h4>
              <ul className="text-xs space-y-2 text-text-secondary">
                <li><span className="font-semibold">Patient:</span> Anil Kumar</li>
                <li><span className="font-semibold">Event Date:</span> 12 Feb 2024</li>
                <li><span className="font-semibold">Drug:</span> Aspirin 75mg</li>
                <li><span className="font-semibold">Reporter:</span> Dr. S. Patel</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-4 bg-bg-muted/30">
              <h4 className="font-semibold text-sm mb-2 border-b border-border pb-2">DL-0891 (Existing)</h4>
              <ul className="text-xs space-y-2 text-text-secondary">
                <li><span className="font-semibold">Patient:</span> Anil K.</li>
                <li><span className="font-semibold">Event Date:</span> 11 Feb 2024</li>
                <li><span className="font-semibold">Drug:</span> Ecosprin 75mg</li>
                <li><span className="font-semibold">Reporter:</span> Dr. Sunil Patel</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvestigateDialogOpen(false)}>Close</Button>
            <Button variant="destructive" onClick={() => {
              toast("Marked as duplicate. Merging cases.");
              setInvestigateDialogOpen(false);
            }}>Merge Cases</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}
