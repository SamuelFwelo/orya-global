import { useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Check, CircleDot, Globe2, Layers3, Link2, MessageCircle, MousePointer2, Plus, Radio, Workflow } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import { capabilities, process } from "@/lib/siteData";
import "./home-refresh.css";

const journey = [
  {
    label: "Get discovered", category: "Digital growth", icon: Radio,
    heading: "Give attention somewhere to go.",
    copy: "Connect a campaign, a social post or a physical touchpoint to one clear next step. Every channel becomes the beginning of a customer journey.",
    source: "Campaign or QR code", action: "A focused landing page", output: "A traceable visit",
    detail: "Keep the campaign source attached to the visit, so your team can see where interest starts.",
    next: "Make the next action easy to take.",
  },
  {
    label: "Create action", category: "Web & digital products", icon: MousePointer2,
    heading: "Turn a visit into a conversation.",
    copy: "Give people the information they need and a simple way to act. A focused website and a connected WhatsApp journey turn interest into an enquiry.",
    source: "An interested visitor", action: "An enquiry or WhatsApp chat", output: "A clear customer need",
    detail: "Capture the service they need and how they found you, without adding unnecessary steps.",
    next: "Help the right person follow up.",
  },
  {
    label: "Connect the work", category: "AI & automation", icon: Workflow,
    heading: "Keep the next step moving.",
    copy: "Route an enquiry to the right person, keep the customer context together and trigger the next task. Less copying between tools. More time for the work that matters.",
    source: "A new enquiry", action: "A connected CRM workflow", output: "An assigned next step",
    detail: "Define the owner, the follow-up and the status in one workflow your team can actually use.",
    next: "See what happens across the whole journey.",
  },
  {
    label: "See what works", category: "Analytics", icon: BarChart3,
    heading: "Make the whole journey visible.",
    copy: "Bring campaign, enquiry and operational data together. See which channels create useful conversations and where the journey needs attention.",
    source: "Campaign + CRM activity", action: "A shared business view", output: "A better next decision",
    detail: "Review the journey from first touch to follow-up using agreed definitions and connected reporting.",
    next: "Use what you learn to improve the system.",
  },
];

const faqs = [
  { question: "Where would we start?", answer: "With the business problem. In a discovery conversation, we look at your goals, customer journey, current tools and constraints. Then we define a focused first step and the outcomes it should support." },
  { question: "Do we need every service?", answer: "No. An engagement can start with a single need, such as a website, a campaign, an automated workflow or a business dashboard. We connect the relevant capabilities around what your business needs next." },
  { question: "Can you work with our existing systems?", answer: "We begin by reviewing what you already use. Where the tools and available access support it, we connect and improve those systems. Any new tools or changes are defined as part of the project scope." },
  { question: "Do you work outside Kinshasa?", answer: "Yes. ORYA brings an understanding of businesses in the DRC and across Africa to work with companies locally and globally. We agree on the collaboration approach around your team and project." },
];

function BusinessVisual() {
  return (
    <div className="business-visual" aria-hidden="true">
      <div className="business-visual__grid" />
      <div className="business-visual__caption"><span /> CONNECTED BY DESIGN</div>
      <div className="business-visual__orbit business-visual__orbit--outer" />
      <div className="business-visual__orbit business-visual__orbit--inner" />
      <div className="business-visual__orbit business-visual__orbit--tilted" />
      <div className="business-visual__core"><span className="business-visual__spark">✳</span><span>Your business</span><small>Moving forward.</small></div>
      <div className="business-node business-node--growth"><Radio size={17} /><span>Growth</span><span className="business-node__dot" /></div>
      <div className="business-node business-node--experience"><Layers3 size={17} /><span>Experience</span></div>
      <div className="business-node business-node--automation"><Workflow size={17} /><span>Automation</span></div>
      <div className="business-node business-node--intelligence"><BarChart3 size={17} /><span>Intelligence</span><span className="business-node__dot" /></div>
      <div className="business-visual__foot"><span>Connected capabilities.</span><span>One connected system. <ArrowUpRight size={13} /></span></div>
    </div>
  );
}

