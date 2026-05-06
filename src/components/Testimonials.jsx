import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data";

const CAT_COLORS = {
  "GEO Solutions":   { bg: "rgba(99,102,241,0.12)",  color: "#4338CA" },
  "Web Development": { bg: "rgba(59,130,246,0.12)",  color: "#1D4ED8" },
  "Social Media":    { bg: "rgba(139,92,246,0.12)",  color: "#7C3AED" },
};

export default function Testimonials() {
  const ref = useRef(null);
  const scroll = (d) => ref.current?.scrollBy({ left: d * 350, behavior: "smooth" });

  return (
    <section id="testimonials" className="section section-dark">
      <div className="container">
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#93C5FD", background: "rgba(147,197,253,0.12)", borderRadius: 50, padding: "5px 14px", marginBottom: 14 }}>
              Client Success
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "white", letterSpacing: "-0.025em", marginBottom: 12, lineHeight: 1.2 }}>
              Voices from the Globe
            </h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #D4A843, #E8BC55)", borderRadius: 2, marginBottom: 14 }} />
            <p style={{ color: "#BFDBFE", fontSize: "1rem", lineHeight: 1.7, maxWidth: 380 }}>
              10 reviews from clients across 10 countries. Real results, real relationships.
            </p>
          </motion.div>

          {/* Scroll controls */}
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            {[{ fn: () => scroll(-1), icon: ChevronLeft, label: "Prev" }, { fn: () => scroll(1), icon: ChevronRight, label: "Next" }].map(({ fn, icon: Ic, label }) => (
              <button key={label} onClick={fn} aria-label={label}
                style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.06)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
                onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
                <Ic size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Scroll track */}
        <div ref={ref} style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {TESTIMONIALS.map((t, i) => {
            const cs = CAT_COLORS[t.category] || { bg: "rgba(26,54,93,0.12)", color: "#1A365D" };
            const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                className="tcard"
              >
                {/* Stars */}
                <div className="stars" style={{ marginBottom: 12 }}>★★★★★</div>

                {/* Quote */}
                <p style={{ fontSize: "0.875rem", color: "#94A3B8", lineHeight: 1.75, flex: 1, marginBottom: 18 }}>
                  "{t.review}"
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {/* Avatar */}
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #1A365D, #2A4A7F)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#F8FAFC" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#CBD5E1" }}>{t.role} · {t.flag} {t.company}</div>
                  </div>
                  <span style={{ flexShrink: 0, padding: "2px 8px", borderRadius: 50, fontSize: "0.66rem", fontWeight: 700, background: cs.bg, color: cs.color }}>
                    {t.category.split(" ")[0]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Aggregate rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "10px 24px" }}>
            <span className="stars" style={{ color: "#FBBF24" }}>★★★★★</span>
            <span style={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}>5.0 Average Rating</span>
            <span style={{ color: "#93C5FD", fontSize: "0.84rem" }}>· 10 global clients</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
