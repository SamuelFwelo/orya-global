import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { CapabilityOrbit, OrbitalStage } from "@/components/OrbitalStage";
import { outcomes, process, signalJourney } from "@/lib/siteData";

const heroImage = "/manus-storage/orya-kinshasa-horizon_246caae4.jpg";
const projectImage = "/manus-storage/orya-signal-billboard_b906c289.jpg";
const logo = "/manus-storage/orya-official-logo-cropped_1cbe2481.png";

function Intro() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem("orya-intro-seen") || reduceMotion) return;
    setVisible(true);
    sessionStorage.setItem("orya-intro-seen", "true");
    const timer = window.setTimeout(() => setVisible(false), 2250);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <div className="intro__system">
            <motion.div className="intro__orbit intro__orbit--one" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
            <motion.div className="intro__orbit intro__orbit--two" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
            <motion.div className="intro__star" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: [0.8, 1.3, 1] }} transition={{ delay: 0.7, duration: 0.65 }} />
          </div>
          <motion.img src={logo} alt="" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.6 }} />
          <motion.span className="intro__status mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>SYSTEM ONLINE / 001</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  return <motion.div ref={ref} className={className} initial={reduceMotion ? false : { opacity: 0, y: 34 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export default function Home() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handlePointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || window.innerWidth < 900) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
  };

  return (
    <>
      <Intro />
      <section className="hero" onPointerMove={handlePointer}>
        <motion.div className="hero__image" style={{ backgroundImage: `url(${heroImage})` }} animate={{ x: cursor.x * -12, y: cursor.y * -8, scale: 1.035 }} transition={{ type: "spring", stiffness: 40, damping: 20 }} />
        <div className="hero__veil" />
        <div className="hero__grid" />
        <motion.div className="hero__orbital" animate={{ x: cursor.x * 22, y: cursor.y * 16 }} transition={{ type: "spring", stiffness: 45, damping: 18 }}><OrbitalStage /></motion.div>
        <div className="container hero__content">
          <motion.div className="hero__copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="hero__kicker"><span className="signal-dot" />TECHNOLOGY / GROWTH / INTELLIGENCE</div>
            <h1>Digital systems<br />that move business<br /><em>forward.</em></h1>
            <p>ORYA combines digital growth, web development, automation and operational intelligence to help ambitious companies grow and operate more effectively.</p>
            <div className="hero__actions">
              <Link href="/contact" className="orbital-button orbital-button--light"><span>Book a discovery call</span><ArrowUpRight size={18} /></Link>
              <Link href="/capabilities" className="text-link">Explore our capabilities <ArrowRight size={17} /></Link>
            </div>
          </motion.div>
          <div className="hero__rail">
            <span className="mono">ORYA / SYSTEM 001</span>
            <div><small>FOCUS</small><strong>MEASURABLE<br />BUSINESS MOVEMENT</strong></div>
            <div><small>OPERATING FROM</small><strong>KINSHASA<br />TO THE WORLD</strong></div>
          </div>
          <a href="#introduction" className="scroll-cue"><ArrowDown size={15} /><span>ENTER THE SYSTEM</span></a>
        </div>
      </section>

      <section id="introduction" className="intro-section section-pad">
        <div className="container">
          <div className="section-index"><span className="mono">01 / ORIENTATION</span><span className="section-index__line" /></div>
          <Reveal className="intro-statement">
            <span className="eyebrow">WHY ORYA EXISTS</span>
            <h2>Technology connected<br />to <em>business outcomes.</em></h2>
            <p>We identify where technology can save time, improve customer experiences or create new revenue. Then we design and build the systems required to make that improvement operational.</p>
          </Reveal>
          <div className="outcome-grid">
            {outcomes.map((outcome, index) => (
              <Reveal key={outcome} className="outcome-card">
                <span className="mono">0{index + 1}</span><p>{outcome}</p><ChevronRight size={18} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities-section section-pad">
        <div className="capabilities-section__beam" />
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><span className="eyebrow">02 / CONNECTED CAPABILITIES</span><h2>One system.<br /><em>Four forces.</em></h2></div>
            <p>Not separate agency services. A connected operating model designed around what the business needs to achieve next.</p>
          </div>
          <CapabilityOrbit />
          <Link href="/capabilities" className="section-link">View all capabilities <ArrowUpRight size={18} /></Link>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><span className="eyebrow">03 / FEATURED SYSTEM</span><h2>Physical visibility.<br /><em>Digital action.</em></h2></div>
            <p>An ORYA × Congo Graphic partnership concept connecting out-of-home visibility to measurable customer journeys.</p>
          </div>
          <Reveal className="project-frame">
            <img src={projectImage} alt="Urban billboard and smartphone user representing a physical-to-digital customer journey" />
            <div className="project-frame__overlay" />
            <div className="project-frame__label"><span className="signal-dot" />PARTNERSHIP CONCEPT / KINSHASA</div>
            <div className="project-frame__number mono">CG—01</div>
            <Link href="/work" className="project-frame__link">Explore the system <ArrowUpRight /></Link>
          </Reveal>
          <div className="signal-journey">
            {signalJourney.map((stage, index) => (
              <div className="signal-stage" key={stage}>
                <div className="signal-stage__track"><span /><i style={{ animationDelay: `${index * 0.42}s` }} /></div>
                <small className="mono">0{index + 1}</small><strong>{stage}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><span className="eyebrow">04 / HOW WE WORK</span><h2>From complexity<br />to <em>movement.</em></h2></div>
            <p>Every engagement follows a clear path from understanding the real problem to improving the live system.</p>
          </div>
          <div className="process-grid">
            {process.map((step, index) => (
              <Reveal className="process-step" key={step.number}>
                <span className="process-step__number mono">{step.number}</span>
                <div className="process-step__orbit"><i /></div>
                <h3>{step.title}</h3><p>{step.copy}</p>
                {index < process.length - 1 && <ArrowRight className="process-step__arrow" size={18} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="global-section">
        <div className="global-section__grid" />
        <div className="global-section__orb"><OrbitalStage compact /></div>
        <div className="container global-section__content">
          <Reveal>
            <span className="eyebrow">05 / POSITION</span>
            <h2>Local understanding.<br /><em>Global execution.</em></h2>
            <p>ORYA combines an understanding of how businesses operate in the DRC and across Africa with modern technology, design and growth capabilities.</p>
            <Link href="/about" className="text-link text-link--large">Meet ORYA <ArrowUpRight size={18} /></Link>
          </Reveal>
          <div className="global-section__coordinates mono"><span>KINSHASA</span><strong>04.3250° S<br />15.3222° E</strong><span>AFRICA / GLOBAL</span></div>
        </div>
      </section>
    </>
  );
}
