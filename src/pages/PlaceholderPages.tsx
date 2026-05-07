import { DashboardLayout } from "@/components/DashboardLayout";
import { BookOpen, FileText, Video, LifeBuoy, ChevronRight, Search } from "lucide-react";

const helpCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    description: "Learn the basics of the CDSCO RegAI platform and navigation.",
    articles: ["Platform Overview", "Setting up your profile", "Understanding the Dashboard"]
  },
  {
    title: "Module Guides",
    icon: FileText,
    description: "Detailed instructions for each AI-powered module.",
    articles: ["Using Document Summarisation", "Completeness Checks Guide", "SAE Report Workflows"]
  },
  {
    title: "Video Tutorials",
    icon: Video,
    description: "Step-by-step visual guides for common tasks.",
    articles: ["How to review a New Drug Application", "Data Anonymisation Demo"]
  },
  {
    title: "Support & FAQs",
    icon: LifeBuoy,
    description: "Get help with technical issues and common questions.",
    articles: ["Resetting your password", "API Integration Setup", "Contact Helpdesk"]
  }
];

export function HelpDocs() { 
  return (
    <DashboardLayout title="Help & Documentation">
      <div className="max-w-5xl mx-auto">
        <div className="bg-primary/5 rounded-2xl p-8 mb-8 text-center border border-primary/10">
          <h2 className="text-2xl font-display text-foreground mb-3">How can we help you today?</h2>
          <div className="max-w-md mx-auto relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, and more..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-bg-surface border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
                    <p className="text-sm text-text-secondary">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
                  {category.articles.map((article, i) => (
                    <button key={i} className="w-full flex items-center justify-between text-left text-sm text-text-secondary hover:text-primary py-1.5 transition-colors group">
                      <span>{article}</span>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                  <button className="text-sm text-primary font-medium mt-2 pt-2 inline-block">
                    View all articles &rarr;
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-8 bg-white border border-border rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-1">Still need help?</h3>
            <p className="text-sm text-text-secondary">Our technical support team is available 24/7.</p>
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
            Contact Support
          </button>
        </div>
      </div>
    </DashboardLayout>
  ); 
}
