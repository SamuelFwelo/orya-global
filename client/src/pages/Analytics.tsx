import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Check, FileSpreadsheet, Layers3, MessageSquare, Plus, Save, Sparkles } from "lucide-react";
import { Link } from "wouter";
import AnalyticsDemo from "@/components/AnalyticsDemo";
import { usePageMeta } from "@/hooks/usePageMeta";
import "./analytics-page.css";

const workflow = [
  { number: "01", icon: FileSpreadsheet, title: "Bring the files you have.", copy: "Start with your spreadsheets. Identify the tables, measures and periods that matter, and review the preparation before building an analysis.", note: "Keep the source. Understand the changes." },
  { number: "02", icon: MessageSquare, title: "Follow the next question.", copy: "See monthly revenue. Break it down by region. Put the plan beside the actuals. Build on the same analysis as your questions become more specific.", note: "One dashboard. A clearer picture." },
  { number: "03", icon: Save, title: "Save a view worth returning to.", copy: "Keep the filters and comparisons that help you understand the business. Return to a saved view and pick up the analysis where you left it.", note: "Turn a useful answer into a repeatable review." },
];
const faqs = [
  { question: "What can I try in the demo?", answer: "Explore an illustrative sales dataset, view monthly revenue, add a regional breakdown and compare actuals with a sample plan. You can filter the view, inspect the source records, and save and reopen your demo view." },
  { question: "Can I use my own spreadsheets?", answer: "This preview uses sample data. To explore your own Excel, CSV or TSV files, start a conversation with ORYA. We’ll review your data, the questions you need to answer and the right setup for your team." },
  { question: "Is the demo connected to a live AI assistant?", answer: "The demo uses guided questions and calculations on sample records. It shows how a question can change a dashboard. A production workspace and any AI integrations are scoped around your business, data and tools." },
  { question: "Where does my saved demo view go?", answer: "Your demo view is saved in this browser on this device. It does not create an account or publish a report. Clearing this site’s browser data removes saved demo views." },
];

function AnalyticsPreview() {
  return (
    <div className="analytics-preview" aria-label="Illustrative quarterly revenue preview">
      <div className="analytics-preview__top"><span><BarChart3 size={16} /> ORYA ANALYTICS</span><span>SALES EXAMPLE</span></div>
      <div className="analytics-preview__question"><Sparkles size={16} /><span>Show monthly revenue</span><ArrowUpRight size={16} /></div>
      <div className="analytics-preview__metric"><span>Revenue / January–March</span><strong>$324,000 <small>USD</small></strong></div>
      <div className="analytics-preview__chart" role="img" aria-label="Sample revenue: January 92,000 dollars, February 108,000 dollars, March 124,000 dollars.">{[{month:"Jan",amount:"$92k",height:59},{month:"Feb",amount:"$108k",height:70},{month:"Mar",amount:"$124k",height:80}].map(item=><div key={item.month}><span>{item.amount}</span><i style={{height:item.height}} /><small>{item.month}</small></div>)}</div>
      <a href="#analytics-demo" className="analytics-preview__followup"><Plus size={15} /> Explore the interactive dashboard <ArrowRight size={15} /></a>
      <p>Illustrative sales data. Try the interactive demo below.</p>
    </div>
  );
}

