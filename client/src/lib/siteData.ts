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
    title: "Digital growth & web development",
    shortTitle: "Growth",
    statement: "Connect campaigns, websites and digital experiences so the right people can find you and take the next step.",
    outcome: "Turn attention into customer action",
    services: ["Growth strategy", "Paid media", "Lead generation", "Business websites", "Landing pages", "E-commerce", "Client portals"],
  },
  {
    id: "automation",
    number: "02",
    title: "AI & automation",
    shortTitle: "Automation",
    statement: "Connect workflows, teams and customer conversations so progress no longer depends on repetitive work.",
    outcome: "Give your team time to move forward",
    services: ["Workflow automation", "CRM systems", "WhatsApp automation", "AI support", "Integrations"],
  },
  {
    id: "analytics",
    number: "03",
    title: "Analytics",
    shortTitle: "Clarity",
    statement: "Bring your business data together in clear dashboards and reporting, so your next decision starts with a shared view.",
    outcome: "See what’s working. Know what’s next.",
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
  "Connect customer touchpoints",
  "Build systems that scale",
];

export const signalJourney = [
  "Discovery",
  "Digital experience",
  "Conversation",
  "Follow-up",
  "Insight",
];
