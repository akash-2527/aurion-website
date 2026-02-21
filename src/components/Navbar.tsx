import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

type NavLink = {
  label: string;
  path: string;
};

const navLinks: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "How We Work", path: "/how-we-work" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Resources", path: "/resources" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) setMobileOpen(false);
  }, [scrolled]);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileOpen) return;
    gsap.fromTo(
      mobileMenuRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toScrolled = "0.65s cubic-bezier(0.4, 0, 0.2, 1)";
  const toUnscrolled = "0.95s cubic-bezier(0.22, 1, 0.36, 1)";
  const dur = scrolled ? toScrolled : toUnscrolled;

  const makeTransition = (...props: string[]) =>
    props.map((p) => `${p} ${dur}`).join(", ");

  return (
    <>
      <div
        ref={wrapperRef}
        className="fixed z-50 left-0 right-0"
        style={{
          top: scrolled ? "14px" : "0px",
          padding: scrolled ? "0 20px" : "0",
          transition: makeTransition("top", "padding"),
        }}
      >
        <div
          ref={navRef}
          style={{
            opacity: 0,
            margin: "0 auto",
            maxWidth: scrolled ? "820px" : "100%",
            borderRadius: scrolled ? "9999px" : "0px",
            background: scrolled
              ? "hsla(35, 30%, 96%, 0.62)"
              : "hsl(35, 30%, 96%)",
            backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(20px) saturate(160%)"
              : "none",
            // ALL borders and rings are handled exclusively through boxShadow.
            // Flat state: a single bottom shadow line mimicking a border.
            // Pill state: soft drop shadow + inset ring.
            // This way there is NEVER a real CSS border anywhere — no double lines possible.
            boxShadow: scrolled
              ? "0 2px 32px 0 rgba(80,40,20,0.09), 0 1px 8px 0 rgba(80,40,20,0.06), inset 0 0 0 1px hsla(30,20%,55%,0.22)"
              : "inset 0 -1px 0 0 hsl(30, 15%, 85%)",
            overflow: "visible",
            transition: makeTransition(
              "border-radius",
              "max-width",
              "background",
              "box-shadow"
            ),
          }}
        >
          {/* Inner content row */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: scrolled ? "0 24px" : "0 48px",
              height: scrolled ? "52px" : "72px",
              transition: makeTransition("padding", "height"),
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              className="font-heading text-xl font-bold tracking-wide shrink-0"
              style={{ color: "hsl(0, 55%, 32%)" }}
            >
              Aurion
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3.5 py-1.5 text-sm font-medium font-body tracking-wide transition-all duration-200"
                    style={{
                      borderRadius: "9999px",
                      color: isActive
                        ? "hsl(0, 55%, 32%)"
                        : "hsl(15, 10%, 42%)",
                      background: isActive
                        ? "hsla(0, 55%, 32%, 0.08)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = "hsl(15, 20%, 15%)";
                        el.style.background = "hsla(15, 20%, 15%, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = "hsl(15, 10%, 42%)";
                        el.style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: "hsl(15, 20%, 15%)",
                  transform: mobileOpen
                    ? "rotate(45deg) translateY(6.5px)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-300"
                style={{
                  background: "hsl(15, 20%, 15%)",
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: "hsl(15, 20%, 15%)",
                  transform: mobileOpen
                    ? "rotate(-45deg) translateY(-6.5px)"
                    : "none",
                }}
              />
            </button>
          </div>

          {/* Mobile Dropdown */}
          {mobileOpen && !scrolled && (
            <div
              ref={mobileMenuRef}
              className="md:hidden px-6 py-4 flex flex-col gap-1"
              style={{ boxShadow: "inset 0 1px 0 0 hsl(30, 15%, 85%)" }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3 py-2.5 text-sm font-medium font-body rounded-md transition-colors duration-150"
                    style={{
                      color: isActive
                        ? "hsl(0, 55%, 32%)"
                        : "hsl(15, 10%, 42%)",
                      background: isActive
                        ? "hsla(0, 55%, 32%, 0.07)"
                        : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Page content spacer */}
      <div style={{ height: "72px" }} />
    </>
  );
};

export default Navbar;