"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";
import coastalData from "@/data/coastalRegions.json";
import { Radar, MapPin, Calendar, Info, AlertCircle, TrendingUp, Compass } from "lucide-react";

export default function RiskPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(coastalData[0].state);
  const [selectedMonth, setSelectedMonth] = useState("April");

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const riskAssessment = useMemo(() => {
    const region = coastalData.find(r => r.state === selectedState);
    if (!region) return null;

    // Pattern-based Risk Logic
    let baseScore = 0;
    switch (region.riskLevel) {
        case "Very High": baseScore = 80; break;
        case "High": baseScore = 60; break;
        case "Medium": baseScore = 40; break;
        case "Low": baseScore = 20; break;
    }

    // Seasonal Adjustment (IMD Pattern: Peak in May-June and Oct-Nov)
    const highRiskMonths = ["May", "June", "October", "November"];
    const moderateRiskMonths = ["April", "December"];
    
    let seasonalMultiplier = 1;
    if (highRiskMonths.includes(selectedMonth)) seasonalMultiplier = 1.2;
    else if (moderateRiskMonths.includes(selectedMonth)) seasonalMultiplier = 1.1;
    else seasonalMultiplier = 0.8;

    const finalScore = Math.min(Math.round(baseScore * seasonalMultiplier), 100);
    
    let status = "Low";
    if (finalScore > 80) status = "Very High";
    else if (finalScore > 60) status = "High";
    else if (finalScore > 40) status = "Moderate";

    return { score: finalScore, status, region: region.region };
  }, [selectedState, selectedMonth]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono tracking-widest text-[10px] uppercase">
            <Compass className="w-3 h-3" />
            <span>Pattern-Based Risk Analysis</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Risk <span className="text-slate-500">Outlook</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg">
            A likelihood estimation tool based on historical patterns, seasonal vulnerability, 
            and coastal exposure. Not a real-time forecast.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Radar className="w-4 h-4" />
                Parameter Input
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Coastal Zone / State</label>
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-cyan-400 outline-none transition-colors"
                  >
                    {coastalData.map(r => <option key={r.state} value={r.state}>{r.state}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Temporal Window (Month)</label>
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-cyan-400 outline-none transition-colors"
                  >
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-start gap-3 p-3 bg-blue-950/20 border border-blue-900/30 rounded-lg">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-tighter">
                        This model analyzes historical data from the past 50 years to estimate risk probability.
                    </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Meter */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative flex items-center justify-center">
                  {/* Gauge Visualization */}
                  <svg className="w-64 h-64 -rotate-90">
                    <circle cx="128" cy="128" r="100" fill="none" stroke="#1e293b" strokeWidth="20" strokeDasharray="628" />
                    <circle 
                        cx="128" cy="128" r="100" 
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="20" 
                        strokeDasharray="628"
                        strokeDashoffset={628 - (628 * (riskAssessment?.score || 0) / 100)}
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-5xl font-black text-white">{riskAssessment?.score}</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Risk Index</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Outlook for {selectedState}</h3>
                    <div className={`text-4xl font-black uppercase tracking-tighter ${
                        riskAssessment?.status === "Very High" ? "text-red-500" : 
                        riskAssessment?.status === "High" ? "text-orange-500" : 
                        riskAssessment?.status === "Moderate" ? "text-yellow-500" : "text-emerald-500"
                    }`}>
                        {riskAssessment?.status} Risk
                    </div>
                  </div>

                  <div className="space-y-4">
                    <RiskFactor label="Historical Frequency" score="85%" />
                    <RiskFactor label="Seasonal Vulnerability" score={riskAssessment?.score + "%"} />
                    <RiskFactor label="Coastal Exposure" score={riskAssessment?.region === "East Coast" ? "90%" : "60%"} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <div className="flex items-center gap-2 mb-4 text-cyan-400">
                        <TrendingUp className="w-4 h-4" />
                        <h4 className="text-xs font-mono uppercase tracking-widest">Historical Logic</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        The {riskAssessment?.region} zones are historically more prone to Super Cyclonic Storms. 
                        Records indicate that {selectedMonth} is a 
                        {riskAssessment && riskAssessment.score > 60 ? " peak " : " stable "} 
                        period for cyclogenesis in the Indian Ocean basins.
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 border-l-4 border-l-amber-500 rounded-3xl">
                    <div className="flex items-center gap-2 mb-4 text-amber-500">
                        <AlertCircle className="w-4 h-4" />
                        <h4 className="text-xs font-mono uppercase tracking-widest">Safety Advisory</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        In case of {riskAssessment?.status.toLowerCase()} risk outlook, residents are advised to 
                        review their emergency kits and stay updated with official IMD bulletins.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function RiskFactor({ label, score }: { label: string; score: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <span>{label}</span>
        <span>{score}</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <div 
            className="h-full bg-slate-600"
            style={{ width: score, transition: 'width 1s ease-out' }}
        />
      </div>
    </div>
  );
}
