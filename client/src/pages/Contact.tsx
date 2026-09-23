import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`ORYA enquiry — ${form.get("company") || form.get("name")}`);
    const body = encodeURIComponent([
      `Name: ${form.get("name")}`,
      `Company: ${form.get("company")}`,
      `Email: ${form.get("email")}`,
      `Phone / WhatsApp: ${form.get("phone")}`,
      `Service: ${form.get("service")}`,
      `Timeline: ${form.get("timeline")}`,
      "",
      `Business challenge: ${form.get("challenge")}`,
    ].join("\n"));
    setSent(true);
    window.location.href = `mailto:contact@orya.global?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page page--contact">
      <section className="contact-section">
        <div className="contact-section__glow" /><div className="contact-section__grid" />
        <div className="container contact-layout">
          <div className="contact-copy">
            <span className="eyebrow">ORYA / DISCOVERY</span>
            <h1>What needs to<br /><em>move next?</em></h1>
            <p>Tell us what the business is trying to improve. We’ll help identify where growth, technology or operational intelligence can create the most useful next move.</p>
            <div className="contact-direct"><small>DIRECT CONTACT</small><a href="mailto:contact@orya.global">contact@orya.global <ArrowUpRight size={18} /></a></div>
            <div className="contact-status"><span className="signal-dot" />INQUIRIES OPEN / KINSHASA + GLOBAL</div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__head"><span className="mono">DISCOVERY INPUT / 001</span><span>All fields marked * are required</span></div>
            <div className="form-grid">
              <label><span>Name *</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
              <label><span>Company *</span><input name="company" required autoComplete="organization" placeholder="Company name" /></label>
              <label><span>Email *</span><input name="email" required type="email" autoComplete="email" placeholder="you@company.com" /></label>
              <label><span>WhatsApp or telephone</span><input name="phone" autoComplete="tel" placeholder="+243 ..." /></label>
              <label><span>Service needed *</span><select name="service" required defaultValue=""><option value="" disabled>Select one</option><option>Digital growth</option><option>Web & digital products</option><option>AI & automation</option><option>Operational intelligence</option><option>Not sure yet</option></select></label>
              <label><span>Approximate timeline</span><select name="timeline" defaultValue=""><option value="" disabled>Select one</option><option>As soon as possible</option><option>1–3 months</option><option>3–6 months</option><option>Exploring for later</option></select></label>
              <label className="form-grid__wide"><span>Main business challenge *</span><textarea name="challenge" required rows={5} placeholder="What would you like the business to do better?" /></label>
            </div>
            <button type="submit" className="orbital-button orbital-button--light"><span>{sent ? "Open email draft" : "Send to ORYA"}</span>{sent ? <Check size={18} /> : <ArrowUpRight size={18} />}</button>
            <p className="contact-form__note">Submitting opens your email app with the details addressed to contact@orya.global. Direct form delivery and calendar booking can be connected when your funnel is ready.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
