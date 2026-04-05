"use client";

import React from 'react';
import { Radar, ChevronRight, Activity, Zap, Shield, Map as MapIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#020617] pt-20">
      <div className="relative z-10 space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono tracking-[0.3em] text-[10px] uppercase">
          <Radar className="w-3 h-3 animate-pulse" />
          <span>Orbital Tracking Interface</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
            Cyclone <br />
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Atlas
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
            India's premium storm intelligence dashboard. Explore past incidents, 
            understand coastal patterns, and stay aware with real-time risk patterns.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="group flex items-center gap-2 px-8 py-4 bg-cyan-500 text-slate-950 rounded-full font-bold uppercase tracking-tight hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            Explore Timeline
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border border-slate-700 rounded-full font-bold uppercase tracking-tight text-white hover:border-cyan-400 hover:text-cyan-400 transition-all hover:bg-slate-900/50">
            Check Risk Outlook
          </button>
        </div>
      </div>

      {/* Hero Stats Row */}
      <div 
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl px-4"
      >
        <StatCard icon={<Activity className="text-cyan-400" />} label="Events Logged" value="150+" subtext="Since 1970" />
        <StatCard icon={<MapIcon className="text-blue-400" />} label="Highest Risk" value="Odisha" subtext="East Coast Zone" />
        <StatCard icon={<Zap className="text-amber-400" />} label="Peak Season" value="May / Oct" subtext="Post-Monsoon" />
        <StatCard icon={<Shield className="text-emerald-400" />} label="Risk Level" value="Stable" subtext="Current Advisory" />
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-4 text-left group hover:border-cyan-500 transition-all rounded-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-slate-900 rounded border border-slate-800 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">{label}</span>
      </div>
      <div className="text-2xl font-black text-white leading-tight">{value}</div>
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">{subtext}</div>
    </div>
  );
}
