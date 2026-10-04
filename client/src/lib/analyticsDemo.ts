export const MONTHS = ["Jan", "Feb", "Mar"] as const;
export const REGIONS = ["North America", "EMEA", "Asia Pacific"] as const;
export type DemoMonth = (typeof MONTHS)[number];
export type DemoRegion = (typeof REGIONS)[number];
export type DemoFilters = { month: DemoMonth | "all"; region: DemoRegion | "all" };
export type DemoView = DemoFilters & { showRegions: boolean; comparePlan: boolean };
export type SalesRow = { month: DemoMonth; region: DemoRegion; revenue: number; plan: number };

// Synthetic, bundled records. Plan is illustrative; no customer data is used.
export const SALES_ROWS: readonly SalesRow[] = [
  { month: "Jan", region: "North America", revenue: 36000, plan: 35000 },
  { month: "Jan", region: "EMEA", revenue: 32000, plan: 31000 },
  { month: "Jan", region: "Asia Pacific", revenue: 24000, plan: 24000 },
  { month: "Feb", region: "North America", revenue: 42000, plan: 40000 },
  { month: "Feb", region: "EMEA", revenue: 36000, plan: 35000 },
  { month: "Feb", region: "Asia Pacific", revenue: 30000, plan: 29000 },
  { month: "Mar", region: "North America", revenue: 48000, plan: 46000 },
  { month: "Mar", region: "EMEA", revenue: 40000, plan: 39000 },
  { month: "Mar", region: "Asia Pacific", revenue: 36000, plan: 33000 },
];
export const DEFAULT_DEMO_VIEW: DemoView = { month: "all", region: "all", showRegions: false, comparePlan: false };
export const DEMO_STORAGE_KEY = "orya.analytics.demo-view.v1";

export function filterSales(rows: readonly SalesRow[], filters: DemoFilters): SalesRow[] {
  return rows.filter(row => (filters.month === "all" || row.month === filters.month) && (filters.region === "all" || row.region === filters.region));
}

export function summarizeSales(rows: readonly SalesRow[]) {
  const revenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const plan = rows.reduce((sum, row) => sum + row.plan, 0);
  return {
    revenue,
    plan,
    variance: revenue - plan,
    variancePercent: plan === 0 ? null : ((revenue - plan) / plan) * 100,
    marketCount: new Set(rows.map(row => row.region)).size,
    rowCount: rows.length,
  };
}

export function monthlySales(rows: readonly SalesRow[]) {
  return MONTHS.filter(month => rows.some(row => row.month === month)).map(month => ({
    month,
    ...summarizeSales(rows.filter(row => row.month === month)),
  }));
}

export function regionalSales(rows: readonly SalesRow[]) {
  return REGIONS.filter(region => rows.some(row => row.region === region)).map(region => ({
    region,
    ...summarizeSales(rows.filter(row => row.region === region)),
  })).sort((a, b) => b.revenue - a.revenue);
}

export type SavedDemoView = { version: 1; view: DemoView; savedAt: string };
export function serializeDemoView(view: DemoView, savedAt: string): string {
  return JSON.stringify({ version: 1, view, savedAt });
}
export function parseSavedDemoView(raw: string | null): SavedDemoView | null {
  if (!raw) return null;
  try {
    const saved: unknown = JSON.parse(raw);
    if (typeof saved !== "object" || saved === null) return null;
    const value = saved as Record<string, unknown>;
    if (value.version !== 1 || typeof value.savedAt !== "string" || !Number.isFinite(Date.parse(value.savedAt))) return null;
    if (typeof value.view !== "object" || value.view === null) return null;
    const view = value.view as Record<string, unknown>;
    if (view.month !== "all" && !MONTHS.includes(view.month as DemoMonth)) return null;
    if (view.region !== "all" && !REGIONS.includes(view.region as DemoRegion)) return null;
    if (typeof view.showRegions !== "boolean" || typeof view.comparePlan !== "boolean") return null;
    // Return only recognized fields; malformed or injected extra state never enters the UI.
    return { version: 1, savedAt: value.savedAt, view: { month: view.month as DemoView["month"], region: view.region as DemoView["region"], showRegions: view.showRegions, comparePlan: view.comparePlan } };
  } catch {
    return null;
  }
}

export function sampleSalesCsv(): string {
  return ["month,region,revenue_usd,illustrative_plan_usd", ...SALES_ROWS.map(row => `${row.month},${row.region},${row.revenue},${row.plan}`)].join("\r\n");
}
