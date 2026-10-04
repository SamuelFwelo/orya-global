import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, Database, Download, FolderOpen, Layers3, RefreshCw, Save, SlidersHorizontal } from "lucide-react";
import { DEFAULT_DEMO_VIEW, DEMO_STORAGE_KEY, MONTHS, REGIONS, SALES_ROWS, filterSales, monthlySales, parseSavedDemoView, regionalSales, sampleSalesCsv, serializeDemoView, summarizeSales, type DemoView } from "../lib/analyticsDemo";
import "./analytics-demo.css";

const currency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const shortCurrency = (value: number) => `$${Math.round(value / 1000)}k`;

export default function AnalyticsDemo() {
  const [view, setView] = useState<DemoView>({ ...DEFAULT_DEMO_VIEW });
  const [notice, setNotice] = useState("Sample loaded. Choose an analysis to shape your dashboard.");
  const rows = useMemo(() => filterSales(SALES_ROWS, view), [view]);
  const summary = useMemo(() => summarizeSales(rows), [rows]);
  const monthly = useMemo(() => monthlySales(rows), [rows]);
  const regional = useMemo(() => regionalSales(rows), [rows]);
  const chartMax = Math.ceil(Math.max(...monthly.flatMap(row => [row.revenue, view.comparePlan ? row.plan : 0]), 1) / 20000) * 20000;
  const leadingMarket = regional[0];
  const last = monthly.at(-1);
  const previous = monthly.at(-2);
  const latestGrowth = last && previous && previous.revenue > 0 ? ((last.revenue - previous.revenue) / previous.revenue) * 100 : null;
  const periodLabel = view.month === "all" ? "Jan–Mar" : view.month;
  const selectionLabel = `${periodLabel} · ${view.region === "all" ? "All regions" : view.region}`;

  function updateFilter(key: "month" | "region", value: string) {
    setView(current => ({ ...current, [key]: value }));
    setNotice("Dashboard updated. Every chart and metric uses your selected filters.");
  }
  function saveView() {
    try {
      window.localStorage.setItem(DEMO_STORAGE_KEY, serializeDemoView(view, new Date().toISOString()));
      setNotice("View saved in this browser. Change a filter, then reopen your saved view to restore it.");
    } catch {
      setNotice("This browser is blocking local storage, so the view could not be saved. You can still explore the demo.");
    }
  }
  function reopenView() {
    try {
      const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
      const saved = parseSavedDemoView(raw);
      if (!saved) {
        setNotice(raw ? "The saved view could not be read. Save your current view to replace it." : "No saved view yet. Choose your filters and select Save view first.");
        return;
      }
      setView(saved.view);
      setNotice("Saved view reopened. Your filters and selected analyses have been restored.");
    } catch {
      setNotice("This browser is blocking local storage, so the saved view could not be reopened.");
    }
  }
  function downloadSample() {
    const url = URL.createObjectURL(new Blob([sampleSalesCsv()], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "orya-analytics-sample.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Sample CSV downloaded: all nine synthetic rows, with actuals and illustrative plan.");
  }

  return (
    <section className="ademo" aria-labelledby="ademo-title">
      <header className="ademo-header">
        <div className="ademo-brand"><span className="ademo-brand-mark" aria-hidden="true"><BarChart3 size={19} /></span><h3 id="ademo-title">ORYA <span>/</span> ANALYTICS STUDIO</h3></div>
        <span className="ademo-demo-badge"><i aria-hidden="true" />Interactive demo · sample data</span>
      </header>
      <div className="ademo-workspace">
        <aside className="ademo-sidebar" aria-label="Demo data and analysis controls">
          <div className="ademo-side-section">
            <p className="ademo-label"><span>01</span> YOUR DATA</p>
            <div className="ademo-source-card">
              <div className="ademo-source-icon"><Database size={20} /><span><Check size={11} /></span></div>
              <strong>Sample sales</strong>
              <p>9 rows · 3 markets · USD</p>
              <span className="ademo-source-tag">Ready to explore</span>
            </div>
            <button className="ademo-text-button" onClick={() => { setView({ ...DEFAULT_DEMO_VIEW }); setNotice("Sample reloaded. Filters and analyses reset; your saved view is still available."); }}><RefreshCw size={13} />Reload sample</button>
          </div>
          <div className="ademo-side-section">
            <p className="ademo-label"><span>02</span> EXPLORE YOUR DATA</p>
            <p className="ademo-side-help">Start with a question.</p>
            <div className="ademo-prompts">
              <button className={`ademo-prompt ${!view.comparePlan ? "ademo-prompt-active" : ""}`} aria-pressed={!view.comparePlan} onClick={() => { setView(current => ({ ...current, comparePlan: false })); setNotice("Showing monthly revenue for your selected period and region."); }}><BarChart3 size={15} /><span>Show monthly revenue</span><ArrowRight size={14} /></button>
              <button className={`ademo-prompt ${view.showRegions ? "ademo-prompt-active" : ""}`} aria-pressed={view.showRegions} onClick={() => { setView(current => ({ ...current, showRegions: !current.showRegions })); setNotice(view.showRegions ? "Regional breakdown hidden." : "Regional revenue added. The breakdown follows your selected filters."); }}><Layers3 size={15} /><span>{view.showRegions ? "Hide revenue by region" : "Add revenue by region"}</span><ArrowRight size={14} /></button>
              <button className={`ademo-prompt ${view.comparePlan ? "ademo-prompt-active" : ""}`} aria-pressed={view.comparePlan} onClick={() => { setView(current => ({ ...current, comparePlan: !current.comparePlan })); setNotice(view.comparePlan ? "Plan comparison hidden. Showing recorded sample revenue." : "Comparing sample actuals with an illustrative plan. Both follow your filters."); }}><SlidersHorizontal size={15} /><span>Compare actual vs plan</span><ArrowRight size={14} /></button>
            </div>
          </div>
          <div className="ademo-local-note"><span className="ademo-mini-orbit" aria-hidden="true" /><p>Your data, made clear.<br /><span>This demo runs in your browser using synthetic records.</span></p></div>
        </aside>
        <div className="ademo-main">
          <div className="ademo-dashboard-heading">
            <div><p className="ademo-label">SALES OVERVIEW</p><h4>A clearer view of performance.</h4></div>
            <div className="ademo-save-actions"><button className="ademo-small-button" onClick={reopenView}><FolderOpen size={14} />Reopen saved view</button><button className="ademo-small-button ademo-save" onClick={saveView}><Save size={14} />Save view</button></div>
          </div>
          <div className="ademo-filter-row">
            <div className="ademo-filter"><label htmlFor="ademo-period">Period</label><div><select id="ademo-period" value={view.month} onChange={event => updateFilter("month", event.target.value)}><option value="all">Jan–Mar</option>{MONTHS.map(month => <option key={month} value={month}>{month}</option>)}</select><ChevronDown size={12} aria-hidden="true" /></div></div>
            <div className="ademo-filter"><label htmlFor="ademo-region">Region</label><div><select id="ademo-region" value={view.region} onChange={event => updateFilter("region", event.target.value)}><option value="all">All regions</option>{REGIONS.map(region => <option key={region} value={region}>{region}</option>)}</select><ChevronDown size={12} aria-hidden="true" /></div></div>
            <span className="ademo-filter-summary">{summary.rowCount} source {summary.rowCount === 1 ? "row" : "rows"} in view</span>
          </div>
          <div className="ademo-metrics" aria-label="Metrics for selected filters">
            <article className="ademo-metric"><p>Total revenue</p><strong>{currency(summary.revenue)}</strong><span>{selectionLabel}</span></article>
            <article className="ademo-metric"><p>{view.comparePlan ? "Illustrative plan" : "Markets in view"}</p><strong>{view.comparePlan ? currency(summary.plan) : String(summary.marketCount).padStart(2, "0")}</strong><span>{view.comparePlan ? "For the selected rows" : view.region === "all" ? "North America · EMEA · APAC" : view.region}</span></article>
            <article className="ademo-metric"><p>{view.comparePlan ? "Variance to plan" : "Latest monthly change"}</p><strong className="ademo-metric-accent">{view.comparePlan ? `${summary.variancePercent !== null && summary.variancePercent >= 0 ? "+" : ""}${summary.variancePercent?.toFixed(1) ?? "—"}${summary.variancePercent === null ? "" : "%"}` : latestGrowth === null ? "—" : `${latestGrowth >= 0 ? "+" : ""}${latestGrowth.toFixed(1)}%`}</strong><span>{view.comparePlan ? `${currency(Math.abs(summary.variance))} ${summary.variance >= 0 ? "above" : "below"} plan` : previous && last ? `${last.month} vs ${previous.month} · selected regions` : "Select Jan–Mar to compare months"}</span></article>
          </div>
          <div className="ademo-chart-card">
            <div className="ademo-chart-heading"><div><h5>{view.comparePlan ? "Actual revenue vs plan" : "Revenue over time"}</h5><p>{selectionLabel} · USD</p></div><div className="ademo-legend"><span><i />Revenue</span>{view.comparePlan && <span><i className="ademo-legend-plan" />Plan</span>}</div></div>
            <figure className="ademo-chart" aria-label={`${view.comparePlan ? "Actual revenue and illustrative plan" : "Revenue"} by month. ${monthly.map(row => `${row.month}: ${currency(row.revenue)}${view.comparePlan ? `, plan ${currency(row.plan)}` : ""}`).join(". ")}`}>
              <div className="ademo-y-axis" aria-hidden="true">{[1, .75, .5, .25, 0].map(fraction => <span key={fraction}>{shortCurrency(chartMax * fraction)}</span>)}</div>
              <div className="ademo-chart-plot">
                <div className="ademo-gridlines" aria-hidden="true">{[0, 1, 2, 3, 4].map(value => <i key={value} />)}</div>
                <div className="ademo-chart-bars">{monthly.map(row => <div className="ademo-month-column" key={row.month}>
                  <div className="ademo-bar-pair">
                    <div className="ademo-bar ademo-bar-actual" style={{ height: `${row.revenue / chartMax * 100}%` }}><span>{shortCurrency(row.revenue)}</span></div>
                    {view.comparePlan && <div className="ademo-bar ademo-bar-plan" style={{ height: `${row.plan / chartMax * 100}%` }}><span>{shortCurrency(row.plan)}</span></div>}
                  </div><span className="ademo-month-name">{row.month}</span>
                </div>)}</div>
              </div>
              <figcaption className="ademo-sr-only">Revenue is the sum of the selected source rows. Plan values are illustrative. Exact values are available in the source table below.</figcaption>
            </figure>
            <div className="ademo-chart-insight"><ArrowUpRight size={16} aria-hidden="true" /><p>{view.comparePlan ? <>Selected revenue is <strong>{currency(Math.abs(summary.variance))} {summary.variance >= 0 ? "above" : "below"}</strong> the illustrative plan.</> : leadingMarket ? <><strong>{leadingMarket.region}</strong> accounts for {((leadingMarket.revenue / summary.revenue) * 100).toFixed(1)}% of revenue in this view.</> : "No records match this view."}</p><span>CALCULATED FROM SAMPLE</span></div>
          </div>
          {view.showRegions && <div className="ademo-region-card">
            <div className="ademo-chart-heading"><div><h5>Revenue by region</h5><p>{periodLabel} · same filters, another perspective</p></div><Layers3 size={17} aria-hidden="true" /></div>
            <div className="ademo-region-rows">{regional.map((row, index) => <div className="ademo-region-row" key={row.region}><div><span>{row.region}</span><strong>{currency(row.revenue)}</strong></div><div className="ademo-region-track"><span style={{ width: `${row.revenue / (leadingMarket?.revenue || 1) * 100}%`, opacity: 1 - index * .18 }} /></div><p>{((row.revenue / summary.revenue) * 100).toFixed(1)}% of selected revenue</p></div>)}</div>
          </div>}
          <p className="ademo-notice" role="status" aria-live="polite"><span aria-hidden="true" /><span>{notice}</span></p>
        </div>
      </div>
      <div className="ademo-footer">
        <details className="ademo-source-details"><summary><Database size={14} /><span>Inspect source data & calculations</span><ChevronDown size={14} /></summary><div className="ademo-details-content"><div className="ademo-details-heading"><p><strong>Sample sales dataset</strong><br />Nine synthetic monthly records. All amounts are in USD. The table below follows the current filters; the download includes all nine rows.</p><button className="ademo-small-button" onClick={downloadSample}><Download size={14} />Download sample CSV</button></div><div className="ademo-table-scroll"><table><caption className="ademo-sr-only">Selected synthetic source records</caption><thead><tr><th scope="col">Month</th><th scope="col">Region</th><th scope="col">Revenue</th><th scope="col">Illustrative plan</th></tr></thead><tbody>{rows.map(row => <tr key={`${row.month}-${row.region}`}><td>{row.month}</td><td>{row.region}</td><td>{currency(row.revenue)}</td><td>{currency(row.plan)}</td></tr>)}</tbody><tfoot><tr><th scope="row" colSpan={2}>Selected total</th><td>{currency(summary.revenue)}</td><td>{currency(summary.plan)}</td></tr></tfoot></table></div><div className="ademo-calculations"><p><strong>How the numbers work</strong><br />Revenue and plan are summed after both filters are applied. Variance = revenue − plan. Variance % = variance ÷ plan × 100. Regional share = region revenue ÷ selected total × 100.</p><p><strong>Demo assumptions</strong><br />Monthly change compares March with February when Jan–Mar is selected. Plan is a fixed, illustrative target totaling $312,000 for all nine rows. Guided buttons run predefined calculations; this demo does not connect to live AI or business systems. Saved views store only filters and chart settings in this browser.</p></div></div></details>
        <p className="ademo-disclaimer">Sample data, not business results.</p>
      </div>
    </section>
  );
}
