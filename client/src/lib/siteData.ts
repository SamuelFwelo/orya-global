export type Capability = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  statement: string;
  outcome: string;
  services: string[];
};

export const capabilities: Capability[] = [
  {
    id: "growth",
    number: "01",
    title: "Digital growth",
    shortTitle: "Demand",
    statement: "Turn attention into qualified customer action through connected campaigns and conversion systems.",
    outcome: "Generate measurable demand",
    services: ["Growth strategy", "Paid media", "Campaign systems", "Lead generation", "Measurement"],
  },
  {
    id: "products",
    number: "02",
    title: "Web & digital products",
    shortTitle: "Experience",
    statement: "Build fast, useful digital experiences that make the next customer step unmistakably clear.",
    outcome: "Convert attention into action",
    services: ["Business websites", "Landing pages", "E-commerce", "Client portals", "Custom platforms"],
  },
  {
    id: "automation",
    number: "03",
    title: "AI & automation",
    shortTitle: "Velocity",
    statement: "Connect workflows, teams and customer conversations so progress no longer depends on repetitive work.",
    outcome: "Reduce manual operations",
    services: ["Workflow automation", "CRM systems", "WhatsApp automation", "AI support", "Integrations"],
  },
  {
    id: "intelligence",
    number: "04",
    title: "Operational intelligence",
    shortTitle: "Clarity",
    statement: "Transform fragmented data into decision-ready reporting for operators and leadership teams.",
    outcome: "See the business clearly",
    services: ["Business dashboards", "Operational analysis", "Data consolidation", "Profitability reporting", "Management intelligence"],
  },
];

export const process = [
  { number: "01", title: "Discover", copy: "Understand the business, customer journey, systems and constraints." },
  { number: "02", title: "Design", copy: "Define the strategy, workflows, technology and measurable outcomes." },
  { number: "03", title: "Build", copy: "Develop, connect and launch the system with operational clarity." },
  { number: "04", title: "Improve", copy: "Measure performance, learn from reality and strengthen the system." },
];

export const outcomes = [
  "Generate more qualified demand",
  "Create stronger customer experiences",
  "Reduce repetitive manual work",
  "Improve operational visibility",
  "Connect physical and digital channels",
  "Build systems that scale",
];

export const signalJourney = [
  "Visibility",
  "Digital reach",
  "Landing / WhatsApp",
  "Enquiry",
  "Intelligence",
];
