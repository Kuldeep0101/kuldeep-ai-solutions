import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";

const CATS = ["All", "Full-Stack Web", "GEO Solutions", "Social Media"];

const REGION_GRAD = {
  EMEA:     "linear-gradient(135deg, #F59E0B, #EF4444)",
  Europe:   "linear-gradient(135deg, #3B82F6, #6366F1)",
  APAC:     "linear-gradient(135deg, #14B8A6, #06B6D4)",
  Americas: "linear-gradient(135deg, #EC4899, #8B5CF6)",
};

const CAT_STYLE = {
  "Full-Stack Web": { bg: "rgba(59,130,246,0.10)", color: "#1D4ED8" },
  "GEO Solutions":  { bg: "rgba(99,102,241,0.10)", color: "#4338CA" },
  "Social Media":   { bg: "rgba(139,92,246,0.10)", color: "#7C3AED" },
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
                border: active === c ? "2px solid #1A365D" : "2px solid #E2E8F0",
                background: active === c ? "#1A365D" : "white",
                color: active === c ? "white" : "#4A5568",
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: active === c ? "0 4px 14px rgba(26,54,93,0.25)" : "none",
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
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
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* Image area */}
                  <div style={{
                    height: 140,
                    background: REGION_GRAD[p.region] || "linear-gradient(135deg, #1A365D, #2A4A7F)",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "16px 18px",
                    overflow: "hidden",
                  }}>
                    <div aria-hidden="true" style={{
                      position: "absolute", inset: 0, opacity: 0.12,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.4'%3E%3Cpath d='M0 32L32 0H16L0 16M32 32V16L16 32'/%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span style={{ display: "inline-block", padding: "2px 10px", background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 50, color: "white", fontSize: "0.68rem", fontWeight: 700, marginBottom: 4 }}>
                        {p.region}
                      </span>
                    </div>
                    <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ArrowUpRight size={15} color="white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "inline-block", padding: "2px 8px", background: cs.bg, color: cs.color, borderRadius: 4, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10, width: "fit-content" }}>
                      {p.category}
                    </span>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: 8, lineHeight: 1.4 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "#6B7280", lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
                      {p.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
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
