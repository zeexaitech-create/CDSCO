import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { SkeletonBlock } from "@/components/SkeletonBlock";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  APPROVED_DRUGS,
  CDSCO_SOURCE_URL,
  DRUG_CATEGORY_LABEL,
  DrugCategory,
  ApprovedDrug,
} from "@/data/cdscoApprovedDrugs";
import { Search, ExternalLink, Download, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";

const YEARS = ["2026", "2025", "2024"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const categoryColor: Record<DrugCategory, string> = {
  BIO: "bg-accent-blue text-primary-foreground",
  SND: "bg-accent-blue-light text-primary",
  NCE: "bg-success text-primary-foreground",
  FDC: "bg-warning text-primary-foreground",
  RDNA: "bg-primary text-primary-foreground",
  VAC: "bg-destructive text-primary-foreground",
};

function exportCSV(rows: ApprovedDrug[]) {
  const headers = ["ID","Category","Name","Approval Date","Type","Composition","Dosage","Indication","Manufacturer","Manufacturing Site","Source"];
  const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
  const csv = [headers.join(","), ...rows.map(r => [
    r.id, r.category, r.name, r.approvalDate, r.type, r.composition, r.dosage, r.indication, r.manufacturer, r.manufacturingSite, r.sourceUrl,
  ].map(escape).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `cdsco-approved-drugs-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

export default function ApprovedDrugs() {
  const loading = useSkeletonLoader();
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("Apr");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(APPROVED_DRUGS[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return APPROVED_DRUGS.filter(d => {
      if (!q) return true;
      return [d.name, d.manufacturer, d.indication, d.composition].some(f => f.toLowerCase().includes(q));
    });
  }, [query]);

  if (loading) {
    return (
      <DashboardLayout title="Approved Drugs Registry">
        <SkeletonBlock className="h-[600px]" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Approved Drugs Registry">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <p className="text-sm text-text-secondary">
            CDSCO Approved Drugs — ingested from the public registry. Every record links back to its source on cdscoonline.gov.in.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <ProvenanceChip variant="live" source="CDSCO Public Registry" href={CDSCO_SOURCE_URL} pulse />
            <span className="text-[11px] text-text-muted">Snapshot: April 2026 · {APPROVED_DRUGS.length} records</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => exportCSV(filtered)}>
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={CDSCO_SOURCE_URL} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="h-3.5 w-3.5" /> View on CDSCO
            </a>
          </Button>
        </div>
      </div>

      {/* Filter bar mirroring the CDSCO portal UX */}
      <div className="bg-bg-surface border border-border rounded-lg p-4 mb-4 grid grid-cols-12 gap-3 items-end">
        <div className="col-span-2">
          <label className="block text-[11px] text-text-muted mb-1">Select Year</label>
          <select value={year} onChange={e => setYear(e.target.value)}
            className="w-full h-9 rounded-md border border-border bg-background px-2 text-sm">
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] text-text-muted mb-1">Select Month</label>
          <select value={month} onChange={e => setMonth(e.target.value)}
            className="w-full h-9 rounded-md border border-border bg-background px-2 text-sm">
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="col-span-6">
          <label className="block text-[11px] text-text-muted mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
            <Input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by drug, manufacturer, indication…" className="pl-8 h-9" />
          </div>
        </div>
        <div className="col-span-2 flex gap-2">
          <Button size="sm" className="flex-1"><Search className="h-3.5 w-3.5" /> Search</Button>
          <Button size="sm" variant="outline" onClick={() => { setQuery(""); }}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Results — accordion list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 mb-1">
          <h3 className="font-display text-base text-foreground">Search Results</h3>
          <span className="text-[11px] text-text-muted">{filtered.length} of {APPROVED_DRUGS.length}</span>
        </div>

        {filtered.map(d => {
          const open = expanded === d.id;
          return (
            <div key={d.id} className="bg-bg-surface border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(open ? null : d.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-bg-muted transition-colors"
              >
                {open ? <ChevronDown className="h-4 w-4 text-text-muted" /> : <ChevronRight className="h-4 w-4 text-text-muted" />}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${categoryColor[d.category]}`}>{d.category}</span>
                <span className="text-sm font-medium text-foreground flex-1 truncate">{d.name}</span>
                <span className="text-[11px] text-text-muted hidden md:inline font-mono-code">{d.approvalDate}</span>
                <ProvenanceChip variant="live" source="CDSCO" href={d.sourceUrl} />
              </button>

              {open && (
                <div className="px-5 pb-5 pt-1 border-t border-border bg-bg-muted/30 animate-fade-in-page">
                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                    <Field label="Approval Date" value={d.approvalDate} mono />
                    <Field label="Type" value={d.type} />
                    <Field label="Category" value={DRUG_CATEGORY_LABEL[d.category]} />
                    <Field label="Dosage" value={d.dosage} />
                    <Field label="Manufacturer" value={d.manufacturer} />
                    <Field label="Record ID" value={d.id} mono />
                    <Field label="Composition" value={d.composition} className="md:col-span-3" />
                    <Field label="Indication" value={d.indication} className="md:col-span-3" />
                    <Field label="Manufacturing Site" value={d.manufacturingSite} className="md:col-span-3" />
                  </dl>

                  <div className="mt-4 flex items-center gap-2 text-[11px]">
                    <a
                      href={d.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Verify on CDSCO portal <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-muted">
                      Provenance: scraped from public registry; verifiable at source.
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-bg-surface border border-border rounded-lg p-8 text-center text-sm text-text-muted">
            No records match your search.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Field({ label, value, mono, className }: { label: string; value: string; mono?: boolean; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-[11px] text-text-muted uppercase tracking-wider">{label}</dt>
      <dd className={`text-foreground mt-0.5 ${mono ? "font-mono-code text-xs" : ""}`}>{value}</dd>
    </div>
  );
}
