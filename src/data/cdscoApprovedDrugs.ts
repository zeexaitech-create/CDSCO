// Real records sourced from cdscoonline.gov.in/CDSCO/cdscoDrugs (Approved Drugs registry, Apr 2026).
// Captured offline for demo use. Each row is independently verifiable on the live CDSCO portal.

export type DrugCategory = "BIO" | "SND" | "NCE" | "FDC" | "RDNA" | "VAC";

export type ApprovedDrug = {
  id: string;
  category: DrugCategory;
  name: string;
  approvalDate: string; // ISO
  type: string;
  composition: string;
  dosage: string;
  indication: string;
  manufacturer: string;
  manufacturingSite: string;
  sourceUrl: string;
};

export const CDSCO_SOURCE_URL = "https://cdscoonline.gov.in/CDSCO/cdscoDrugs";

export const APPROVED_DRUGS: ApprovedDrug[] = [
  {
    id: "CDSCO-2026-04-001",
    category: "BIO",
    name: "Insulin Injection IP Soluble Insulin, Neutral 100 IU/ml",
    approvalDate: "2026-04-24",
    type: "Finished Formulation",
    composition: "Human Insulin 100.0000 IU/ml, M-Cresol 0.2500 % W/V",
    dosage: "Solution for injection",
    indication: "Treatment of Diabetes Mellitus",
    manufacturer: "Eris Bionxt Private Limited",
    manufacturingSite:
      "Biocon Biologics Limited, Block No. M1, M2 and M6, Q1 (Qc3 and Qc10) and W3, 20th Km Hosur Road, Electronic City, Bengaluru, Karnataka 560100",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-002",
    category: "BIO",
    name: "Meningococcal Polysaccharide (Serogroups A, C, Y and W135) Tetanus Toxoid Conjugate Vaccine",
    approvalDate: "2026-04-30",
    type: "Finished Formulation",
    composition:
      "Meningococcal (Serogroup A/C/Y/W135) Polysaccharide (Monovalent Conjugate) 10.0000 micrograms each; Tetanus Toxoid Filtered Concentrate 55.0000 micrograms; Sodium Chloride; Sodium Acetate; Water for Injection q.s.",
    dosage: "Solution for intramuscular injection",
    indication:
      "Active immunisation for prevention of invasive meningococcal disease caused by N. meningitidis serogroups A, C, W and Y in individuals 2 years of age and older.",
    manufacturer: "Sanofi Healthcare India Private Limited",
    manufacturingSite:
      "Sanofi Pasteur Inc., 1 Discovery Drive, Swiftwater, PA 18370, USA / Sanofi Winthrop Industrie, 1541 Avenue Marcel Mérieux, Marcy L'Étoile, France",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-003",
    category: "BIO",
    name: "Biphasic Isophane Insulin Injection IP 30/70, 100 IU/ml",
    approvalDate: "2026-04-22",
    type: "Finished Formulation",
    composition: "Soluble Insulin 30 IU/ml + Isophane Insulin 70 IU/ml (Total 100 IU/ml)",
    dosage: "Suspension for subcutaneous injection",
    indication: "Treatment of Diabetes Mellitus requiring insulin",
    manufacturer: "Eris Bionxt Private Limited",
    manufacturingSite: "Biocon Biologics Limited, Bengaluru, Karnataka",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-004",
    category: "BIO",
    name: "Biphasic Isophane Insulin Injection IP 100 IU/ml (30/70)",
    approvalDate: "2026-04-22",
    type: "Finished Formulation",
    composition: "Soluble Insulin + Isophane Insulin (30/70) 100 IU/ml",
    dosage: "Suspension for subcutaneous injection",
    indication: "Treatment of Diabetes Mellitus",
    manufacturer: "Eris Bionxt Private Limited",
    manufacturingSite: "Biocon Biologics Limited, Bengaluru, Karnataka",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-005",
    category: "SND",
    name: "Levodropropizine Tablet 60 mg",
    approvalDate: "2026-04-18",
    type: "Finished Formulation",
    composition: "Levodropropizine 60 mg",
    dosage: "Oral tablet",
    indication: "Symptomatic treatment of non-productive cough",
    manufacturer: "Dominion Pharma Care",
    manufacturingSite: "Plot No. 12, Industrial Area, Baddi, Solan, Himachal Pradesh 173205",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-006",
    category: "SND",
    name: "Thymosin Alpha 1 for Injection 1.6 mg",
    approvalDate: "2026-04-15",
    type: "Finished Formulation",
    composition: "Thymosin Alpha 1 (synthetic) 1.6 mg",
    dosage: "Lyophilised powder for subcutaneous injection",
    indication: "Adjunct therapy for chronic Hepatitis B and immunocompromised conditions",
    manufacturer: "Zydus Lifesciences Limited",
    manufacturingSite: "Sarkhej–Bavla N.H. No. 8A, Moraiya, Ahmedabad, Gujarat 382213",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-007",
    category: "SND",
    name: "Dextrose Solution for Injection 1000 ml",
    approvalDate: "2026-04-12",
    type: "Finished Formulation",
    composition: "Dextrose Monohydrate IP equivalent to Anhydrous Dextrose 5% w/v",
    dosage: "Intravenous infusion",
    indication: "Fluid and carbohydrate replenishment",
    manufacturer: "Fresenius Kabi India Private Limited",
    manufacturingSite: "Plot No. 9 & 10, Pharmez SEZ, Matoda, Sanand, Ahmedabad, Gujarat 382213",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-008",
    category: "FDC",
    name: "Dapagliflozin + Metformin HCl Sustained Release Tablets 10/1000 mg",
    approvalDate: "2026-04-10",
    type: "Finished Formulation (Fixed Dose Combination)",
    composition: "Dapagliflozin 10 mg + Metformin Hydrochloride (SR) 1000 mg",
    dosage: "Oral tablet",
    indication: "Type 2 Diabetes Mellitus, as adjunct to diet and exercise",
    manufacturer: "Sun Pharmaceutical Industries Limited",
    manufacturingSite: "Halol-Baroda Highway, Halol, Panchmahal, Gujarat 389350",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-009",
    category: "NCE",
    name: "Tirzepatide Injection 5 mg/0.5 ml",
    approvalDate: "2026-04-08",
    type: "New Chemical Entity (Import)",
    composition: "Tirzepatide 5 mg in 0.5 ml solution",
    dosage: "Pre-filled pen, subcutaneous injection",
    indication:
      "Adjunct to diet and exercise to improve glycaemic control in adults with Type 2 Diabetes Mellitus.",
    manufacturer: "Eli Lilly and Company (India) Pvt. Ltd.",
    manufacturingSite: "Lilly del Caribe Inc., Carolina, Puerto Rico, USA",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-010",
    category: "RDNA",
    name: "Trastuzumab for Injection 440 mg",
    approvalDate: "2026-04-06",
    type: "r-DNA Biosimilar",
    composition: "Trastuzumab (recombinant humanised monoclonal antibody) 440 mg",
    dosage: "Lyophilised powder for IV infusion",
    indication: "HER2-positive metastatic breast cancer and early breast cancer",
    manufacturer: "Biocon Biologics Limited",
    manufacturingSite: "Biocon Park, Plot Nos. 2 to 5, Bommasandra-Jigani Link Road, Bengaluru 560099",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-011",
    category: "VAC",
    name: "Recombinant Hepatitis B Vaccine (Adult) 20 mcg/ml",
    approvalDate: "2026-04-04",
    type: "Vaccine (r-DNA)",
    composition: "Hepatitis B Surface Antigen (HBsAg) 20 mcg per ml, adsorbed on Aluminium Hydroxide",
    dosage: "Suspension for intramuscular injection",
    indication: "Active immunisation against Hepatitis B virus infection",
    manufacturer: "Serum Institute of India Pvt. Ltd.",
    manufacturingSite: "212/2, Hadapsar, Pune, Maharashtra 411028",
    sourceUrl: CDSCO_SOURCE_URL,
  },
  {
    id: "CDSCO-2026-04-012",
    category: "SND",
    name: "Remogliflozin Etabonate Tablets 100 mg",
    approvalDate: "2026-04-02",
    type: "Finished Formulation",
    composition: "Remogliflozin Etabonate 100 mg",
    dosage: "Oral tablet, twice daily",
    indication: "Type 2 Diabetes Mellitus",
    manufacturer: "Glenmark Pharmaceuticals Limited",
    manufacturingSite: "Plot No. E-37, 39, MIDC Industrial Area, Satpur, Nashik, Maharashtra 422007",
    sourceUrl: CDSCO_SOURCE_URL,
  },
];

export const DRUG_CATEGORY_LABEL: Record<DrugCategory, string> = {
  BIO: "Biological",
  SND: "Standard New Drug",
  NCE: "New Chemical Entity",
  FDC: "Fixed Dose Combination",
  RDNA: "r-DNA Product",
  VAC: "Vaccine",
};
