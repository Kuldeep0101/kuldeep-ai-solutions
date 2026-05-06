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
      background: "rgba(18,26,42,0.7)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "20px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      width: "100%",
      maxWidth: 320,
    }}>
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Globe size={15} style={{ color: "#06B6D4" }} />
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F8FAFC" }}>
          Global Delivery Hub
        </span>
      </div>

      {/* Status row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ position: "relative", width: 12, height: 12, flexShrink: 0 }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", opacity: 0.4, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E" }} />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#22C55E" }}>Working while you sleep</div>
          <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Seamless US-India Sync</div>
        </div>
      </div>

      {/* Details Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 4 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.62rem", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Priority Support</div>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F8FAFC" }}>Instant Response</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.62rem", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Global Availability</div>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F8FAFC" }}>24/7 Operations</div>
        </div>
      </div>


      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
      `}</style>
    </div>
  );
}
