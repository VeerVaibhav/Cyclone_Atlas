"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";
import cyclonesData from "@/data/cyclones.json";
import { Search, Filter, Wind, Calendar, MapPin, ArrowUpDown, ChevronRight } from "lucide-react";

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

      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              Impact <span className="text-slate-500">Archive</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg leading-relaxed">
              A comprehensive repository of documented cyclonic events in the Indian subcontinent. 
              Search by name, state, or year.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-4xl font-black text-white">{filteredCyclones.length}</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Records Found</div>
          </div>
        </header>

        {/* Filters Bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 mb-12 flex flex-col md:flex-row gap-4 items-center rounded-3xl">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, state, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-cyan-400 outline-none transition-colors"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 flex-1 md:flex-none">
                <Filter className="w-3 h-3 text-slate-500" />
                <select 
                    value={intensityFilter}
                    onChange={(e) => setIntensityFilter(e.target.value)}
                    className="bg-transparent text-[10px] font-mono uppercase tracking-widest outline-none text-slate-300 w-full"
                >
                    {intensities.map(i => <option key={i} value={i}>{i} Intensity</option>)}
                </select>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 flex-1 md:flex-none">
                <ArrowUpDown className="w-3 h-3 text-slate-500" />
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-[10px] font-mono uppercase tracking-widest outline-none text-slate-300 w-full"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">A-Z Name</option>
                </select>
            </div>
          </div>
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCyclones.map(cyclone => (
            <ArchiveCard key={cyclone.name} cyclone={cyclone} />
          ))}
        </div>

        {filteredCyclones.length === 0 && (
          <div className="py-32 text-center space-y-4 opacity-30">
             <Search className="w-12 h-12 mx-auto" />
             <p className="text-xl font-bold uppercase tracking-widest">No records match your search</p>
          </div>
        )}
      </main>
    </div>
  );
}

function ArchiveCard({ cyclone }: { cyclone: any }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl group hover:border-cyan-500 transition-all duration-500 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
            <div className="space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">{cyclone.date}</div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                    {cyclone.name}
                </h3>
            </div>
            <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                cyclone.intensity.includes("Super") ? "bg-red-950/30 text-red-500 border-red-900/50" : "bg-slate-950 text-slate-500 border-slate-800"
            }`}>
                {cyclone.intensity}
            </div>
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium truncate">{cyclone.states.join(", ")}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
                <Wind className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Landfall: {cyclone.landfall}</span>
            </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 italic">
            "{cyclone.description}"
        </p>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
            {cyclone.impact.map((tag: string) => (
                <span key={tag} className="text-[8px] font-mono text-slate-600 uppercase tracking-widest border border-slate-950 px-2 py-0.5 rounded transition-colors">
                    {tag}
                </span>
            ))}
        </div>
      </div>
      
      <button className="w-full py-3 bg-slate-950 border-t border-slate-800 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all flex items-center justify-center gap-2">
        View Detailed Logs
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
