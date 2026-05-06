import { DashboardLayout } from "@/components/DashboardLayout";
import { Construction } from "lucide-react";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout title={title}>
      <div className="flex flex-col items-center justify-center h-96 text-text-muted">
        <Construction className="h-12 w-12 mb-3" />
        <p className="text-lg font-display">Module Under Development</p>
        <p className="text-sm mt-1">This module will be available in the next release.</p>
      </div>
    </DashboardLayout>
  );
}

export function HelpDocs() { return <PlaceholderPage title="Help & Documentation" />; }
