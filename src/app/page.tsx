"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoastalMap from "@/components/CoastalMap";
import ChatAssistant from "@/components/ChatAssistant";
import InsightCards from "@/components/InsightCards";
import cyclonesData from "@/data/cyclones.json";
import { Wind, Calendar, MapPin, Activity, ChevronRight, LayoutDashboard, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCyclone, setActiveCyclone] = useState(cyclonesData[0]);
  const [selectedCyclone, setSelectedCyclone] = useState<{ name: string; year: number; intensity: string; landfall: string; date: string; states: string[]; description: string; impact: string[]; level: string } | null>(null);
  
  const recentCyclones = cyclonesData.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-accent-cyan/30">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="flex-1 pt-20">
        <Hero />
        

        <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
            {/* Tactical Dashboard Section */}
            <section>
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-900 rounded-2xl border border-white/5 text-accent-cyan shadow-xl">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                                Mission <span className="text-slate-500">Control</span>
                            </h2>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-1">Tactical Analysis Interface</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">Live Monitoring Active</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-card p-2 min-h-[550px] relative overflow-hidden group">
                        <div className="absolute top-8 left-8 z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Preview: {activeCyclone.name}</span>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                                Coastal Risk <span className="text-accent-cyan">Visualization</span>
                            </h3>
                        </div>
                        <CoastalMap 
                            highlightedStates={activeCyclone.states} 
                            activeCyclone={activeCyclone}
                        />
                    </div>
                    
                    <div className="space-y-8">
                        <InsightCards />
                        
                        <div className="glass-card p-8 border-l-4 border-l-red-500 relative overflow-hidden group cursor-pointer active:scale-[0.98]" onClick={() => setSelectedCyclone(activeCyclone)}>
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Activity className="w-16 h-16" />
                            </div>
                            <h4 className="text-red-400 font-bold text-sm uppercase tracking-tighter mb-3 flex items-center gap-2">
                                <Wind className="w-4 h-4" />
                                Regional Advisory
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                {activeCyclone.states[0]} region historically shows 
                                heightened landfall sensitivity during {activeCyclone.date.split(' ')[0]}.
                            </p>
                            <button className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover:text-accent-cyan transition-colors flex items-center gap-2 group/link">
                                Detailed Risk Report
                                <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Archive Preview Section */}
            <section>
                <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-accent-cyan font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                            <Activity className="w-3 h-3" />
                            <span>Intelligence Archive</span>
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                            Recent <span className="text-slate-500">Events</span>
                        </h2>
                    </div>
                    <Link href="/archive" className="btn-secondary text-[10px] px-6 py-2.5 flex items-center gap-2 group">
                        Access Full Database
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentCyclones.map((cyclone) => (
                        <div 
                            key={cyclone.name} 
                            className={`glass-card p-6 cursor-pointer group active:scale-[0.98] transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] focus-within:ring-2 focus-within:ring-accent-cyan/50 outline-none focus:ring-2 focus:ring-accent-cyan/50 ${activeCyclone.name === cyclone.name ? 'ring-1 ring-accent-cyan/50' : ''}`}
                            tabIndex={0}
                            role="button"
                            aria-label={`View details for Cyclone ${cyclone.name}`}
                            onClick={() => {
                                setActiveCyclone(cyclone);
                                setSelectedCyclone(cyclone);
                            }}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveCyclone(cyclone); setSelectedCyclone(cyclone); } }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn(
                                    "p-2 rounded-xl border border-white/5 transition-colors",
                                    activeCyclone.name === cyclone.name ? "bg-accent-cyan text-slate-950" : "bg-slate-950 text-accent-cyan group-hover:bg-slate-900"
                                )}>
                                    <Wind className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter bg-slate-950 px-2.5 py-1 rounded-lg border border-white/5">
                                    ID: {cyclone.name.substring(0, 3).toUpperCase()}-{cyclone.year % 100}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-black text-white mb-1 group-hover:text-accent-cyan transition-colors uppercase tracking-tight">{cyclone.name}</h3>
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                                <Calendar className="w-3 h-3" />
                                <span>{cyclone.year}</span>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tight leading-tight">{cyclone.states.join(", ")}</span>
                                </div>
                                <div className="inline-block px-2.5 py-1 bg-slate-950 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-white/5 group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-all">
                                    {cyclone.intensity}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </main>

      {/* Detail Modal Overlay (Shared with Archive) */}
      {selectedCyclone && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-white/10 animate-slide-up relative">
            <button 
                onClick={() => setSelectedCyclone(null)}
                className="absolute top-6 right-6 p-3 bg-slate-950 rounded-full border border-white/10 text-slate-500 hover:text-white hover:border-white/30 transition-all z-10 active:scale-90"
            >
                <X className="w-5 h-5" />
            </button>
            
            <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-[11px] font-mono font-black uppercase tracking-[0.2em] border border-accent-cyan/20 rounded-lg">
                            INTEL_LOG_{selectedCyclone.name.substring(0,3).toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5" />
                            {selectedCyclone.date}
                        </div>
                    </div>
                    <h2 className="text-7xl font-black text-white uppercase tracking-tighter leading-none">
                      {selectedCyclone.name}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Environmental Impact</h3>
                            <p className="text-slate-300 leading-relaxed font-medium text-lg">
                                {selectedCyclone.description}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                                <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-black mb-2">Peak Intensity</div>
                                <div className="text-sm font-black text-accent-cyan uppercase tracking-tight">{selectedCyclone.intensity}</div>
                            </div>
                            <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                                <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-black mb-2">Primary Sector</div>
                                <div className="text-sm font-black text-white uppercase tracking-tight">{selectedCyclone.landfall}</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Intelligence Logs</h3>
                            <div className="space-y-3">
                                {selectedCyclone.impact.map((log: string) => (
                                    <div key={log} className="flex items-center gap-4 p-4 bg-slate-950/50 border border-white/5 rounded-xl group hover:border-accent-cyan/30 transition-all">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tight group-hover:text-white transition-colors">{log}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
                            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Wind className="w-3.5 h-3.5" />
                                Threat Level: {selectedCyclone.level}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                Tactical evaluation shows high coastal vulnerability and severe infrastructure impact during the event window.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-8 bg-slate-950/80 border-t border-white/5 flex justify-end gap-4">
                <button 
                    onClick={() => setSelectedCyclone(null)}
                    className="btn-secondary text-[10px] px-8 py-3"
                >
                    Dismiss Analysis
                </button>
                <Link 
                    href="/timeline" 
                    className="btn-primary text-[10px] px-8 py-3 flex items-center gap-2"
                >
                    View in Timeline
                    <ChevronRight className="w-3.5 h-3.5" />
                </Link>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/5 py-20 px-6 mt-32 bg-slate-950/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
                <div className="bg-accent-cyan p-2 rounded-xl shadow-lg shadow-accent-cyan/20">
                    <Activity className="w-6 h-6 text-slate-950" />
                </div>
                <span className="text-2xl font-black uppercase tracking-tighter text-white">Cyclone <span className="text-accent-cyan">Atlas</span></span>
            </div>
            <p className="max-w-md text-slate-500 text-sm leading-relaxed font-medium">
                India&apos;s specialized data visualization platform for coastal storm monitoring and safety intelligence. 
                Designed for tactical awareness and climate research.
            </p>
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 hover:border-accent-cyan/50 transition-colors cursor-pointer" />
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 hover:border-accent-cyan/50 transition-colors cursor-pointer" />
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 hover:border-accent-cyan/50 transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 lg:col-span-2">
              <FooterColumn title="Platform" links={["Timeline", "Risk Outlook", "Archive", "Map"]} />
              <FooterColumn title="Resources" links={["Precaution", "Emergency", "API", "IMD Info"]} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 border-t border-white/5 mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest font-bold">
              © 2026 Cyclone Atlas India | Meteorological Data Initiative
            </p>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-white/5 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    <span className="text-slate-500 text-[9px] font-mono uppercase tracking-widest font-black">All Systems Nominal</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

const footerRouteMap: Record<string, string> = {
    "Timeline": "/timeline",
    "Risk Outlook": "/risk",
    "Archive": "/archive",
    "Map": "/",
    "Precaution": "/precaution",
    "Emergency": "/precaution",
    "API": "/",
    "IMD Info": "/",
};

function FooterColumn({ title, links }: { title: string; links: string[] }) {
    return (
        <div className="space-y-6">
            <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-black">{title}</h4>
            <ul className="space-y-3">
                {links.map(link => (
                    <li key={link}>
                        <Link href={footerRouteMap[link] || "/"} className="text-xs text-slate-600 hover:text-accent-cyan transition-colors font-bold uppercase tracking-tight">{link}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
