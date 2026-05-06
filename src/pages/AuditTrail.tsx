import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Download, Activity, Users, AlertTriangle, ChevronDown, Eye } from "lucide-react";

const DUMMY_LOGS = [
  { id: "LOG-001", timestamp: "2026-05-06 10:15:32", user: "Priya Sharma", role: "Reviewer", module: "Inspection Reports", action: "Create", ip: "103.24.45.12", status: "Success" },
  { id: "LOG-002", timestamp: "2026-05-06 10:12:11", user: "Anil Kumar", role: "Admin", module: "User Management", action: "Login", ip: "115.112.56.88", status: "Success" },
  { id: "LOG-003", timestamp: "2026-05-06 09:58:45", user: "Ritu Desai", role: "Viewer", module: "SAE Reports", action: "View", ip: "182.73.99.2", status: "Success" },
  { id: "LOG-004", timestamp: "2026-05-06 09:45:10", user: "Sanjay Gupta", role: "Reviewer", module: "Approved Drugs Registry", action: "Update", ip: "103.24.45.12", status: "Success" },
  { id: "LOG-005", timestamp: "2026-05-06 09:30:22", user: "Neha Verma", role: "Admin", module: "Settings", action: "Update", ip: "115.112.56.88", status: "Success" },
  { id: "LOG-006", timestamp: "2026-05-06 09:15:05", user: "Rahul Singh", role: "Reviewer", module: "Inspection Reports", action: "Delete", ip: "182.73.99.2", status: "Failed" },
  { id: "LOG-007", timestamp: "2026-05-06 08:55:40", user: "Anil Kumar", role: "Admin", module: "Data Sources", action: "Create", ip: "115.112.56.88", status: "Success" },
  { id: "LOG-008", timestamp: "2026-05-06 08:42:15", user: "Priya Sharma", role: "Reviewer", module: "SAE Reports", action: "View", ip: "103.24.45.12", status: "Success" },
  { id: "LOG-009", timestamp: "2026-05-06 08:30:50", user: "Ritu Desai", role: "Viewer", module: "Inspection Reports", action: "View", ip: "182.73.99.2", status: "Success" },
  { id: "LOG-010", timestamp: "2026-05-06 08:15:25", user: "Sanjay Gupta", role: "Reviewer", module: "Approved Drugs Registry", action: "Export", ip: "103.24.45.12", status: "Success" },
  { id: "LOG-011", timestamp: "2026-05-06 08:05:10", user: "Neha Verma", role: "Admin", module: "Portal Integration", action: "Update", ip: "115.112.56.88", status: "Success" },
  { id: "LOG-012", timestamp: "2026-05-06 07:50:35", user: "Rahul Singh", role: "Reviewer", module: "Inspection Reports", action: "Login", ip: "182.73.99.2", status: "Failed" },
  { id: "LOG-013", timestamp: "2026-05-06 07:40:20", user: "Anil Kumar", role: "Admin", module: "User Management", action: "Update", ip: "115.112.56.88", status: "Success" },
  { id: "LOG-014", timestamp: "2026-05-06 07:25:55", user: "Priya Sharma", role: "Reviewer", module: "SAE Reports", action: "Export", ip: "103.24.45.12", status: "Success" },
  { id: "LOG-015", timestamp: "2026-05-06 07:10:30", user: "Ritu Desai", role: "Viewer", module: "Approved Drugs Registry", action: "View", ip: "182.73.99.2", status: "Success" },
];

export default function AuditTrail() {
  const [moduleFilter, setModuleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState("25");

  const getActionColor = (action: string) => {
    switch (action) {
      case "Create": return "bg-green-100 text-green-800 border-green-200";
      case "View": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Update": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Delete": return "bg-red-100 text-red-800 border-red-200";
      case "Login": return "bg-gray-100 text-gray-800 border-gray-200";
      case "Export": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Success" ? "text-green-600" : "text-red-600 font-medium";
  };

  const filteredLogs = DUMMY_LOGS.filter(log => {
    const matchModule = moduleFilter === "All" || log.module === moduleFilter;
    const matchAction = actionFilter === "All" || log.action === actionFilter;
    return matchModule && matchAction;
  });

  return (
    <DashboardLayout title="Audit Trail">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Audit Trail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-display">System Audit Trail</h1>
        <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export CSV</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full"><Activity className="h-6 w-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Actions</p>
              <h3 className="text-2xl font-bold mt-1">312</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full"><Users className="h-6 w-6 text-green-600" /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <h3 className="text-2xl font-bold mt-1">18</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Failed Actions</p>
              <h3 className="text-2xl font-bold mt-1">4</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border shadow-sm mb-6 p-4">
        <div className="flex flex-wrap gap-4">
          <Input type="date" className="w-auto" />
          <Input type="date" className="w-auto" />
          
          <select 
            className="flex h-10 w-48 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
          >
            <option value="All">All Modules</option>
            <option value="Inspection Reports">Inspection Reports</option>
            <option value="User Management">User Management</option>
            <option value="SAE Reports">SAE Reports</option>
            <option value="Approved Drugs Registry">Approved Drugs Registry</option>
            <option value="Settings">Settings</option>
            <option value="Data Sources">Data Sources</option>
            <option value="Portal Integration">Portal Integration</option>
          </select>
          
          <select 
            className="flex h-10 w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="All">All Users</option>
            <option value="Priya Sharma">Priya Sharma</option>
            <option value="Anil Kumar">Anil Kumar</option>
            <option value="Ritu Desai">Ritu Desai</option>
            <option value="Sanjay Gupta">Sanjay Gupta</option>
          </select>

          <select 
            className="flex h-10 w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="All">All Actions</option>
            <option value="Create">Create</option>
            <option value="View">View</option>
            <option value="Update">Update</option>
            <option value="Delete">Delete</option>
            <option value="Export">Export</option>
            <option value="Login">Login</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell className="font-medium">{log.user}</TableCell>
                <TableCell className="text-muted-foreground">{log.role}</TableCell>
                <TableCell>{log.module}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getActionColor(log.action)}>{log.action}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                <TableCell className={getStatusColor(log.status)}>{log.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground px-1">
        <div>
          Showing 1 to {filteredLogs.length} of {DUMMY_LOGS.length} entries
        </div>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select 
            className="h-8 rounded-md border border-input bg-background px-2"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </DashboardLayout>
  );
}
