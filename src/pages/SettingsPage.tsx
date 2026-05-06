import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw, AlertCircle, CheckCircle2, ShieldCheck, Settings, Bell, Network, Key, X, Eye } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function SettingsPage() {
  const [apiKeyMasked, setApiKeyMasked] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(["103.24.45.12", "115.112.56.88", "182.73.99.2"]);
  const [newIp, setNewIp] = useState("");

  const handleAddIp = () => {
    if (newIp && !ipWhitelist.includes(newIp)) {
      setIpWhitelist([...ipWhitelist, newIp]);
      setNewIp("");
    }
  };

  const handleRemoveIp = (ip: string) => {
    setIpWhitelist(ipWhitelist.filter(item => item !== ip));
  };

  return (
    <DashboardLayout title="Settings">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">System Settings</h1>
        <p className="text-muted-foreground mt-1">Manage platform configuration, integrations, and security policies.</p>
      </div>

      <Tabs defaultValue="general" className="flex flex-col md:flex-row gap-6">
        <TabsList className="flex flex-col h-auto bg-transparent w-full md:w-64 items-stretch justify-start space-y-1">
          <TabsTrigger value="general" className="justify-start px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Settings className="h-4 w-4 mr-2" /> General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="justify-start px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="justify-start px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Network className="h-4 w-4 mr-2" /> API & Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="justify-start px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <ShieldCheck className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="general" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic configuration for the CDSCO RegAI Platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="CDSCO RegAI Platform" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">System Timezone</Label>
                    <select id="timezone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <select id="language" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="en-US">English (US)</option>
                      <option value="en-IN">English (India)</option>
                      <option value="hi-IN">Hindi</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <select id="date-format" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure which system events trigger email alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email alerts for SAE reports</Label>
                    <p className="text-sm text-muted-foreground">Receive immediate email when a new Serious Adverse Event is logged.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Inspection report approvals</Label>
                    <p className="text-sm text-muted-foreground">Get notified when an inspection report changes status.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System maintenance alerts</Label>
                    <p className="text-sm text-muted-foreground">Notifications about planned downtime and platform updates.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a summary of platform activity every Monday morning.</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>API & Integrations</CardTitle>
                <CardDescription>Manage connections to external systems and your API credentials.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium border-b pb-2">Active Integrations</h3>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/50">
                    <div>
                      <p className="font-medium">CDSCO Master Portal</p>
                      <p className="text-sm text-muted-foreground">Syncs approved drugs and official alerts.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200"><CheckCircle2 className="w-3 h-3 mr-1"/> Connected</Badge>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/50">
                    <div>
                      <p className="font-medium">IndiaAI Platform</p>
                      <p className="text-sm text-muted-foreground">Provides NLP and LLM inference capabilities.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200"><CheckCircle2 className="w-3 h-3 mr-1"/> Active</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-sm font-medium">Developer API</h3>
                  
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          readOnly 
                          value={apiKeyMasked ? "••••••••••••••••••••••••••••••••" : "sk_live_cdsco_8f92j1k3l4m5n6o7p8q9r0"} 
                          className="pl-9 font-mono bg-muted"
                        />
                      </div>
                      <Button variant="outline" size="icon" onClick={() => setApiKeyMasked(!apiKeyMasked)}>
                        {apiKeyMasked ? <Eye className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input placeholder="https://your-domain.com/webhook/cdsco" />
                    <p className="text-xs text-muted-foreground">We will send POST requests to this URL when events occur.</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>Configure authentication and access control policies.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground mb-4">Automatically log out inactive users after a specified duration.</p>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[60]} max={480} min={15} step={15} className="flex-1" />
                      <span className="text-sm font-medium w-16 text-right">60 min</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication (2FA)</Label>
                      <p className="text-sm text-muted-foreground">Require all users to use an authenticator app.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label>IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground mb-2">Restrict platform access to specific IP addresses. Leave empty to allow all.</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ipWhitelist.map((ip) => (
                        <Badge key={ip} variant="secondary" className="flex items-center gap-1">
                          {ip} <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => handleRemoveIp(ip)} />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add IP address (e.g., 192.168.1.1)" 
                        value={newIp}
                        onChange={(e) => setNewIp(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddIp()}
                      />
                      <Button variant="outline" onClick={handleAddIp}>Add</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <Label>Password Policy</Label>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-4">
                      <Label className="w-48 font-normal">Minimum length</Label>
                      <Input type="number" defaultValue={12} className="w-24" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="req-num" defaultChecked />
                      <label htmlFor="req-num" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Require numbers
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="req-sym" defaultChecked />
                      <label htmlFor="req-sym" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Require symbols
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="req-case" defaultChecked />
                      <label htmlFor="req-case" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Require uppercase and lowercase letters
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  <Button>Apply Security Policies</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </DashboardLayout>
  );
}
