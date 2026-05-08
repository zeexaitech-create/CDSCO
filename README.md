# CDSCO RegAI — AI-Driven Regulatory Workflow Automation Platform

**Submitted by:** Zeex AI (zeex.ai)  
**Hackathon:** CDSCO-IndiaAI Health Innovation Acceleration Hackathon  
**Stage:** Stage 1 — Virtual Hackathon  
**Live Platform:** https://regulatory-insight-hub.vercel.app  
**Solution Report:** Available in `/docs/CDSCO_RegAI_Solution_Report_ZeexAI.pdf`

---

## Overview

CDSCO RegAI is a web-based regulatory intelligence platform built to address the Stage 1 problem statement: AI-driven regulatory workflow automation and data anonymisation for the Central Drugs Standard Control Organisation.

The platform brings four AI capabilities together under a single reviewer-facing interface designed for CDSCO officers — not data scientists. A regulatory reviewer can paste or upload a document and receive structured, decision-ready output without any technical knowledge.

---

## Problem Statement Addressed

CDSCO processes hundreds of new drug applications, clinical trial submissions, and serious adverse event reports every year. The current process is entirely manual and document-intensive, leading to:

- No AI triage layer between raw submissions and the reviewer
- Inconsistent PII handling in clinical documents — compliance risk under DPDP Act 2023
- SAE severity classification dependent entirely on individual reviewer judgment
- No automated way to identify what changed between two versions of a filing

This platform addresses all four gaps directly.

---

## Core AI Modules

### 1. Data Anonymisation
Detects and removes Personally Identifiable Information (PII) and Protected Health Information (PHI) from regulatory documents using a hybrid rule-based and NLP approach.

**Two-step process:**
- Step 1 — Pseudonymisation: Replaces identifiers with deterministic, reversible secure tokens (PERSON-TOKEN-A1, PHONE-TOKEN-B2)
- Step 2 — Irreversible anonymisation: Generalises geographic and temporal data (addresses to city-level, dates to month-year, ages to five-year bands)

**Compliance:** DPDP Act 2023, ICMR Ethical Guidelines, NDHM Health Data Management Policy, CDSCO Standards

### 2. Document Summarisation
Extracts and synthesizes critical regulatory information from three document types as specified in the hackathon brief:

- **SUGAM Portal Checklists** — NDA completeness-aware extraction with structured reviewer summary
- **SAE Case Narrations** — Causality, severity, and action item extraction on fixed schema
- **Meeting Transcripts** — DTAB/DCC topic segmentation with decisions, actions, and deferrals

### 3. Completeness Assessment and Case Classification
- Verifies submissions against CDSCO checklists with weighted mandatory/conditional/recommended scoring
- Classifies SAE cases by severity: Death, Disability, Hospitalisation, Other Serious
- Detects potential duplicate SAE case submissions using five-field similarity scoring
- Flags missing or inconsistent fields with specific section references

### 4. Document Version Comparison
- Structural alignment between filing versions even if section numbering changed
- Semantic diff to detect meaning-level changes, not just character-level differences
- Classifies each change by clinical significance: Critical (safety), High (efficacy), Medium, Low
- Automatically escalates safety-critical changes for senior reviewer attention

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript 5, Vite 5 |
| UI Components | shadcn/ui, Tailwind CSS |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Package Manager | Bun |
| Testing | Vitest |
| Deployment | Vercel Edge Network |
| Version Control | GitHub |
| AI Layer (Stage 2) | IndiaAI Mission API endpoints |
| Backend (Stage 2) | Supabase / PostgreSQL |

All UI libraries and components are open-source. Full dependency list is in `package.json`. No proprietary third-party AI services are used in the Stage 1 POC — processing demonstrations use structured mock outputs that accurately reflect the intended model behaviour.

---

## Project Structure

```
src/
├── components/
│   ├── AppSidebar.tsx          # Navigation sidebar
│   ├── AppHeader.tsx           # Page header
│   ├── AppFooter.tsx           # Footer with compliance info
│   ├── DashboardLayout.tsx     # Main layout shell
│   └── ui/                     # shadcn/ui component library
├── pages/
│   ├── CommandCentre.tsx       # Main dashboard
│   ├── DataAnonymisation.tsx   # Module 1 — Anonymisation
│   ├── DocumentSummarisation.tsx # Module 2 — Summarisation
│   ├── CompletenessClassification.tsx # Module 3 — Completeness + Classification
│   ├── DocumentComparison.tsx  # Module 4 — Document Comparison
│   ├── ApprovedDrugs.tsx       # Approved Drugs Registry
│   ├── SAEReports.tsx          # SAE Reports
│   ├── InspectionReports.tsx   # Inspection Reports
│   ├── AuditTrail.tsx          # Audit Trail
│   ├── UserManagement.tsx      # User Management
│   └── SettingsPage.tsx        # Platform Settings
├── data/
│   ├── cdscoApprovedDrugs.ts   # Approved drug registry dataset
│   └── dataSources.ts          # Data source configurations
├── hooks/
│   ├── useAnimatedCounter.ts   # KPI counter animations
│   └── useSkeletonLoader.ts    # Loading state management
└── lib/
    ├── auth.ts                 # Authentication logic
    └── utils.ts                # Utility functions
```