export default function Analytics() {
  usePageMeta("ORYA Analytics | From Spreadsheets to Clearer Decisions", "Explore ORYA Analytics: a connected workflow for spreadsheets, questions, dashboards and saved views. Try an interactive sales demo with sample data.", "/analytics");
  return (
    <div className="analytics-page">
      <section className="analytics-hero analytics-wrap" aria-labelledby="analytics-title">
        <div className="analytics-hero__copy"><Link href="/capabilities" className="analytics-back"><ArrowLeft size={12} /> CAPABILITIES / ANALYTICS</Link><h1 id="analytics-title">Your spreadsheets.<br />A clearer way<br />{" "}<span>forward.</span></h1><p>Turn business data into dashboards you can understand, question and use. Meet Orya Analytics: a clearer connection between the files you have and the decisions ahead.</p><div className="analytics-actions"><a href="#analytics-demo" className="analytics-button">Try the interactive demo <ArrowDown size={16} /></a><Link href="/contact" className="analytics-text-link">Talk about your data <ArrowUpRight size={15} /></Link></div><div className="analytics-hero__note"><span /> SAMPLE DATA · NO SIGN-IN NEEDED</div></div>
        <AnalyticsPreview />
      </section>
      <div className="analytics-audience analytics-wrap"><span>For the people running the business.</span><div><span>Finance</span><span>Operations</span><span>Leadership</span></div></div>

      <section className="analytics-demo-section analytics-wrap" id="analytics-demo" aria-labelledby="analytics-demo-title">
        <div className="analytics-section-heading"><div><span className="analytics-kicker">TAKE A CLOSER LOOK</span><h2 id="analytics-demo-title">Start with a question.<br /><span>See the answer take shape.</span></h2></div><p>Explore a sample quarter. Add a new perspective.<br />Keep the view that makes things clearer.</p></div>
        <AnalyticsDemo />
      </section>

      <section className="analytics-workflow" id="analytics-workflow" aria-labelledby="analytics-workflow-title"><div className="analytics-wrap"><div className="analytics-section-heading"><div><span className="analytics-kicker">FROM FILE TO DECISION</span><h2 id="analytics-workflow-title">A workflow that starts<br /><span>where your data lives.</span></h2></div><p>Your spreadsheets are the starting point.<br />A useful business question gives them direction.</p></div><div className="analytics-workflow__grid">{workflow.map(step=><article key={step.number}><div><span>{step.number}</span><step.icon size={20} /></div><h3>{step.title}</h3><p>{step.copy}</p><small>{step.note}</small></article>)}</div></div></section>

      <section className="analytics-review analytics-wrap" aria-labelledby="analytics-review-title"><div><span className="analytics-kicker">ACTUALS, PLANS & THE REASONS BETWEEN</span><h2 id="analytics-review-title">Put the plan beside<br /><span>what actually happened.</span></h2><p>A total tells you where you are. A comparison helps you ask why. Bring the plan and the actual results into the same conversation, with the sources and assumptions close by.</p><ul><li><Check size={16} /><span>Compare the same measures and periods.</span></li><li><Check size={16} /><span>See the difference in dollars and percentages.</span></li><li><Check size={16} /><span>Inspect the records behind the result.</span></li></ul><a href="#analytics-demo" className="analytics-text-link">Explore the sample comparison <ArrowUpRight size={15} /></a></div><div className="analytics-review__visual"><span className="analytics-kicker"><Layers3 size={14} /> ONE SHARED REVIEW</span><div className="analytics-review__sources"><span><FileSpreadsheet size={19} /><strong>Financial plan</strong><small>What you expected</small></span><span><BarChart3 size={19} /><strong>Actual results</strong><small>What happened</small></span></div><div className="analytics-review__join"><span /><ArrowDown size={18} /></div><div className="analytics-review__answer"><span>THE NEXT USEFUL QUESTION</span><h3>Where did the<br />difference come from?</h3><p>Follow the period. Look at the region.<br />Keep the source in view.</p><div><span>Sources</span><span>Measures</span><span>Assumptions</span></div></div></div></section>

      <section className="analytics-faq analytics-wrap" aria-labelledby="analytics-faq-title"><div><span className="analytics-kicker">BEFORE YOU BEGIN</span><h2 id="analytics-faq-title">A few useful<br /><span>answers.</span></h2></div><div>{faqs.map(faq=><details key={faq.question}><summary>{faq.question}<Plus size={17} /></summary><p>{faq.answer}</p></details>)}</div></section>
      <section className="analytics-close"><div className="analytics-wrap"><span className="analytics-kicker">MAKE WHAT’S NEXT.</span><h2>Start with the files you have.<br /><span>Find your next move.</span></h2><p>Let’s connect your data to the questions that matter to your business.</p><Link href="/contact" className="analytics-button">Book a discovery call <ArrowUpRight size={17} /></Link></div></section>
    </div>
  );
}
