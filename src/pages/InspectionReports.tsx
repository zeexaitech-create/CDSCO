import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Plus, Download, Search, FileText, CheckCircle2, XCircle, AlertCircle, Eye, ArrowUpDown } from "lucide-react";

// Dummy Data
const DUMMY_REPORTS = [
  { id: "IR-2026-001", facility: "Sun Pharma Vadodara Unit 3", date: "2026-05-01", inspector: "Dr. Priya Sharma", type: "Manufacturing", status: "Approved", risk: "Low", city: "Vadodara" },
  { id: "IR-2026-002", facility: "Cipla Biotech Lab", date: "2026-05-02", inspector: "Dr. Anil Kumar", type: "Testing Lab", status: "Pending", risk: "Medium", city: "Mumbai" },
  { id: "IR-2026-003", facility: "Apollo Clinical Trial Site", date: "2026-05-03", inspector: "Dr. Ritu Desai", type: "Clinical Site", status: "Rejected", risk: "High", city: "Chennai" },
  { id: "IR-2026-004", facility: "Dr. Reddy's Lab Unit 1", date: "2026-05-04", inspector: "Dr. Sanjay Gupta", type: "Manufacturing", status: "Approved", risk: "Low", city: "Hyderabad" },
  { id: "IR-2026-005", facility: "Lupin Research Park", date: "2026-05-05", inspector: "Dr. Priya Sharma", type: "Testing Lab", status: "Approved", risk: "Low", city: "Pune" },
  { id: "IR-2026-006", facility: "Biocon Biologics", date: "2026-05-06", inspector: "Dr. Anil Kumar", type: "Manufacturing", status: "Pending", risk: "Medium", city: "Bangalore" },
  { id: "IR-2026-007", facility: "Serum Institute of India", date: "2026-05-07", inspector: "Dr. Ritu Desai", type: "Manufacturing", status: "Approved", risk: "Low", city: "Pune" },
  { id: "IR-2026-008", facility: "Zydus Cadila Plant", date: "2026-05-08", inspector: "Dr. Sanjay Gupta", type: "Manufacturing", status: "Rejected", risk: "High", city: "Ahmedabad" },
  { id: "IR-2026-009", facility: "Max Hospital Trials", date: "2026-05-09", inspector: "Dr. Priya Sharma", type: "Clinical Site", status: "Pending", risk: "Medium", city: "Delhi" },
  { id: "IR-2026-010", facility: "Glenmark Formulation", date: "2026-05-10", inspector: "Dr. Anil Kumar", type: "Manufacturing", status: "Approved", risk: "Low", city: "Nashik" },
];

export default function InspectionReports() {
  const [search, setSearch] = useState("");
  const [facilityType, setFacilityType] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const getStatusColor = (s: string) => {
    switch(s) {
      case "Approved": return "bg-green-100 text-green-800 border-green-200";
      case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (r: string) => {
    switch(r) {
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "High": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredReports = DUMMY_REPORTS.filter(r => {
    const matchSearch = r.facility.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchType = facilityType === "All" || r.type === facilityType;
    const matchStatus = status === "All" || r.status === status;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <DashboardLayout title="Inspection Reports">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Inspection Reports</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold font-display">Inspection Reports</h1>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export PDF</Button>
          <Button><Plus className="mr-2 h-4 w-4"/> New Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
              <h3 className="text-2xl font-bold mt-1">248</h3>
            </div>
            <div className="p-3 bg-primary/10 rounded-full"><FileText className="h-5 w-5 text-primary" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
              <h3 className="text-2xl font-bold mt-1">34</h3>
            </div>
            <div className="p-3 bg-amber-100 rounded-full"><AlertCircle className="h-5 w-5 text-amber-600" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Approved</p>
              <h3 className="text-2xl font-bold mt-1">198</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rejected</p>
              <h3 className="text-2xl font-bold mt-1">16</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full"><XCircle className="h-5 w-5 text-red-600" /></div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border shadow-sm mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by ID or Facility..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Input type="date" className="w-auto" />
            <select 
              className="flex h-10 w-48 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
            >
              <option value="All">All Facilities</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Testing Lab">Testing Lab</option>
              <option value="Clinical Site">Clinical Site</option>
            </select>
            <select 
              className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12"><Checkbox /></TableHead>
              <TableHead className="cursor-pointer">Report ID <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
              <TableHead className="cursor-pointer">Facility Name <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
              <TableHead className="cursor-pointer">Inspection Date <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
              <TableHead>Inspector</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => setSelectedReport(report)}>
                <TableCell onClick={(e) => e.stopPropagation()}><Checkbox /></TableCell>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell>{report.facility}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.inspector}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(report.status)}>{report.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRiskColor(report.risk)}>{report.risk}</Badge>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedReport(report)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Report Details</SheetTitle>
            <SheetDescription>
              Inspection record for {selectedReport?.facility}
            </SheetDescription>
          </SheetHeader>
          {selectedReport && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Report ID</p>
                  <p className="font-medium">{selectedReport.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={`mt-1 ${getStatusColor(selectedReport.status)}`}>{selectedReport.status}</Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Facility Name</p>
                  <p className="font-medium">{selectedReport.facility}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inspection Date</p>
                  <p className="font-medium">{selectedReport.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{selectedReport.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inspector</p>
                  <p className="font-medium">{selectedReport.inspector}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                  <Badge variant="outline" className={`mt-1 ${getRiskColor(selectedReport.risk)}`}>{selectedReport.risk}</Badge>
                </div>
              </div>
              <div className="mt-8 flex gap-2">
                <Button className="flex-1" variant="outline"><Download className="mr-2 h-4 w-4"/> Download PDF</Button>
                {selectedReport.status === 'Pending' && <Button className="flex-1"><CheckCircle2 className="mr-2 h-4 w-4"/> Approve Report</Button>}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
