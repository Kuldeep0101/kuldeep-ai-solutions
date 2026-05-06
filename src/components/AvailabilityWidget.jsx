import { useState, useEffect } from "react";
import { Clock, Globe } from "lucide-react";

function getIST(opts) {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", ...opts });
}

export default function AvailabilityWidget({ compact = false, dark = false }) {
  const [time, setTime] = useState(() => getIST({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, weekday: "short" }));
  const [date, setDate] = useState(() => getIST({ day: "numeric", month: "short", year: "numeric" }));

  useEffect(() => {
    const t = setInterval(() => {
      setTime(getIST({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, weekday: "short" }));
      setDate(getIST({ day: "numeric", month: "short", year: "numeric" }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  /* ── Compact mode (for footer) ── */
  if (compact) {
    return (
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "8px 14px", borderRadius: 50,
        background: dark ? "rgba(255,255,255,0.08)" : "white",
        border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid #E2E8F0",
        boxShadow: dark ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "block", animation: "pulse-dot 2s infinite" }} />
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: dark ? "#86EFAC" : "#16a34a" }}>Available</span>
        <span style={{ width: 1, height: 12, background: dark ? "rgba(255,255,255,0.18)" : "#E2E8F0" }} />
        <Clock size={12} style={{ color: dark ? "#93C5FD" : "#64748B" }} />
        <span style={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 600, color: dark ? "#BFDBFE" : "#374151" }}>{time}</span>
        <span style={{ fontSize: "0.68rem", color: dark ? "#60A5FA" : "#94A3B8" }}>IST</span>
      </div>
    );
  }

  /* ── Full mode (for hero) ── */
  return (
    <div style={{
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.92)",
      borderRadius: 16,
      padding: "22px 24px",
      boxShadow: "0 4px 20px rgba(26,54,93,0.10)",
      width: "100%",
      maxWidth: 360,
    }}>
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Globe size={16} style={{ color: "#1A365D" }} />
        <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A365D" }}>
          Global Availability
        </span>
      </div>

      {/* Status row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ position: "relative", width: 12, height: 12, flexShrink: 0 }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", opacity: 0.4, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E" }} />
        </div>
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#15803d" }}>Available for International Projects</div>
          <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>Accepting new clients worldwide</div>
        </div>
      </div>

      {/* Clock box */}
      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, color: "#94A3B8" }}>
          <Clock size={12} />
          <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.10em" }}>Current Time — IST</span>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "1.5rem", fontWeight: 800, color: "#1A365D", letterSpacing: "0.02em" }}>{time}</div>
        <div style={{ fontSize: "0.82rem", color: "#6B7280", marginTop: 2 }}>{date}</div>
      </div>

      {/* Meta */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[["Response Time", "< 24 Hours"], ["Time Zone", "UTC +5:30"]].map(([label, val]) => (
          <div key={label} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1A365D" }}>{val}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
      `}</style>
    </div>
  );
}
