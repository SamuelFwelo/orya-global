import { describe, expect, it } from "vitest";
import { DEFAULT_DEMO_VIEW, SALES_ROWS, filterSales, monthlySales, parseSavedDemoView, regionalSales, sampleSalesCsv, serializeDemoView, summarizeSales } from "./analyticsDemo";

describe("analytics demo calculations", () => {
  it("reconciles monthly and regional totals to the complete sample", () => {
    const summary = summarizeSales(SALES_ROWS);
    expect(summary.revenue).toBe(324000);
    expect(summary.plan).toBe(312000);
    expect(summary.variance).toBe(12000);
    expect(summary.variancePercent).toBeCloseTo(3.8461538);
    expect(monthlySales(SALES_ROWS).map(row => row.revenue)).toEqual([92000, 108000, 124000]);
    expect(regionalSales(SALES_ROWS).map(row => row.revenue)).toEqual([126000, 108000, 90000]);
    expect(regionalSales(SALES_ROWS).reduce((sum, row) => sum + row.revenue, 0)).toBe(summary.revenue);
  });

  it("intersects month and region filters for both actuals and plan", () => {
    const rows = filterSales(SALES_ROWS, { month: "Feb", region: "Asia Pacific" });
    expect(rows).toHaveLength(1);
    expect(summarizeSales(rows)).toMatchObject({ revenue: 30000, plan: 29000, variance: 1000, marketCount: 1, rowCount: 1 });
    expect(monthlySales(rows).map(row => row.month)).toEqual(["Feb"]);
    expect(regionalSales(rows).map(row => row.region)).toEqual(["Asia Pacific"]);
    expect(summarizeSales(filterSales(SALES_ROWS, { month: "all", region: "EMEA" })).revenue).toBe(108000);
    expect(summarizeSales(filterSales(SALES_ROWS, { month: "Mar", region: "all" })).revenue).toBe(124000);
  });

  it("has no invalid ratios for empty selections or zero plan", () => {
    expect(summarizeSales([])).toMatchObject({ revenue: 0, plan: 0, variancePercent: null, marketCount: 0 });
    expect(monthlySales([])).toEqual([]);
    expect(summarizeSales([{ month: "Jan", region: "EMEA", revenue: 100, plan: 0 }]).variancePercent).toBeNull();
  });

  it("exports all and only the displayed source records", () => {
    const lines = sampleSalesCsv().split("\r\n");
    expect(lines).toHaveLength(10);
    expect(lines[0]).toBe("month,region,revenue_usd,illustrative_plan_usd");
    expect(lines.slice(1).reduce((sum, line) => sum + Number(line.split(",")[2]), 0)).toBe(324000);
  });
});

describe("saved demo views", () => {
  it("restores all filters and panels rather than just showing a saved message", () => {
    const view = { month: "Mar" as const, region: "EMEA" as const, showRegions: true, comparePlan: true };
    const saved = parseSavedDemoView(serializeDemoView(view, "2026-10-03T12:00:00.000Z"));
    expect(saved?.view).toEqual(view);
    expect(summarizeSales(filterSales(SALES_ROWS, saved!.view)).revenue).toBe(40000);
  });

  it("rejects corrupt, outdated and invalid saved data", () => {
    const valid = { version: 1, savedAt: "2026-10-03T12:00:00Z", view: DEFAULT_DEMO_VIEW };
    for (const raw of [null, "", "{", "null", "[]", JSON.stringify({ ...valid, version: 2 }), JSON.stringify({ ...valid, savedAt: "invalid" }), JSON.stringify({ ...valid, view: { ...DEFAULT_DEMO_VIEW, month: "Apr" } }), JSON.stringify({ ...valid, view: { ...DEFAULT_DEMO_VIEW, region: "unknown" } }), JSON.stringify({ ...valid, view: { ...DEFAULT_DEMO_VIEW, showRegions: "true" } }), JSON.stringify({ ...valid, view: null })]) {
      expect(parseSavedDemoView(raw)).toBeNull();
    }
  });

  it("does not copy unrecognized saved fields into application state", () => {
    const parsed = parseSavedDemoView(JSON.stringify({ version: 1, savedAt: "2026-10-03T12:00:00Z", view: { ...DEFAULT_DEMO_VIEW, endpoint: "https://example.com" } }));
    expect(parsed?.view).toEqual(DEFAULT_DEMO_VIEW);
    expect(parsed?.view).not.toHaveProperty("endpoint");
  });
});