---

## Running Locally

### Prerequisites
- Node.js 18+ or Bun
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/zeexaitech-create/CDSCO.git
cd CDSCO

# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
bun run build
# or
npm run build
```

### Run Tests

```bash
bun run test
# or
npm run test
```

---

## Key Methodology

### PII Detection Approach
- **Rule-based:** Aadhaar numbers (12-digit with checksum), mobile numbers, email addresses, PIN codes, medical registration numbers — deterministic patterns with near-zero false positive rates
- **NLP-based:** Personal names, physician names, organisation names, location references — Named Entity Recognition targeting Indian regulatory document domain
- **Confidence scoring:** Every entity detection includes a confidence score surfaced in the anonymisation report

### Completeness Verification Logic
- Rule set derived from CDSCO's own checklists for each submission type
- Weighted scoring: mandatory (full weight), conditional (relevance-weighted), recommended (partial weight)
- Submissions below 70 on mandatory items flagged for return before substantive review

### SAE Classification Criteria
- Four severity categories per CDSCO guidelines: Death, Disability, Hospitalisation, Other Serious
- Multi-label approach — a case can meet criteria for more than one category
- Causality assessed on WHO-UMC scale
- Duplicate detection using five-field similarity: drug+batch, event date window, patient age band, facility type, primary seriousness criterion

### Document Comparison Algorithm
1. Structural alignment — section matching even across restructured filings
2. Semantic diff — meaning-level change detection beyond character comparison
3. Significance classification — Critical (safety), High (efficacy), Medium, Low

---

## Compliance Framework

| Regulation | Implementation |
|---|---|
| DPDP Act 2023 | PII stripped before AI processing; anonymisation report per document; access logs maintained |
| NDHM Health Data Policy | Two-step de-identification aligned with NDHM framework; generalisation on quasi-identifiers |
| ICMR Ethical Guidelines | Irreversible anonymisation for research-facing outputs; model transparency documented |
| CDSCO Guidelines | SAE classification aligned with CDSCO severity definitions; audit trail for all access |
| IndiaAI Responsible AI | Confidence scores surfaced to reviewers; no automated decisions without human sign-off |

---

## Performance Targets

| Task | Metric | Target |
|---|---|---|
| Text Recognition | Character Error Rate | < 3% |
| Anonymisation | k-anonymity | k >= 5 |
| Anonymisation | l-diversity | l >= 3 |
| Key Info Extraction | Entity-level F1 (strict) | > 0.91 |
| Summarisation | ROUGE-1 | > 0.52 |
| Summarisation | ROUGE-2 | > 0.28 |
| Summarisation | ROUGE-L | > 0.46 |
| Summarisation | BERTScore F1 | > 0.88 |
| Segmentation | mIoU | > 0.82 |
| Classification | Macro-F1 | > 0.87 |
| Classification | Matthews Correlation Coefficient | > 0.82 |
| Comparison | Change Detection F1 | > 0.89 |
| End-to-End Latency | Total Processing Time | < 8 seconds |

Actual measurements will be reported in Stage 2 using CDSCO-provided datasets.

---

## Deployment

The platform is deployed on Vercel and automatically redeploys on every push to the `main` branch.

**Live URL:** https://regulatory-insight-hub.vercel.app

---

## External Resources and Attribution

This project uses the following open-source libraries and frameworks. All are used in accordance with their respective licences:

- React — MIT Licence
- TypeScript — Apache 2.0 Licence
- Vite — MIT Licence
- Tailwind CSS — MIT Licence
- shadcn/ui — MIT Licence
- Recharts — MIT Licence
- Lucide React — ISC Licence
- React Router — MIT Licence
- Vitest — MIT Licence

No pre-trained AI models are included in the Stage 1 POC submission. The AI processing layer is architected for integration with IndiaAI Mission inference endpoints in Stage 2.

---

## Stage 2 Roadmap

| Phase | Timeline | Deliverable |
|---|---|---|
| Backend and Auth | Months 1-2 | Live authentication, audit trail, IndiaAI API |
| Portal Integration | Months 2-4 | SUGAM and MD Online bidirectional sync |
| Model Fine-tuning | Months 3-5 | Domain NER and summarisation on CDSCO data |
| Production Hardening | Months 5-12 | Security audit, load testing, staff training |

---

## Submitted By

**Zeex AI**  
zeex.ai  
CDSCO-IndiaAI Health Innovation Acceleration Hackathon — Stage 1  
May 2026

---

*This repository is submitted as part of the CDSCO-IndiaAI Health Innovation Acceleration Hackathon. All work is original and developed by Zeex AI. External open-source resources are attributed above. The solution adheres to the plagiarism, ethics, data protection, and responsible AI guidelines specified in the hackathon brief.*
