import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

// Import the logo image
import logoImage from "@/assets/logo.png";

// ─── Dropdown items — exact paths match page routes ───────────────────────────
// Active state is checked per-item against location.pathname (exact match).
const hwwItems = [
  { label: "Overview",                 path: "/how-we-work" },
  { label: "What Aurion Does",         path: "/how-we-work/what-we-do" },
  { label: "Four Phase Model",         path: "/how-we-work/phases" },
  { label: "AI Trust Gap & Framework", path: "/how-we-work/trust-gap" },
  { label: "Who We Work With",         path: "/how-we-work/who-we-work-with" },
];

const otherLinks = [
  { label: "Evidence in Practice", path: "/case-studies" },
  { label: "Resources",    path: "/resources" },
  { label: "About",        path: "/about" },
  { label: "Contact",      path: "/contact" },
];

const AC  = "hsl(0, 55%, 32%)";          // active colour
const ABG = "hsla(0, 55%, 32%, 0.09)";  // active background
const IC  = "hsl(15, 10%, 42%)";        // inactive colour
const HC  = "hsl(15, 20%, 15%)";        // hover colour
const HBG = "hsla(15, 20%, 15%, 0.05)";// hover background

const Navbar = () => {
  const location = useLocation();
  const navRef        = useRef<HTMLDivElement>(null);
  const dropRef       = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [scrolled,      setScrolled]      = useState(false);
  const [dropOpen,      setDropOpen]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  const dropDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Is any HWW sub-page active? (used to colour the top-level trigger)
  const isAnyHWW = location.pathname.startsWith("/how-we-work");

  // ── Scroll ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 60); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { if (scrolled) setMobileOpen(false); }, [scrolled]);
  useEffect(() => { setMobileOpen(false); setDropOpen(false); }, [location.pathname]);

  // ── Navbar entrance ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  // ── Mobile menu entrance ───────────────────────────────────────────────────
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el || !mobileOpen) return;
    gsap.fromTo(el, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" });
  }, [mobileOpen]);

  // ── Dropdown animation — panel always in DOM, GSAP drives visibility ───────
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (dropOpen) {
      gsap.fromTo(el,
        { opacity: 0, y: -5, scale: 0.978 },
        { opacity: 1, y: 0, scale: 1, duration: 0.19, ease: "power2.out",
          onStart: () => { el.style.pointerEvents = "auto"; el.style.visibility = "visible"; } }
      );
    } else {
      gsap.to(el, {
        opacity: 0, y: -3, scale: 0.986, duration: 0.13, ease: "power2.in",
        onComplete: () => { el.style.pointerEvents = "none"; el.style.visibility = "hidden"; },
      });
    }
  }, [dropOpen]);

  // 90ms debounce absorbs the cursor gap between trigger and panel
  const openDrop  = () => { if (dropDebounce.current) clearTimeout(dropDebounce.current); setDropOpen(true); };
  const closeDrop = () => { dropDebounce.current = setTimeout(() => setDropOpen(false), 90); };
  useEffect(() => () => { if (dropDebounce.current) clearTimeout(dropDebounce.current); }, []);

  // ── Transition helpers ─────────────────────────────────────────────────────
  const dur = scrolled ? "0.6s cubic-bezier(0.4,0,0.2,1)" : "0.9s cubic-bezier(0.22,1,0.36,1)";
  const tr  = (...props: string[]) => props.map((p) => `${p} ${dur}`).join(", ");

  const linkBase: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "4px",
    borderRadius: "9999px", padding: "6px 13px",
    fontSize: "0.875rem", fontWeight: 500,
    fontFamily: "var(--font-body, sans-serif)",
    letterSpacing: "0.02em", textDecoration: "none",
    cursor: "pointer", whiteSpace: "nowrap",
    transition: "color 0.15s ease, background 0.15s ease",
  };

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>, active: boolean) => {
    if (active) return;
    e.currentTarget.style.color      = HC;
    e.currentTarget.style.background = HBG;
  };
  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>, active: boolean) => {
    if (active) return;
    e.currentTarget.style.color      = IC;
    e.currentTarget.style.background = "transparent";
  };

  return (
    <>
      <div className="fixed z-50 left-0 right-0"
        style={{ top: scrolled ? "14px" : "0px", padding: scrolled ? "0 20px" : "0", transition: tr("top", "padding") }}>

        <div ref={navRef} style={{
          opacity: 0, margin: "0 auto",
          maxWidth:     scrolled ? "840px" : "100%",
          borderRadius: scrolled ? "9999px" : "0px",
          background:   scrolled ? "hsla(35,30%,96%,0.65)" : "hsl(35,30%,96%)",
          backdropFilter:       scrolled ? "blur(22px) saturate(165%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px) saturate(165%)" : "none",
          // Scrolled: drop shadow + inset ring + subtle warm glow layer
          boxShadow: scrolled
            ? "0 2px 26px rgba(80,40,20,0.10), 0 1px 8px rgba(80,40,20,0.06), inset 0 0 0 1px hsla(30,20%,55%,0.20), 0 0 20px -2px rgba(140,58,28,0.10)"
            : "inset 0 -1px 0 0 hsl(30,15%,85%)",
          overflow: "visible",
          transition: tr("border-radius", "max-width", "background", "box-shadow"),
        }}>

          {/* Content row */}
          <div className="flex items-center justify-between"
            style={{ padding: scrolled ? "0 22px" : "0 48px", height: scrolled ? "52px" : "72px", transition: tr("padding", "height") }}>

            {/* Logo - replaced text with image */}
            <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <img 
                src={logoImage} 
                alt="Aurion" 
                style={{ 
                  height: scrolled ? "100px" : "100px",
                  width: "auto",
                  transition: tr("height"),
                  objectFit: "contain",
                  display: "block"
                }} 
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">

              {/* Home */}
              {(() => {
                const active = location.pathname === "/";
                return (
                  <Link to="/" style={{ ...linkBase, color: active ? AC : IC, background: active ? ABG : "transparent" }}
                    onMouseEnter={(e) => onEnter(e, active)} onMouseLeave={(e) => onLeave(e, active)}>
                    Home
                  </Link>
                );
              })()}

              {/* How We Work + dropdown */}
              <div className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                {/*
                  Trigger link: active if on ANY /how-we-work/* page.
                  The individual dropdown items each highlight their own path.
                */}
                <Link to="/how-we-work"
                  aria-haspopup="true" aria-expanded={dropOpen}
                  style={{ ...linkBase, color: isAnyHWW ? AC : IC, background: isAnyHWW ? ABG : "transparent" }}
                  onMouseEnter={(e) => { openDrop(); onEnter(e, isAnyHWW); }}
                  onMouseLeave={(e) => onLeave(e, isAnyHWW)}>
                  How We Work
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true"
                    style={{ transition: "transform 0.18s ease", transform: dropOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                    <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* Dropdown panel — always in DOM */}
                <div ref={dropRef} role="menu" aria-label="How We Work pages"
                  style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", zIndex: 300, minWidth: "232px", opacity: 0, visibility: "hidden", pointerEvents: "none" }}
                  onMouseEnter={openDrop} onMouseLeave={closeDrop}>

                  {/* Caret arrows */}
                  <div aria-hidden="true" style={{ position:"absolute", top:"-7px", left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderBottom:"7px solid hsla(30,20%,55%,0.16)" }} />
                  <div aria-hidden="true" style={{ position:"absolute", top:"-5.5px", left:"50%", transform:"translateX(-50%)", width:0, height:0, zIndex:1, borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderBottom:"6px solid hsl(35,30%,96%)" }} />

                  <div style={{ background:"hsl(35,30%,96%)", border:"1px solid hsla(30,20%,55%,0.16)", borderRadius:"10px", boxShadow:"0 8px 26px -4px rgba(80,40,20,0.12), 0 2px 8px -2px rgba(80,40,20,0.07)", padding:"5px", overflow:"hidden" }}>
                    {hwwItems.map((item) => {
                      // ── Active state: exact pathname match per item ──────────────
                      // This is what fixes the "Overview stays red" bug.
                      // Each item independently checks if it is the current page.
                      const itemActive = location.pathname === item.path;
                      return (
                        <Link key={item.path} to={item.path} role="menuitem"
                          onClick={() => setDropOpen(false)}
                          style={{
                            display: "flex", alignItems: "center", gap: "9px",
                            padding: "9px 13px", borderRadius: "7px",
                            fontSize: "0.8125rem", fontFamily: "var(--font-body,sans-serif)",
                            fontWeight: itemActive ? 600 : 400,
                            // Active = deep red; inactive = dark grey
                            color: itemActive ? AC : "hsl(15,15%,32%)",
                            background: itemActive ? ABG : "transparent",
                            textDecoration: "none",
                            transition: "background 0.12s ease, color 0.12s ease",
                            letterSpacing: "0.01em",
                          }}
                          onMouseEnter={(e) => {
                            if (!itemActive) {
                              e.currentTarget.style.background = ABG;
                              e.currentTarget.style.color      = AC;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!itemActive) {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color      = "hsl(15,15%,32%)";
                            }
                          }}
                        >
                          {/* Dot indicator — filled when active */}
                          <span aria-hidden="true" style={{ flexShrink:0, width:"5px", height:"5px", borderRadius:"50%", background: itemActive ? AC : "hsl(30,15%,74%)", transition:"background 0.12s ease" }} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Other nav links */}
              {otherLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path}
                    style={{ ...linkBase, color: active ? AC : IC, background: active ? ABG : "transparent" }}
                    onMouseEnter={(e) => onEnter(e, active)} onMouseLeave={(e) => onLeave(e, active)}>
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
              <span className="block w-5 h-[1.5px] transition-all duration-300 origin-center" style={{ background:"hsl(15,20%,15%)", transform: mobileOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
              <span className="block w-5 h-[1.5px] transition-all duration-300"               style={{ background:"hsl(15,20%,15%)", opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "scaleX(0)" : "scaleX(1)" }} />
              <span className="block w-5 h-[1.5px] transition-all duration-300 origin-center" style={{ background:"hsl(15,20%,15%)", transform: mobileOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && !scrolled && (
            <div ref={mobileMenuRef} className="md:hidden px-5 pb-4 pt-2 flex flex-col gap-0.5"
              style={{ boxShadow:"inset 0 1px 0 0 hsl(30,15%,85%)" }}>

              <Link to="/" className="px-3 py-2.5 text-sm font-medium font-body rounded-md"
                style={{ color: location.pathname === "/" ? AC : IC, background: location.pathname === "/" ? ABG : "transparent", textDecoration:"none" }}>
                Home
              </Link>

              {/* How We Work collapsible */}
              <div>
                <button type="button"
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium font-body rounded-md"
                  style={{ color: isAnyHWW ? AC : IC, background: isAnyHWW ? ABG : "transparent" }}
                  onClick={() => setMobileSubOpen((p) => !p)} aria-expanded={mobileSubOpen}>
                  How We Work
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true"
                    style={{ transition:"transform 0.18s ease", transform: mobileSubOpen ? "rotate(180deg)" : "none" }}>
                    <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {mobileSubOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5 pl-3" style={{ borderLeft: "2px solid hsl(30,15%,85%)" }}>
                    {hwwItems.map((item) => {
                      const itemActive = location.pathname === item.path;
                      return (
                        <Link key={item.path} to={item.path}
                          className="px-3 py-2 text-xs font-body rounded-md"
                          style={{ color: itemActive ? AC : "hsl(15,10%,46%)", fontWeight: itemActive ? 600 : 400, background: itemActive ? ABG : "transparent", textDecoration:"none" }}>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {otherLinks.map((link) => (
                <Link key={link.path} to={link.path} className="px-3 py-2.5 text-sm font-medium font-body rounded-md"
                  style={{ color: location.pathname === link.path ? AC : IC, background: location.pathname === link.path ? ABG : "transparent", textDecoration:"none" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: "72px" }} />
    </>
  );
};

export default Navbar;