import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollSignal } from "@/components/ScrollSignal";
import "./site-shell-refresh.css";

const logo = "/manus-storage/orya-official-logo-cropped_1cbe2481.png";

const nav = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/analytics", label: "Analytics" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Brand({ compact = false }: { compact?: boolean }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [location] = useLocation();

  return (
    <Link href="/" className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} aria-label="ORYA home" onClick={() => { if (location === "/") window.scrollTo({ top: 0, behavior: "instant" }); }}>
      {imageUnavailable ? (
        <span className="brand-wordmark">ORYA<span className="brand-wordmark__period">.</span></span>
      ) : (
        <img src={logo} alt="ORYA, Make what's next" onError={() => setImageUnavailable(true)} />
      )}
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const refresh = location === "/" || location === "/analytics";

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`site-shell ${refresh ? "site-shell--refresh" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Sheet open={open} onOpenChange={setOpen}>
        <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
          <div className="site-header__inner">
            <Brand compact />
            <nav className="desktop-nav" aria-label="Main navigation">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={location === item.href ? "is-active" : ""}>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <Link href="/contact" className="header-cta">
              {refresh ? "Book a discovery call" : "Start a conversation"} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <SheetTrigger asChild>
              <button className="menu-trigger" type="button" aria-label="Open navigation">
                <Menu aria-hidden="true" />
              </button>
            </SheetTrigger>
          </div>
        </header>

        <SheetContent side="right" className={`mobile-menu ${refresh ? "mobile-menu--refresh" : ""}`}>
          <SheetTitle className="sr-only">ORYA navigation</SheetTitle>
          <SheetDescription className="sr-only">Navigate the ORYA website</SheetDescription>
          <div className="mobile-menu__glow" aria-hidden="true" />
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            <span className="eyebrow">ORYA / NAVIGATION</span>
            {nav.map((item, index) => (
              <SheetClose asChild key={item.href}>
                <Link href={item.href}>
                  <span className="mono">0{index + 1}</span>{item.label}
                </Link>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <a href="mailto:contact@orya.global" className="mobile-menu__email">contact@orya.global</a>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>

      {!refresh && <ScrollSignal />}

      <main id="main" tabIndex={-1}>{children}</main>

      {refresh ? (
        <footer className="refresh-footer">
          <div className="refresh-footer__main">
            <div className="refresh-footer__brand">
              <Brand compact />
              <p>Make what’s next.</p>
            </div>
            <nav className="refresh-footer__links" aria-label="Footer navigation">
              {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </nav>
            <div className="refresh-footer__contact">
              <span>Let’s build something useful.</span>
              <a href="mailto:contact@orya.global">contact@orya.global <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="refresh-footer__bottom">
            <span>© {new Date().getFullYear()} ORYA</span>
            <span>America · Africa · Global</span>
          </div>
        </footer>
      ) : (
      <footer className="site-footer">
        <div className="site-footer__top">
          <div>
            <span className="eyebrow">THE NEXT MOVE STARTS HERE</span>
            <h2>Make what’s next.</h2>
          </div>
          <Link href="/contact" className="orbital-button orbital-button--light">
            <span>Start a conversation</span><ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="site-footer__bottom">
          <Brand compact />
          <div className="footer-meta">
            <span>America · Africa · Global</span>
            <a href="mailto:contact@orya.global">contact@orya.global</a>
          </div>
          <div className="footer-meta footer-meta--right">
            <span>English / Français ready</span>
            <span>© {new Date().getFullYear()} ORYA</span>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
