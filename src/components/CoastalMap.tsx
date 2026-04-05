"use client";

import { motion } from "framer-motion";
import coastalData from "@/data/coastalRegions.json";

export default function CoastalMap() {
  // Simplified coordinates for Indian coastal states for visualization
  const states = [
    { name: "Gujarat", path: "M 20,40 Q 30,50 25,70 L 40,80 L 45,70 L 30,40 Z", color: "bg-orange-500" },
    { name: "Maharashtra", path: "M 40,80 L 50,110 L 45,130 L 35,110 Z", color: "bg-blue-500" },
    { name: "Goa", path: "M 45,130 L 48,135 L 44,140 Z", color: "bg-green-500" },
    { name: "Karnataka", path: "M 48,135 L 55,170 L 50,180 L 44,140 Z", color: "bg-yellow-500" },
    { name: "Kerala", path: "M 55,170 L 65,210 L 55,210 L 50,180 Z", color: "bg-emerald-500" },
    { name: "Tamil Nadu", path: "M 65,210 L 85,180 L 95,150 L 75,150 L 65,210 Z", color: "bg-red-500" },
    { name: "Andhra Pradesh", path: "M 95,150 L 110,120 L 120,100 L 90,120 L 75,150 Z", color: "bg-purple-500" },
    { name: "Odisha", path: "M 120,100 L 140,85 L 150,70 L 120,80 Z", color: "bg-indigo-500" },
    { name: "West Bengal", path: "M 150,70 L 165,65 L 170,50 L 145,55 Z", color: "bg-cyan-500" },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Very High": return "#ef4444"; // red-500
      case "High": return "#f97316"; // orange-500
      case "Medium": return "#eab308"; // yellow-500
      case "Low": return "#22c55e"; // green-500
      default: return "#64748b"; // slate-500
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4 bg-slate-900/80 border border-slate-700 p-3 rounded-lg z-10">
        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Risk Heatmap</h4>
        <div className="space-y-1">
          {["Very High", "High", "Medium", "Low"].map(level => (
            <div key={level} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getRiskColor(level) }}></div>
              <span className="text-[10px] text-slate-400 uppercase">{level}</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 200 250" className="w-full h-full max-h-[400px] drop-shadow-[0_0_20px_rgba(34,211,238,0.1)]">
        {/* Simple stylized India Outline (Mainland) */}
        <path 
          d="M 50,10 L 150,10 L 180,50 L 170,70 L 150,80 L 120,110 L 95,160 L 65,220 L 50,180 L 40,120 L 20,70 L 30,30 Z" 
          fill="#0f172a" 
          stroke="#1e293b" 
          strokeWidth="1"
        />

        {/* Coastal States with Risk Colors */}
        {coastalData.map((region, index) => {
          // Map state names to our simplified paths
          const statePath = states.find(s => s.name === region.state);
          if (!statePath) return null;

          return (
            <motion.path
              key={region.state}
              d={statePath.path}
              fill={getRiskColor(region.riskLevel)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.7, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1.02, stroke: "#fff", strokeWidth: 1 }}
              className="cursor-pointer transition-all"
            >
              <title>{region.state}: {region.riskLevel} Risk</title>
            </motion.path>
          );
        })}
      </svg>
      
      <p className="mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
        Coastal Threat Visualization | Sector Alpha-9
      </p>
    </div>
  );
}
