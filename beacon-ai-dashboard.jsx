import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  ReferenceLine,
} from "recharts";
import {
  Wallet, FileCheck2, PackageSearch, Smartphone, ArrowUpRight, ArrowDownRight,
  FileText, Clock, TrendingUp, Boxes, Sparkles, ArrowRight,
} from "lucide-react";

/* ---------------------------------------------------------
   Beacon AI — Loan Readiness Dashboard
   Tokens
   bg base     #070C14
   bg elevated #0C1524
   card glass  rgba(148,163,184,0.05) / border rgba(148,163,184,0.12)
   cyan        #22D3EE  →  #0891B2
   amber       #F5A524
   red         #F2545B
   green       #34D399
   text hi     #EEF2F7
   text lo     #8592A6
--------------------------------------------------------- */

const styleSheet = `
  .beacon-root {
    background: radial-gradient(ellipse 120% 80% at 50% -10%, #0F2436 0%, #070C14 55%), #070C14;
    color: #EEF2F7;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    min-height: 100%;
    padding: 40px 24px 64px;
  }
  .beacon-shell { max-width: 1180px; margin: 0 auto; }
  .beacon-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }

  .glass {
    background: rgba(148,163,184,0.045);
    border: 1px solid rgba(148,163,184,0.12);
    border-radius: 20px;
    backdrop-filter: blur(20px);
  }
  .glass-tight { border-radius: 16px; }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #6B7A8F;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .top-row { display:flex; align-items:center; justify-content:space-between; margin-bottom: 36px; }
  .brand { display:flex; align-items:center; gap: 12px; }
  .brand-mark {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #22D3EE, #0891B2);
    display:flex; align-items:center; justify-content:center;
    box-shadow: 0 0 24px rgba(34,211,238,0.35);
  }
  .brand-name { font-size: 19px; font-weight: 600; letter-spacing: -0.01em; }
  .brand-tag { font-size: 12.5px; color: #6B7A8F; margin-top: 1px; }

  .hero-grid { display:grid; grid-template-columns: 1.1fr 1.5fr; gap: 20px; margin-bottom: 20px; }
  @media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; } }

  .gauge-card { padding: 30px 28px; display:flex; flex-direction:column; align-items:center; text-align:center; }
  .gauge-wrap { position:relative; width: 220px; height: 220px; margin: 6px 0 4px; }
  .gauge-center { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .gauge-score { font-size: 52px; font-weight: 700; line-height:1; letter-spacing:-0.02em; }
  .gauge-max { font-size: 13px; color:#6B7A8F; margin-top: 4px; }

  .badge {
    display:inline-flex; align-items:center; gap:6px;
    padding: 6px 14px; border-radius: 999px;
    font-size: 12.5px; font-weight: 600;
    border: 1px solid transparent;
  }
  .badge-amber { background: rgba(245,165,36,0.12); color:#F5A524; border-color: rgba(245,165,36,0.3); }
  .badge-green { background: rgba(52,211,153,0.12); color:#34D399; border-color: rgba(52,211,153,0.3); }
  .badge-red { background: rgba(242,84,91,0.12); color:#F2545B; border-color: rgba(242,84,91,0.3); }

  .kpi-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  @media (max-width: 860px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
  .kpi-card { padding: 20px; display:flex; flex-direction:column; gap: 10px; }
  .kpi-icon {
    width: 34px; height: 34px; border-radius: 10px;
    display:flex; align-items:center; justify-content:center;
    background: rgba(34,211,238,0.1); color: #22D3EE;
  }
  .kpi-label { font-size: 13px; color:#8592A6; font-weight:500; }
  .kpi-value { font-size: 24px; font-weight: 700; letter-spacing:-0.01em; }
  .kpi-trend { display:flex; align-items:center; gap:4px; font-size:12.5px; font-weight:600; }

  .two-col { display:grid; grid-template-columns: 1.15fr 1fr; gap: 20px; margin-bottom: 20px; }
  @media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }
  .card-pad { padding: 26px 26px 18px; }
  .card-title { font-size: 16px; font-weight: 600; }
  .card-sub { font-size: 12.5px; color:#6B7A8F; margin-top:2px; margin-bottom: 14px; }

  .proj-row { display:flex; align-items:flex-end; gap: 28px; }
  .proj-delta {
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap: 4px; padding: 18px 22px; border-radius: 16px;
    background: linear-gradient(180deg, rgba(52,211,153,0.12), rgba(52,211,153,0.03));
    border: 1px solid rgba(52,211,153,0.25);
  }
  .proj-delta-num { font-size: 26px; font-weight:700; color:#34D399; }
  .proj-delta-label { font-size: 11px; color:#7FE3BE; text-transform:uppercase; letter-spacing:0.08em; }

  .rec-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 30px; }
  @media (max-width: 900px) { .rec-grid { grid-template-columns: repeat(2, 1fr); } }
  .rec-card { padding: 20px; display:flex; flex-direction:column; gap: 14px; transition: border-color .2s, transform .2s; }
  .rec-card:hover { border-color: rgba(34,211,238,0.4); transform: translateY(-2px); }
  .rec-icon {
    width: 38px; height: 38px; border-radius: 11px;
    display:flex; align-items:center; justify-content:center;
    background: rgba(34,211,238,0.1); color:#22D3EE;
  }
  .rec-title { font-size: 14.5px; font-weight: 600; line-height:1.3; }
  .rec-impact {
    align-self:flex-start; font-size: 12.5px; font-weight: 700; color:#34D399;
    background: rgba(52,211,153,0.1); padding: 4px 10px; border-radius: 999px;
    border: 1px solid rgba(52,211,153,0.25);
  }

  .cta-wrap { display:flex; flex-direction:column; align-items:center; gap: 10px; padding: 8px 0 4px; }
  .cta-btn {
    display:inline-flex; align-items:center; gap:10px;
    padding: 16px 34px; border-radius: 14px; border:none; cursor:pointer;
    font-size: 15.5px; font-weight: 600; color:#04141A;
    background: linear-gradient(135deg, #22D3EE, #67E8F9);
    box-shadow: 0 8px 30px rgba(34,211,238,0.28);
    transition: transform .15s, box-shadow .15s;
  }
  .cta-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 36px rgba(34,211,238,0.4); }
  .cta-note { font-size: 12.5px; color:#6B7A8F; }

  .legend-dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
`;

