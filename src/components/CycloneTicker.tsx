"use client";

import React from 'react';
import cyclonesData from "@/data/cyclones.json";

export default function CycloneTicker() {
  const tickerItems = [...cyclonesData, ...cyclonesData]; 

  return (
    <div className="bg-slate-900 border-y border-slate-800 py-3 overflow-hidden flex whitespace-nowrap">
      <div className="flex gap-12 items-center animate-pulse">
        {tickerItems.slice(0, 8).map((cyclone, i) => (
          <div key={`${cyclone.name}-${i}`} className="flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest font-bold">
              {cyclone.year}
            </span>
            <span className="text-white font-bold text-sm uppercase tracking-tighter">
              {cyclone.name}
            </span>
            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
              cyclone.intensity.includes("Super") ? "bg-red-950 text-red-400 border border-red-900" : "bg-slate-800 text-slate-400"
            }`}>
              {cyclone.intensity}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mx-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
