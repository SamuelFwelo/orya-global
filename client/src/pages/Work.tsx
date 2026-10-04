import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const exampleJourney = [
  {
    title: "Campaign",
    copy: "Connect a useful message to the people it is designed to reach. Give every campaign a clear destination.",
  },
  {
    title: "Landing page",
    copy: "Bring the offer, the information and the next action together in one focused web experience.",
  },
  {
    title: "Conversation",
    copy: "Let an interested visitor start a WhatsApp conversation or send an enquiry with the context your team needs.",
  },
  {
    title: "CRM & follow-up",
    copy: "Keep customer details together, assign an owner and make the next step visible to the people doing the work.",
  },
  {
    title: "Reporting",
    copy: "Bring campaign, enquiry and follow-up activity into a shared view so the team can decide what to improve.",
  },
];

export default function Work() {
  usePageMeta(
    "ORYA Work | Connected Business Systems",
    "Explore an illustrative ORYA customer journey connecting campaigns, landing pages, WhatsApp, CRM follow-up and business reporting.",
    "/work",
  );

  return (
    <div className="page page--work">
      <section className="page-hero" aria-labelledby="work-heading">
        <div className="container page-hero__content">
          <span className="eyebrow">ORYA / ILLUSTRATIVE SYSTEM</span>
          <h1 id="work-heading">From attention<br /><em>to action.</em></h1>
          <p>A connected customer journey, from the first campaign touch to a clear next step for your team. Explore how ORYA brings growth, digital experiences, automation and reporting together.</p>
        </div>
      </section>

      <section className="case-study section-pad" aria-labelledby="example-heading">
        <div className="container">
          <div className="case-study__intro">
            <span className="mono">A CONNECTED JOURNEY</span>
            <h2 id="example-heading">One customer journey.<br />Every step connected.</h2>
            <p>A campaign earns attention. A landing page makes the next action clear. A conversation captures the need, a workflow supports follow-up, and reporting helps the team see what happens next.</p>
          </div>

          <div className="journey-large">
            {exampleJourney.map((stage, index) => (
              <article key={stage.title} className="journey-large__step">
                <span className="mono">0{index + 1}</span>
                <i aria-hidden="true" />
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </article>
            ))}
          </div>

          <div className="case-study__note">
            <span className="signal-dot" aria-hidden="true" />
            <p>This is an illustrative system example. The tools, connections and measures are defined around each business and its project scope.</p>
          </div>

          <div className="page-cta">
            <span className="eyebrow">CONNECT YOUR CUSTOMER JOURNEY</span>
            <h2>What should work better in your business?</h2>
            <Link href="/contact" className="orbital-button orbital-button--light">
              <span>Discuss a project</span><ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
