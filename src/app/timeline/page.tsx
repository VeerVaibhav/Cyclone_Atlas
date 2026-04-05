"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";
import CoastalMap from "@/components/CoastalMap";
import cyclonesData from "@/data/cyclones.json";
import { Calendar, MapPin, Wind, Info, ChevronRight, Activity, Filter, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

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

      <main className="max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row gap-12 h-screen overflow-hidden">
        {/* Left: Timeline List */}
        <div className="lg:w-[380px] flex flex-col h-full bg-slate-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">
                Intelligence <br />
                <span className="text-slate-500">Timeline</span>
                </h1>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 shadow-inner">
                <Filter className="w-3.5 h-3.5 text-accent-cyan" />
                <select 
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none text-slate-300 cursor-pointer"
                >
                    {years.map(y => <option key={y} value={y} className="bg-slate-900">{y}</option>)}
                </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
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
        <div className="flex-1 space-y-8 h-full overflow-y-auto pr-4 custom-scrollbar pb-20">
            <div className="space-y-8 animate-slide-up">
              {/* Detail Header */}
              <div className="glass-card p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Activity className="w-48 h-48" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-[11px] font-mono font-black uppercase tracking-[0.2em] border border-accent-cyan/20 rounded-lg shadow-lg shadow-accent-cyan/5">
                            ID: {selectedCyclone.name.substring(0,3).toUpperCase()}-{selectedCyclone.year}
                        </span>
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5" />
                            {selectedCyclone.date}
                        </div>
                    </div>
                    <h2 className="text-7xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                      {selectedCyclone.name}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      <DetailBadge icon={<Wind className="w-4 h-4" />} label="Intensity" value={selectedCyclone.intensity} />
                      <DetailBadge icon={<MapPin className="w-4 h-4" />} label="Primary Landfall" value={selectedCyclone.landfall} />
                    </div>
                  </div>
                  <div className="text-right p-6 bg-slate-950/50 rounded-3xl border border-white/5 backdrop-blur-md">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black mb-2">Threat Assessment</div>
                    <div className={cn(
                        "text-3xl font-black uppercase tracking-tighter",
                        selectedCyclone.level === "Critical" ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" : 
                        selectedCyclone.level === "Extreme" ? "text-orange-500" : "text-yellow-500"
                    )}>
                        {selectedCyclone.level} Level
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Map and Impact */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card p-4 min-h-[450px] flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute top-6 left-6 z-10">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-full border border-white/10">
                            <Layers className="w-3.5 h-3.5 text-accent-cyan" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tactical Overlay</span>
                        </div>
                    </div>
                    <CoastalMap highlightedStates={selectedCyclone.states} />
                </div>

                <div className="space-y-8">
                  <div className="glass-card p-8">
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                        <Info className="w-4 h-4 text-accent-cyan" />
                        Intelligence Summary
                    </h3>
                    <p className="text-slate-300 leading-relaxed font-medium text-lg">
                      {selectedCyclone.description}
                    </p>
                  </div>

                  <div className="glass-card p-8">
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Critical Impact Logs</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedCyclone.impact.map(item => (
                        <div key={item} className="flex items-center justify-between p-4 bg-slate-950/50 border border-white/5 rounded-2xl group hover:border-accent-cyan/30 transition-all hover:translate-x-1">
                           <div className="flex items-center gap-4">
                               <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:scale-125 transition-transform" />
                               <span className="text-sm font-bold text-slate-300 uppercase tracking-tight">{item}</span>
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-accent-cyan transition-colors" />
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
      className={cn(
        "p-5 rounded-2xl border transition-all cursor-pointer group active:scale-95",
        isActive 
        ? "bg-accent-cyan text-slate-950 border-accent-cyan shadow-xl shadow-accent-cyan/10" 
        : "bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={cn(
            "text-[11px] font-black uppercase tracking-[0.2em]",
            isActive ? "text-slate-900" : "text-accent-cyan"
        )}>
          {cyclone.year}
        </span>
        <div className={cn(
            "p-1 rounded-md border transition-colors",
            isActive ? "bg-slate-900/20 border-slate-900/20" : "bg-slate-950 border-white/5"
        )}>
            <ChevronRight className={cn("w-3 h-3", isActive ? "text-slate-900" : "text-slate-500")} />
        </div>
      </div>
      <h3 className={cn(
          "text-2xl font-black uppercase tracking-tighter leading-none mb-2",
          isActive ? "text-slate-950" : "text-white"
      )}>
        {cyclone.name}
      </h3>
      <div className={cn(
          "flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight",
          isActive ? "text-slate-800" : "text-slate-500"
      )}>
        <MapPin className="w-3 h-3" />
        <span className="truncate">{cyclone.landfall}</span>
      </div>
    </div>
  );
}

function DetailBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3 bg-slate-950/50 rounded-2xl border border-white/5 backdrop-blur-sm">
      <div className="p-2 bg-slate-900 rounded-xl text-accent-cyan border border-white/5">{icon}</div>
      <div>
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black leading-none mb-1">{label}</div>
        <div className="text-sm font-black text-white uppercase tracking-tight">{value}</div>
      </div>
    </div>
  );
}
