import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";

const CATS = ["All", "Automated Growth Engines", "AI Search Dominance (GEO)", "Social Media", "Traditional Business"];

const CAT_STYLE = {
  "Automated Growth Engines": { bg: "rgba(6,182,212,0.15)", color: "#22D3EE" },
  "AI Search Dominance (GEO)":  { bg: "rgba(245,158,11,0.15)", color: "#FCD34D" },
  "Social Media":   { bg: "rgba(139,92,246,0.15)", color: "#C4B5FD" },
  "Traditional Business": { bg: "rgba(34,197,94,0.15)", color: "#86EFAC" },
};

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section id="projects" className="section section-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Case Studies</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-rule" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            A selection of global engagements across GEO, Web, and Social domains.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)}
              style={{
                padding: "8px 18px",
                borderRadius: 50,
                border: active === c ? "1px solid #06B6D4" : "1px solid rgba(255,255,255,0.1)",
                background: active === c ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.02)",
                color: active === c ? "#22D3EE" : "#94A3B8",
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: active === c ? "0 4px 14px rgba(6,182,212,0.2)" : "none",
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const cs = CAT_STYLE[p.category] || { bg: "rgba(26,54,93,0.08)", color: "#1A365D" };
              return (
                <motion.article key={p.id} layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="card"
                  style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}
                >
                  {/* Mockup area */}
                  <div style={{
                    height: 180,
                    background: "#0D1524",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                  }}>
                    {/* Fake browser bar */}
                    <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.02)", display: "flex", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }}></div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }}></div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }}></div>
                    </div>
                    {/* Fake dashboard content */}
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 10, opacity: 0.6 }}>
                      <div style={{ width: "60%", height: 16, background: "rgba(255,255,255,0.05)", borderRadius: 4 }}></div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <div style={{ flex: 1, height: 50, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}></div>
                        <div style={{ flex: 2, height: 50, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}></div>
                      </div>
                      <div style={{ width: "100%", height: 60, background: "rgba(255,255,255,0.03)", borderRadius: 6 }}></div>
                    </div>
                    
                    <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, background: "rgba(6,182,212,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
                      <ArrowUpRight size={15} color="#06B6D4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "inline-block", padding: "2px 8px", background: cs.bg, color: cs.color, borderRadius: 4, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10, width: "fit-content" }}>
                      {p.category}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 8, lineHeight: 1.4 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#94A3B8", lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
                      {p.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tags.map(t => <span key={t} className="tag" style={{ background: "rgba(255,255,255,0.05)", color: "#CBD5E1", border: "none" }}>{t}</span>)}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #projects .container > div:last-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #projects .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
