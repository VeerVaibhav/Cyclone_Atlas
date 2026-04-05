"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChatAssistant from "@/components/ChatAssistant";
import cyclonesData from "@/data/cyclones.json";
import { Wind, Calendar, MapPin, Activity } from "lucide-react";

import CoastalMap from "@/components/CoastalMap";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const recentCyclones = cyclonesData.slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <Hero />
      
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="max-w-7xl mx-auto px-8 py-20 space-y-24">
        {/* Recent Monitoring Section */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-widest mb-2">
                <Activity className="w-4 h-4" />
                <span>Historical Data Logs</span>
              </div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                Recent <span className="text-slate-500">Events</span>
              </h2>
            </div>
            <button className="text-slate-400 hover:text-accent-cyan transition-colors text-sm font-bold uppercase tracking-widest">
              View All Archive
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentCyclones.map((cyclone) => (
              <CycloneCard key={cyclone.name} cyclone={cyclone} />
            ))}
          </div>
        </section>

        {/* Coastal Vulnerability Summary */}
        <section className="glass-card p-10 glow-border">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                Coastal <br />
                <span className="text-accent-cyan">Vulnerability</span> Index
              </h2>
              <p className="text-slate-400 text-lg">
                The eastern coast of India is historically more susceptible to high-intensity cyclonic storms. 
                Our monitoring systems analyze sea-surface temperatures and atmospheric pressure to predict risk patterns.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="text-accent-cyan font-bold text-2xl">High Risk</div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest">East Coast State</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="text-blue-400 font-bold text-2xl">Medium Risk</div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest">West Coast State</div>
                </div>
              </div>
            </div>
            <div className="aspect-video bg-slate-800/30 rounded-xl border border-slate-700 flex items-center justify-center relative overflow-hidden">
               <CoastalMap />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-12 px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-1.5 rounded text-xs font-mono text-accent-cyan border border-slate-700">CAT-IN</div>
            <p className="text-slate-500 text-sm font-medium tracking-tight">
              © 2026 Cyclone Atlas India. Meteorological Data Science Initiative.
            </p>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Data API</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CycloneCard({ cyclone }: { cyclone: any }) {
  return (
    <div className="glass-card p-6 group hover:glow-border transition-all duration-500 cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-accent-cyan group-hover:bg-accent-cyan group-hover:text-background transition-colors">
          <Wind className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter bg-slate-900 px-2 py-1 rounded border border-slate-800">
          ID: {cyclone.name.substring(0, 3).toUpperCase()}-{cyclone.year}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-1">{cyclone.name}</h3>
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <Calendar className="w-4 h-4" />
        <span>{cyclone.year}</span>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-800/50">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-300 truncate">{cyclone.states.join(", ")}</span>
        </div>
        <div className="inline-block px-2 py-1 bg-red-950/30 text-red-400 text-[10px] font-black uppercase tracking-widest rounded border border-red-900/50">
          {cyclone.intensity}
        </div>
      </div>
    </div>
  );
}
