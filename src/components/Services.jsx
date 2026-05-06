import { motion } from "framer-motion";
import { MapPin, TrendingUp, Code2, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "../data";

const ICONS = { MapPin, TrendingUp, Code2 };

export default function Services() {
  return (
    <section id="services" className="section section-white">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-title">Services Built for<br />Global Scale</h2>
          <div className="section-rule" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Three core disciplines. One vision: precision solutions for international clients.
          </p>
        </motion.div>

        {/* 3-card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {SERVICES.map((svc, i) => {
            const Icon = ICONS[svc.icon];
            return (
              <motion.article
                key={svc.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Coloured header */}
                <div style={{
                  background: `linear-gradient(135deg, ${svc.colorFrom}, ${svc.colorTo})`,
                  padding: "28px 24px 20px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0, opacity: 0.12,
                    background: "radial-gradient(circle at 80% 20%, white 0%, transparent 55%)",
                  }} />
                  {/* Icon */}
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={22} color="white" />
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "white", marginBottom: 4 }}>{svc.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "rgba(191,219,254,0.9)", fontWeight: 500 }}>{svc.subtitle}</p>
                  {/* Badge */}
                  <div style={{
                    marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.16)", borderRadius: 50, padding: "5px 12px",
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FDE047", display: "block" }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "white" }}>{svc.stats}</span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", color: "#4A5568", lineHeight: 1.75, marginBottom: 18, flex: 1 }}>
                    {svc.description}
                  </p>
                  <ul style={{ listStyle: "none", marginBottom: 20 }}>
                    {svc.highlights.map(h => (
                      <li key={h} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.845rem", color: "#374151", marginBottom: 8 }}>
                        <CheckCircle2 size={14} style={{ color: "#1A365D", flexShrink: 0 }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a href="https://calendly.com/ks71156" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.845rem", fontWeight: 700, color: "#1A365D", textDecoration: "none" }}>
                    Discuss this service <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #services .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
