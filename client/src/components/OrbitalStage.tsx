import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/siteData";

export function OrbitalStage({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`orbital-stage ${compact ? "orbital-stage--compact" : ""}`} aria-hidden="true">
      <div className="orbital-stage__halo" />
      <motion.div
        className="orbital-stage__system"
        animate={reduceMotion ? undefined : { rotateZ: [0, 3, 0, -3, 0], rotateX: [62, 66, 62] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span className="orbit orbit--a"><i /></span>
        <span className="orbit orbit--b"><i /></span>
        <span className="orbit orbit--c"><i /></span>
        <span className="orbit orbit--d"><i /></span>
      </motion.div>
      <div className="orbital-stage__core"><i /></div>
      <div className="orbital-stage__coordinate mono">04°19'30.0"S<br />15°19'20.0"E</div>
    </div>
  );
}

export function CapabilityOrbit() {
  const [active, setActive] = useState(0);
  const capability = capabilities[active];

  return (
    <div className="capability-orbit">
      <div className="capability-orbit__visual" aria-label="Select a capability">
        <div className="capability-orbit__rings" aria-hidden="true">
          <span /><span /><span />
          <i className="capability-orbit__light" />
        </div>
        {capabilities.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`capability-node capability-node--${index + 1} ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span className="capability-node__dot" />
            <span className="capability-node__label"><small>{item.number}</small>{item.shortTitle}</span>
          </button>
        ))}
        <div className="capability-orbit__core"><span>ORYA</span><small>CONNECTED<br />SYSTEM</small></div>
      </div>

      <motion.div
        key={capability.id}
        className="capability-orbit__content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">CAPABILITY / {capability.number}</span>
        <h3>{capability.title}</h3>
        <p>{capability.statement}</p>
        <ul>
          {capability.services.map((service) => <li key={service}>{service}</li>)}
        </ul>
        <div className="capability-outcome">
          <span className="signal-dot" />
          <div><small>BUSINESS OUTCOME</small><strong>{capability.outcome}</strong></div>
          <ArrowUpRight size={18} />
        </div>
      </motion.div>
    </div>
  );
}
