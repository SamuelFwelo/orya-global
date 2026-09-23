import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { signalJourney } from "@/lib/siteData";

const projectImage = "/manus-storage/orya-signal-billboard_b906c289.jpg";

export default function Work() {
  return (
    <div className="page page--work">
      <section className="page-hero page-hero--image" style={{ backgroundImage: `url(${projectImage})` }}>
        <div className="page-hero__shade" />
        <div className="container page-hero__content">
          <span className="eyebrow">ORYA × CONGO GRAPHIC / PARTNERSHIP CONCEPT</span>
          <h1>Physical visibility.<br /><em>Digital action.</em></h1>
          <p>Connecting public attention to websites, WhatsApp conversations, customer enquiries and campaign intelligence.</p>
        </div>
      </section>
      <section className="case-study section-pad">
        <div className="container">
          <div className="case-study__intro"><span className="mono">SYSTEM / CG—01</span><h2>One connected journey from public space to measurable customer action.</h2><p>Physical advertising creates scale and visibility. ORYA adds the digital layer required to turn that visibility into a clear next step—and to understand what happens after attention is earned.</p></div>
          <div className="journey-large">
            {signalJourney.map((stage, index) => <div key={stage} className="journey-large__step"><span className="mono">0{index + 1}</span><i /><h3>{stage}</h3><p>{["Build awareness in high-traffic physical environments.", "Extend the message through targeted digital media.", "Give every prospect an immediate path to act.", "Capture and organize customer intent for follow-up.", "Measure the journey and improve what happens next."][index]}</p></div>)}
          </div>
          <div className="case-study__note"><span className="signal-dot" /><p>This is presented as a partnership concept. Performance claims will be added only when verified campaign data is available.</p></div>
          <div className="page-cta"><span className="eyebrow">CONNECT YOUR CUSTOMER JOURNEY</span><h2>Build the path from attention to action.</h2><Link href="/contact" className="orbital-button orbital-button--light"><span>Discuss a project</span><ArrowUpRight size={18} /></Link></div>
        </div>
      </section>
    </div>
  );
}
