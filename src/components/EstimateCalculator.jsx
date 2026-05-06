import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Calculator } from "lucide-react";

const STEPS = [
  {
    id: 1, title: "Service Type",
    question: "What type of project do you need?",
    key: "service",
    options: [
      { label: "Full-Stack Web App", icon: "💻", base: 1500 },
      { label: "GEO / Mapping Solution", icon: "🗺️", base: 2000 },
      { label: "Social Media Strategy", icon: "📱", base: 800 },
      { label: "Combined / Multi-Service", icon: "🚀", base: 3000 },
    ],
  },
  {
    id: 2, title: "Project Scale",
    question: "How large is your project?",
    key: "scale",
    type: "slider",
    min: 1, max: 5,
    labels: ["MVP", "Small", "Medium", "Large", "Enterprise"],
    multipliers: [1, 1.5, 2.5, 4, 7],
  },
  {
    id: 3, title: "Timeline",
    question: "What is your preferred timeline?",
    key: "timeline",
    options: [
      { label: "Rush — 1–2 weeks", icon: "⚡", mult: 1.5 },
      { label: "Standard — 4–6 weeks", icon: "📅", mult: 1 },
      { label: "Relaxed — 2–3 months", icon: "🌱", mult: 0.85 },
      { label: "Flexible — No deadline", icon: "♾️", mult: 0.75 },
    ],
  },
];

export default function EstimateCalculator() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ service: [], scale: 3, timeline: null });
  const [done, setDone] = useState(false);

  const cur = STEPS[step];
  const pick = (key, val) => setSel(p => {
    if (key === "service") {
      const arr = p.service.includes(val) ? p.service.filter(x => x !== val) : [...p.service, val];
      return { ...p, service: arr };
    }
    return { ...p, [key]: val };
  });
  const canNext = () => step === 1 || (step === 0 ? sel.service.length > 0 : sel.timeline !== null);

  const next = () => step < 2 ? setStep(step + 1) : setDone(true);
  const prev = () => done ? setDone(false) : setStep(Math.max(0, step - 1));
  const reset = () => { setStep(0); setSel({ service: [], scale: 3, timeline: null }); setDone(false); };

  const estimate = () => {
    if (sel.service.length === 0) return null;
    const base = sel.service.reduce((acc, idx) => acc + STEPS[0].options[idx].base, 0);
    const scaleMul = STEPS[1].multipliers[sel.scale - 1];
    const timeMul = sel.timeline !== null ? STEPS[2].options[sel.timeline].mult : 1;
    const low = Math.round(base * scaleMul * timeMul);
    return { low, high: Math.round(low * 1.35) };
  };
  const result = estimate();

  return (
    <section id="estimate" className="section section-alt">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #1A365D, #2A4A7F)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 6px 20px rgba(26,54,93,0.28)" }}>
            <Calculator size={26} color="white" />
          </div>
          <span className="section-eyebrow">Free Tool</span>
          <h2 className="section-title">Project Estimate Calculator</h2>
          <div className="section-rule" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Answer 3 quick questions to get a ballpark investment range for your project.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            maxWidth: 640,
            margin: "0 auto",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.20)",
          }}
        >
          {/* Progress */}
          {!done && (
            <div className="prog-bar">
              <div className="prog-fill" style={{ width: `${((step + 1) / 3) * 100}%` }} />
            </div>
          )}

          <div style={{ padding: "36px 40px" }}>
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div key={step}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}>

                  {/* Step label */}
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 6, display: "flex", gap: 8 }}>
                    <span>Step {step + 1} of 3</span>
                    <span style={{ color: "#1A365D" }}>— {cur.title}</span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 24 }}>
                    {cur.question}
                  </h3>

                  {/* Option buttons */}
                  {cur.options && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {cur.options.map((opt, idx) => {
                        const isOn = cur.key === "service" ? sel.service.includes(idx) : sel[cur.key] === idx;
                        return (
                          <button key={opt.label} onClick={() => pick(cur.key, idx)}
                            style={{
                              padding: "14px 16px",
                              borderRadius: 12,
                              border: `1px solid ${isOn ? "#06B6D4" : "rgba(255,255,255,0.1)"}`,
                              background: isOn ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.03)",
                              display: "flex", alignItems: "center", gap: 12,
                              cursor: "pointer",
                              transition: "all 0.18s",
                              textAlign: "left",
                              boxShadow: isOn ? "0 4px 14px rgba(6,182,212,0.15)" : "none",
                            }}>
                            <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{opt.icon}</span>
                            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: isOn ? "#06B6D4" : "#CBD5E1", flex: 1 }}>
                              {opt.label}
                            </span>
                            {isOn && <Check size={14} color="#06B6D4" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Slider */}
                  {cur.type === "slider" && (
                    <div>
                      <p style={{ fontSize: "0.82rem", color: "#64748B", marginBottom: 24, lineHeight: 1.5 }}>
                        <strong>MVP</strong> is a core feature set. <strong>Enterprise</strong> includes global localization, advanced security, and high-scale architecture.
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        {cur.labels.map(l => (
                          <span key={l} style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 500 }}>{l}</span>
                        ))}
                      </div>
                      <input type="range" min={cur.min} max={cur.max} value={sel.scale}
                        onChange={e => pick("scale", Number(e.target.value))}
                        style={{ "--pct": `${((sel.scale - 1) / 4) * 100}%` }}
                        aria-label="Project scale"
                      />
                      <div style={{ textAlign: "center", marginTop: 16 }}>
                        <span style={{ display: "inline-block", padding: "8px 24px", borderRadius: 10, background: "linear-gradient(135deg, #1A365D, #2A4A7F)", color: "white", fontWeight: 700, fontSize: "0.9rem" }}>
                          {cur.labels[sel.scale - 1]}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
                    <button onClick={prev} disabled={step === 0}
                      style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.875rem", fontWeight: 500, color: step === 0 ? "rgba(255,255,255,0.2)" : "#94A3B8", background: "none", border: "none", cursor: step === 0 ? "not-allowed" : "pointer", padding: 0 }}>
                      <ChevronLeft size={15} /> Back
                    </button>
                    <button onClick={next} disabled={!canNext()}
                      className="btn btn-primary"
                      style={{ opacity: canNext() ? 1 : 0.4, cursor: canNext() ? "pointer" : "not-allowed" }}>
                      {step === 2 ? "Calculate Estimate" : "Continue"}
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── Results ── */
                <motion.div key="result"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ textAlign: "center" }}>

                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <Check size={30} color="#22C55E" />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 8 }}>Your Estimate</h3>
                  <p style={{ color: "#94A3B8", fontSize: "0.9rem", marginBottom: 28 }}>
                    Based on your selections. Final pricing depends on detailed requirements.
                  </p>

                  {result && (
                    <div style={{
                      borderRadius: 16, padding: "28px 32px", marginBottom: 28,
                      background: "linear-gradient(135deg, #1A365D, #2A4A7F)",
                      boxShadow: "0 12px 40px rgba(26,54,93,0.30)",
                    }}>
                      <p style={{ color: "#93C5FD", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                        Estimated Investment
                      </p>
                      <div style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "white", marginBottom: 4 }}>
                        ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
                      </div>
                      <div style={{ color: "#93C5FD", fontSize: "0.85rem" }}>USD · Ballpark estimate</div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="https://calendly.com/ks71156/strategy-session" target="_blank" rel="noopener noreferrer"
                      className="btn btn-gold" id="estimate-calendly-cta">
                      📅 Book a Consultation
                    </a>
                    <button onClick={reset} className="btn btn-outline">Recalculate</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
