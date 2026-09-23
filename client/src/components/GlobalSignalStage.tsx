import { useMemo, useState, type KeyboardEvent, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Crosshair, Radio } from "lucide-react";

const logo = "/manus-storage/orya-official-logo-cropped_1cbe2481.png";

type SignalNode = {
  id: "ky" | "dc" | "kinshasa";
  label: string;
  place: string;
  coordinates: string;
  region: string;
  detail: string;
  position: string;
};

const nodes: SignalNode[] = [
  {
    id: "ky",
    label: "KY",
    place: "Kentucky",
    coordinates: "38.1867° N / 84.8753° W",
    region: "NORTH AMERICA",
    detail: "Origin signal / US network",
    position: "signal-node--ky",
  },
  {
    id: "dc",
    label: "DC",
    place: "Washington, DC",
    coordinates: "38.9072° N / 77.0369° W",
    region: "NORTH AMERICA",
    detail: "Strategy signal / Global corridor",
    position: "signal-node--dc",
  },
  {
    id: "kinshasa",
    label: "KINSHASA",
    place: "Kinshasa",
    coordinates: "04.3250° S / 15.3222° E",
    region: "AFRICA",
    detail: "Operating signal / ORYA HQ",
    position: "signal-node--kinshasa",
  },
];

export function GlobalSignalStage() {
  const [activeId, setActiveId] = useState<SignalNode["id"]>("kinshasa");
  const reduceMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 90, damping: 18, mass: 1 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 90, damping: 18, mass: 1 });
  const stageTransform = useMotionTemplate`translate3d(${pointerX}px, ${pointerY}px, 0)`;
  const active = useMemo(() => nodes.find((node) => node.id === activeId) ?? nodes[2], [activeId]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const nextIndex = (index + (event.key === "ArrowRight" ? 1 : -1) + nodes.length) % nodes.length;
    setActiveId(nodes[nextIndex].id);
    document.getElementById(`signal-node-${nodes[nextIndex].id}`)?.focus();
  };

  return (
    <section className="global-signal section-pad" aria-labelledby="global-signal-title">
      <div className="container">
        <div className="global-signal__heading">
          <div>
            <span className="eyebrow">06 / GLOBAL SIGNAL</span>
            <h2 id="global-signal-title">One signal.<br /><em>Multiple coordinates.</em></h2>
          </div>
          <p>Move through the ORYA network. Touch a node to see where the signal lands and how the system connects.</p>
        </div>

        <div
          className="global-signal__stage"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="global-signal__grid" aria-hidden="true" />
          <div className="global-signal__scanline" aria-hidden="true" />
          <motion.div className="global-signal__orbit" style={{ transform: stageTransform }}>
            <span className="global-signal__ring global-signal__ring--one" />
            <span className="global-signal__ring global-signal__ring--two" />
            <span className="global-signal__ring global-signal__ring--three" />
            <span className="global-signal__connector global-signal__connector--one" />
            <span className="global-signal__connector global-signal__connector--two" />
            <span className="global-signal__connector global-signal__connector--three" />
            <div className="global-signal__core" aria-hidden="true">
              <div className="global-signal__core-orbit" />
              <img src={logo} alt="" />
              <span className="mono">SYSTEM / 003</span>
            </div>
            {nodes.map((node, index) => (
              <button
                key={node.id}
                id={`signal-node-${node.id}`}
                type="button"
                className={`signal-node ${node.position} ${activeId === node.id ? "is-active" : ""}`}
                onClick={() => setActiveId(node.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                aria-pressed={activeId === node.id}
              >
                <span className="signal-node__pulse" aria-hidden="true" />
                <span className="signal-node__dot" aria-hidden="true" />
                <span className="signal-node__label"><strong>{node.label}</strong><small>{node.place}</small></span>
              </button>
            ))}
          </motion.div>
          <div className="global-signal__legend" aria-hidden="true"><span><i /> ACTIVE ORYA SIGNAL</span><span><i /> CLICK OR TOUCH A NODE</span></div>
          <div className="global-signal__coordinates mono" aria-live="polite">
            <span className="global-signal__coordinates-label"><Crosshair size={13} /> {active.region}</span>
            <strong>{active.coordinates}</strong>
            <span>{active.detail}</span>
          </div>
          <div className="global-signal__status mono"><Radio size={13} /> 03 NODES / LIVE NETWORK</div>
        </div>

        <div className="global-signal__readout" aria-live="polite">
          <div><span className="eyebrow">CURRENT NODE / {active.label}</span><h3>{active.place}</h3></div>
          <p>{active.detail}. The same operating language, carried across different places.</p>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default GlobalSignalStage;