const kpis = [
  { icon: Wallet, label: "Cash Flow", value: "\u20B94.2L /mo", trend: "-3% vs last qtr", dir: "down", note: "Moderate volatility" },
  { icon: FileCheck2, label: "GST Compliance", value: "78%", trend: "2 filings pending", dir: "flat", note: "Needs attention" },
  { icon: PackageSearch, label: "Inventory Health", value: "2.1x /yr", trend: "Below sector avg (3.4x)", dir: "down", note: "Slow turnover" },
  { icon: Smartphone, label: "Digital Payments", value: "62%", trend: "+12% vs last qtr", dir: "up", note: "Growing steadily" },
];

const factorData = [
  { name: "Payment Delay", impact: -18 },
  { name: "Missing GST Documents", impact: -12 },
  { name: "Low Inventory Turnover", impact: -9 },
  { name: "Digital Transactions", impact: 6 },
  { name: "Customer Retention", impact: 4 },
];

const radarData = [
  { subject: "Finance", current: 58, benchmark: 78 },
  { subject: "Compliance", current: 64, benchmark: 82 },
  { subject: "Inventory", current: 47, benchmark: 75 },
  { subject: "Digital Presence", current: 71, benchmark: 80 },
  { subject: "Operations", current: 60, benchmark: 77 },
];

const projectionData = [
  { label: "Current", value: 64 },
  { label: "Projected", value: 86 },
];

const recommendations = [
  { icon: FileText, title: "Complete GST Filing", impact: "+8 Score" },
  { icon: Clock, title: "Reduce Payment Delay", impact: "+7 Score" },
  { icon: TrendingUp, title: "Increase Digital Payments", impact: "+5 Score" },
  { icon: Boxes, title: "Improve Inventory Turnover", impact: "+6 Score" },
];

function Gauge({ value = 64, max = 100 }) {
  const size = 220;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="gauge-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A524" />
            <stop offset="60%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="url(#gaugeGrad)" strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="gauge-center">
        <div className="beacon-display gauge-score">{value}</div>
        <div className="gauge-max">out of {max}</div>
      </div>
    </div>
  );
}

function TrendChip({ dir, text }) {
  const color = dir === "up" ? "#34D399" : dir === "down" ? "#F2545B" : "#8592A6";
  const Icon = dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : null;
  return (
    <div className="kpi-trend" style={{ color }}>
      {Icon && <Icon size={14} strokeWidth={2.5} />}
      <span>{text}</span>
    </div>
  );
}

function FactorTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "#0C1524", border: "1px solid rgba(148,163,184,0.2)",
      borderRadius: 10, padding: "8px 12px", fontSize: 12.5,
    }}>
      <div style={{ color: "#EEF2F7", fontWeight: 600, marginBottom: 2 }}>{d.name}</div>
      <div style={{ color: d.impact < 0 ? "#F2545B" : "#34D399" }}>
        {d.impact > 0 ? "+" : ""}{d.impact} score points
      </div>
    </div>
  );
}

