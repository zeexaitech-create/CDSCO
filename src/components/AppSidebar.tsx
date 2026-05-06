import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, ShieldCheck, FileText, CheckSquare, GitCompare,
  AlertTriangle, ClipboardList, ScrollText, Network, Settings, HelpCircle, Landmark,
  Database, Pill, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "Overview",
    items: [
      { title: "Command Centre", path: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Data Intelligence",
    items: [
      { title: "Approved Drugs Registry", path: "/approved-drugs", icon: Pill },
      { title: "Data Sources", path: "/data-sources", icon: Database },
    ],
  },
  {
    label: "Core Modules",
    items: [
      { title: "Data Anonymisation", path: "/anonymisation", icon: ShieldCheck },
      { title: "Document Summarisation", path: "/summarisation", icon: FileText },
      { title: "Completeness & Classification", path: "/completeness", icon: CheckSquare },
      { title: "Document Comparison", path: "/comparison", icon: GitCompare },
    ],
  },
  {
    label: "Reporting",
    items: [
      { title: "SAE Reports", path: "/sae-reports", icon: AlertTriangle },
      { title: "Inspection Reports", path: "/inspection-reports", icon: ClipboardList },
      { title: "Audit Trail", path: "/audit-trail", icon: ScrollText },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "User Management", path: "/users", icon: Users },
      { title: "Portal Integration", path: "/portal-integration", icon: Network },
      { title: "Settings", path: "/settings", icon: Settings },
      { title: "Help & Documentation", path: "/help", icon: HelpCircle },
    ],
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-60 min-h-screen bg-bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <Landmark className="h-7 w-7 text-primary mb-1" />
        <h1 className="font-display text-lg text-foreground leading-tight">CDSCO RegAI</h1>
        <p className="text-[11px] text-text-muted mt-0.5">Powered by IndiaAI</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted px-2 mb-1">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150",
                        active
                          ? "bg-primary-light text-primary font-semibold border-l-[3px] border-primary -ml-px"
                          : "text-text-secondary hover:bg-bg-muted"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
