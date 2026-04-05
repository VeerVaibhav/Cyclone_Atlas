"use client";

import React from 'react';
import Link from 'next/link';
import { Radar, ChevronRight, Activity, Zap, Shield, Map as MapIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden mission-control-gradient pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-mono tracking-[0.3em] text-[10px] uppercase mb-8">
          <Radar className="w-3 h-3 animate-pulse" />
          <span>Orbital Tracking Interface</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase leading-[0.85] mb-8">
          Cyclone <br />
          <span className="text-accent-cyan drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">Atlas</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
          India's high-fidelity storm intelligence dashboard. Explore historical data, 
          understand seasonal patterns, and access localized safety protocols.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/timeline" className="btn-primary flex items-center gap-2 min-w-[200px] justify-center">
            Explore Timeline
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link href="/risk" className="btn-secondary min-w-[200px]">
            Risk Outlook
          </Link>
        </div>

        {/* Hero Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
          <StatCard icon={<Activity className="text-accent-cyan w-4 h-4" />} label="Events Logged" value="150+" subtext="Since 1970" />
          <StatCard icon={<MapIcon className="text-blue-400 w-4 h-4" />} label="Highest Risk" value="Odisha" subtext="East Coast" />
          <StatCard icon={<Zap className="text-amber-400 w-4 h-4" />} label="Peak Season" value="May / Oct" subtext="Post-Monsoon" />
          <StatCard icon={<Shield className="text-emerald-400 w-4 h-4" />} label="IMD Systems" value="Nominal" subtext="Status Green" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
  return (
    <div className="glass-card p-5 text-left group">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-slate-950 rounded-lg border border-white/5">
          {icon}
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">{label}</span>
      </div>
      <div className="text-2xl font-black text-white leading-tight group-hover:text-accent-cyan transition-colors">{value}</div>
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">{subtext}</div>
    </div>
  );
}
