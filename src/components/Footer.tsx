import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-16 px-6 md:px-12">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <h3 className="font-heading text-2xl font-bold mb-4">Aurion</h3>
          <p className="font-body text-sm leading-relaxed opacity-70 max-w-md">
            Helping organisations adopt AI with clarity, confidence, and responsibility. Human-first enablement for the way work actually happens.
          </p>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4 opacity-60">Navigate</h4>
          <div className="space-y-2">
            {[
              { label: "Home", path: "/" },
              { label: "How We Work", path: "/how-we-work" },
              { label: "Case Studies", path: "/case-studies" },
              { label: "Resources", path: "/resources" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="block font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4 opacity-60">Connect</h4>
          <div className="space-y-2">
            <Link to="/about" className="block font-body text-sm opacity-70 hover:opacity-100 transition-opacity">About</Link>
            <Link to="/contact" className="block font-body text-sm opacity-70 hover:opacity-100 transition-opacity">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8">
        <p className="font-body text-xs opacity-50">© {new Date().getFullYear()} Aurion. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
