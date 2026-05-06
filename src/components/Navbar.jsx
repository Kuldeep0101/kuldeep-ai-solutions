import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Estimate", href: "#estimate" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scroll state (background transition)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio that is intersecting
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length === 0) return;
        // Use the one most visible (highest ratio) or topmost on screen
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActive("#" + visible[0].target.id);
      },
      {
        rootMargin: "-60px 0px -55% 0px", // trigger when top 45% of viewport reached
        threshold: [0.1, 0.3, 0.5],
      }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goto = (href) => {
    setOpen(false);
    setActive(href);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <>
      <motion.header
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 68,
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.07)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={36} />
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#1A365D", lineHeight: 1.1 }}>
                Kuldeep<span style={{ color: "#D4A843" }}>AI</span>
              </div>
              <div style={{ fontSize: "0.65rem", color: "#718096", fontWeight: 600, letterSpacing: "0.04em" }}>Solutions</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {LINKS.map(l => (
              <button
                key={l.href}
                className={`nav-link${active === l.href ? " active" : ""}`}
                onClick={() => goto(l.href)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="https://calendly.com/ks71156/strategy-session" target="_blank" rel="noopener noreferrer"
              className="btn btn-primary btn-sm desktop-nav">
              Book a Call
            </a>
            <button className="mobile-ham" onClick={() => setOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#4A5568", display: "none" }}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-ham { display: block !important; }
          }
        `}</style>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}>
            <button onClick={() => setOpen(false)}
              style={{ position: "absolute", top: 20, right: 20, background: "#F1F5F9", border: "none", borderRadius: 8, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#374151" }}>
              <X size={20} />
            </button>
            <Logo size={44} />
            {LINKS.map((l, i) => (
              <motion.button key={l.href}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.055 }}
                onClick={() => goto(l.href)}
                style={{ fontSize: "1.4rem", fontWeight: 700, color: active === l.href ? "#2A4A7F" : "#1A365D", background: "none", border: "none", cursor: "pointer" }}>
                {l.label}
              </motion.button>
            ))}
            <a href="https://calendly.com/ks71156/strategy-session" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              📅 Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
