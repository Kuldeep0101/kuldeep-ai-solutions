import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Phone } from "lucide-react";
import { LinkedInIcon, GitHubIcon, XIcon } from "./SocialIcons";
import { CONTACT } from "../data";

const SOCIALS = [
  { Icon: LinkedInIcon, href: CONTACT.linkedin, label: "LinkedIn" },
  { Icon: GitHubIcon,   href: CONTACT.github,   label: "GitHub"   },
  { Icon: XIcon,        href: CONTACT.twitter,  label: "X"        },
];

function validate(f) {
  const e = {};
  if (!f.name.trim())    e.name = "Name is required.";
  if (!f.email.trim())   e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email.";
  if (!f.message.trim()) e.message = "Message is required.";
  else if (f.message.trim().length < 20)                 e.message = "At least 20 characters.";
  return e;
}

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent]     = useState(false);
  const [busy, setBusy]     = useState(false);

  const change = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const submit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setBusy(true);
    await new Promise(r => setTimeout(r, 1200));
    setBusy(false);
    setSent(true);
  };

  return (
    <section id="contact" className="section section-white">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Let's Build Something Great</h2>
          <div className="section-rule" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Ready to start your project? Send a message or book a call directly.
          </p>
        </motion.div>

        {/* Two-column */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 32, alignItems: "start" }}>

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Info card */}
            <div style={{ background: "linear-gradient(135deg, #1A365D 0%, #2A4A7F 100%)", borderRadius: 16, padding: "28px 24px", boxShadow: "0 12px 40px rgba(26,54,93,0.25)" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: 24 }}>Contact Information</h3>

              {/* Email */}
              <a href={`mailto:${CONTACT.email}`} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, textDecoration: "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={15} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 2 }}>Email</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#BFDBFE" }}>{CONTACT.email}</div>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${CONTACT.phone}`} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, textDecoration: "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Phone size={15} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 2 }}>WhatsApp / Phone</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#BFDBFE" }}>{CONTACT.phone}</div>
                </div>
              </a>

              {/* Social */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 20 }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 14 }}>
                  Follow & Connect
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {SOCIALS.map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "background 0.2s" }}
                      onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.20)"}
                      onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.10)"}>
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendly card */}
            <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px", textAlign: "center", boxShadow: "0 2px 12px rgba(26,54,93,0.06)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>📅</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", marginBottom: 6 }}>Prefer a Direct Call?</div>
              <p style={{ fontSize: "0.84rem", color: "#6B7280", marginBottom: 18 }}>Book a free 30-minute strategy session via Calendly.</p>
              <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer"
                className="btn btn-gold" style={{ width: "100%" }} id="contact-calendly-cta">
                Book Free Session
              </a>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: "36px 32px", boxShadow: "0 2px 12px rgba(26,54,93,0.06)" }}>
              {!sent ? (
                <form onSubmit={submit} noValidate>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginBottom: 24 }}>Send a Message</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                    {/* Name */}
                    <div>
                      <label htmlFor="c-name" style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                        Full Name <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input id="c-name" type="text" name="name" value={form.name} onChange={change}
                        placeholder="John Smith"
                        className={`form-field${errors.name ? " form-field-error" : ""}`} />
                      {errors.name && <p style={{ fontSize: "0.78rem", color: "#EF4444", marginTop: 4 }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="c-email" style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                        Email Address <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input id="c-email" type="email" name="email" value={form.email} onChange={change}
                        placeholder="john@company.com"
                        className={`form-field${errors.email ? " form-field-error" : ""}`} />
                      {errors.email && <p style={{ fontSize: "0.78rem", color: "#EF4444", marginTop: 4 }}>{errors.email}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="c-msg" style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                        Message <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <textarea id="c-msg" name="message" value={form.message} onChange={change}
                        rows={6} placeholder="Tell me about your project goals, timeline, and key requirements..."
                        className={`form-field${errors.message ? " form-field-error" : ""}`}
                        style={{ resize: "none" }} />
                      {errors.message && <p style={{ fontSize: "0.78rem", color: "#EF4444", marginTop: 4 }}>{errors.message}</p>}
                    </div>

                    <button type="submit" disabled={busy}
                      className="btn btn-primary"
                      style={{ width: "100%", opacity: busy ? 0.7 : 1, cursor: busy ? "wait" : "pointer" }}
                      id="contact-submit">
                      {busy ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <svg style={{ animation: "spin 1s linear infinite" }} width={16} height={16} viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"/>
                            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Sending...
                        </span>
                      ) : <><Send size={15} /> Send Message</>}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "40px 0" }}>
                  <CheckCircle size={52} color="#22C55E" style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827", marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: "#6B7280", marginBottom: 24 }}>I'll respond within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="btn btn-outline">Send Another</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
