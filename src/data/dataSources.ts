// Open-architecture data source adapter — designed for SUGAM today and DDRS tomorrow.
// Same interface, different implementations. This is the contract evaluators see.

export type DataSourceStatus = "live" | "simulated" | "ready" | "offline";

export type DataSourceAdapter = {
  id: string;
  name: string;
  description: string;
  status: DataSourceStatus;
  endpoint: string;
  authMode: "none" | "api-key" | "session" | "oauth2" | "mtls";
  recordsAvailable: number;
  lastSyncAt: string | null;
  capabilities: string[];
  notes: string;
};

export const DATA_SOURCES: DataSourceAdapter[] = [
  {
    id: "cdsco-public-registry",
    name: "CDSCO Public Registry",
    description:
      "Public Approved Drugs registry on cdscoonline.gov.in. Records ingested into the platform are independently verifiable on the source page.",
    status: "live",
    endpoint: "https://cdscoonline.gov.in/CDSCO/cdscoDrugs",
    authMode: "none",
    recordsAvailable: 12,
    lastSyncAt: new Date().toISOString(),
    capabilities: ["Approved Drugs", "Manufacturer Lookup", "Composition Search"],
    notes:
      "Snapshot dataset (Apr 2026). In production this adapter polls the live registry on a schedule and caches results.",
  },
  {
    id: "sugam-portal",
    name: "SUGAM Portal",
    description:
      "Authenticated submission, status push and document pull APIs for the Single Window submission system.",
    status: "simulated",
    endpoint: "https://api.sugam.gov.in/v2",
    authMode: "session",
    recordsAvailable: 3241,
    lastSyncAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    capabilities: ["Submission Intake", "Status Push", "Document Pull", "Reviewer Queue"],
    notes:
      "Simulated for the demo. The same adapter interface accepts production SUGAM credentials provisioned to the CDSCO division.",
  },
  {
    id: "md-online",
    name: "MD Online Portal",
    description:
      "Medical device registration, importer verification and post-market surveillance feeds.",
    status: "simulated",
    endpoint: "https://api.mdonline.gov.in/v1",
    authMode: "session",
    recordsAvailable: 1586,
    lastSyncAt: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    capabilities: ["Device Registration", "Importer Verification", "Class A-D Lookup"],
    notes: "Simulated for the demo. Production endpoint requires departmental credentials.",
  },
  {
    id: "ddrs-platform",
    name: "DDRS — Digital Drugs Regulatory System",
    description:
      "Next-generation open-architecture platform consolidating SUGAM, SUGAM Labs, MD Online and ONDLS, with downstream feeds to GST, Customs and ICMR.",
    status: "ready",
    endpoint: "ddrs.cdsco.gov.in (RFP issued — last date 30 May 2026)",
    authMode: "oauth2",
    recordsAvailable: 0,
    lastSyncAt: null,
    capabilities: [
      "Unified Submission",
      "Cross-System Data Exchange (GST / Customs / ICMR)",
      "Open Architecture APIs",
    ],
    notes:
      "Adapter implemented to the DDRS RFP specification. Activates on production credentials post-award.",
  },
  {
    id: "ondls",
    name: "ONDLS — Online National Drug Licensing System",
    description: "State-level licensing data from the ONDLS portal, federated through DDRS in production.",
    status: "ready",
    endpoint: "ondls.gov.in",
    authMode: "session",
    recordsAvailable: 0,
    lastSyncAt: null,
    capabilities: ["State Licence Lookup", "Manufacturing Licence Verification"],
    notes: "Will activate via the DDRS adapter once the unified platform is awarded.",
  },
];
