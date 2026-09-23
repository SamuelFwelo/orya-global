import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { OrbitalStage } from "@/components/OrbitalStage";
import { usePageMeta } from "@/hooks/usePageMeta";
import { capabilities } from "@/lib/siteData";

export default function Capabilities() {
  usePageMeta(
    "ORYA Capabilities | Growth, Automation & Intelligence",
    "Explore ORYA capabilities in digital growth, web development, AI automation and operational intelligence.",
    "/capabilities",
  );

  return (
    <div className="page page--capabilities">
      <section className="page-hero">
        <div className="page-hero__grid" />
        <div className="page-hero__orb"><OrbitalStage compact /></div>
        <div className="container page-hero__content">
          <span className="eyebrow">ORYA / CAPABILITIES</span>
          <h1>Four forces.<br /><em>One direction.</em></h1>
          <p>We connect customer growth, digital products, automation and operational intelligence around the business outcome, not the channel.</p>
        </div>
      </section>
      <section className="capability-list section-pad">
        <div className="container">
          {capabilities.map((capability) => (
            <article className="capability-row" id={capability.id} key={capability.id}>
              <span className="capability-row__number mono">{capability.number}</span>
              <div><span className="eyebrow">{capability.shortTitle}</span><h2>{capability.title}</h2></div>
              <div className="capability-row__body"><p>{capability.statement}</p><ul>{capability.services.map((service) => <li key={service}>{service}</li>)}</ul></div>
              <div className="capability-row__outcome"><small>OUTCOME</small><strong>{capability.outcome}</strong></div>
            </article>
          ))}
          <div className="page-cta"><span className="eyebrow">NOT SURE WHERE TO START?</span><h2>Start with the business problem.</h2><Link href="/contact" className="orbital-button orbital-button--light"><span>Talk to ORYA</span><ArrowUpRight size={18} /></Link></div>
        </div>
      </section>
    </div>
  );
}
