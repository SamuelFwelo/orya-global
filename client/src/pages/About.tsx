import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { OrbitalStage } from "@/components/OrbitalStage";
import { usePageMeta } from "@/hooks/usePageMeta";
import { process } from "@/lib/siteData";

export default function About() {
  usePageMeta(
    "About ORYA | Technology Built for Business Movement",
    "ORYA is a technology, growth and operational intelligence company working from Kinshasa across Africa and global markets.",
    "/about",
  );

  return (
    <div className="page page--about">
      <section className="page-hero">
        <div className="page-hero__grid" /><div className="page-hero__orb"><OrbitalStage compact /></div>
        <div className="container page-hero__content"><span className="eyebrow">ORYA / ABOUT</span><h1>Built for the<br /><em>next operating reality.</em></h1><p>ORYA is a technology, growth and operational intelligence company working from Kinshasa toward a more connected African business landscape.</p></div>
      </section>
      <section className="about-story section-pad">
        <div className="container">
          <div className="about-story__lead"><span className="mono">POSITION / 001</span><h2>We build digital systems that move businesses forward.</h2></div>
          <div className="about-story__body"><p>Growth, technology and operations are too often treated as separate conversations. ORYA brings them into one system. Customer acquisition connects to customer experience, automation connects to execution, and data connects to better decisions.</p><p>Our perspective begins in the Democratic Republic of Congo and extends across Africa and global markets. The goal is not technology for its own sake. It is practical, measurable movement inside the business.</p></div>
          <div className="values-grid"><div><span>01</span><h3>Clear before complex</h3><p>We make the business outcome explicit before selecting the technology.</p></div><div><span>02</span><h3>Connected by design</h3><p>We design for the full journey, not isolated channels or disconnected deliverables.</p></div><div><span>03</span><h3>Built to operate</h3><p>Our work must function in real teams, real markets and real constraints.</p></div></div>
          <div className="process-line">{process.map((step) => <div key={step.number}><span className="mono">{step.number}</span><strong>{step.title}</strong></div>)}</div>
          <div className="page-cta"><span className="eyebrow">MAKE THE NEXT MOVE</span><h2>Let’s identify what technology can improve.</h2><Link href="/contact" className="orbital-button orbital-button--light"><span>Start a conversation</span><ArrowUpRight size={18} /></Link></div>
        </div>
      </section>
    </div>
  );
}
