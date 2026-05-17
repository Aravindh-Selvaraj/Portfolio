import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database, Code2, BarChart3, Cpu, Mail,
  Download, Terminal, Layers, Zap, Globe,
  ArrowRight, Star, Award, Calendar, MapPin, Menu, X,
  TrendingUp, Cloud, ArrowUpRight, Sun, Moon, User
} from "lucide-react";
import Profile from "./assets/Profile.jpg"


// Custom SVG replacements for the removed Lucide brand icons
const GitHub = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   THEME TOKENS
═══════════════════════════════════════════════════════════ */
const DARK = {
  bg: "#030812",
  bgNav: "rgba(3,8,18,0.88)",
  surface: "rgba(8,18,38,0.75)",
  text: "#f0f4ff",
  textSub: "#94a3b8",
  textMuted: "#475569",
  border: "rgba(6,182,212,0.1)",
  borderHover: "rgba(6,182,212,0.42)",
  navLink: "#64748b",
  navActive: "#06b6d4",
  cardBg: "rgba(8,18,38,0.73)",
  footerText: "#1e3a5f",
  scrollThumb: "rgba(6,182,212,0.35)",
  scrollTrack: "transparent",
  canvasAlpha: 0.62,
  nodeAlpha: { cyan: 0.58, blue: 0.22 },
  lineAlpha: 0.12,
  gridLine: "rgba(6,182,212,0.022)",
  ambientGrad: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(6,182,212,0.045) 0%, transparent 58%)",
};