function JourneyExample() {
  const [active, setActive] = useState(0);
  const step = journey[active];
  const Icon = step.icon;
  return (
    <section className="flow-example flow-wrap" id="connected-journey" aria-labelledby="journey-heading">
      <div className="flow-example__surface">
        <div className="flow-example__meta"><span><CircleDot size={15} /> ORYA / IN PRACTICE</span><span>Illustrative customer journey</span></div>
        <div className="flow-example__heading"><h2 id="journey-heading">Attention is the start.<br />What happens next matters.</h2><p>Explore how a connected system turns<br className="desktop-break" /> a first touch into a useful next step.</p></div>
        <div className="journey-selector" role="group" aria-label="Explore the customer journey">
          {journey.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="journey-detail" className={active === index ? "is-selected" : ""} onClick={() => setActive(index)}><span className="journey-selector__number">0{index + 1}</span><span>{item.label}</span><ArrowDownRight size={16} aria-hidden="true" /></button>)}
        </div>
        <div className="journey-detail" id="journey-detail" aria-live="polite" aria-atomic="true">
          <div className="journey-detail__copy"><span className="flow-kicker"><Icon size={15} aria-hidden="true" />{step.category}</span><h3>{step.heading}</h3><p>{step.copy}</p><Link href={active === 3 ? "/analytics" : "/capabilities"} className="flow-text-link">Explore this capability <ArrowUpRight size={16} /></Link></div>
          <div className="journey-diagram">
            <div className="journey-diagram__head"><span>A connected handoff</span><span>0{active + 1} / 04</span></div>
            <div className="journey-diagram__path">
              <div className="journey-diagram__input"><span className="journey-diagram__icon"><Icon size={19} /></span><div><small>START WITH</small><strong>{step.source}</strong></div></div>
              <div className="journey-diagram__connector"><span /><ArrowDown size={14} /></div>
              <div className="journey-diagram__action"><Link2 size={18} /><strong>{step.action}</strong><Check size={16} /></div>
              <div className="journey-diagram__connector"><span /><ArrowDown size={14} /></div>
              <div className="journey-diagram__output"><div><small>MAKE POSSIBLE</small><strong>{step.output}</strong></div><ArrowUpRight size={22} /></div>
            </div><p>{step.detail}</p>
          </div>
        </div>
        <div className="flow-example__next"><span><span className="flow-status-dot" /> BUILT TO KEEP MOVING</span><p>{step.next}</p></div>
      </div>
      <div className="flow-example__note"><span>One journey. Connected from end to end.</span><Link href="/work">Explore a connected workflow <ArrowUpRight size={14} /></Link></div>
    </section>
  );
}

