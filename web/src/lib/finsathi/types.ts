export type TemperatureMode = "strict" | "creative" | "balanced";

export interface FinancialProfile {
  age_range: string;
  employment_type: string;
  monthly_income: string;
  monthly_savings: string;
  primary_goal: string;
  risk_tolerance: string;
  investment_horizon: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  mode?: TemperatureMode;
}

export interface ComparisonRow {
  feature: string;
  left: string;
  right: string;
}

export interface Comparison {
  key: string;
  title: string;
  columns: [string, string];
  rows: ComparisonRow[];
}
