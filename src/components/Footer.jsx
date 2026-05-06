import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { LinkedInIcon, GitHubIcon, XIcon } from "./SocialIcons";
import Logo from "./Logo";
import AvailabilityWidget from "./AvailabilityWidget";
import { CONTACT } from "../data";

const NAV = [
  { label: "Services",     href: "#services"     },
  { label: "Projects",     href: "#projects"     },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Estimate",     href: "#estimate"     },
  { label: "Contact",      href: "#contact"      },
];
const SOCIALS = [
  { Icon: LinkedInIcon, href: CONTACT.linkedin, label: "LinkedIn" },
  { Icon: GitHubIcon,   href: CONTACT.github,   label: "GitHub"   },
  { Icon: XIcon,        href: CONTACT.twitter,  label: "X"        },
];

const goto = href => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer style={{ background: "#0A1A2E", color: "white" }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 40 }}>

        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Logo size={40} />
              <div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "white", lineHeight: 1.1 }}>
                  Kuldeep<span style={{ color: "#D4A843" }}>AI</span> Solutions
                </div>
                <div style={{ fontSize: "0.7rem", color: "#93C5FD", fontWeight: 600, letterSpacing: "0.06em" }}>
                  Global Digital Partner
                </div>
              </div>
            </div>
            <p style={{ color: "#93C5FD", fontSize: "0.875rem", lineHeight: 1.75, maxWidth: 320, marginBottom: 20 }}>
              High-performance GEO solutions, full-stack web development, and global social media strategy — engineered for ambitious international clients.
            </p>
            <AvailabilityWidget compact dark />
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 18 }}>
              Navigation
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV.map(l => (
                <li key={l.href}>
                  <button onClick={() => goto(l.href)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, color: "#BFDBFE", padding: 0, transition: "color 0.2s" }}
                    onMouseOver={e => e.currentTarget.style.color = "white"}
                    onMouseOut={e => e.currentTarget.style.color = "#BFDBFE"}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 18 }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
              <a href={`mailto:${CONTACT.email}`}
                style={{ display: "flex", alignItems: "center", gap: 10, color: "#BFDBFE", fontSize: "0.855rem", textDecoration: "none" }}
                onMouseOver={e => e.currentTarget.style.color = "white"}
                onMouseOut={e => e.currentTarget.style.color = "#BFDBFE"}>
                <Mail size={13} /> {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phone}`}
                style={{ display: "flex", alignItems: "center", gap: 10, color: "#BFDBFE", fontSize: "0.855rem", textDecoration: "none" }}
                onMouseOver={e => e.currentTarget.style.color = "white"}
                onMouseOut={e => e.currentTarget.style.color = "#BFDBFE"}>
                <Phone size={13} /> {CONTACT.phone}
              </a>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#BFDBFE", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.16)"; e.currentTarget.style.color = "white"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#BFDBFE"; }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "#475569", fontSize: "0.82rem" }}>
            © {new Date().getFullYear()} Kuldeep AI Solutions. All rights reserved.
          </p>
          <div style={{ color: "#475569", fontSize: "0.78rem", display: "flex", gap: 16 }}>
            <span>🇮🇳 India · IST (UTC+5:30)</span>
            <span>Available Worldwide</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
