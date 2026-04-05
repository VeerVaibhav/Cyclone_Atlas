"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";
import CoastalMap from "@/components/CoastalMap";
import cyclonesData from "@/data/cyclones.json";
import { Calendar, MapPin, Wind, Info, ChevronRight, Activity, Filter } from "lucide-react";

export default function TimelinePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCyclone, setSelectedCyclone] = useState(cyclonesData[0]);
  const [filterYear, setFilterYear] = useState<string>("All");

  const filteredCyclones = useMemo(() => {
    return filterYear === "All" 
      ? cyclonesData 
      : cyclonesData.filter(c => c.year.toString() === filterYear);
  }, [filterYear]);

  const years = ["All", ...Array.from(new Set(cyclonesData.map(c => c.year.toString()))).sort((a,b) => b.localeCompare(a))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
        {/* Left: Timeline List */}
        <div className="lg:w-1/3 flex flex-col h-[calc(100vh-160px)]">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
              Event <span className="text-slate-500">Timeline</span>
            </h1>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded px-2 py-1">
                <Filter className="w-3 h-3 text-slate-500" />
                <select 
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="bg-transparent text-[10px] font-mono uppercase tracking-widest outline-none text-slate-300"
                >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-4 space-y-4">
            {filteredCyclones.map((cyclone) => (
              <TimelineCard 
                key={cyclone.name} 
                cyclone={cyclone} 
                isActive={selectedCyclone.name === cyclone.name}
                onClick={() => setSelectedCyclone(cyclone)}
              />
            ))}
          </div>
        </div>

        {/* Right: Detail View */}
        <div className="lg:w-2/3 space-y-8 h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-none">
            <div className="space-y-8">
              {/* Detail Header */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest border border-cyan-500/20 rounded">
                            ID: {selectedCyclone.name.substring(0,3).toUpperCase()}-{selectedCyclone.year}
                        </span>
                        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">{selectedCyclone.date}</span>
                    </div>
                    <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                      {selectedCyclone.name}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      <DetailBadge icon={<Wind className="w-4 h-4" />} label="Intensity" value={selectedCyclone.intensity} />
                      <DetailBadge icon={<MapPin className="w-4 h-4" />} label="Landfall" value={selectedCyclone.landfall} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Threat Assessment</div>
                    <div className={`text-2xl font-black uppercase tracking-tighter ${
                        selectedCyclone.level === "Critical" ? "text-red-500" : 
                        selectedCyclone.level === "Extreme" ? "text-orange-500" : "text-yellow-500"
                    }`}>
                        {selectedCyclone.level} Level
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Map and Impact */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 p-6 min-h-[400px] flex items-center justify-center relative overflow-hidden rounded-3xl">
                    <div className="absolute top-4 left-4 z-10">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Impact Mapping</h4>
                    </div>
                    <CoastalMap highlightedStates={selectedCyclone.states} />
                </div>

                <div className="space-y-8">
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        Intelligence Summary
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {selectedCyclone.description}
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">Core Impact Logs</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedCyclone.impact.map(item => (
                        <div key={item} className="flex items-center gap-3 p-3 bg-slate-950/50 border border-slate-800 rounded-lg group hover:border-cyan-500 transition-colors">
                           <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                           <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}

function TimelineCard({ cyclone, isActive, onClick }: { cyclone: any; isActive: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`p-5 rounded-xl border transition-all cursor-pointer group ${
        isActive 
        ? "bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
        : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isActive ? "text-cyan-400" : "text-slate-500"}`}>
          {cyclone.year}
        </span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-cyan-400 translate-x-1" : "text-slate-700 group-hover:text-slate-500"}`} />
      </div>
      <h3 className={`text-xl font-bold uppercase tracking-tight mb-1 ${isActive ? "text-white" : "text-slate-400"}`}>
        {cyclone.name}
      </h3>
      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
        <MapPin className="w-3 h-3" />
        <span className="truncate">{cyclone.landfall}</span>
      </div>
    </div>
  );
}

function DetailBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-950 rounded-lg border border-slate-800">
      <div className="text-cyan-400">{icon}</div>
      <div>
        <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</div>
        <div className="text-xs font-bold text-white uppercase tracking-tight">{value}</div>
      </div>
    </div>
  );
}
