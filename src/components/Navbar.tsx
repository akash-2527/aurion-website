import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

import logoImage from "@/assets/logo.png";

const hwwItems = [
  { label: "Overview",                 path: "/how-we-work" },
  { label: "What Aurion Does",         path: "/how-we-work/what-we-do" },
  { label: "Four Phase Model",         path: "/how-we-work/phases" },
  { label: "AI Trust Gap & Framework", path: "/how-we-work/trust-gap" },
  { label: "Who We Work With",         path: "/how-we-work/who-we-work-with" },
];

const otherLinks = [
  { label: "Evidence in Practice", path: "/case-studies" },
  { label: "Services",             path: "/services"     },
  { label: "Resources",            path: "/resources"    },
  { label: "About",                path: "/about"        },
  { label: "Contact",              path: "/contact"      },
];

const AC  = "hsl(0, 55%, 32%)";
const ABG = "hsla(0, 55%, 32%, 0.09)";
const IC  = "hsl(15, 10%, 42%)";
const HC  = "hsl(15, 20%, 15%)";
const HBG = "hsla(15, 20%, 15%, 0.05)";

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

  useEffect(() => { setMobileOpen(false); setDropOpen(false); }, [location.pathname]);

  // ── Navbar entrance ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.15 });
    });
    return () => ctx.revert();
  }, []);

  // ── Mobile menu entrance ───────────────────────────────────────────────────
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el || !mobileOpen) return;
    gsap.fromTo(el, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" });
  }, [mobileOpen]);

  // ── Dropdown animation ─────────────────────────────────────────────────────
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (dropOpen) {
      el.style.backgroundColor = "hsl(35,30%,96%)";
      el.style.color           = "hsl(15,15%,32%)";
      el.style.visibility      = "visible";
      el.style.pointerEvents   = "auto";
      gsap.fromTo(el,
        { opacity: 0, y: -5, scale: 0.978 },
        { opacity: 1, y: 0,  scale: 1, duration: 0.19, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        opacity: 0, y: -3, scale: 0.986, duration: 0.13, ease: "power2.in",
        onComplete: () => {
          el.style.pointerEvents   = "none";
          el.style.visibility      = "hidden";
          el.style.backgroundColor = "hsl(35,30%,96%)";
          el.style.color           = "hsl(15,15%,32%)";
        },
      });
    }
  }, [dropOpen]);

  const openDrop  = () => { if (dropDebounce.current) clearTimeout(dropDebounce.current); setDropOpen(true); };
  const closeDrop = () => { dropDebounce.current = setTimeout(() => setDropOpen(false), 90); };
  useEffect(() => () => { if (dropDebounce.current) clearTimeout(dropDebounce.current); }, []);

  // ── Transition helpers ─────────────────────────────────────────────────────
  const dur = scrolled ? "0.6s cubic-bezier(0.4,0,0.2,1)" : "0.9s cubic-bezier(0.22,1,0.36,1)";
  const tr  = (...props: string[]) => props.map((p) => `${p} ${dur}`).join(", ");

  const linkBase: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "3px",
    borderRadius: "9999px", padding: "5px 9px",
    fontSize: "0.8rem", fontWeight: 500,
    fontFamily: "var(--font-body, sans-serif)",
    letterSpacing: "0.01em", textDecoration: "none",
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

  // ── Shape logic ────────────────────────────────────────────────────────────
  // scrolled + menu closed → pill (9999px)
  // scrolled + menu open   → card (20px) — prevents corner-clipping on mobile
  // not scrolled           → square (0px)
  const navBorderRadius  = scrolled ? (mobileOpen ? "20px" : "9999px") : "0px";
  const menuBorderRadius = scrolled ? "0 0 20px 20px" : "0";

  return (
    <>
      <div
        className="fixed z-50 left-0 right-0"
        style={{ top: scrolled ? "14px" : "0px", padding: scrolled ? "0 20px" : "0", transition: tr("top", "padding") }}
      >
        <div
          ref={navRef}
          style={{
            opacity: 0, margin: "0 auto",
            maxWidth:     scrolled ? "840px" : "100%",
            borderRadius: navBorderRadius,
            background:   scrolled ? "hsla(35,30%,96%,0.65)" : "hsl(35,30%,96%)",
            backdropFilter:       scrolled ? "blur(22px) saturate(165%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(22px) saturate(165%)" : "none",
            boxShadow: scrolled
              ? "0 2px 26px rgba(80,40,20,0.10), 0 1px 8px rgba(80,40,20,0.06), inset 0 0 0 1px hsla(30,20%,55%,0.20), 0 0 20px -2px rgba(140,58,28,0.10)"
              : "inset 0 -1px 0 0 hsl(30,15%,85%)",
            // overflow:visible is REQUIRED — the dropdown panel is absolutely
            // positioned and must escape this container to paint above the page.
            overflow: "visible",
            transition: tr("border-radius", "max-width", "background", "box-shadow"),
          }}
        >
          {/* ── Content row ─────────────────────────────────────────────────
            CRITICAL: NO overflow:hidden here. The previous fix added it to
            handle the pill corner-clipping issue on mobile, but it caused
            the dropdown to be hidden beneath the page on desktop because the
            absolutely-positioned panel couldn't escape the clipping context.
            The pill visual is maintained purely by borderRadius on the nav
            wrapper — no child clipping needed.
          ──────────────────────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between"
            style={{
              padding:    scrolled ? "0 22px" : "0 48px",
              height:     scrolled ? "52px" : "72px",
              borderRadius: navBorderRadius,
              // overflow intentionally omitted — dropdown must be visible
              transition: tr("padding", "height"),
            }}
          >
            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
              <img
                src={logoImage}
                alt="Aurion"
                style={{ height: "100px", width: "auto", objectFit: "contain", display: "block", transition: tr("height") }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">

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

                {/* Dropdown panel.
                    z-index:300 paints above all page content.
                    visibility + pointerEvents are toggled by GSAP — the panel
                    is always in the DOM so GSAP can animate it in/out cleanly. */}
                <div
                  ref={dropRef}
                  role="menu"
                  aria-label="How We Work pages"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 300,
                    minWidth: "232px",
                    opacity: 0,
                    visibility: "hidden",
                    pointerEvents: "none",
                    backgroundColor: "hsl(35,30%,96%)",
                    color: "hsl(15,15%,32%)",
                  }}
                  onMouseEnter={openDrop}
                  onMouseLeave={closeDrop}
                >
                  {/* Caret */}
                  <div aria-hidden="true" style={{ position:"absolute", top:"-7px", left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderBottom:"7px solid hsla(30,20%,55%,0.16)" }} />
                  <div aria-hidden="true" style={{ position:"absolute", top:"-5.5px", left:"50%", transform:"translateX(-50%)", width:0, height:0, zIndex:1, borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderBottom:"6px solid hsl(35,30%,96%)" }} />

                  <div style={{
                    background: "hsl(35,30%,96%)",
                    border: "1px solid hsla(30,20%,55%,0.16)",
                    borderRadius: "10px",
                    boxShadow: "0 8px 26px -4px rgba(80,40,20,0.12), 0 2px 8px -2px rgba(80,40,20,0.07)",
                    padding: "5px",
                    overflow: "hidden",
                    color: "hsl(15,15%,32%)",
                  }}>
                    {hwwItems.map((item) => {
                      const itemActive = location.pathname === item.path;
                      return (
                        <Link key={item.path} to={item.path} role="menuitem"
                          onClick={() => setDropOpen(false)}
                          style={{
                            display: "flex", alignItems: "center", gap: "9px",
                            padding: "9px 13px", borderRadius: "7px",
                            fontSize: "0.8125rem", fontFamily: "var(--font-body,sans-serif)",
                            fontWeight: itemActive ? 600 : 400,
                            color: itemActive ? AC : "hsl(15,15%,32%)",
                            background: itemActive ? ABG : "transparent",
                            textDecoration: "none",
                            transition: "background 0.12s ease, color 0.12s ease",
                            letterSpacing: "0.01em",
                          }}
                          onMouseEnter={(e) => { if (!itemActive) { e.currentTarget.style.background = ABG; e.currentTarget.style.color = AC; } }}
                          onMouseLeave={(e) => { if (!itemActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(15,15%,32%)"; } }}
                        >
                          <span aria-hidden="true" style={{ flexShrink:0, width:"5px", height:"5px", borderRadius:"50%", background: itemActive ? AC : "hsl(30,15%,74%)", transition:"background 0.12s ease" }} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

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
            <button
              className="lg:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="block w-5 h-[1.5px] transition-all duration-300 origin-center" style={{ background:"hsl(15,20%,15%)", transform: mobileOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
              <span className="block w-5 h-[1.5px] transition-all duration-300"               style={{ background:"hsl(15,20%,15%)", opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "scaleX(0)" : "scaleX(1)" }} />
              <span className="block w-5 h-[1.5px] transition-all duration-300 origin-center" style={{ background:"hsl(15,20%,15%)", transform: mobileOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div
              ref={mobileMenuRef}
              className="lg:hidden px-5 pb-4 pt-2 flex flex-col gap-0.5"
              style={{
                boxShadow: scrolled
                  ? "0 8px 24px -4px rgba(80,40,20,0.12), inset 0 1px 0 0 hsla(30,20%,55%,0.14)"
                  : "inset 0 1px 0 0 hsl(30,15%,85%)",
                background:           scrolled ? "hsla(35,30%,97%,0.98)" : "transparent",
                backdropFilter:       scrolled ? "blur(22px)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
                borderRadius: menuBorderRadius,
                marginTop: scrolled ? "4px" : "0",
              }}
            >
              <Link to="/" className="px-3 py-2.5 text-sm font-medium font-body rounded-md"
                style={{ color: location.pathname === "/" ? AC : IC, background: location.pathname === "/" ? ABG : "transparent", textDecoration:"none" }}>
                Home
              </Link>

              <div>
                <button type="button"
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium font-body rounded-md"
                  style={{ color: isAnyHWW ? AC : IC, background: isAnyHWW ? ABG : "transparent" }}
                  onClick={() => setMobileSubOpen((p) => !p)}
                  aria-expanded={mobileSubOpen}
                >
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