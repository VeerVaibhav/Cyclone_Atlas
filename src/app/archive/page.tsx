"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";
import cyclonesData from "@/data/cyclones.json";
import { Search, Filter, Wind, Calendar, MapPin, ArrowUpDown, ChevronRight, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArchivePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCyclones = useMemo(() => {
    let result = cyclonesData.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.states.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.year.toString().includes(searchTerm)
    );

    if (intensityFilter !== "All") {
      result = result.filter(c => c.intensity.includes(intensityFilter));
    }

    if (sortBy === "newest") result.sort((a,b) => b.year - a.year);
    else if (sortBy === "oldest") result.sort((a,b) => a.year - b.year);
    else if (sortBy === "alphabetical") result.sort((a,b) => a.name.localeCompare(b.name));

    return result;
  }, [searchTerm, intensityFilter, sortBy]);

  const intensities = ["All", "Super", "Extremely Severe", "Very Severe", "Severe"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="max-w-7xl mx-auto px-6 py-32">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400 font-mono tracking-widest text-[10px] uppercase">
                <LayoutGrid className="w-3 h-3" />
                <span>Impact Intelligence Repository</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              Impact <span className="text-slate-500">Archive</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-xl font-medium leading-relaxed">
              Global historical database of cyclonic events. Filter by sector, 
              intensity, or temporal window for comparative analysis.
            </p>
          </div>
          <div className="text-right hidden lg:block bg-slate-950 p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className="text-6xl font-black text-accent-cyan tracking-tighter">{filteredCyclones.length}</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black mt-2">Verified Records</div>
          </div>
        </header>

        {/* Filters Bar */}
        <div className="glass-card p-4 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent-cyan transition-colors" />
            <input 
              type="text" 
              placeholder="Search Intelligence Database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:border-accent-cyan/50 outline-none transition-all placeholder:text-slate-700 font-medium"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 bg-slate-950 border border-white/5 rounded-2xl px-5 py-2 flex-1 md:flex-none group hover:border-white/10 transition-all">
                <Filter className="w-4 h-4 text-slate-500" />
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Intensity</span>
                    <select 
                        value={intensityFilter}
                        onChange={(e) => setIntensityFilter(e.target.value)}
                        className="bg-transparent text-[11px] font-bold uppercase tracking-tight outline-none text-slate-300 cursor-pointer"
                    >
                        {intensities.map(i => <option key={i} value={i} className="bg-slate-900">{i}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-950 border border-white/5 rounded-2xl px-5 py-2 flex-1 md:flex-none group hover:border-white/10 transition-all">
                <ArrowUpDown className="w-4 h-4 text-slate-500" />
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Sort By</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent text-[11px] font-bold uppercase tracking-tight outline-none text-slate-300 cursor-pointer"
                    >
                        <option value="newest" className="bg-slate-900">Newest First</option>
                        <option value="oldest" className="bg-slate-900">Oldest First</option>
                        <option value="alphabetical" className="bg-slate-900">A-Z Name</option>
                    </select>
                </div>
            </div>
          </div>
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {filteredCyclones.map(cyclone => (
            <ArchiveCard key={cyclone.name} cyclone={cyclone} />
          ))}
        </div>

        {filteredCyclones.length === 0 && (
          <div className="py-40 text-center space-y-6 opacity-20">
             <Search className="w-20 h-20 mx-auto text-slate-500" />
             <p className="text-2xl font-black uppercase tracking-[0.3em]">No Intelligence Found</p>
          </div>
        )}
      </main>
    </div>
  );
}

function ArchiveCard({ cyclone }: { cyclone: any }) {
  return (
    <div className="glass-card group flex flex-col overflow-hidden active:scale-[0.98]">
      <div className="p-8 space-y-8 flex-1">
        <div className="flex justify-between items-start">
            <div className="space-y-2">
                <div className="text-[10px] font-mono text-accent-cyan uppercase tracking-[0.2em] font-black">{cyclone.date}</div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-accent-cyan transition-colors leading-none">
                    {cyclone.name}
                </h3>
            </div>
            <div className={cn(
                "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all",
                cyclone.intensity.includes("Super") 
                ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
                : "bg-slate-950 text-slate-500 border-white/5"
            )}>
                {cyclone.intensity}
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 text-slate-400">
                <div className="p-2 bg-slate-950 rounded-xl border border-white/5">
                    <MapPin className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tight truncate">{cyclone.states.join(", ")}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
                <div className="p-2 bg-slate-950 rounded-xl border border-white/5">
                    <Wind className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tight truncate">Landfall: {cyclone.landfall}</span>
            </div>
        </div>

        <div className="pt-6 border-t border-white/5">
            <p className="text-xs text-slate-500 leading-relaxed font-medium italic line-clamp-3">
                "{cyclone.description}"
            </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
            {cyclone.impact.map((tag: string) => (
                <span key={tag} className="text-[9px] font-black text-slate-600 uppercase tracking-widest bg-slate-950 px-2.5 py-1 rounded-md border border-white/5 group-hover:border-white/10 group-hover:text-slate-400 transition-colors">
                    {tag}
                </span>
            ))}
        </div>
      </div>
      
      <button className="w-full py-4 bg-slate-950 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:bg-accent-cyan group-hover:text-slate-950 transition-all flex items-center justify-center gap-3">
        Detailed Log Analysis
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