export default function Home() {
  usePageMeta("ORYA | Digital Growth, Automation & Business Intelligence", "ORYA connects digital growth, web experiences, automation and operational intelligence to help ambitious businesses move forward. Based in Kinshasa. Built for a connected world.", "/");
  return (
    <div className="flow-home">
      <section className="flow-hero flow-wrap" aria-labelledby="home-heading">
        <div className="flow-hero__copy"><span className="flow-kicker"><span className="flow-status-dot" /> TECHNOLOGY, WITH A BUSINESS PURPOSE</span><h1 id="home-heading">Your next move.<br /><em>Connected.</em></h1><p>Turn ambition into a business that works better. ORYA connects digital growth, web experiences, automation and intelligence to move you forward.</p><div className="flow-hero__actions"><Link href="/contact" className="flow-button">Book a discovery call <ArrowUpRight size={18} /></Link><a href="#connected-journey" className="flow-text-link">See how it connects <ArrowDown size={15} /></a></div><div className="flow-hero__location"><Globe2 size={14} /><span>ROOTED IN KINSHASA. CONNECTED TO THE WORLD.</span></div></div>
        <BusinessVisual />
      </section>
      <JourneyExample />
      <section className="flow-context flow-wrap" aria-labelledby="context-heading">
        <div className="flow-context__copy"><span className="flow-kicker">YOUR BUSINESS, BEFORE THE TECHNOLOGY</span><h2 id="context-heading">Better systems start<br />with understanding<br /><em>how you work.</em></h2><p>Your customers, your team, your constraints. We start there. Then we connect the strategy, experiences and tools around the outcomes that matter to your business.</p><Link href="/about" className="flow-text-link">Get to know ORYA <ArrowUpRight size={16} /></Link></div>
        <div className="business-context"><span className="business-context__label">THE PIECES YOU WORK WITH</span><div className="business-context__sources"><span><MessageCircle size={16} /> Customer conversations</span><span><Layers3 size={16} /> Everyday tools</span><span><BarChart3 size={16} /> Business data</span></div><div className="business-context__join"><span /><ArrowDown size={17} /></div><div className="business-context__definition"><span className="flow-kicker">A SHARED DIRECTION</span><h3>What should work better?</h3><p>Agree on the problem, define a useful outcome and build the connections that make it possible.</p><div><span>Clear priorities</span><span>Connected workflows</span><span>Useful measurement</span></div></div><p className="business-context__foot"><Check size={15} /> Built around your business. Designed to work together.</p></div>
      </section>
      <section className="flow-capabilities" aria-labelledby="capabilities-heading"><div className="flow-wrap"><div className="flow-section-heading"><div><span className="flow-kicker">THREE AREAS. ONE CONNECTED BUSINESS.</span><h2 id="capabilities-heading">More ways to<br /><em>move forward.</em></h2></div><p>Start with what your business needs now.<br />Connect what comes next.</p></div><div className="flow-capability-list">{capabilities.map((capability) => <Link href={capability.id === "analytics" ? "/analytics" : "/capabilities"} className="flow-capability" key={capability.id}><span className="flow-capability__number">{capability.number}</span><div className="flow-capability__title"><span>{capability.title}</span><h3>{capability.outcome}</h3></div><p>{capability.statement}</p><span className="flow-capability__arrow"><ArrowUpRight size={22} aria-hidden="true" /></span></Link>)}</div></div></section>
      <section className="flow-process flow-wrap" aria-labelledby="process-heading"><div className="flow-section-heading"><div><span className="flow-kicker">A CLEAR PATH FROM IDEA TO IMPACT</span><h2 id="process-heading">Build it. Connect it.<br /><em>Keep improving it.</em></h2></div><Link href="/contact" className="flow-text-link">Let’s talk about your next step <ArrowUpRight size={16} /></Link></div><div className="flow-process__steps">{process.map((step) => <article key={step.number}><div><span>{step.number}</span><ArrowRight size={18} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
      <section className="flow-faq flow-wrap" aria-labelledby="faq-heading"><div><span className="flow-kicker">A FEW THINGS YOU MIGHT BE WONDERING</span><h2 id="faq-heading">Good questions.<br /><em>Clear answers.</em></h2><p>Have something else in mind?</p><Link href="/contact" className="flow-text-link">Talk to our team <ArrowUpRight size={16} /></Link></div><div className="flow-faq__list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus size={18} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></section>
      <section className="flow-cta" aria-labelledby="cta-heading"><div className="flow-wrap flow-cta__inner"><div><span className="flow-kicker">MAKE WHAT’S NEXT.</span><h2 id="cta-heading">Let’s connect<br />your <em>next move.</em></h2><p>Start with a conversation about what your business could do better.</p><Link href="/contact" className="flow-button">Book a discovery call <ArrowUpRight size={18} /></Link></div><div className="flow-cta__art" aria-hidden="true"><span /><span /><span /><i>✳</i></div></div></section>
    </div>
  );
}
