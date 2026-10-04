import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Only load analytics when the deployment supplies both settings.
const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
if (analyticsEndpoint && analyticsWebsiteId) {
  const analytics = document.createElement("script");
  analytics.src = `${analyticsEndpoint.replace(/\/$/, "")}/umami`;
  analytics.defer = true;
  analytics.dataset.websiteId = analyticsWebsiteId;
  document.head.appendChild(analytics);
}
