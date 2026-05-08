import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function DashboardLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="bg-slate-900 text-white text-xs text-center py-2 tracking-wide">
        CDSCO-IndiaAI Health Innovation Acceleration Hackathon — Stage 1 Submission | Ministry of Health and Family Welfare, Government of India
      </div>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader title={title} />
          <main className="flex-1 overflow-auto p-6 animate-fade-in-page">
            {children}
          </main>
          <AppFooter />
        </div>
      </div>
    </>
  );
}
