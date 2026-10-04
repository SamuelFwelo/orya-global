import { ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Check, Layers3, Radio, Workflow } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import { capabilities } from "@/lib/siteData";
import "./capabilities-refresh.css";

export default function Capabilities() {
  usePageMeta("ORYA Capabilities | Digital Growth & Web, AI & Automation, Analytics", "Three connected areas of expertise: digital growth and web development, AI and automation, and analytics. Explore how ORYA can help your business move forward.", "/capabilities");
  return (
    <div className="capabilities-page">
      <section className="cap-overview" aria-labelledby="cap-title">
        <div className="cap-wrap">
          <span className="cap-kicker">ORYA / CAPABILITIES</span>
          <h1 id="cap-title">A clearer way<br />to <span>move forward.</span></h1>
          <div className="cap-overview__intro"><p>Grow your business. Simplify the work. See what matters. Three connected areas of expertise, built around the outcome you need next.</p><Link href="/contact" className="cap-button">Find your starting point <ArrowUpRight size={17} /></Link></div>
          <nav className="cap-nav" aria-label="Capability sections">{capabilities.map((item) => <a href={`#${item.id}`} key={item.id}><span>{item.number}</span><strong>{item.title}</strong><ArrowDown size={17} /></a>)}</nav>
        </div>
      </section>

      <section className="cap-area cap-area--light" id="growth" aria-labelledby="growth-title">
        <div className="cap-wrap">
          <div className="cap-area__heading"><span className="cap-index">01 / GROWTH & EXPERIENCE</span><div><h2 id="growth-title">Digital growth<br />& web development.</h2><p>Getting attention and creating a great digital experience belong together. We connect the campaign with the place your customer lands, so every touchpoint has a clear purpose.</p></div></div>
          <div className="cap-growth-grid">
            <article><Radio size={25} /><span className="cap-kicker">GET FOUND</span><h3>Reach the right people.</h3><p>Build demand with a clear strategy, relevant campaigns and a measurable path from first touch to enquiry.</p><ul><li>Growth strategy & campaign planning</li><li>Paid media & lead generation</li><li>Campaign measurement</li></ul></article>
            <article><Layers3 size={25} /><span className="cap-kicker">MAKE THE NEXT STEP EASY</span><h3>Give interest a place to go.</h3><p>Build useful digital experiences that help people understand your business, find what they need and take action.</p><ul><li>Business websites & landing pages</li><li>E-commerce experiences</li><li>Client portals & custom platforms</li></ul></article>
          </div>
          <div className="cap-outcome"><span><Check size={17} /> A connected path from discovery to customer action.</span><Link href="/contact">Talk about growth & web <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="cap-area" id="automation" aria-labelledby="automation-title">
        <div className="cap-wrap">
          <div className="cap-area__heading"><span className="cap-index">02 / CONNECTED OPERATIONS</span><div><h2 id="automation-title">AI & automation.</h2><p>Make everyday work move with less manual effort. We connect your tools, customer conversations and team workflows around how your business actually operates.</p></div></div>
          <div className="cap-detail-grid"><div><h3>Less repetition.<br />More useful work.</h3><p>From handling a new enquiry to keeping a team informed, automation should make the next step clear and put the right information in the right place.</p><ul className="cap-service-list">{capabilities[1].services.map((service) => <li key={service}><Check size={14} />{service}</li>)}</ul></div><div className="cap-workflow"><span className="cap-kicker">AN EXAMPLE WORKFLOW</span><div><span><Radio size={18} /> New enquiry</span><ArrowDown size={16} /><span><Workflow size={18} /> Route & organize</span><ArrowDown size={16} /><span><Check size={18} /> Follow up with context</span></div><p>Keep people in control of the decisions that need them.</p></div></div>
          <div className="cap-outcome"><span><Check size={17} /> Clearer handoffs. Less repetitive work.</span><Link href="/contact">Talk about automation <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="cap-area cap-area--light" id="analytics" aria-labelledby="analytics-title">
        <div className="cap-wrap">
          <div className="cap-area__heading"><span className="cap-index">03 / BUSINESS CLARITY</span><div><h2 id="analytics-title">Analytics.</h2><p>Bring scattered information into a shared view of the business. We turn your data into practical reporting that helps your team understand performance and decide what to do next.</p></div></div>
          <div className="cap-detail-grid"><div><h3>Meet Orya Analytics.</h3><p>Bring your spreadsheets into a clearer workflow: ask a question, explore the dashboard and save a view you can return to. Try the interactive demo with sample sales data.</p><ul className="cap-service-list">{capabilities[2].services.map((service) => <li key={service}><Check size={14} />{service}</li>)}</ul></div><div className="cap-insight"><BarChart3 size={30} /><span className="cap-kicker">FROM INFORMATION TO UNDERSTANDING</span><h3>One shared view.</h3><div className="cap-insight__sources"><span>Campaign data</span><span>Customer activity</span><span>Operations</span></div><div className="cap-insight__questions"><span>What’s working?</span><ArrowRight size={14} /><span>What needs attention?</span><ArrowRight size={14} /><span>What comes next?</span></div></div></div>
          <div className="cap-outcome"><span><Check size={17} /> Useful reporting. Better-informed decisions.</span><Link href="/analytics">Explore Orya Analytics & the demo <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>
    </div>
  );
}
