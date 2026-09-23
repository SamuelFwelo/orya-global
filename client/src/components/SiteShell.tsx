import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const logo = "/manus-storage/orya-official-logo-cropped_1cbe2481.png";

const nav = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} aria-label="ORYA home">
      <img src={logo} alt="ORYA, Make what's next" />
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

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
    <div className="site-shell">
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
              Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <SheetTrigger asChild>
              <button className="menu-trigger" type="button" aria-label="Open navigation">
                <Menu aria-hidden="true" />
              </button>
            </SheetTrigger>
          </div>
        </header>

        <SheetContent side="right" className="mobile-menu">
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

      <main id="main" tabIndex={-1}>{children}</main>

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
    </div>
  );
}
