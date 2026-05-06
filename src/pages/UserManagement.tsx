import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Users, UserPlus, Search, Edit2, ShieldOff, KeyRound, ShieldAlert, ShieldCheck, UserCog, UserCheck, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const DUMMY_USERS = [
  { id: "USR-001", name: "Priya Sharma", email: "priya.sharma@cdsco.gov.in", role: "Super Admin", department: "CDSCO", lastActive: "2 mins ago", status: "Active", avatar: "PS" },
  { id: "USR-002", name: "Anil Kumar", email: "anil.kumar@indiaai.gov.in", role: "Admin", department: "IndiaAI", lastActive: "1 hour ago", status: "Active", avatar: "AK" },
  { id: "USR-003", name: "Ritu Desai", email: "ritu.desai@nha.gov.in", role: "Reviewer", department: "NHA", lastActive: "Yesterday", status: "Active", avatar: "RD" },
  { id: "USR-004", name: "Sanjay Gupta", email: "sanjay.g@cdsco.gov.in", role: "Reviewer", department: "CDSCO", lastActive: "3 days ago", status: "Inactive", avatar: "SG" },
  { id: "USR-005", name: "Neha Verma", email: "neha.verma@cdsco.gov.in", role: "Viewer", department: "CDSCO", lastActive: "Never", status: "Pending", avatar: "NV" },
  { id: "USR-006", name: "Rahul Singh", email: "rahul.singh@nha.gov.in", role: "Reviewer", department: "NHA", lastActive: "5 hours ago", status: "Active", avatar: "RS" },
  { id: "USR-007", name: "Vikram Mehta", email: "vikram.m@indiaai.gov.in", role: "Admin", department: "IndiaAI", lastActive: "2 days ago", status: "Active", avatar: "VM" },
  { id: "USR-008", name: "Kavita Rao", email: "kavita.rao@cdsco.gov.in", role: "Viewer", department: "CDSCO", lastActive: "Never", status: "Pending", avatar: "KR" },
];

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const getRoleBadge = (role: string) => {
    switch(role) {
      case "Super Admin": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Admin": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Reviewer": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Viewer": return "bg-slate-100 text-slate-800 border-slate-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Inactive": return "bg-red-100 text-red-800 border-red-200";
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredUsers = DUMMY_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchDept = deptFilter === "All" || u.department === deptFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchDept && matchStatus;
  });

  return (
    <DashboardLayout title="User Management">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold font-display">Users & Roles</h1>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button><UserPlus className="mr-2 h-4 w-4"/> Invite User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation email with a secure link to set up their account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="e.g. John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@cdsco.gov.in" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <select id="role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>Reviewer</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dept">Department</Label>
                  <select id="dept" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>CDSCO</option>
                    <option>NHA</option>
                    <option>IndiaAI</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2 mt-2">
                <Label>Module Access (Overrides default role permissions)</Label>
                <div className="grid grid-cols-2 gap-2 mt-1 p-3 border rounded-md bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acc-cmd" defaultChecked />
                    <label htmlFor="acc-cmd" className="text-sm">Command Centre</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acc-drg" defaultChecked />
                    <label htmlFor="acc-drg" className="text-sm">Approved Drugs</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acc-ins" />
                    <label htmlFor="acc-ins" className="text-sm">Inspection Reports</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acc-sae" />
                    <label htmlFor="acc-sae" className="text-sm">SAE Reports</label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setIsInviteOpen(false)}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">42</h3>
            </div>
            <div className="p-3 bg-primary/10 rounded-full"><Users className="h-5 w-5 text-primary" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <h3 className="text-2xl font-bold mt-1">38</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full"><UserCheck className="h-5 w-5 text-green-600" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Admins</p>
              <h3 className="text-2xl font-bold mt-1">6</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full"><ShieldCheck className="h-5 w-5 text-purple-600" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Invites</p>
              <h3 className="text-2xl font-bold mt-1">4</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full"><UserCog className="h-5 w-5 text-yellow-600" /></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-purple-50/50 border-purple-100">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-purple-900">Super Admin</h3>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">2 Users</Badge>
            </div>
            <ul className="text-xs text-purple-700 space-y-1 list-disc pl-4 mt-3">
              <li>Full system access</li>
              <li>Manage all users & roles</li>
              <li>Configure security policies</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-blue-900">Admin</h3>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">4 Users</Badge>
            </div>
            <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4 mt-3">
              <li>Access all modules</li>
              <li>Invite Reviewers/Viewers</li>
              <li>View Audit Trail</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50 border-amber-100">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-amber-900">Reviewer</h3>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">14 Users</Badge>
            </div>
            <ul className="text-xs text-amber-700 space-y-1 list-disc pl-4 mt-3">
              <li>Approve/Reject reports</li>
              <li>Edit classification tags</li>
              <li>Export data</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-slate-50/50 border-slate-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-slate-900">Viewer</h3>
              <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-200">22 Users</Badge>
            </div>
            <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 mt-3">
              <li>Read-only access</li>
              <li>Cannot export data</li>
              <li>Assigned modules only</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border shadow-sm mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              className="flex h-10 w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Viewer">Viewer</option>
            </select>
            <select 
              className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="All">All Depts</option>
              <option value="CDSCO">CDSCO</option>
              <option value="NHA">NHA</option>
              <option value="IndiaAI">IndiaAI</option>
            </select>
            <select 
              className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12"><Checkbox /></TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell><Checkbox /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRoleBadge(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadge(user.status)}>{user.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setEditingUser(user)}>
                        <Edit2 className="mr-2 h-4 w-4" /> Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <KeyRound className="mr-2 h-4 w-4" /> Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <ShieldOff className="mr-2 h-4 w-4" /> Deactivate Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit User Profile</SheetTitle>
            <SheetDescription>
              Update role, department, and module access for {editingUser?.name}.
            </SheetDescription>
          </SheetHeader>
          {editingUser && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">{editingUser.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{editingUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{editingUser.email}</p>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <select id="edit-role" defaultValue={editingUser.role} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Reviewer</option>
                  <option>Viewer</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-dept">Department</Label>
                <select id="edit-dept" defaultValue={editingUser.department} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>CDSCO</option>
                  <option>NHA</option>
                  <option>IndiaAI</option>
                </select>
              </div>
              
              <div className="grid gap-2 mt-4">
                <Label>Module Access Override</Label>
                <div className="grid grid-cols-1 gap-3 mt-1 p-4 border rounded-md bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="e-acc-cmd" defaultChecked />
                    <label htmlFor="e-acc-cmd" className="text-sm font-medium">Command Centre</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="e-acc-drg" defaultChecked />
                    <label htmlFor="e-acc-drg" className="text-sm font-medium">Approved Drugs</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="e-acc-ins" defaultChecked={editingUser.role !== 'Viewer'} />
                    <label htmlFor="e-acc-ins" className="text-sm font-medium">Inspection Reports</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="e-acc-sae" defaultChecked={editingUser.role === 'Admin' || editingUser.role === 'Super Admin'} />
                    <label htmlFor="e-acc-sae" className="text-sm font-medium">SAE Reports</label>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <Button className="flex-1" onClick={() => setEditingUser(null)}>Save Changes</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
