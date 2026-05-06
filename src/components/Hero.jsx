import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronDown } from "lucide-react";
import AvailabilityWidget from "./AvailabilityWidget";
import { STATS } from "../data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero-bg hero-grid"
      style={{ minHeight: "92vh", paddingTop: 68, display: "flex", flexDirection: "column", justifyContent: "center" }}>

      {/* Decorative blobs */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 80, right: -120, width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,54,93,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ paddingTop: 32, paddingBottom: 92 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 48,
          alignItems: "center",
        }}>

          {/* ── Left ── */}
          <div>
            {/* Badge */}
            <motion.div {...fade(0.1)} style={{ marginBottom: 20 }}>
              <div className="avail-badge" style={{ width: "fit-content" }}>
                <span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "block" }} />
                Available for International Projects
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fade(0.2)}
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.03em", color: "#F8FAFC", marginBottom: 20 }}>
              Be the #1 Recommended Business in ChatGPT &amp; <span className="grad-text">Automate Your Lead Flow</span>.
            </motion.h1>

            <motion.p {...fade(0.3)}
              style={{ fontSize: "1.05rem", color: "#CBD5E1", lineHeight: 1.8, maxWidth: 480, marginBottom: 36 }}>
              Most businesses are invisible to AI. We engineer your site to be the first answer when local customers ask ChatGPT, Gemini, or Claude for recommendations—then we build the automation to close them.
            </motion.p>

            {/* Quick Scan & CTAs */}
            <motion.div {...fade(0.4)} style={{ marginBottom: 44 }}>
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                const url = e.target.elements[0].value;
                const contactInput = document.getElementById("c-website");
                if (contactInput && url) {
                  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                  setter.call(contactInput, url);
                  contactInput.dispatchEvent(new Event("input", { bubbles: true }));
                }
                scrollTo("#contact"); 
              }} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <input 
                  type="url" 
                  placeholder="Enter your URL to see if ChatGPT can find you" 
                  className="form-field" 
                  style={{ flex: 1, minWidth: 260, height: 48, background: "rgba(255,255,255,0.05)", color: "#F8FAFC", border: "1px solid rgba(255,255,255,0.1)" }} 
                  required 
                />
                <button type="submit" className="btn btn-gold" style={{ height: 48, whiteSpace: "nowrap" }} id="hero-cta-audit">
                  <Calendar size={17} />
                  Get Your Free AI Audit ($500 Value)
                </button>
              </form>
            </motion.div>

            {/* Stats */}
            <motion.div {...fade(0.5)}
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {STATS.map(s => (
                <div key={s.label}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px 8px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#F8FAFC", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: 4, fontWeight: 500, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 340, marginRight: "auto" }}
          >
            <AvailabilityWidget />

            {/* Trust flags */}
            <div style={{ background: "rgba(18,26,42,0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: "20px 22px" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#64748B", marginBottom: 12 }}>
                Trusted by clients in
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🇦🇺 Australia", "🇺🇸 USA", "🇬🇧 UK", "🇦🇪 UAE"].map(c => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="scroll-bounce"
        style={{ marginTop: "auto", paddingBottom: 24, textAlign: "center", color: "#94A3B8" }}>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>SCROLL</div>
        <ChevronDown size={14} />
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          #hero > .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #hero > .container > div > div:last-child { display: none; }
          #hero > .container > div > div:first-child > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #hero-cta-audit { width: 100%; box-shadow: 0 8px 32px rgba(212,168,67,0.5) !important; font-size: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