const LIGHT = {
  bg: "linear-gradient(145deg, #eef6fb 0%, #f0f7ff 40%, #f5f0ff 100%)",
  bgNav: "rgba(236,246,255,0.96)",
  surface: "rgba(255,255,255,0.92)",
  text: "#091525",
  textSub: "#163352",
  textMuted: "#4e6a8a",
  border: "rgba(6,182,212,0.2)",
  borderHover: "rgba(6,182,212,0.62)",
  navLink: "#3d5a80",
  navActive: "#0277b5",
  cardBg: "rgba(255,255,255,0.92)",
  footerText: "#7da3c4",
  scrollThumb: "rgba(6,182,212,0.5)",
  scrollTrack: "rgba(6,182,212,0.07)",
  canvasAlpha: 0.45,
  nodeAlpha: { cyan: 0.75, blue: 0.45 },
  lineAlpha: 0.22,
  gridLine: "rgba(6,182,212,0.055)",
  ambientGrad: "radial-gradient(ellipse 90% 60% at 50% -8%, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.05) 45%, rgba(139,92,246,0.03) 65%, transparent 78%)",
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const GlobalStyles = ({ isDark }) => {
  const T = isDark ? DARK : LIGHT;
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body {
        overflow: hidden; height: 100%; width: 100%;
        max-width: 100vw;
        overscroll-behavior: none;
        background: ${isDark ? T.bg : "linear-gradient(145deg, #eef6fb 0%, #f0f7ff 40%, #f5f0ff 100%)"};
        color: ${T.text};
        font-family: 'Outfit', sans-serif;
        -webkit-font-smoothing: antialiased;
        transition: background 0.4s ease, color 0.4s ease;
        /* Stable scrollbar gutter — prevents layout shift during page transitions */
        scrollbar-gutter: stable;
      }
      #root { height: 100%; width: 100%; max-width: 100vw; overflow: hidden; }
      ::selection { background: rgba(6,182,212,0.28); color: ${isDark ? "#fff" : "#0f172a"}; }

      ::-webkit-scrollbar { width: 3px; height: 3px; }
      ::-webkit-scrollbar-track { background: ${T.scrollTrack}; border-radius: 3px; }
      ::-webkit-scrollbar-thumb {
        background: ${T.scrollThumb};
        border-radius: 3px;
        box-shadow: 0 0 6px rgba(6,182,212,0.3);
      }
      ::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,0.65); }
      * { scrollbar-width: thin; scrollbar-color: ${T.scrollThumb} ${T.scrollTrack}; }

      /* Hide scrollbar entirely on the section scroll containers — the SideDots serve as the navigation indicator */
      .section-inner::-webkit-scrollbar { display: none; }
      .section-inner { -ms-overflow-style: none; scrollbar-width: none; }

      @keyframes drift { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
      @keyframes breathe { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
      @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      @keyframes streamFlow {
        0%   { stroke-dashoffset: 1000; opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }

      .mono { font-family: 'JetBrains Mono', monospace; }
      .gradient-text {
        background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .shimmer-text {
        background: linear-gradient(90deg, #06b6d4, ${isDark ? "#fff" : "#0f172a"}, #3b82f6, #06b6d4);
        background-size: 200% auto;
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        animation: shimmer 4s linear infinite;
      }
      .tag {
        font-family: 'JetBrains Mono', monospace; font-size: 10px;
        padding: 3px 10px; border-radius: 6px;
        border: 1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(6,182,212,0.24)"};
        background: ${isDark ? "rgba(255,255,255,0.03)" : "rgba(240,249,255,0.7)"};
        color: ${isDark ? "#94a3b8" : "#163352"};
        transition: all 0.2s; cursor: default; display: inline-block;
      }
      .tag:hover { transform: scale(1.06); border-color: rgba(6,182,212,0.45); color: #06b6d4; }
      .section-inner {
        overflow-y: auto; overflow-x: hidden; height: 100%;
        padding: 36px max(24px, calc((100% - 1120px)/2)) 60px;
      }
      @media (max-width: 768px) {
        .section-inner { padding: 22px 16px 60px; overflow-x: hidden; }
        .hide-mobile { display: none !important; }
        .show-mobile-btn { display: block !important; }
        .about-grid-pg { grid-template-columns: 1fr !important; }

        /* Hero outer container becomes a full-height scroll region on mobile */
        .hero-outer {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          align-items: flex-start !important;
          padding-top: 0 !important;
        }

        /* Hero — stack photo above text, both centred */
        .hero-layout {
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          gap: 28px !important;
          padding-top: 84px !important;
          padding-bottom: 40px !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
          justify-content: flex-start !important;
          width: 100% !important;
          max-width: 100vw !important;
        }
        .hero-text-col {
          width: 100% !important;
          max-width: 100% !important;
          align-items: center !important;
          min-width: 0 !important;
        }
        .hero-tags  { justify-content: center !important; flex-wrap: wrap !important; }
        .hero-ctas  { justify-content: center !important; flex-wrap: wrap !important; }
        /* "Available" badge — ensure visible above navbar on very small viewports */
        .hero-status {
          justify-content: center !important;
          position: relative !important;
          z-index: 101 !important;
        }
        .hero-social{ justify-content: center !important; }

        /* Contact page — add top padding so content starts below navbar */
        .contact-page {
          align-items: flex-start !important;
          overflow-y: auto !important;
          padding-top: 84px !important;
          padding-bottom: 40px !important;
        }

        /* Profile column */
        .hero-photo-col {
          flex-shrink: 0 !important;
          width: 200px !important;
          height: 200px !important;
        }
      }
      @media (min-width: 769px) { .show-mobile-btn { display: none !important; } }
    `}</style>
  );
};

/* ═══════════════════════════════════════════════════════════
   DATA FLOW CANVAS  — left-to-right ETL stream
═══════════════════════════════════════════════════════════ */
const DataFlowCanvas = ({ isDark }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    /* nodes flow strictly left→right at varying speeds/rows */
    const makeNode = (xOverride) => {
      const x = xOverride !== undefined ? xOverride : Math.random() * W;
      return {
        x,
        y: Math.random() * H,
        vx: 0.55 + Math.random() * 1.1,   // always positive → rightward
        vy: (Math.random() - 0.5) * 0.12,  // tiny vertical drift
        r: Math.random() * 1.8 + 0.55,
        pulse: Math.random() * Math.PI * 2,
        kind: Math.random() > 0.58 ? "cyan" : "blue",
        trail: [],                          // store last positions for trail
      };
    };

    const nodes = Array.from({ length: 68 }, () => makeNode());

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      const dark = isDarkRef.current;
      const na   = dark ? { cyan: 0.58, blue: 0.22 } : { cyan: 0.92, blue: 0.72 };
      const la   = dark ? 0.12 : 0.42;

      nodes.forEach(n => {
        /* save trail */
        n.trail.push({ x: n.x, y: n.y });
        if (n.trail.length > 18) n.trail.shift();

        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.016;

        /* vertical soft boundary */
        if (n.y < 0 || n.y > H) n.vy *= -1;

        /* wrap around on exit right */
        if (n.x > W + 20) {
          Object.assign(n, makeNode(-20));
          n.trail = [];
        }
      });

      /* draw connecting lines between nearby nodes */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${((130 - d) / 130) * la})`;
            ctx.lineWidth   = dark ? 0.55 : 0.9;
            ctx.stroke();
          }
        }
      }

      /* draw nodes + trails */
      nodes.forEach(n => {
        const p  = 0.65 + Math.sin(n.pulse) * 0.35;
        const [cr, cg, cb] = n.kind === "cyan" ? [6, 182, 212] : [59, 130, 246];
        const a  = (n.kind === "cyan" ? na.cyan : na.blue) * p;

        /* trail */
        if (n.trail.length > 1) {
          for (let t = 1; t < n.trail.length; t++) {
            const progress = t / n.trail.length;
            ctx.beginPath();
            ctx.moveTo(n.trail[t - 1].x, n.trail[t - 1].y);
            ctx.lineTo(n.trail[t].x,     n.trail[t].y);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a * progress * 0.45})`;
            ctx.lineWidth   = n.r * progress * 0.8;
            ctx.stroke();
          }
        }

        /* node glow */
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${a * 0.4})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        /* node dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
        opacity: isDark ? 0.62 : 0.85,
        transition: "opacity 0.4s ease",
      }}
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   CURSOR GLOW
═══════════════════════════════════════════════════════════ */
const CursorGlow = ({ isDark }) => {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const fn = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <motion.div
      animate={{ x: pos.x - 240, y: pos.y - 240 }}
      transition={{ type: "spring", stiffness: 115, damping: 17 }}
      style={{
        position: "fixed", width: 480, height: 480, borderRadius: "50%",
        background: `radial-gradient(circle, ${isDark ? "rgba(6,182,212,0.05)" : "rgba(6,182,212,0.07)"} 0%, transparent 65%)`,
        pointerEvents: "none", zIndex: 1, mixBlendMode: "screen",
      }}
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   GRID OVERLAY
═══════════════════════════════════════════════════════════ */
const GridOverlay = ({ isDark }) => {
  const line = isDark ? "rgba(6,182,212,0.022)" : "rgba(6,182,212,0.055)";
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
      backgroundSize: "64px 64px",
      maskImage: "radial-gradient(ellipse at center, black 0%, transparent 72%)",
      transition: "background-image 0.4s ease",
    }} />
  );
};

/* ═══════════════════════════════════════════════════════════
   SECTIONS
═══════════════════════════════════════════════════════════ */
const SECTIONS = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

/* ═══════════════════════════════════════════════════════════
   SIDE DOTS
═══════════════════════════════════════════════════════════ */
const SideDots = ({ current, onChange, isDark }) => {
  const T = isDark ? DARK : LIGHT;
  return (
    <div className="hide-mobile" style={{
      position: "fixed", right: 26, top: "50%", transform: "translateY(-50%)",
      zIndex: 90, display: "flex", flexDirection: "column", gap: 13, alignItems: "center",
    }}>
      {SECTIONS.map((s, i) => (
        <motion.button
          key={s} onClick={() => onChange(i)} title={s} whileHover={{ scale: 1.3 }}
          style={{
            width: i === current ? 8 : 6,
            height: i === current ? 26 : 6,
            borderRadius: 999,
            background: i === current ? "linear-gradient(180deg,#06b6d4,#3b82f6)" : (isDark ? "rgba(6,182,212,0.18)" : "rgba(6,182,212,0.28)"),
            border: "none", cursor: "pointer", outline: "none", padding: 0,
            transition: "all 0.32s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: i === current ? "0 0 14px rgba(6,182,212,0.55)" : "none",
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════════════════ */
const ThemeToggle = ({ isDark, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(6,182,212,0.35)" }}
    whileTap={{ scale: 0.92 }}
    style={{
      width: 40, height: 40, borderRadius: "50%",
      background: isDark ? "rgba(6,182,212,0.1)" : "rgba(6,182,212,0.12)",
      border: `1px solid ${isDark ? "rgba(6,182,212,0.25)" : "rgba(6,182,212,0.35)"}`,
      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      color: "#06b6d4", flexShrink: 0,
    }}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
const Navbar = ({ current, onChange, isDark, onThemeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const T = isDark ? DARK : LIGHT;

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 68, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 max(22px, calc((100% - 1200px)/2))",
        background: T.bgNav,
        backdropFilter: "blur(26px)", WebkitBackdropFilter: "blur(26px)",
        borderBottom: `1px solid ${T.border}`,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Logo */}
      <motion.button whileHover={{ scale: 1.04 }} onClick={() => onChange(0)}
        style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: "linear-gradient(135deg,#06b6d4,#3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 18px rgba(6,182,212,0.38)",
        }}>
          <Database size={16} color="white" />
        </div>
        <span className="mono" style={{ fontSize: 13, color: T.text, fontWeight: 600, letterSpacing: "-0.02em", transition: "color 0.3s" }}>
          data.portfolio
        </span>
      </motion.button>

      {/* Desktop nav */}
      <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {SECTIONS.map((s, i) => (
          <motion.button key={s} onClick={() => onChange(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            style={{
              background: i === current ? (isDark ? "rgba(6,182,212,0.09)" : "rgba(6,182,212,0.1)") : "transparent",
              border: i === current ? `1px solid rgba(6,182,212,0.22)` : "1px solid transparent",
              borderRadius: 9, padding: "7px 16px", cursor: "pointer",
              color: i === current ? T.navActive : T.navLink,
              fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif",
              transition: "all 0.2s",
            }}>{s}</motion.button>
        ))}
        <motion.a href="#" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6,182,212,0.28)" }}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "7px 18px",
            borderRadius: 10, marginLeft: 6,
            background: "linear-gradient(135deg,rgba(6,182,212,0.14),rgba(59,130,246,0.14))",
            border: "1px solid rgba(6,182,212,0.26)",
            color: "#06b6d4", textDecoration: "none",
            fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
            transition: "box-shadow 0.25s",
          }}><Download size={12} /> Resume</motion.a>
        <div style={{ marginLeft: 8 }}>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>
      </nav>

      {/* Mobile */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="show-mobile-btn" style={{ display: "none" }}>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>
        <button className="show-mobile-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: T.textSub, display: "none" }}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{
              position: "absolute", top: 68, left: 0, right: 0,
              background: isDark ? "rgba(3,8,18,0.97)" : "rgba(248,250,252,0.97)",
              backdropFilter: "blur(22px)", borderBottom: `1px solid ${T.border}`,
              padding: "10px 0",
            }}>
            {SECTIONS.map((s, i) => (
              <motion.button key={s} initial={{ x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }} onClick={() => { onChange(i); setMenuOpen(false); }}
                style={{
                  display: "block", width: "100%", background: "none", border: "none",
                  cursor: "pointer", padding: "12px 24px", textAlign: "left",
                  color: i === current ? "#06b6d4" : T.navLink,
                  fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600,
                }}>{s}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE TRANSITION — slide UP
═══════════════════════════════════════════════════════════ */
const pageV = {
  enter:  { y: "100%", opacity: 0, scale: 0.97, filter: "blur(8px)" },
  center: { y: 0,      opacity: 1, scale: 1,    filter: "blur(0px)" },
  exit:   { y: "-100%",opacity: 0, scale: 0.97, filter: "blur(8px)" },
};
const pageTx = { duration: 0.52, ease: [0.22, 1, 0.36, 1] };

/* ═══════════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════════ */
const GlassCard = ({ children, style = {}, accent = "#06b6d4", isDark = true }) => {
  const [h, setH] = useState(false);
  const T = isDark ? DARK : LIGHT;
  return (
    <motion.div
      onHoverStart={() => setH(true)} onHoverEnd={() => setH(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 270, damping: 21 }}
      style={{
        background: isDark
          ? T.cardBg
          : h
            ? `linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(${accent === "#06b6d4" ? "236,254,255" : accent === "#3b82f6" ? "239,246,255" : accent === "#10b981" ? "236,253,245" : accent === "#a855f7" ? "250,245,255" : accent === "#f59e0b" ? "255,251,235" : "240,249,255"},0.97) 100%)`
            : "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(248,252,255,0.9) 100%)",
        backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
        border: isDark
          ? `1px solid ${h ? `${accent}55` : T.border}`
          : `1px solid ${h ? `${accent}60` : `${accent}28`}`,
        borderRadius: 18,
        boxShadow: isDark
          ? h
            ? `0 8px 44px rgba(0,0,0,0.45), 0 0 0 1px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.05)`
            : `0 4px 24px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.03)`
          : h
            ? `0 12px 48px rgba(0,20,60,0.14), 0 2px 8px rgba(0,20,60,0.06), 0 0 0 1px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.95)`
            : `0 4px 20px rgba(0,20,60,0.07), 0 1px 3px rgba(0,20,60,0.04), inset 0 1px 0 rgba(255,255,255,0.85)`,
        transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
        ...style,
      }}
    >{children}</motion.div>
  );
};

const Eyebrow = ({ label, icon: Icon }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48 }}
    style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
    <div style={{
      display: "flex", alignItems: "center", gap: 7,
      background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)",
      borderRadius: 999, padding: "4px 14px",
    }}>
      {Icon && <Icon size={11} color="#06b6d4" />}
      <span className="mono" style={{ fontSize: 10, color: "#06b6d4", letterSpacing: "0.13em" }}>{label}</span>
    </div>
  </motion.div>
);

const Stagger = ({ children, delay = 0 }) => (
  <motion.div initial="hidden" animate="visible"
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}>
    {children}
  </motion.div>
);
const SI = ({ children, y = 22 }) => (
  <motion.div variants={{
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
  }}>{children}</motion.div>
);

/* ═══════════════════════════════════════════════════════════
   PAGE 0 — HERO
═══════════════════════════════════════════════════════════ */
const HeroPage = ({ onNav, isDark }) => {
  const T    = isDark ? DARK : LIGHT;
  const tags = ["Python", "SQL", "ETL Pipelines", "Power BI", "React.js", "MIS Analytics", "Google Apps Script"];

  /* Social link button — used for LinkedIn & GitHub */
  const SocialBtn = ({ href, icon: Icon, label, color }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      whileHover={{ scale: 1.1, boxShadow: `0 0 22px ${color}55`, borderColor: `${color}66` }}
      whileTap={{ scale: 0.93 }}
      style={{
        width: 42, height: 42, borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `${color}0f`,
        border: `1px solid ${color}28`,
        color: color,
        textDecoration: "none",
        transition: "box-shadow 0.25s, border-color 0.25s",
        flexShrink: 0,
      }}
    >
      <Icon size={18} />
    </motion.a>
  );

  return (
    <div
      className="hero-outer"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 max(24px, calc((100% - 1100px)/2))",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Ambient orbs */}
      <div style={{ position: "absolute", top: "10%", left: "4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 65%)", filter: "blur(52px)", pointerEvents: "none", animation: "drift 9s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "4%", width: 330, height: 330, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 65%)", filter: "blur(52px)", pointerEvents: "none", animation: "drift 12s ease-in-out infinite reverse" }} />

      <Stagger delay={0.15}>
        {/* Two-column hero layout — stacks on mobile via .hero-layout CSS class */}
        <div
          className="hero-layout"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "clamp(28px, 5vw, 80px)",
            position: "relative",
            zIndex: 2,
            width: "100%",
          }}
        >
          {/* ── LEFT / TOP on mobile: Text content ── */}
          <div className="hero-text-col" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            {/* Available badge */}
            <SI>
              <div className="hero-status" style={{ display: "flex", alignItems: "center", marginBottom: 22 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 999, padding: "5px 16px" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "breathe 2.5s ease-in-out infinite" }} />
                  <span className="mono" style={{ fontSize: 11, color: "#10b981", letterSpacing: "0.08em" }}>Available · Data & Analytics Roles</span>
                </div>
              </div>
            </SI>

            {/* Headline */}
            <SI>
              <h1 style={{ fontSize: "clamp(24px, 4vw, 54px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.text, marginBottom: 16, transition: "color 0.4s" }}>
                Transforming Complex Data into{" "}
                <span className="gradient-text">Automated Intelligence</span>
                {" "}&amp; Interactive Applications.
              </h1>
            </SI>

            {/* Sub-headline */}
            <SI>
              <p className="mono" style={{ fontSize: "clamp(10px, 1.25vw, 13px)", color: T.textMuted, marginBottom: 24, lineHeight: 1.85, transition: "color 0.4s" }}>
                Data Analyst &amp; Automation Professional{" "}
                <span style={{ color: "rgba(6,182,212,0.4)" }}>|</span>{" "}
                Python · SQL · Power BI · React.js
              </p>
            </SI>

            {/* Skill tags */}
            <SI>
              <div className="hero-tags" style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 30 }}>
                {tags.map(t => <motion.span key={t} className="tag" whileHover={{ scale: 1.07 }}>{t}</motion.span>)}
              </div>
            </SI>

            {/* CTA buttons */}
            <SI>
              <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(6,182,212,0.32)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNav(4)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg,#06b6d4,#3b82f6)", border: "none", cursor: "pointer", color: "white", fontSize: 14, fontWeight: 700, fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.01em", boxShadow: "0 4px 20px rgba(6,182,212,0.22)", transition: "box-shadow 0.25s" }}
                >
                  View My Work <ArrowRight size={15} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "rgba(6,182,212,0.45)", color: "#06b6d4" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNav(5)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "transparent", border: `1px solid ${isDark ? "rgba(6,182,212,0.18)" : "rgba(6,182,212,0.3)"}`, cursor: "pointer", color: T.textSub, fontSize: 14, fontWeight: 600, fontFamily: "'Outfit',sans-serif", transition: "all 0.22s" }}
                >
                  <Mail size={15} /> Contact Me
                </motion.button>
              </div>
            </SI>

            {/* ── Social Links ── */}
            <SI>
              <div className="hero-social" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="mono" style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.1em", marginRight: 2 }}>// connect</span>

                <SocialBtn
                  href="https://linkedin.com/in/yourprofile"
                  icon={Linkedin}
                  label="LinkedIn"
                  color="#0a66c2"
                />
                <SocialBtn
                  href="https://github.com/yourusername"
                  icon={GitHub}
                  label="GitHub"
                  color={isDark ? "#94a3b8" : "#334155"}
                />

                {/* Divider */}
                <div style={{ width: 1, height: 28, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)", margin: "0 4px" }} />

                {/* Resume download */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 18px rgba(6,182,212,0.28)" }}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.22)", color: "#06b6d4", textDecoration: "none", fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", transition: "box-shadow 0.25s" }}
                >
                  <Download size={12} /> Resume
                </motion.a>
              </div>
            </SI>
          </div>

          {/* ── RIGHT / BOTTOM on mobile: Profile photo ── */}
          <SI>
            <div
              className="hero-photo-col"
              style={{
                flexShrink: 0,
                width: "clamp(200px, 22vw, 280px)",
                height: "clamp(200px, 22vw, 280px)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "38% 62% 55% 45% / 48% 40% 60% 52%",
                  border: "1px dashed rgba(6,182,212,0.22)",
                  pointerEvents: "none",
                }}
              />
              {/* Inner counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: "12%",
                  borderRadius: "55% 45% 38% 62% / 52% 60% 40% 48%",
                  border: "1px dashed rgba(59,130,246,0.18)",
                  pointerEvents: "none",
                }}
              />

              {/* Profile squircle */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(6,182,212,0.55), 0 0 90px rgba(59,130,246,0.25)" }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                style={{
                  position: "relative",
                  width: "66%", height: "66%",
                  borderRadius: "42% 58% 52% 48% / 44% 46% 54% 56%",
                  background: isDark
                    ? "linear-gradient(145deg,rgba(6,182,212,0.12),rgba(59,130,246,0.08))"
                    : "linear-gradient(145deg,rgba(6,182,212,0.15),rgba(59,130,246,0.1))",
                  border: "2px solid rgba(6,182,212,0.38)",
                  boxShadow: isDark
                    ? "0 0 32px rgba(6,182,212,0.28), 0 0 60px rgba(59,130,246,0.12), inset 0 0 28px rgba(6,182,212,0.06)"
                    : "0 0 28px rgba(6,182,212,0.22), 0 0 54px rgba(59,130,246,0.1), inset 0 0 20px rgba(6,182,212,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  zIndex: 2, cursor: "default",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Specular highlight */}
                <div style={{ position: "absolute", top: "8%", left: "12%", width: "34%", height: "26%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.13) 0%,transparent 70%)", pointerEvents: "none" }} />

                {/* Avatar placeholder */}
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, padding: "8%" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg,rgba(6,182,212,0.25),rgba(59,130,246,0.2))", border: "1.5px solid rgba(6,182,212,0.42)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"}}>
                  <img src={Profile} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}}/>
                </div>
              </div>

                {/* Scan-line shimmer */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 3.5 }}
                  style={{ position: "absolute", left: 0, right: 0, height: "32%", background: "linear-gradient(to bottom,transparent,rgba(6,182,212,0.08),transparent)", pointerEvents: "none" }}
                />
              </motion.div>

              {/* ── Data Analyst role badge — anchored below photo ── */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 220, damping: 18 }}
                style={{
                  position: "absolute",
                  bottom: "8%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: isDark ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.92)",
                  border: "1.5px solid rgba(6,182,212,0.45)",
                  borderRadius: 999,
                  padding: "5px 16px",
                  backdropFilter: "blur(14px)",
                  whiteSpace: "nowrap",
                  zIndex: 4,
                  boxShadow: "0 4px 18px rgba(6,182,212,0.2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 6px #06b6d4", animation: "breathe 2s infinite" }} />
                  <span className="mono" style={{ fontSize: 11, color: "#06b6d4", fontWeight: 600, letterSpacing: "0.06em" }}>
                    Data Analyst
                  </span>
                </div>
              </motion.div>

              {/* Floating side badges */}
              {[
                { label: "ETL",  offsetX: "80%", offsetY: "22%", delay: 0.4 },
                { label: "MIS",  offsetX: "0%", offsetY: "55%", delay: 0.9 },
                { label: "RCM",  offsetX: "80%",  offsetY: "68%", delay: 1.3 },
              ].map(b => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: b.delay, type: "spring", stiffness: 200 }}
                  style={{
                    position: "absolute", left: b.offsetX, top: b.offsetY,
                    background: isDark ? "rgba(8,18,38,0.9)" : "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(6,182,212,0.28)",
                    borderRadius: 8, padding: "4px 10px", whiteSpace: "nowrap",
                    backdropFilter: "blur(12px)", zIndex: 3,
                  }}
                >
                  <span className="mono" style={{ fontSize: 10, color: "#06b6d4" }}>{b.label}</span>
                </motion.div>
              ))}
            </div>
          </SI>
        </div>
      </Stagger>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ABOUT — EDUCATION MODAL
═══════════════════════════════════════════════════════════ */
const EDUCATION_TIMELINE = [
  {
    degree: "12th Grade",
    field: "Science (PCM + CS)",
    institution: "State Board",
    year: "2019",
    color: "#10b981",
    icon: "🏫",
    note: "Foundation in Mathematics, Physics, and Computer Science",
  },
  {
    degree: "BSc Computer Science",
    field: "Bachelor of Science",
    institution: "Bharathidasan University",
    year: "2019 – 2022",
    color: "#3b82f6",
    icon: "🎓",
    note: "Core CS fundamentals: algorithms, databases, networking, programming",
  },
  {
    degree: "MSc Computer Science",
    field: "Master of Science",
    institution: "Bharathidasan University",
    year: "2022 – 2024",
    color: "#a855f7",
    icon: "✦",
    note: "Specialisation in data systems, advanced programming, and research methodology",
  },
];

const TOOLS_LIST = [
  { name: "Python",            category: "Language",   color: "#f59e0b", icon: "🐍" },
  { name: "SQL",               category: "Database",   color: "#06b6d4", icon: "🗄️" },
  { name: "Power BI",          category: "Analytics",  color: "#f59e0b", icon: "📊" },
  { name: "Google Apps Script",category: "Automation", color: "#10b981", icon: "⚙️" },
  { name: "React.js",          category: "Frontend",   color: "#3b82f6", icon: "⚛️" },
  { name: "Pandas / NumPy",    category: "Data",       color: "#a855f7", icon: "🐼" },
  { name: "Git & GitHub",      category: "DevOps",     color: "#94a3b8", icon: "🔧" },
  { name: "VS Code",           category: "IDE",        color: "#06b6d4", icon: "💻" },
];

const AboutModal = ({ type, isDark, onClose }) => {
  const T = isDark ? DARK : LIGHT;
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const isEdu    = type === "education";
  const accent   = isEdu ? "#a855f7" : "#10b981";
  const accentB  = isEdu ? "#6366f1" : "#06b6d4";
  const title    = isEdu ? "Education Timeline" : "Tools & Technologies";
  const subtitle = isEdu ? "Academic journey from school to postgraduate" : "Stack I work with daily";

  return (
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 500,
          background: isDark
            ? `radial-gradient(ellipse 80% 70% at 50% 40%, ${accent}18 0%, rgba(2,6,20,0.88) 60%)`
            : `radial-gradient(ellipse 80% 70% at 50% 40%, ${accent}12 0%, rgba(10,25,60,0.52) 60%)`,
          backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}
      >
        {/* ── Modal shell — frosted glass ── */}
        <motion.div
          initial={{ scale: 0.86, opacity: 0, y: 48 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 640,
            /* layered glass: translucent base + subtle tint */
            background: isDark
              ? `linear-gradient(145deg, rgba(14,22,50,0.72) 0%, rgba(8,14,36,0.78) 100%)`
              : `linear-gradient(145deg, rgba(255,255,255,0.62) 0%, rgba(240,248,255,0.72) 100%)`,
            backdropFilter: "blur(36px) saturate(180%)",
            WebkitBackdropFilter: "blur(36px) saturate(180%)",
            border: `1px solid ${isDark ? `${accent}28` : `${accent}30`}`,
            borderRadius: 28,
            boxShadow: isDark
              ? `0 0 0 1px ${accent}10, 0 40px 100px rgba(0,0,0,0.65), 0 0 80px ${accent}14, inset 0 1px 0 rgba(255,255,255,0.07)`
              : `0 0 0 1px ${accent}18, 0 32px 80px rgba(0,0,0,0.18), 0 0 60px ${accent}10, inset 0 1px 0 rgba(255,255,255,0.9)`,
            overflow: "hidden",
            maxHeight: "88vh",
            display: "flex", flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Ambient glow orbs inside the modal */}
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`, pointerEvents: "none", filter: "blur(30px)", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${accentB}12 0%, transparent 65%)`, pointerEvents: "none", filter: "blur(28px)", zIndex: 0 }} />

          {/* ── Sticky glass header ── */}
          <div style={{
            padding: "20px 26px 16px",
            borderBottom: `1px solid ${isDark ? `${accent}20` : `${accent}18`}`,
            background: isDark
              ? `rgba(8,14,36,0.85)`
              : `rgba(255,255,255,0.75)`,
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            position: "sticky", top: 0, zIndex: 10,
            flexShrink: 0,
          }}>
            {/* Accent top-bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accent}, ${accentB}, transparent)`, opacity: 0.7 }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Icon bubble — glass */}
                <motion.div
                  animate={{ boxShadow: [`0 0 12px ${accent}30`, `0 0 28px ${accent}60`, `0 0 12px ${accent}30`] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: 44, height: 44, borderRadius: 13,
                    background: isDark ? `${accent}18` : `${accent}14`,
                    border: `1px solid ${accent}38`,
                    backdropFilter: "blur(12px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0,
                  }}>
                  {isEdu ? "🎓" : "🛠️"}
                </motion.div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: T.text, letterSpacing: "-0.025em", lineHeight: 1.2 }}>{title}</h3>
                  <p style={{ fontSize: 11, color: T.textMuted, marginTop: 3, letterSpacing: "0.02em" }}>{subtitle}</p>
                </div>
              </div>
              {/* Close — glass pill */}
              <motion.button
                whileHover={{ scale: 1.12, background: isDark ? "rgba(255,255,255,0.12)" : `${accent}14` }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                  backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: T.textMuted, fontSize: 14, transition: "all 0.2s",
                }}
              >✕</motion.button>
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div style={{ overflowY: "auto", padding: "24px 26px 28px", position: "relative", zIndex: 1 }}>
            {isEdu ? (
              /* ── Education Timeline — glass cards ── */
              <div style={{ position: "relative" }}>
                {/* Timeline spine */}
                <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 1.5, background: `linear-gradient(to bottom, ${EDUCATION_TIMELINE[0].color}70, ${EDUCATION_TIMELINE[1].color}70, ${EDUCATION_TIMELINE[2].color}70, transparent)`, borderRadius: 999 }} />

                {EDUCATION_TIMELINE.map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.45, ease: [0.22,1,0.36,1] }}
                    style={{ display: "flex", gap: 20, marginBottom: i < EDUCATION_TIMELINE.length - 1 ? 24 : 0 }}
                  >
                    {/* Node */}
                    <div style={{ flexShrink: 0, paddingTop: 3 }}>
                      <motion.div
                        animate={{ boxShadow: [`0 0 10px ${edu.color}28`, `0 0 22px ${edu.color}55`, `0 0 10px ${edu.color}28`] }}
                        transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                        style={{
                          width: 38, height: 38, borderRadius: "50%",
                          background: isDark ? `${edu.color}15` : `${edu.color}12`,
                          border: `1.5px solid ${edu.color}`,
                          backdropFilter: "blur(8px)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", zIndex: 1, fontSize: 16,
                        }}>
                        {edu.icon}
                      </motion.div>
                    </div>

                    {/* Glass card */}
                    <motion.div
                      whileHover={{ y: -3, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      style={{
                        flex: 1, padding: "16px 18px", borderRadius: 16,
                        background: isDark
                          ? `linear-gradient(135deg, ${edu.color}0f 0%, rgba(8,14,36,0.55) 100%)`
                          : `linear-gradient(135deg, ${edu.color}0a 0%, rgba(255,255,255,0.65) 100%)`,
                        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                        border: `1px solid ${edu.color}28`,
                        boxShadow: isDark
                          ? `0 4px 28px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`
                          : `0 4px 20px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)`,
                        position: "relative", overflow: "hidden",
                      }}>
                      {/* Inner glow accent */}
                      <div style={{ position: "absolute", top: -12, right: -12, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${edu.color}18 0%, transparent 70%)`, pointerEvents: "none" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap", marginBottom: 5 }}>
                        <h4 style={{ fontSize: 14.5, fontWeight: 800, color: T.text, letterSpacing: "-0.015em", zIndex: 1, position: "relative" }}>{edu.degree}</h4>
                        <span className="mono" style={{ fontSize: 10, color: edu.color, background: isDark ? `${edu.color}16` : `${edu.color}12`, border: `1px solid ${edu.color}30`, padding: "2px 10px", borderRadius: 999, backdropFilter: "blur(6px)", flexShrink: 0 }}>{edu.year}</span>
                      </div>
                      <p style={{ fontSize: 12, color: edu.color, fontWeight: 700, marginBottom: 3, zIndex: 1, position: "relative" }}>{edu.field}</p>
                      <p style={{ fontSize: 11, color: T.textMuted, marginBottom: 7, zIndex: 1, position: "relative" }}>{edu.institution}</p>
                      <p style={{ fontSize: 12, color: T.textSub, lineHeight: 1.68, zIndex: 1, position: "relative" }}>{edu.note}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* ── Tools Grid — glass chips ── */
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                {TOOLS_LIST.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.88, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.32, ease: [0.22,1,0.36,1] }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    style={{
                      padding: "14px 16px", borderRadius: 14,
                      background: isDark
                        ? `linear-gradient(135deg, ${tool.color}10 0%, rgba(8,14,36,0.5) 100%)`
                        : `linear-gradient(135deg, ${tool.color}0c 0%, rgba(255,255,255,0.72) 100%)`,
                      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                      border: `1px solid ${tool.color}26`,
                      boxShadow: isDark
                        ? `0 2px 18px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)`
                        : `0 2px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.88)`,
                      display: "flex", alignItems: "center", gap: 13,
                      cursor: "default", position: "relative", overflow: "hidden",
                      transition: "box-shadow 0.25s",
                    }}
                  >
                    {/* Hover glow */}
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 20% 50%, ${tool.color}0c 0%, transparent 70%)`, pointerEvents: "none" }} />
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: isDark ? `${tool.color}16` : `${tool.color}12`,
                      border: `1px solid ${tool.color}28`,
                      backdropFilter: "blur(8px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, position: "relative", zIndex: 1,
                    }}>{tool.icon}</div>
                    <div style={{ zIndex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tool.name}</div>
                      <div className="mono" style={{ fontSize: 10, color: tool.color, marginTop: 2, fontWeight: 600 }}>{tool.category}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE 1 — ABOUT
═══════════════════════════════════════════════════════════ */
const AboutPage = ({ isDark }) => {
  const T = isDark ? DARK : LIGHT;
  const [aboutModal, setAboutModal] = useState(null); // "education" | "tools" | null

  const stats = [
    { value: "Edu",   label: "Education",     icon: Star,   color: "#a855f7", clickType: "education" },
    { value: "5+",    label: "Tools Mastered", icon: Zap,    color: "#10b981", clickType: "tools"     },
  ];
  return (
    <div className="section-inner">
      <Eyebrow label="// about.me" icon={Terminal} />
      <Stagger delay={0.06}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "start" }} className="about-grid-pg">
          <div>
            <SI>
              <h2 style={{ fontSize: "clamp(22px,2.8vw,40px)", fontWeight: 900, color: T.text, lineHeight: 1.12, marginBottom: 22, letterSpacing: "-0.03em", transition: "color 0.4s" }}>
                Data & MIS Professional<br /><span className="gradient-text">turned Analytics Engineer</span>
              </h2>
            </SI>
            {[
              "I'm a Data & MIS Professional with an MSc in Computer Science, currently working in the healthcare revenue cycle domain. Starting my career in RCM Medical Billing and transitioning into MIS, I specialize in transforming complex healthcare data into automation-driven reporting and analytics systems.",
              "I automate manual business processes, build ETL-style workflows, and create data-driven insights through Power BI, SQL, and modern data transformation techniques. With experience in React.js, I build interactive, data-focused applications alongside analytics solutions.",
              "Currently focused on advancing my expertise in Data Engineering, Cloud, and scalable analytics systems.",
            ].map((p, i) => (
              <SI key={i}><p style={{ fontSize: 14.5, color: T.textSub, lineHeight: 1.88, marginBottom: 16, transition: "color 0.4s" }}>{p}</p></SI>
            ))}
            <SI>
              <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                {["Python", "SQL", "Power BI", "React.js", "ETL"].map(t => (
                  <motion.span key={t} className="tag" whileHover={{ scale: 1.08 }}
                    style={{ borderColor: "rgba(6,182,212,0.25)", color: "#06b6d4", background: "rgba(6,182,212,0.06)" }}>{t}</motion.span>
                ))}
              </div>
            </SI>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {/* Two stat cards side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
              {stats.map(s => (
                <SI key={s.label}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    onClick={() => setAboutModal(s.clickType)}
                    style={{ cursor: "pointer", height: "100%" }}
                  >
                    <GlassCard accent={s.color} isDark={isDark} style={{ padding: "22px 18px", position: "relative", height: "100%" }}>
                      <span className="mono" style={{ position: "absolute", top: 10, right: 11, fontSize: 8, color: s.color, opacity: 0.55 }}>click ↗</span>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}13`, border: `1px solid ${s.color}26`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 13 }}>
                        <s.icon size={16} color={s.color} />
                      </div>
                      <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: T.text, marginBottom: 4, transition: "color 0.4s" }}>{s.value}</div>
                      <div style={{ fontSize: 11.5, color: T.textMuted, fontWeight: 500, transition: "color 0.4s" }}>{s.label}</div>
                    </GlassCard>
                  </motion.div>
                </SI>
              ))}
            </div>
            {/* JSON card — full width row, exactly matching the two-card total width above */}
            <SI>
              <GlassCard isDark={isDark} accent="#06b6d4" style={{ padding: "20px 22px", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 6px #06b6d4", animation: "breathe 2.5s infinite", flexShrink: 0 }} />
                  <div className="mono" style={{ fontSize: 10, color: "#06b6d4", letterSpacing: "0.1em" }}>// current_focus.json</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px 0" }}>
                  {[
                    { key: "domain",   value: '"Healthcare RCM"',  color: "#f59e0b" },
                    { key: "learning", value: '"Data Engineering"', color: "#10b981" },
                    { key: "cloud",    value: '"AWS / GCP"',         color: "#3b82f6" },
                  ].map(r => (
                    <div key={r.key} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <span className="mono" style={{ fontSize: 10, color: T.textMuted }}>{r.key}:</span>
                      <span className="mono" style={{ fontSize: 11, color: r.color, fontWeight: 600 }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </SI>
          </div>
        </div>
      </Stagger>
      {aboutModal && <AboutModal type={aboutModal} isDark={isDark} onClose={() => setAboutModal(null)} />}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE 2 — EXPERIENCE
═══════════════════════════════════════════════════════════ */
const EXP = [
  {
    role: "Your Company Name Here?",
    period: "Next Chapter",
    color: "#a855f7",
    isFuture: true,
    subline: "I don't just join teams — I upgrade them. If your next data hire should be someone who ships production pipelines, eliminates manual workflows, and turns raw data into decisions, that conversation starts here.",
    tags: ["Data Engineering", "ETL & Automation", "Analytics", "Open to Offers"],
  },
  {
    role: "MIS Analyst", period: "Apr 2026 – Present", color: "#06b6d4", badge: "Current",
    bullets: [
      "Built automated reporting workflows using Python, SQL, Google Apps Script, and Power BI.",
      "Designed ETL-style data transformation processes for healthcare data.",
      "Developed interactive dashboards and MIS reports for operational tracking.",
      "Automated recurring business processes via script-based workflows and triggers.",
    ],
    tags: ["Python", "SQL", "Power BI", "ETL", "Google Apps Script"],
  },
  {
    role: "Process Analyst — Medical Billing & RCM", period: "Aug 2024 – Mar 2026", color: "#3b82f6",
    award: "🏆 Best Performer of the Quarter – 2025",
    bullets: [
      "Managed full-cycle claims processing and analyzed denial/outstanding claims.",
      "Applied data engineering concepts to streamline repetitive workflows.",
      "Built custom automation solutions using Google Apps Script.",
      "Awarded 'Best Performer of the Quarter – 2025' for developing scalable automation solutions.",
    ],
    tags: ["RCM", "Claims Processing", "Google Apps Script", "Automation"],
  },
];

const ExperiencePage = ({ isDark }) => {
  const T = isDark ? DARK : LIGHT;
  return (
    <div className="section-inner">
      <Eyebrow label="// professional.experience" icon={Calendar} />
      <Stagger delay={0.06}>
        <SI>
          <h2 style={{ fontSize: "clamp(22px,2.8vw,40px)", fontWeight: 900, color: T.text, marginBottom: 6, letterSpacing: "-0.03em", transition: "color 0.4s" }}>Career Timeline</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 38 }}>
            <MapPin size={12} color={T.textMuted} />
            <span className="mono" style={{ fontSize: 11, color: T.textMuted, transition: "color 0.4s" }}>
              Hamly Business Solutions India Pvt. Ltd. · Thanjavur, Tamil Nadu
            </span>
          </div>
        </SI>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 21, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,rgba(168,85,247,0.6),rgba(6,182,212,0.5),rgba(59,130,246,0.2),transparent)" }} />
          {EXP.map((e, i) => (
            <SI key={e.role}>
              {e.isFuture ? (
                /* ── Future Collaboration Card — Centered Statement ── */
                <div style={{ display: "flex", gap: 26, marginBottom: 32 }}>
                  <div style={{ flexShrink: 0, paddingTop: 2 }}>
                    <motion.div
                      animate={{ boxShadow: ["0 0 12px rgba(168,85,247,0.25)", "0 0 32px rgba(168,85,247,0.7)", "0 0 12px rgba(168,85,247,0.25)"] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(168,85,247,0.08)", border: "2px dashed rgba(168,85,247,0.65)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                      <span style={{ fontSize: 17 }}>✦</span>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ y: -6, scale: 1.012 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    style={{
                      flex: 1,
                      padding: "42px 36px",
                      borderRadius: 20,
                      background: isDark
                        ? "linear-gradient(145deg, rgba(168,85,247,0.08) 0%, rgba(99,102,241,0.05) 50%, rgba(6,182,212,0.04) 100%)"
                        : "linear-gradient(145deg, rgba(252,248,255,0.98) 0%, rgba(245,243,255,0.96) 50%, rgba(238,244,255,0.95) 100%)",
                      border: `1.5px dashed ${isDark ? "rgba(168,85,247,0.42)" : "rgba(139,92,246,0.38)"}`,
                      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                      position: "relative", overflow: "hidden",
                      boxShadow: isDark
                        ? "0 8px 48px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.04)"
                        : "0 8px 40px rgba(139,92,246,0.1), 0 2px 0 rgba(255,255,255,0.95), inset 0 1px 0 rgba(255,255,255,0.98)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 20,
                    }}>

                    {/* Slow rotating ring behind text */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                      style={{ position: "absolute", inset: "-30%", borderRadius: "50%", border: `1px dashed ${isDark ? "rgba(168,85,247,0.07)" : "rgba(139,92,246,0.1)"}`, pointerEvents: "none" }}
                    />
                    {/* Shimmer sweep */}
                    <motion.div
                      animate={{ x: ["-120%", "220%"] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 3.5 }}
                      style={{ position: "absolute", top: 0, bottom: 0, width: "35%", background: `linear-gradient(90deg,transparent,${isDark ? "rgba(168,85,247,0.06)" : "rgba(168,85,247,0.05)"},transparent)`, pointerEvents: "none" }}
                    />

                    {/* Period pill */}
                    <span className="mono" style={{ fontSize: 10, color: isDark ? "rgba(196,181,253,0.75)" : "rgba(109,40,217,0.7)", background: isDark ? "rgba(168,85,247,0.1)" : "rgba(237,233,254,0.85)", border: `1px dashed ${isDark ? "rgba(168,85,247,0.3)" : "rgba(139,92,246,0.3)"}`, padding: "3px 14px", borderRadius: 999, letterSpacing: "0.1em" }}>{e.period}</span>

                    {/* Main statement */}
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <h3 style={{
                        fontSize: "clamp(18px, 2.2vw, 26px)",
                        fontWeight: 900,
                        lineHeight: 1.25,
                        letterSpacing: "-0.03em",
                        color: isDark ? "#e9d5ff" : "#4c1d95",
                        marginBottom: 14,
                      }}>
                        {e.role}
                      </h3>
                      <p style={{
                        fontSize: "clamp(13px, 1.5vw, 15px)",
                        color: isDark ? "rgba(196,181,253,0.72)" : "#6d28d9",
                        lineHeight: 1.75,
                        fontWeight: 400,
                        maxWidth: 480,
                        margin: "0 auto",
                      }}>{e.subline}</p>
                    </div>

                    {/* Divider line */}
                    <div style={{ width: 48, height: 1, background: isDark ? "rgba(168,85,247,0.3)" : "rgba(139,92,246,0.3)", borderRadius: 999 }} />

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
                      {e.tags.map(t => (
                        <motion.span key={t} className="tag" whileHover={{ scale: 1.07 }}
                          style={{ color: isDark ? "#c4b5fd" : "#6d28d9", borderColor: isDark ? "rgba(168,85,247,0.28)" : "rgba(139,92,246,0.3)", borderStyle: "dashed", background: isDark ? "rgba(168,85,247,0.07)" : "rgba(237,233,254,0.65)" }}>{t}</motion.span>
                      ))}
                    </div>

                    {/* Sparkles bottom-right */}
                    <div style={{ position: "absolute", bottom: 16, right: 20, display: "flex", gap: 5 }}>
                      {["✦","✧","✦"].map((s, si) => (
                        <motion.span key={si}
                          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.7, 1.2, 0.7] }}
                          transition={{ duration: 1.8 + si * 0.5, repeat: Infinity, delay: si * 0.35 }}
                          style={{ fontSize: si === 1 ? 12 : 8, color: isDark ? "rgba(216,180,254,0.55)" : "rgba(139,92,246,0.45)" }}>{s}</motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
              <div style={{ display: "flex", gap: 26, marginBottom: 26 }}>
                <div style={{ flexShrink: 0, paddingTop: 2 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${e.color}11`, border: `2px solid ${e.color}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${e.color}32`, position: "relative", zIndex: 1 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: e.color, animation: i === 1 ? "breathe 2s infinite" : "none" }} />
                  </div>
                </div>
                <GlassCard accent={e.color} isDark={isDark} style={{ flex: 1, padding: "24px 28px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", transition: "color 0.4s" }}>{e.role}</h3>
                    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                      {e.badge && <span className="mono" style={{ fontSize: 9, color: "#10b981", background: "rgba(16,185,129,0.09)", border: "1px solid rgba(16,185,129,0.22)", padding: "2px 10px", borderRadius: 999 }}>{e.badge}</span>}
                      <span className="mono" style={{ fontSize: 11, color: e.color, background: `${e.color}0f`, border: `1px solid ${e.color}28`, padding: "3px 12px", borderRadius: 999 }}>{e.period}</span>
                    </div>
                  </div>
                  {e.award && <div style={{ background: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.17)", borderRadius: 9, padding: "7px 13px", marginBottom: 14, fontSize: 13, color: "#b45309", fontWeight: 600 }}>{e.award}</div>}
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: 16 }}>
                    {e.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: "flex", gap: 9, marginBottom: 8, alignItems: "flex-start" }}>
                        <span style={{ color: e.color, marginTop: 1, flexShrink: 0, fontSize: 10 }}>▸</span>
                        <span style={{ fontSize: 13.5, color: T.textSub, lineHeight: 1.72, transition: "color 0.4s" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {e.tags.map(t => <motion.span key={t} className="tag" whileHover={{ scale: 1.07 }} style={{ color: e.color, borderColor: `${e.color}24`, background: `${e.color}07` }}>{t}</motion.span>)}
                  </div>
                </GlassCard>
              </div>
              )}
            </SI>
          ))}
        </div>
      </Stagger>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE 3 — SKILLS  (enhanced advanced skills)
═══════════════════════════════════════════════════════════ */
const SKILL_GROUPS = [
  {
    category: "Data Engineering & SQL", icon: Database, color: "#06b6d4",
    skills: [
      { name: "Advanced SQL (Window Fns, Indexing)", level: 87 },
      { name: "ETL / ELT Pipeline Design",           level: 85 },
      { name: "High-Speed Data Ingestion",            level: 78 },
      { name: "Apache Spark (Distributed Systems)",   level: 58 },
    ],
  },
  {
    category: "Automation & Scripting", icon: Terminal, color: "#10b981",
    skills: [
      { name: "Python (Pandas, NumPy, Automation)",  level: 88 },
      { name: "Workflow Automation & Triggers",       level: 91 },
      { name: "Google Apps Script",                  level: 89 },
      { name: "REST API Integration",                 level: 76 },
    ],
  },
  {
    category: "BI & Reporting", icon: BarChart3, color: "#3b82f6",
    skills: [
      { name: "Power BI (DAX, Data Modeling)",       level: 86 },
      { name: "MIS Dashboard Design",                level: 90 },
      { name: "Operational KPI Tracking",             level: 88 },
    ],
  },
  {
    category: "Cloud & Scalable Infra", icon: Cloud, color: "#a855f7",
    skills: [
      { name: "AWS (S3, Glue, Redshift)",            level: 55 },
      { name: "Cloud Analytics Pipelines",            level: 52 },
      { name: "Scalable Data Architecture",           level: 60 },
    ],
  },
  {
    category: "Frontend & Web", icon: Code2, color: "#f59e0b",
    skills: [
      { name: "React.js",                            level: 78 },
      { name: "JavaScript (ES6+)",                   level: 82 },
      { name: "Vite + Modern Tooling",               level: 72 },
    ],
  },
];

const SkillBar = ({ name, level, color, delay = 0, isDark }) => {
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay * 1000 + 300); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span className="mono" style={{ fontSize: 10.5, color: isDark ? "#94a3b8" : "#475569", transition: "color 0.4s" }}>{name}</span>
        <span className="mono" style={{ fontSize: 10, color: isDark ? "#475569" : "#64748b" }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)", borderRadius: 999, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: started ? `${level}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg,${color},${color}70)`, boxShadow: `0 0 8px ${color}55` }}
        />
      </div>
    </div>
  );
};

const SkillsPage = ({ isDark }) => {
  const T = isDark ? DARK : LIGHT;
  return (
    <div className="section-inner">
      <Eyebrow label="// skills.inventory" icon={Cpu} />
      <Stagger delay={0.06}>
        <SI><h2 style={{ fontSize: "clamp(22px,2.8vw,40px)", fontWeight: 900, color: T.text, marginBottom: 32, letterSpacing: "-0.03em", transition: "color 0.4s" }}>Technical Expertise</h2></SI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          {SKILL_GROUPS.map((g, gi) => (
            <SI key={g.category}>
              <GlassCard accent={g.color} isDark={isDark} style={{ padding: "22px 20px", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${g.color}12`, border: `1px solid ${g.color}26`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 14px ${g.color}1f` }}>
                    <g.icon size={17} color={g.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: T.text, letterSpacing: "-0.01em", transition: "color 0.4s" }}>{g.category}</div>
                    <div className="mono" style={{ fontSize: 9, color: g.color, letterSpacing: "0.08em", marginTop: 2 }}>{g.skills.length} skills</div>
                  </div>
                </div>
                {g.skills.map((s, si) => <SkillBar key={s.name} name={s.name} level={s.level} color={g.color} delay={gi * 0.09 + si * 0.06} isDark={isDark} />)}
              </GlassCard>
            </SI>
          ))}
        </div>
        <SI>
          <GlassCard isDark={isDark} style={{ padding: "18px 22px", marginTop: 16 }}>
            <div className="mono" style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.12em", marginBottom: 12, transition: "color 0.4s" }}>// advanced.stack — highlights</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["Window Functions", "DB Indexing", "Apache Spark", "AWS S3 + Glue", "High-Speed Ingestion", "Structural Normalization",
                "ETL Orchestration", "Distributed Systems", "Power BI DAX", "Google Apps Script", "React.js", "Python", "SQL", "Vite", "MIS Reporting"].map(t => (
                <motion.span key={t} className="tag" whileHover={{ scale: 1.07, color: "#06b6d4", borderColor: "rgba(6,182,212,0.3)" }}>{t}</motion.span>
              ))}
            </div>
          </GlassCard>
        </SI>
      </Stagger>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE 4 — PROJECTS (enhanced descriptions)
═══════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    title: "Healthcare RCM Automation Suite",
    desc: "Scalable data architecture for end-to-end Revenue Cycle Management. Custom-built high-speed ingestion pipelines process claim events from multiple sources into a normalised, query-ready schema — cutting manual cycle time significantly while enabling real-time denial analytics.",
    tags: ["Python", "ETL", "Google Apps Script", "Structural Normalisation", "RCM"],
    color: "#06b6d4", icon: Database, status: "Production", featured: true,
  },
  {
    title: "Python 3.10 venv ETL Toolkit",
    desc: "Reusable scaffold for Python 3.10 virtual environments that underpins all ETL automation workflows. Enforces environment isolation, pinned dependency trees, and reproducible pipeline configurations — enabling scalable, portable data-engineering projects.",
    tags: ["Python 3.10", "venv", "pip", "ETL Automation", "Scalable Pipelines"],
    color: "#10b981", icon: Terminal, status: "Open Source",
  },
  {
    title: "Unstructured → Query-Ready Pipeline",
    desc: "Custom Google Apps Script toolchain that ingests raw, unstructured healthcare datasets, applies multi-stage structural normalisation (deduplication, schema enforcement, type casting), and outputs relational, reporting-ready tables — eliminating hours of manual prep work.",
    tags: ["Google Apps Script", "Normalisation", "Data Ingestion", "Healthcare"],
    color: "#3b82f6", icon: Layers, status: "Enterprise",
  },
  {
    title: "Power BI MIS Dashboard Hub",
    desc: "Advanced SQL-backed Power BI solution leveraging window functions and indexed views for sub-second query performance. Multi-layered DAX measures drive dynamic KPI scorecards and trend analysis dashboards consumed across operations and leadership.",
    tags: ["Power BI", "Advanced SQL", "Window Functions", "DAX", "MIS"],
    color: "#a855f7", icon: BarChart3, status: "Enterprise",
  },
  {
    title: "Cloud-Ready Analytics Portal (React)",
    desc: "React.js + Vite front-end designed around distributed data sources. Planned AWS Glue/S3 integration for scalable cloud data ingestion, with real-time filtering and responsive visualisation layers to surface ETL pipeline outputs to business stakeholders.",
    tags: ["React.js", "Vite", "AWS S3", "Cloud Analytics", "Data Viz"],
    color: "#f59e0b", icon: Globe, status: "In Progress",
  },
];

/* ═══════════════════════════════════════════════════════════
   PROJECT MODAL
═══════════════════════════════════════════════════════════ */
const PROJECT_IMAGES = {
  "Healthcare RCM Automation Suite": [
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  ],
  "Python 3.10 venv ETL Toolkit": [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
  ],
  "Unstructured → Query-Ready Pipeline": [
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80",
  ],
  "Power BI MIS Dashboard Hub": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  ],
  "Cloud-Ready Analytics Portal (React)": [
    "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80",
    "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  ],
};

const ProjectModal = ({ project, isDark, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const T = isDark ? DARK : LIGHT;
  const images = PROJECT_IMAGES[project.title] || [];

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 500,
          background: isDark ? "rgba(2,6,15,0.82)" : "rgba(10,25,50,0.55)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 760,
            background: isDark
              ? "linear-gradient(145deg, rgba(8,18,42,0.97) 0%, rgba(12,24,52,0.97) 100%)"
              : "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(240,248,255,0.98) 100%)",
            border: `1px solid ${project.color}35`,
            borderRadius: 24,
            boxShadow: isDark
              ? `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${project.color}18, inset 0 1px 0 rgba(255,255,255,0.05)`
              : `0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px ${project.color}18, inset 0 1px 0 rgba(255,255,255,0.9)`,
            overflow: "hidden",
            maxHeight: "90vh",
            display: "flex", flexDirection: "column",
          }}
        >
          {/* Sticky Header — stays pinned while content scrolls */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            background: isDark
              ? "rgba(8,18,42,0.98)"
              : "rgba(255,255,255,0.99)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            flexShrink: 0,
          }}>
            {/* Image Carousel */}
            <div style={{ position: "relative", height: 220, overflow: "hidden", background: isDark ? "rgba(4,10,25,0.9)" : "rgba(235,245,255,0.9)" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </AnimatePresence>
              {/* Gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${isDark ? "rgba(8,18,42,0.7)" : "rgba(240,248,255,0.5)"} 100%)`, pointerEvents: "none" }} />
              {/* Accent color top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${project.color}, ${project.color}88, transparent)` }} />
              {/* Carousel dots */}
              <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
                {images.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    whileHover={{ scale: 1.3 }}
                    style={{
                      width: idx === activeImg ? 20 : 6, height: 6, borderRadius: 999,
                      background: idx === activeImg ? project.color : "rgba(255,255,255,0.4)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
                      boxShadow: idx === activeImg ? `0 0 8px ${project.color}` : "none",
                    }}
                  />
                ))}
              </div>
              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <motion.button whileHover={{ scale: 1.1, background: `${project.color}33` }} onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                    style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.32)", border: `1px solid rgba(255,255,255,0.14)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: 16, transition: "background 0.2s" }}>‹</motion.button>
                  <motion.button whileHover={{ scale: 1.1, background: `${project.color}33` }} onClick={() => setActiveImg(i => (i + 1) % images.length)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.32)", border: `1px solid rgba(255,255,255,0.14)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: 16, transition: "background 0.2s" }}>›</motion.button>
                </>
              )}
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: 16, transition: "background 0.2s" }}
              >✕</motion.button>
            </div>

            {/* Project title row — sticky beneath carousel */}
            <div style={{ padding: "16px 28px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${project.color}15`, border: `1px solid ${project.color}28`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 14px ${project.color}22`, flexShrink: 0 }}>
                  <project.icon size={18} color={project.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.2, transition: "color 0.4s" }}>{project.title}</h3>
                  <span className="mono" style={{ fontSize: 9, color: project.color, background: `${project.color}0e`, padding: "2px 10px", borderRadius: 6 }}>{project.status}</span>
                </div>
              </div>
              {project.featured && (
                <div style={{ background: "rgba(6,182,212,0.09)", border: "1px solid rgba(6,182,212,0.26)", borderRadius: 6, padding: "3px 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#06b6d4", flexShrink: 0 }}>★ Featured</div>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{ padding: "22px 28px 26px", overflowY: "auto" }}>

            <p style={{ fontSize: 13.5, color: T.textSub, lineHeight: 1.82, marginBottom: 20, transition: "color 0.4s" }}>{project.desc}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
              {project.tags.map(t => (
                <motion.span key={t} className="tag" whileHover={{ scale: 1.07 }}
                  style={{ color: project.color, borderColor: `${project.color}28`, background: `${project.color}08` }}>{t}</motion.span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`, paddingTop: 20 }}>
              {[{ icon: GitHub, label: "View Code", primary: false }, { icon: ArrowUpRight, label: "Live Demo", primary: true }].map(btn => (
                <motion.button key={btn.label}
                  whileHover={{ scale: 1.05, boxShadow: btn.primary ? `0 0 24px ${project.color}44` : "none" }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11,
                    background: btn.primary ? `linear-gradient(135deg, ${project.color}, ${project.color}aa)` : "transparent",
                    border: btn.primary ? "none" : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    cursor: "pointer", color: btn.primary ? "white" : T.textMuted,
                    fontSize: 13, fontWeight: 700, fontFamily: "'Outfit',sans-serif",
                    transition: "all 0.2s",
                  }}>
                  <btn.icon size={14} /> {btn.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectsPage = ({ isDark }) => {
  const T = isDark ? DARK : LIGHT;
  const [activeProject, setActiveProject] = useState(null);
  return (
    <div className="section-inner">
      <Eyebrow label="// featured.projects" icon={Layers} />
      <Stagger delay={0.06}>
        <SI><h2 style={{ fontSize: "clamp(22px,2.8vw,40px)", fontWeight: 900, color: T.text, marginBottom: 32, letterSpacing: "-0.03em", transition: "color 0.4s" }}>Code Highlights</h2></SI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
          {PROJECTS.map(p => (
            <SI key={p.title}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 270, damping: 21 }}
                onClick={() => setActiveProject(p)}
                style={{ cursor: "pointer" }}
              >
                <GlassCard accent={p.color} isDark={isDark} style={{ padding: "22px", height: "100%", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -26, right: -26, width: 100, height: 100, borderRadius: "50%", background: `${p.color}0d`, filter: "blur(18px)", pointerEvents: "none" }} />
                  {p.featured && <div style={{ position: "absolute", top: 13, right: 13, background: "rgba(6,182,212,0.09)", border: "1px solid rgba(6,182,212,0.26)", borderRadius: 6, padding: "2px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#06b6d4" }}>★ Featured</div>}
                  {/* Click hint */}
                  <div style={{ position: "absolute", bottom: 13, right: 13, opacity: 0.38, fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: p.color }}>click to preview</div>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: `${p.color}13`, border: `1px solid ${p.color}26`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, boxShadow: `0 0 14px ${p.color}20` }}>
                    <p.icon size={18} color={p.color} />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", marginBottom: 6, transition: "color 0.4s" }}>{p.title}</h3>
                  <span className="mono" style={{ fontSize: 9, color: p.color, background: `${p.color}0e`, padding: "2px 10px", borderRadius: 6, marginBottom: 10, display: "inline-block" }}>{p.status}</span>
                  <p style={{ fontSize: 12.5, color: T.textSub, lineHeight: 1.78, marginBottom: 14, marginTop: 8, transition: "color 0.4s" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                    {p.tags.map(t => <motion.span key={t} className="tag" whileHover={{ scale: 1.07 }}>{t}</motion.span>)}
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    {[{ icon: GitHub, label: "Code" }, { icon: ArrowUpRight, label: "Demo" }].map(btn => (
                      <motion.button key={btn.label} whileHover={{ scale: 1.06, color: p.color }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 12, fontWeight: 700, fontFamily: "'Outfit',sans-serif", padding: 0, transition: "color 0.2s" }}>
                        <btn.icon size={13} /> {btn.label}
                      </motion.button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </SI>
          ))}
        </div>
      </Stagger>
      {/* Modal portal */}
      {activeProject && (
        <ProjectModal project={activeProject} isDark={isDark} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE 5 — CONTACT
═══════════════════════════════════════════════════════════ */
const ContactPage = ({ isDark }) => {
  const T = isDark ? DARK : LIGHT;
  const links = [
    { icon: Mail,     label: "Email Me",  sub: "Open Gmail Compose",  color: "#06b6d4", href: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@example.com" },
    { icon: Linkedin, label: "LinkedIn",  sub: "Connect with me",    color: "#3b82f6", href: "#" },
    { icon: GitHub,   label: "GitHub",    sub: "View my code",       color: isDark ? "#94a3b8" : "#475569", href: "#" },
  ];
  return (
    <div className="contact-page" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 max(24px,calc((100% - 860px)/2))" }}>
      <Stagger delay={0.12}>
        <div style={{ textAlign: "center" }}>
          <SI><Eyebrow label="// get.in.touch" icon={Mail} /></SI>
          <SI>
            <h2 style={{ fontSize: "clamp(24px,4vw,50px)", fontWeight: 900, color: T.text, marginBottom: 16, letterSpacing: "-0.03em", transition: "color 0.4s" }}>
              Let's Build Something<br /><span className="gradient-text">Together</span>
            </h2>
          </SI>
          <SI>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 1.82, maxWidth: 500, margin: "0 auto 44px", transition: "color 0.4s" }}>
              Open to Data Engineering, Analytics Engineering, and Full-Stack roles. Reach out to collaborate or chat about data pipelines.
            </p>
          </SI>
          <SI>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 50 }}>
              {links.map(l => (
                <motion.a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, boxShadow: `0 0 30px ${l.color}2e`, y: -5 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 20px", borderRadius: 16, background: `${l.color}09`, border: `1px solid ${l.color}20`, textDecoration: "none", transition: "box-shadow 0.25s" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: `${l.color}11`, border: `1px solid ${l.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <l.icon size={17} color={l.color} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: l.color }}>{l.label}</div>
                    <div className="mono" style={{ fontSize: 10, color: T.textMuted, marginTop: 2, transition: "color 0.4s" }}>{l.sub}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </SI>
          <SI>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 22, paddingTop: 28, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.07)"}` }}>
              <span className="mono" style={{ fontSize: 11, color: T.footerText, transition: "color 0.4s" }}>© 2026 · Built with React + Framer Motion</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "breathe 2.5s infinite" }} />
                <span className="mono" style={{ fontSize: 11, color: T.footerText, transition: "color 0.4s" }}>Open to opportunities</span>
              </div>
            </div>
          </SI>
        </div>
      </Stagger>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
const PAGES = [HeroPage, AboutPage, ExperiencePage, SkillsPage, ProjectsPage, ContactPage];

export default function App() {
  const [current,  setCurrent]  = useState(0);
  const [isDark,   setIsDark]   = useState(true);

  const navigate = (next) => {
    if (next === current || next < 0 || next >= PAGES.length) return;
    setCurrent(next);
  };

  const toggleTheme = () => setIsDark(d => !d);

  const T            = isDark ? DARK : LIGHT;
  const PageComponent = PAGES[current];

  return (
    <>
      <GlobalStyles isDark={isDark} />
      <motion.div
        animate={{ background: isDark ? T.bg : "linear-gradient(145deg, #eef6fb 0%, #f0f7ff 40%, #f5f0ff 100%)" }}
        transition={{ duration: 0.45 }}
        style={{ position: "fixed", inset: 0, overflow: "hidden", maxWidth: "100vw" }}
      >
        <DataFlowCanvas isDark={isDark} />
        <GridOverlay    isDark={isDark} />
        <CursorGlow     isDark={isDark} />

        {/* Ambient top glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: T.ambientGrad, transition: "background 0.4s" }} />

        <Navbar current={current} onChange={navigate} isDark={isDark} onThemeToggle={toggleTheme} />
        <SideDots current={current} onChange={navigate} isDark={isDark} />

        {/* Page viewport */}
        <div style={{ position: "absolute", inset: 0, top: 68, overflow: "hidden", maxWidth: "100vw" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={pageV}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTx}
              style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden" }}
            >
              <PageComponent onNav={navigate} isDark={isDark} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
