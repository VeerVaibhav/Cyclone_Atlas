"use client";

import { motion } from "framer-motion";
import { Radar, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden mission-control-gradient">
      {/* Animated Cyclone Swirl Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-[600px] h-[600px] rounded-full border-t-4 border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] rounded-full border-b-4 border-blue-500/30"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-6"
      >
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono tracking-widest text-sm uppercase">
          <Radar className="w-4 h-4 animate-pulse" />
          <span>Real-time Monitoring Active</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
          Tracking the <br />
          <span className="text-accent-cyan drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">Storm</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium">
          Comprehensive data visualization and impact analysis of historical and future cyclone risks in the Indian subcontinent.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4">
          <button className="flex items-center gap-2 px-8 py-4 bg-accent-cyan text-background rounded-full font-bold uppercase tracking-tight hover:bg-white transition-colors">
            Explore Dashboard
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 border border-slate-700 rounded-full font-bold uppercase tracking-tight text-white hover:border-accent-cyan hover:text-accent-cyan transition-colors">
            View Risk Map
          </button>
        </div>
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-1 bg-[url('/grid.svg')] bg-repeat opacity-10 pointer-events-none" />
    </section>
  );
}
