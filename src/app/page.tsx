"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoastalMap from "@/components/CoastalMap";
import CycloneTicker from "@/components/CycloneTicker";
import ChatAssistant from "@/components/ChatAssistant";
import cyclonesData from "@/data/cyclones.json";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const recentCyclones = cyclonesData ? cyclonesData.slice(0, 4) : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="flex-1">
        <Hero />
        <CycloneTicker />
        
        <div className="max-w-7xl mx-auto px-8 py-24 space-y-32">
            {/* Map Section */}
            <section className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 h-[500px] flex items-center justify-center">
                    <CoastalMap />
                </div>
                <div className="space-y-6">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                        Coastal <span className="text-cyan-400">Risk</span> Map
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Visualizing the intensity and frequency of cyclonic events across India's coastal states.
                    </p>
                </div>
            </section>

            {/* Mission Control Header */}
            <section>
                <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-6">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                        Recent <span className="text-slate-500">Monitoring</span>
                    </h2>
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded">
                        Sector Alpha-1 Active
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentCyclones.map((cyclone) => (
                        <div key={cyclone.name} className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition-all cursor-pointer group">
                            <div className="text-cyan-400 font-mono text-[10px] mb-4 uppercase tracking-widest font-bold">{cyclone.year}</div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors">{cyclone.name}</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">{cyclone.intensity}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-16 px-8 mt-32">
        <div className="max-w-7xl mx-auto text-center text-slate-600 text-xs font-mono uppercase tracking-widest">
            © 2026 Cyclone Atlas India | Systems Nominal
        </div>
      </footer>
    </div>
  );
}
