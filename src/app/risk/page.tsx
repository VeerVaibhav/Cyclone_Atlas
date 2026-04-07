"use client";

import React, { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";
import Link from "next/link";
import coastalData from "@/data/coastalRegions.json";
import cyclonesData from "@/data/cyclones.json";
import { Radar, Info, AlertCircle, TrendingUp, Compass, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskResult {
  score: number;
  status: string;
  region: string;
  historicalFreq: number;
  seasonalVuln: number;
  coastalExposure: number;
}

export default function RiskPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(coastalData[0].state);
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedRisk, setCalculatedRisk] = useState<RiskResult | null>(null);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const computeRisk = useCallback((state: string, month: string): RiskResult => {
    const region = coastalData.find(r => r.state === state);
    if (!region) return { score: 0, status: "Low", region: "Unknown", historicalFreq: 0, seasonalVuln: 0, coastalExposure: 0 };

    // Historical frequency: count how many cyclones hit this state
    const cycloneCount = cyclonesData.filter(c => c.states.includes(state)).length;
    const historicalFreq = Math.min(Math.round((cycloneCount / cyclonesData.length) * 100), 100);

    // Base score from region risk level
    let baseScore = 0;
    switch (region.riskLevel) {
      case "Very High": baseScore = 80; break;
      case "High": baseScore = 60; break;
      case "Medium": baseScore = 40; break;
      case "Low": baseScore = 20; break;
    }

    // Seasonal vulnerability
    const highRiskMonths = ["May", "June", "October", "November"];
    const moderateRiskMonths = ["April", "September", "December"];
    
    let seasonalMultiplier = 0.6;
    if (highRiskMonths.includes(month)) seasonalMultiplier = 1.3;
    else if (moderateRiskMonths.includes(month)) seasonalMultiplier = 1.0;

    const seasonalVuln = Math.round(seasonalMultiplier * 70);

    // Coastal exposure
    const coastalExposure = region.region === "East Coast" ? 88 : region.region === "Islands" ? 55 : 62;

    // Weighted score calculation
    const score = Math.min(Math.round(
      historicalFreq * 0.4 +
      baseScore * seasonalMultiplier * 0.3 +
      coastalExposure * 0.2 +
      seasonalVuln * 0.1
    ), 100);

    let status = "Low";
    if (score >= 80) status = "Critical";
    else if (score >= 60) status = "High";
    else if (score >= 30) status = "Moderate";

    return { score, status, region: region.region, historicalFreq, seasonalVuln, coastalExposure };
  }, []);

  // Compute on mount and when dependencies change
  useEffect(() => {
    setCalculatedRisk(computeRisk(selectedState, selectedMonth));
  }, [computeRisk, selectedState, selectedMonth]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setCalculatedRisk(computeRisk(selectedState, selectedMonth));
      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="max-w-7xl mx-auto px-6 py-32">
        <header className="mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-accent-cyan font-mono tracking-[0.3em] text-[10px] uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Analytical Risk Modeling</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Risk <span className="text-slate-500">Outlook</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-xl font-medium leading-relaxed">
            Pattern-based likelihood estimation utilizing 50 years of landfall data 
            and seasonal climate signals. Not a real-time meteorological forecast.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Controls Panel */}
          <div className="space-y-8 sticky top-32">
            <div className="glass-card p-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-950 rounded-xl border border-white/5 text-accent-cyan shadow-inner">
                    <Radar className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Parameter Selection</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 ml-1">Coastal Sector</label>
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all cursor-pointer hover:border-white/20"
                  >
                    {coastalData.map(r => <option key={r.state} value={r.state} className="bg-slate-900">{r.state}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 ml-1">Temporal Window</label>
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all cursor-pointer hover:border-white/20"
                  >
                    {months.map(m => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
                  </select>
                </div>

                <button 
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {isCalculating ? (
                        <>
                            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>Processing Data...</span>
                        </>
                    ) : (
                        <>
                            <Compass className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span>Calculate Risk Index</span>
                        </>
                    )}
                </button>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-slate-400 leading-relaxed font-bold uppercase tracking-tight">
                        Algorithm evaluates geographic exposure and multi-decadal cyclogenesis patterns for accurate indexing.
                    </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-2 space-y-12 animate-slide-up">
            <div className="glass-card p-12 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <Compass className="w-64 h-64" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="relative flex items-center justify-center">
                  {/* Digital Gauge */}
                  <svg className="w-72 h-72 -rotate-90 filter drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <circle cx="144" cy="144" r="120" fill="none" stroke="#0f172a" strokeWidth="24" strokeDasharray="754" />
                    <circle 
                        cx="144" cy="144" r="120" 
                        fill="none" 
                        stroke={isCalculating ? "#334155" : 
                          (calculatedRisk?.score ?? 0) >= 80 ? "#ef4444" :
                          (calculatedRisk?.score ?? 0) >= 60 ? "#f97316" :
                          (calculatedRisk?.score ?? 0) >= 30 ? "#eab308" : "#22d3ee"
                        }
                        strokeWidth="24" 
                        strokeDasharray="754"
                        strokeDashoffset={754 - (754 * (calculatedRisk?.score || 0) / 100)}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                        style={{ filter: isCalculating ? 'none' : `drop-shadow(0 0 10px ${
                          (calculatedRisk?.score ?? 0) >= 80 ? 'rgba(239,68,68,0.4)' :
                          (calculatedRisk?.score ?? 0) >= 60 ? 'rgba(249,115,22,0.4)' :
                          'rgba(34, 211, 238, 0.4)'
                        })` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className={cn(
                        "text-6xl font-black tracking-tighter transition-all duration-500",
                        isCalculating ? "text-slate-700 scale-90" : "text-white scale-100"
                    )}>
                        {isCalculating ? "--" : calculatedRisk?.score}
                    </div>
                    <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Risk Index</div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className={cn("transition-all duration-500", isCalculating ? "opacity-30 translate-x-4" : "opacity-100 translate-x-0")}>
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3">Target: {selectedState}</h3>
                    <div className={cn(
                        "text-5xl font-black uppercase tracking-tighter leading-none",
                        calculatedRisk?.status === "Critical" ? "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]" : 
                        calculatedRisk?.status === "High" ? "text-orange-500" : 
                        calculatedRisk?.status === "Moderate" ? "text-yellow-500" : "text-emerald-500"
                    )}>
                        {calculatedRisk?.status} <br />
                        <span className="text-white opacity-40">Advisory</span>
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <RiskFactor label="Historical Frequency" score={isCalculating ? 0 : (calculatedRisk?.historicalFreq ?? 0)} color="bg-accent-cyan" />
                    <RiskFactor label="Seasonal Vulnerability" score={isCalculating ? 0 : (calculatedRisk?.seasonalVuln ?? 0)} color="bg-accent-blue" />
                    <RiskFactor label="Coastal Exposure" score={isCalculating ? 0 : (calculatedRisk?.coastalExposure ?? 0)} color="bg-slate-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card p-8 group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-slate-950 rounded-xl border border-white/5 text-accent-cyan group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Regional Logic</h4>
                    </div>
                    <p className="text-slate-400 leading-relaxed font-medium">
                        The {calculatedRisk?.region} sectors possess unique thermal signatures. 
                        In {selectedMonth}, sea-surface temperature anomalies significantly influence 
                        cyclogenesis likelihood, leading to {calculatedRisk && calculatedRisk.score > 60 ? "critical" : "nominal"} patterns.
                    </p>
                </div>
                <div className="glass-card p-8 border-l-4 border-l-orange-500 group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-slate-950 rounded-xl border border-white/5 text-orange-500 group-hover:scale-110 transition-transform">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Safety Protocol</h4>
                    </div>
                    <p className="text-slate-400 leading-relaxed font-medium mb-6">
                        During periods of {calculatedRisk?.status?.toLowerCase()} risk, tactical readiness 
                        should be prioritized for coastal communities.
                    </p>
                    <Link href="/precaution" className="flex items-center gap-2 text-[10px] font-black text-accent-cyan uppercase tracking-[0.3em] hover:translate-x-1 transition-all">
                        View Precaution Guide
                        <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function RiskFactor({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-mono text-white font-black">{score}%</span>
      </div>
      <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
        <div 
            className={cn("h-full transition-all duration-1000 ease-out rounded-full", color)}
            style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
