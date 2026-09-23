import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/siteData";

export function OrbitalStage({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`orbital-stage ${compact ? "orbital-stage--compact" : ""}`} aria-hidden="true">
      <div className="orbital-stage__halo" />
      <div className="orbital-stage__system">
        <span className="orbit orbit--a"><i /></span>
        <span className="orbit orbit--b"><i /></span>
        <span className="orbit orbit--c"><i /></span>
        <span className="orbit orbit--d"><i /></span>
      </div>
      <div className="orbital-stage__core"><i /></div>
      <div className="orbital-stage__coordinate mono">04°19'30.0"S<br />15°19'20.0"E</div>
    </div>
  );
}

export function CapabilityOrbit() {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const capability = capabilities[active];

  const select = (index: number) => {
    const next = (index + capabilities.length) % capabilities.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(capabilities.length - 1);
    }
  };

  return (
    <div className="capability-orbit">
      <div className="capability-orbit__visual" role="tablist" aria-label="ORYA capabilities">
        <div className="capability-orbit__rings" aria-hidden="true">
          <span /><span /><span />
          <i className="capability-orbit__light" />
        </div>
        {capabilities.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => { buttons.current[index] = element; }}
            id={`capability-tab-${item.id}`}
            type="button"
            role="tab"
            className={`capability-node capability-node--${index + 1} ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            aria-selected={active === index}
            aria-controls={`capability-panel-${item.id}`}
            tabIndex={active === index ? 0 : -1}
          >
            <span className="capability-node__dot" />
            <span className="capability-node__label"><small>{item.number}</small>{item.shortTitle}</span>
          </button>
        ))}
        <div className="capability-orbit__core"><span>ORYA</span><small>CONNECTED<br />SYSTEM</small></div>
      </div>

      <motion.div
        key={capability.id}
        id={`capability-panel-${capability.id}`}
        role="tabpanel"
        aria-labelledby={`capability-tab-${capability.id}`}
        className="capability-orbit__content"
        initial={{ opacity: 0, transform: reduceMotion ? "none" : "translate3d(0, 8px, 0)" }}
        animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
        transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
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
