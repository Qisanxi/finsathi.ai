import type { Comparison } from "./types";

// Ported from components/comparator.py
export const COMPARISONS: Comparison[] = [
  {
    key: "term_vs_ulip",
    title: "Term Insurance vs ULIP",
    columns: ["Term Insurance", "ULIP"],
    rows: [
      { feature: "Purpose", left: "Pure protection", right: "Protection + investment" },
      { feature: "Premium", left: "Usually lower", right: "Usually higher" },
      { feature: "Returns", left: "No maturity value in pure term plans", right: "Market-linked or plan-linked" },
      { feature: "Best for", left: "Income replacement for family", right: "People wanting cover plus investment component" },
      { feature: "Regulator", left: "IRDAI", right: "IRDAI" },
    ],
  },
  {
    key: "sip_vs_lumpsum",
    title: "SIP vs Lumpsum Investment",
    columns: ["SIP", "Lumpsum"],
    rows: [
      { feature: "Investment style", left: "Fixed amount at regular intervals", right: "One-time investment" },
      { feature: "Market timing risk", left: "Lower due to rupee cost averaging", right: "Higher because entry timing matters" },
      { feature: "Best for", left: "Regular income earners", right: "Bonus, inheritance, or idle surplus" },
      { feature: "Discipline required", left: "High, because investing is periodic", right: "Lower, because investment is upfront" },
      { feature: "Regulator / source context", left: "SEBI / AMFI", right: "SEBI / AMFI" },
    ],
  },
  {
    key: "elss_vs_ppf",
    title: "ELSS vs PPF",
    columns: ["ELSS", "PPF"],
    rows: [
      { feature: "Product type", left: "Equity mutual fund (80C category)", right: "Government-backed savings scheme" },
      { feature: "Lock-in period", left: "3 years (shortest among 80C options)", right: "15 years" },
      { feature: "Returns", left: "Market-linked", right: "Government-notified interest rate" },
      { feature: "Risk", left: "Medium-High (equity market linked)", right: "Very Low (sovereign guarantee)" },
      { feature: "Tax context", left: "Used for Section 80C planning", right: "Used for Section 80C planning" },
      { feature: "Regulator / authority", left: "SEBI / AMFI", right: "Government of India" },
    ],
  },
];

// Ported from components/sidebar.py
export const QUICK_TOPICS = [
  "What is SIP and how do I start?",
  "Difference between term and ULIP?",
  "How does Section 80C help save tax?",
  "What is PMAY and who can apply?",
  "How much emergency fund should I have?",
];

// Ported from components/profiler.py
export const AGE_OPTIONS = ["18-24", "25-34", "35-44", "45-54", "55+"];
export const EMPLOYMENT_OPTIONS = [
  "Salaried",
  "Self-employed / Business",
  "Student / Fresher",
  "Retired",
];
export const INCOME_OPTIONS = [
  "Prefer not to say",
  "Below ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "Above ₹1,00,000",
];
export const SAVINGS_OPTIONS = [
  "Not saving yet",
  "Below ₹5,000",
  "₹5,000 - ₹15,000",
  "₹15,000 - ₹50,000",
  "Above ₹50,000",
];
export const GOAL_OPTIONS = [
  "Build emergency fund",
  "Pay off debt",
  "Start investing",
  "Save tax",
  "Save for education",
  "Save for home",
  "Retirement planning",
];
export const RISK_OPTIONS = ["Low", "Medium", "High"];
export const HORIZON_OPTIONS = ["Less than 1 year", "1-3 years", "3-7 years", "7+ years"];

export const SCOPE_AREAS = [
  {
    title: "Mutual Funds",
    description: "SIP, lumpsum, ELSS, NAV, direct vs regular plans",
  },
  {
    title: "Life Insurance",
    description: "Term insurance, endowment plans, ULIP",
  },
  {
    title: "Vehicle Insurance",
    description: "IDV, zero-dep cover, third-party vs comprehensive",
  },
  {
    title: "Housing",
    description: "Home loan EMI, PMAY, HBA scheme",
  },
  {
    title: "Government Schemes",
    description: "PPF, NPS, Sukanya Samriddhi Yojana, Atal Pension Yojana",
  },
  {
    title: "Tax Saving",
    description: "Section 80C and 80D concepts explained simply",
  },
];
