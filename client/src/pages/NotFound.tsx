import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { OrbitalStage } from "@/components/OrbitalStage";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__orb"><OrbitalStage compact /></div>
      <div className="not-found__content"><span className="eyebrow">SYSTEM / 404</span><h1>Signal not found.</h1><p>This coordinate sits outside the active ORYA system.</p><Link href="/" className="text-link"><ArrowLeft size={17} /> Return home</Link></div>
    </section>
  );
}