export default function BeaconDashboard() {
  return (
    <div className="beacon-root">
      <style>{styleSheet}</style>
      <div className="beacon-shell">

        {/* Header */}
        <div className="top-row">
          <div className="brand">
            <div className="brand-mark"><Sparkles size={18} color="#04141A" strokeWidth={2.5} /></div>
            <div>
              <div className="beacon-display brand-name">Beacon AI</div>
              <div className="brand-tag">MSME Loan Readiness · Sample business: Anand Textiles</div>
            </div>
          </div>
          <div className="badge badge-amber">
            <span className="legend-dot" style={{ background: "#F5A524" }} />
            Needs Improvement
          </div>
        </div>

        {/* Hero: Gauge + KPIs */}
        <div className="hero-grid">
          <div className="glass gauge-card">
            <div className="section-label">Loan Readiness Score</div>
            <Gauge value={64} max={100} />
            <div className="badge badge-amber" style={{ marginTop: 6 }}>Needs Improvement</div>
            <div style={{ fontSize: 12.5, color: "#6B7A8F", marginTop: 12, lineHeight: 1.5 }}>
              21 points below the typical bank approval threshold of 85
            </div>
          </div>

          <div className="glass" style={{ padding: 26 }}>
            <div className="section-label">Business Health Overview</div>
            <div className="kpi-grid">
              {kpis.map((k) => (
                <div key={k.label} className="glass glass-tight kpi-card">
                  <div className="kpi-icon"><k.icon size={17} strokeWidth={2.2} /></div>
                  <div>
                    <div className="kpi-label">{k.label}</div>
                    <div className="kpi-value beacon-display">{k.value}</div>
                  </div>
                  <TrendChip dir={k.dir} text={k.trend} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights + Radar */}
        <div className="two-col">
          <div className="glass card-pad" style={{ paddingBottom: 22 }}>
            <div className="card-title">AI Insights</div>
            <div className="card-sub">Top factors moving the readiness score</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={factorData} layout="vertical" margin={{ top: 4, right: 24, left: 4, bottom: 4 }}>
                <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.08)" />
                <XAxis type="number" domain={[-20, 10]} tick={{ fill: "#6B7A8F", fontSize: 11.5 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={150} tick={{ fill: "#B7C2D0", fontSize: 12.5 }} axisLine={false} tickLine={false} />
                <ReferenceLine x={0} stroke="rgba(148,163,184,0.3)" />
                <Tooltip content={<FactorTooltip />} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
                <Bar dataKey="impact" radius={[6, 6, 6, 6]} barSize={16}>
                  {factorData.map((d, i) => (
                    <Cell key={i} fill={d.impact < 0 ? "#F2545B" : "#34D399"} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass card-pad" style={{ paddingBottom: 10 }}>
            <div className="card-title">Business Performance</div>
            <div className="card-sub">Current profile vs. sector benchmark</div>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="rgba(148,163,184,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#8592A6", fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="#8592A6" fill="#8592A6" fillOpacity={0.08} strokeWidth={1.5} />
                <Radar name="Current" dataKey="current" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.28} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, fontSize: 12, color: "#8592A6", marginTop: -6, paddingBottom: 16 }}>
              <span><span className="legend-dot" style={{ background: "#22D3EE", marginRight: 6 }} />Current</span>
              <span><span className="legend-dot" style={{ background: "#8592A6", marginRight: 6 }} />Benchmark</span>
            </div>
          </div>
        </div>

        {/* Improvement Projection */}
        <div className="glass card-pad" style={{ paddingBottom: 22, marginBottom: 20 }}>
          <div className="card-title">Improvement Projection</div>
          <div className="card-sub">If recommended actions below are completed within 90 days</div>
          <div className="proj-row">
            <ResponsiveContainer width="60%" height={160}>
              <BarChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.08)" />
                <XAxis dataKey="label" tick={{ fill: "#B7C2D0", fontSize: 12.5 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#6B7A8F", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0C1524", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 10 }}
                  labelStyle={{ color: "#EEF2F7" }}
                  itemStyle={{ color: "#22D3EE" }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={64}>
                  <Cell fill="#F5A524" fillOpacity={0.85} />
                  <Cell fill="#22D3EE" fillOpacity={0.9} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="proj-delta">
              <div className="proj-delta-num">+22</div>
              <div className="proj-delta-label">Score Lift</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="section-label" style={{ marginTop: 4 }}>AI Recommendations</div>
        <div className="rec-grid">
          {recommendations.map((r) => (
            <div key={r.title} className="glass rec-card">
              <div className="rec-icon"><r.icon size={18} strokeWidth={2.2} /></div>
              <div className="rec-title">{r.title}</div>
              <div className="rec-impact">{r.impact}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-wrap">
          <button className="cta-btn">
            Generate Loan Readiness Report
            <ArrowRight size={18} strokeWidth={2.4} />
          </button>
          <div className="cta-note">Report is generated from live business data — no manual entry required</div>
        </div>

      </div>
    </div>
  );
}
